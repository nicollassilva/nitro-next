# Análise de Código — `packages/nitro-renderer`

> Auditoria de performance, memória (CPU/GPU), correção e qualidade do motor de renderização isométrico (engine do Habbo em PixiJS 8).
> Base analisada: `main` (`036f650`). Stack: TypeScript + **PixiJS 8** (pixi.js ^8.18.1). **Sem React** — é um módulo estrutural de engine.

Cada achado tem: arquivo/linha, severidade, categoria e **cenário concreto de falha**.
✔︎ = verificado diretamente no código durante a auditoria. ⧉ = apontado de forma independente por mais de um revisor.

> **Foco desta auditoria (engine de jogo de longa duração a 60fps):** vazamento de recursos de GPU (Texture/RenderTexture/TextureSource não destruídos), ausência de eviction em caches, alocações por frame (GC churn), leaks de listeners no event-bus interno, e correção da matemática isométrica/lifecycle. O ponto estrutural dominante é **falta de liberação de memória de GPU ao longo de uma sessão** (trocar de sala, girar, andar, ver muitos mobis/avatares).

---

## 🔴 Crítico

### C1. `AssetManager` não tem NENHUMA eviction — texturas/coleções/spritesheets ficam presas pela sessão inteira ✔︎ ⧉
- **Arquivo:** `assets/AssetManager.ts:11-12, 58-71, 162-168` (+ `GraphicAssetCollection.dispose()` nunca é chamado em lugar nenhum)
- **Categoria:** gpu-leak (o vazamento principal)
- `_textures` e `_collections` são `Map`s que só recebem `set` — **não existe `delete`, `removeCollection` nem chamada a `GraphicAssetCollection.dispose()`** em todo o pacote (verificado). Cada sala visitada e cada tipo de mobi visto baixa um bundle `.nitro` → cria base textures + um `Spritesheet` + uma coleção, tudo fixado para sempre.
- **Falha:** o usuário circula por N salas → a VRAM sobe monotonicamente até perda de contexto WebGL / crash da aba. É o vazamento-cabeça do módulo. Corrigir isto (um `removeCollection(name)` que faz dispose de texturas + Spritesheet + coleção, com eviction por refcount/LRU) resolve o grosso do crescimento de GPU.

### C2. Loop infinito trava o cliente ao processar um hole nulo no mapa da sala ✔︎
- **Arquivo:** `room/object/RoomPlaneParser.ts:261-269`
- **Categoria:** correção (hang)
- `while (index < holeMap.length) { const hole = holeMap[index]; if (!hole) continue; addFloorHole(...); index++; }` — o `continue` pula o `index++` manual e gira para sempre. Os `continue` irmãos (linhas 329/342) são seguros por serem `for…of`; só este `while` com incremento manual é vulnerável.
- **Falha:** qualquer elemento null/undefined em `holeMap` (mapa malformado do emulador ou array esparso) **congela a thread de render** permanentemente.

### C3. `AvatarVisualization.dispose()` vaza os caches de avatar e as additions ✔︎
- **Arquivo:** `room/object/visualization/avatar/AvatarVisualization.ts:118-127` (dispose) vs `:62-63, 104`
- **Categoria:** gpu-leak / memory-leak
- `dispose()` só faz `this._avatarImage.dispose()`. Os mapas `_cachedAvatars` e `_cachedAvatarEffects` (todo avatar já renderizado em outro zoom + até `MAX_EFFECT_CACHE` imagens de efeito, cada uma com texturas compostas de GPU) e `_additions` (bolhas/efeitos) **nunca recebem dispose**.
- **Falha:** todo avatar renderizado em mais de um zoom ou com efeito vaza suas texturas compostas + sprites de addition **cada vez que sai da sala**. Sala movimentada com rotatividade = crescimento contínuo de GPU/heap.

### C4. Uso-após-dispose: imagem de avatar em cache é destruída mas não removida do cache ✔︎
- **Arquivo:** `AvatarVisualization.ts:173` (dispose da imagem atual) vs `:400-412` (cache lookup/add)
- **Categoria:** correção (use-after-dispose)
- Ao mudar de escala/efeito, `this._avatarImage?.dispose()` destrói o objeto que **é o mesmo** guardado em `_cachedAvatars`/`_cachedAvatarEffects` (linha 412), sem removê-lo do mapa. `createAvatarImage` só recria quando `!cachedImage`, então um request futuro pela mesma chave devolve a **imagem já destruída**.
- **Falha:** zoom out→in (ou toggle de efeito de volta) entrega ao render um `IAvatarImage` destruído → avatar em branco/lixo ou crash ao acessar textura.

### C5. Listeners de download de figura/efeito nunca são desregistrados — callbacks disparam em avatares destruídos ✔︎ ⧉
- **Arquivo:** `avatar/AvatarAssetDownloadManager.ts:81-91`, `avatar/EffectAssetDownloadManager.ts:74-88` (+ `AvatarImage.ts:386`)
- **Categoria:** race / memory-leak
- `downloadAvatarFigure`/`downloadAvatarEffect` fazem `listeners.push(listener)` **sem dedup e sem API de remoção** (o único `splice` mexe em `_currentDownloads`, não nos arrays de listeners — verificado). `AvatarImage.dispose()` não desregistra. Pior: `endActionAppends` chama `downloadAvatarEffect(param, this)` **a cada render** enquanto o efeito está pendente → o array cresce sem limite e todo duplicado recebe `resetEffect`.
- **Falha:** avatar criado e destruído antes do download terminar → `onLibraryLoaded` chama `resetFigure()/resetEffect()` no avatar morto (use-after-free / setState pós-unmount no lado React). Download que nunca completa fixa o `AvatarImage` (e caches) para sempre.

---

## 🟠 Alto

### A1. `RoomEngine.getGenericRoomObjectImage`: objeto temporário nunca removido + id bank nunca liberado ✔︎
`room/RoomEngine.ts:61-156` — gpu-leak/correção. Cria um room object na sala temporária e reserva um id (`_imageObjectIdBank.reserveNumber()`), mas depois do `getImage()` só roda `geometry.dispose()`. **`reserveNumber` aparece 1×, `freeNumber` 0×** (verificado); o objeto nunca é removido. Cada thumbnail de inventário/catálogo cria um room object permanente (com visualização + texturas). Após ~1000 chamadas o bank esgota → `reserveNumber()` = -1 → `objectId` vira 0, tudo colide no id 0 e os 1000 primeiros vazam.

### A2. Ordenação de precedência de ações é um no-op (`void`) ✔︎
`avatar/actions/AvatarActionManager.ts:101` — correção. `validatedActions.sort(void this.sortByPrecedence);` — o operador `void` faz o argumento virar `undefined`, então `Array.sort` roda com o comparador **default**, não com `sortByPrecedence`. Ações nunca são ordenadas por precedência (afeta seleção de ação principal, tipo de geometria, layering de body-parts). Deveria ser `.sort((a,b) => this.sortByPrecedence(a,b))`.

### A3. `_fullImageCache` do `AvatarImage` é ilimitado — o cap pretendido é código morto ✔︎
`avatar/AvatarImage.ts:25, 558-568` — gpu-leak. `MAX_IMAGE_CACHE = 5` é declarado e **nunca referenciado** (verificado). `cacheFullImage` só evita colisão de chave exata; não há cap de tamanho. Chaves são `direção × ação × frame%N`, então um avatar girando/andando acumula dezenas de `RenderTexture` de canvas inteiro (liberadas só por `dispose()`).

### A4. `RoomObjectLogicBase.dispose()` não remove os event listeners; só `tearDown()` remove ✔︎ ⧉
`room/object/logic/RoomObjectLogicBase.ts:22-32` — memory-leak / race. `dispose()` só anula `_object`; os disposables em `_events` só são liberados em `tearDown()`. `RoomObjectManager.removeObject/removeAllObjects/dispose` chamam `object.dispose()` **sem** `tearDown()`. O consumidor `FurnitureChangeStateWhenStepOnLogic` registra um closure (capturando `this`→object→model) no `eventDispatcher` da sala. Qualquer remoção via manager (público) vaza o listener e continua disparando em objeto destruído a cada movimento de avatar.

### A5. `clearHighlightArea` descarta planes sem dispose → vazam RenderTextures de plane pooladas
`room/object/visualization/room/RoomVisualization.ts:517` — gpu-leak. `this._planes = this._planes.slice(0, length - n)` remove os planes de highlight do array **sem `.dispose()`**. Cada `RoomPlane` é dono de `_planeTexture` (RenderTexture poolada), `_maskTexture` e um `TilingSprite`. Todo ciclo enable→clear de highlight (passar mouse/selecionar tiles) vaza essas texturas. Contraste com `clearPlanes()` (:302-314), que faz dispose corretamente.

### A6. `createAndAddSprite`: caminho de insert dessincroniza `_spriteCount` e órfã filhos
`room/RoomSpriteCanvas.ts:576-583` (+ `:478`) — memory-leak/correção. O branch de append incrementa `_spriteCount`; o branch `addChildAt(index)` não. Combinado com o caminho `varyingDepth` false→true (que chama `createAndAddSprite` sem remover o filho existente no índice), cada toggle insere um `ExtendedSprite` novo e empurra o antigo sem contabilizar.
- **Falha:** mobis cujos sprites alternam `varyingDepth` (animações de estado) acumulam `ExtendedSprite`s órfãos; `getExtendedSprite(index)` retorna o sprite errado → corrupção de z-order/hit-test + memória crescente.

### A7. Helpers de flip em `TextureUtils` vazam RenderTextures não-pooladas + Sprites descartáveis ✔︎ ⧉
`utils/TextureUtils.ts:98-129` — gpu-leak. `flipTextureHorizontal/Vertical/HorizontalAndVertical` fazem `new Sprite(texture)` e `createAndWriteRenderTexture` → `RenderTexture.create` (ignora o `TexturePool`), sem `.destroy()` e sem devolver ao pool. Qualquer visualização que regenere texturas espelhadas (avatares virando, mobis espelhados) vaza uma RenderTexture de GPU por flip ao longo da sessão.

### A8. Thumbnails isométricos vazam RenderTexture por object-id (sem `dispose()`)
`room/object/visualization/furniture/IsometricImageFurniVisualization.ts:59-62, 141-149` (+ intermediária em `:88-91`) — gpu-leak. O thumbnail gerado é adicionado via `asset.addAsset(assetName, thumbnail, …)` com `assetName` único **por object-id**. A classe nunca sobrescreve `dispose()`, então na remoção do mobi a RenderTexture keyed por object-id nunca é removida da coleção. Fotos/badges de guild/thumbnails dinâmicos colocados/removidos repetidamente = GPU crescente. O branch de outline (`:88-91`) ainda vaza a RenderTexture intermediária.

### A9. Avatares destruídos ficam retidos para sempre na geometria singleton
`avatar/geometry/GeometryBodyPart.ts:12, 74-93` (+ `AvatarImage.dispose` sem `removeDynamicItems`) — memory-leak. `_dynamicParts` é um `Map<IAvatarImage, …>` na geometria **singleton** (do `AvatarStructure` compartilhado). Efeitos com add-data inserem o avatar como chave. `AvatarImage.dispose()` nunca chama `_structure.removeDynamicItems(this)`, então todo avatar destruído que usou add-effect fica fortemente referenciado pela geometria de vida-útil-de-app.

### A10. `GraphicAssetPalette` recolor cria textura de GPU por variante + fixa cópia RGBA inteira
`assets/GraphicAssetPalette.ts:40-43` — gpu-leak. `Texture.from(canvas)` cria uma base texture nova para cada variante `getAssetWithPalette` (sem dedup do canvas fonte), e anexa o `imageData.data` inteiro (w×h×4 bytes) permanentemente em `newTexture.source.hitMap`. Só são liberados quando `_paletteAssetNames.length > 10` ou refcount = 0 — mas vivem numa coleção que nunca recebe dispose (C1), então vazam por completo.

### A11. `_pendingContentTypes` nunca é limpo → dedup permanente; download falho nunca retenta ✔︎
`room/RoomContentLoader.ts:295-297, 340-342` — correção/memory-leak. `type` é `push`ado mas nunca removido em sucesso ou falha (verificado: só há pushes). Após o primeiro request de um tipo, `downloadAsset` sempre faz short-circuit. Se o primeiro download falhou (erro de rede transitório), o mobi fica **permanentemente não-carregável** na sessão. O array também cresce sem limite.

### A12. Mapa de dispatchers `_events` nunca limpo + dispatcher obsoleto servido
`room/RoomContentLoader.ts:298, 468-473` — memory-leak/race. `getOrRemoveEventDispatcher` nunca é chamado com `remove=true`, então as entradas `_events` (que fecham sobre room objects/visualizações) ficam retidas para sempre. E o guard na linha 295 retorna o dispatcher **antigo** (truthy) num segundo request → early-return, e o dispatcher do novo caller nunca recebe seu evento de conclusão.

---

## 🟡 Médio

### GPU / Memória
- **M1.** `utils/TexturePool.ts:56-73, 11, 89` — ✔︎ ⧉ (1) `releaseTexture` **não tem guard contra double-release**: soltar a mesma RenderTexture 2× a empurra 2× no pool → `createRenderTexture` pode entregar a mesma textura a dois donos (corrupção/double-free). (2) `_maxIdle = 3600` é medido em *ciclos de cleanup* (a cada 600 frames), então textura ociosa só é liberada após ~3600×600/60 ≈ **10 horas** — na prática o pool nunca encolhe numa sessão, e é keyed por width×height exato (planes de tamanhos variados quase nunca reusam).
- **M2.** `pet/ExperienceData.ts:16-17,53` + `pet/PetVisualization.ts:66-80` — bolha de XP do pet: o guard `_amount === amount` é sempre falso (o setter `amount` nunca é chamado), então um `Container`+`Text`+`TextStyle` novo é construído e re-renderizado na RenderTexture **a cada frame** visível; e `ExperienceData`/`PetVisualization.dispose` não liberam a RenderTexture → vaza por pet removido.
- **M3.** `avatar/AvatarImage.ts:219-237` — `getImage` renderiza o avatar inteiro **2×** por frame cacheável (uma para `_image`, outra para `imageClone` só para popular o cache) → 2× o custo de draw de GPU por frame cacheado.
- **M4.** `room/object/visualization/room/RoomPlane.ts:287-305` — `update` cria um `Container` novo (e um `Sprite(maskSprite)` quando mascarado) a cada regeneração e **nunca destrói** (falta `container.destroy({children:true})` após o render). Roda para todo plane visível a cada rotação da sala.
- **M5.** `utils/TextureUtils.ts:131-159` — `makeWhiteTransparent` faz `getImageData`/loop por pixel (CPU caro) + `Texture.from(canvas)` (base texture nova por chamada, nunca destruída, sem cache).
- **M6.** `assets/AssetManager.ts:87-137` — sem dedup de promise in-flight: dois `downloadAsset(url)` concorrentes fazem 2 fetches, 2 decodes, 2 `setTexture` (last-writer-wins) → a primeira textura fica órfã. E `Assets.load(dataURI)` (`:114-124`) registra a chave no cache global do Pixi, **nunca `Assets.unload`'d** → outro cache ilimitado paralelo ao `_textures`.
- **M7.** `avatar/AvatarImage.ts:729,733,735` — chave do full-image cache usa `frame % 4`/`% 11` fixo, ignorando o tamanho real da animação → frames distintos colidem na mesma chave (textura errada/glitch).
- **M8.** `RoomPlane.ts:517,566,158` — mistura `destroy(true)` (`:517`) com `TexturePool.releaseTexture` (`:566,158`) no mesmo `_maskTexture` → textura destruída por um caminho é perdida do pool.

### Performance (alocação por frame / GC churn)
- **M9.** `room/RoomSpriteCanvas.ts:836-864` — `createMouseEvent` aloca um `RoomSpriteMouseEvent` por objeto sob o cursor por amostra de ponteiro → arrastar o mouse numa sala cheia gera lixo por frame.
- **M10.** `room/utils/RoomGeometry.ts:139-180` + `room/object/cache/RoomObjectLocationCacheItem.ts:44-58` — `getScreenPosition` aloca vários `Vector3d`/`Point` por chamada, invocado por objeto que se move a cada frame; `updateLocation` faz dupla projeção para tiles fracionários.
- **M11.** `avatar/AvatarVisualization.ts:361` — monta a string `${scale}_${member}_${dd}_${frameNumber}` para **cada body-part sprite a cada frame animado** (recompõe por frame em vez de cachear por (scale, member, direção, frame)).
- **M12.** `avatar/AvatarVisualization.ts:844-848` — `processActionsForAvatar` faz dispose+recria um `RoomObjectSprite` para cada addition a cada update de modelo/escala/efeito (talk/blink/move/gesture). Deveria cachear.
- **M13.** `furniture/FurnitureParticleSystem.ts:171,184,194` + `FurnitureParticleSystemEmitter.ts:118,144,216,237-245` — alocações por-partícula-por-frame (`filters=[]`, `new Point`, `new Vector3d`, `new Particle`) + remoção O(n²) via `splice(indexOf())` no loop + dead-list realocada todo frame. Com centenas de partículas (fogos/beamers) = GC pesado.
- **M14.** `avatar/AvatarImage.ts:242-374` — `getCroppedImageAsync`/`getCroppedBase64Async` são cópias quase idênticas do corpo de `getImage`, alocam+renderizam uma RenderTexture nova **a cada chamada** sem cache (infostands pagam re-render completo toda vez).
- **M15.** `room/object/logic/MovingObjectLogic.ts:75` — aloca `new RoomObjectMoveEvent(...)` a cada tick enquanto o objeto desliza; e deref `this.eventHandler` sem o `?.` usado no resto da base → pode lançar se o objeto atualiza antes do handler ser ligado.
- **M16.** `avatar/actions/AvatarActionManager.ts:41-49` — `getActionDefinition` faz varredura linear do mapa de ações a cada chamada (deveria ser lookup keyed, como `getActionDefinitionWithState` já faz).

### Correção
- **M17.** `furniture/FurnitureVisualization.ts:206-215` — ✔︎ loop de animação `while (animation > 0) { if (animation) updateSprite(...); animation >>= 1; }`: o guard `if (animation)` é verdadeiro enquanto **qualquer** bit restar, então `updateSprite` roda para **todas** as layers `0..bit-mais-alto`, não só as com bit setado. Deveria ser `if (animation & 1)`.
- **M18.** `furniture/FurnitureVisualization.ts:385-397` — cache de cor por layer só é limpo em `resetSpriteData()` (dispose/rotação/zoom). Um recolor puro (mesma direção+escala) atualiza `_selectedColor` mas `getLayerColor` devolve o valor stale → a nova cor só aparece ao girar/dar zoom. (Alpha tem `_alphaChanged` justamente por isso; cor não tem.)
- **M19.** `data/AnimationFrame.ts:55-59` — ✔︎ `get id()` retorna `-this._id * Math.random()` para ids negativos → valor não-determinístico usado no nome do asset → a string muda a cada frame (miss de textura + alocação por frame).
- **M20.** `room/object/visualization/room/RoomVisualization.ts:217` — `updateThickness`: o guard `if (!isNaN(_floorThickness) && !isNaN(_wallThickness) && …)` envolve a **única** atribuição a `_floorThickness/_wallThickness`. Na primeira chamada ambos são `NaN`, a condição é falsa e os valores nunca são armazenados → espessura de piso/parede do modelo é silenciosamente ignorada.
- **M21.** `room/object/RoomObjectModel.ts:17-25` + `furniture/FurnitureLogic.ts:94-100` — `setValue` guarda arrays/objetos por referência; `FurnitureLogic.initialize` escreve `asset.logic.customVars.variables` (array compartilhado do asset) em toda instância daquele tipo → todas as instâncias aliasam um array; mutação in-place contamina todas.
- **M22.** `room/object/logic/RoomLogic.ts:79-91, 173-188` — throttle de floor-hole é código morto: `_lastHoleUpdate` só é atribuído na linha 185, **inalcançável** para ADD/REMOVE (ambos os branches dão `return` antes). O debounce nunca engata → rebuild completo do mapa a cada add/remove de hole.
- **M23.** `room/object/logic/PetLogic.ts:54` — `this._directions.sort()` ordena direções numéricas como strings (`[0,10,2,4,6,8]`). `FurnitureLogic` usa `.sort((a,b)=>a-b)` corretamente. Corrompe seleção de direção mais próxima.
- **M24.** `avatar/AvatarStructure.ts:269` — `removes = removes.concat(partSet.hiddenLayers)` reatribui o parâmetro dentro do loop por figure-part, então hidden layers de um part set vazam para os subsequentes (dependente de ordem) → pode esconder layers que outro part set deveria renderizar.
- **M25.** `room/object/logic/PetLogic.ts:62-68` — `dispose()` não chama `super.dispose()` (diferente de `AvatarLogic`), pulando a limpeza da base. Mascarado hoje por `setObject(null)`, mas frágil.

---

## 🟢 Baixo / Qualidade

- **B1.** `room/RoomSpriteCanvas.ts:570-572` — escala de flip do `ExtendedSprite` poolado não é resetada para `1`; sprite reusado renderiza espelhado por 1+ frames (flicker).
- **B2.** `room/RoomSpriteCanvas.ts:890-926` — `getDisplayAsTexture` devolve RenderTexture não-poolada sem contrato de dispose (qualquer snapshot/minimap que esqueça `.destroy()` vaza a textura de canvas inteiro).
- **B3.** `room/RoomSpriteCanvas.ts:587-605` — pool de `ExtendedSprite` em `_display` nunca encolhe: acima do count ativo só recebem `setTexture(Texture.EMPTY)`; um pico momentâneo de 3000 sprites retém ~3000 display objects vazios pela vida da sala.
- **B4.** `room/RoomSpriteCanvas.ts:258-260` — `render()` alterna `_skipObjectUpdate` antes das guard clauses; chamadas ancilares (`getDisplayAsTexture`, `render(-1,true)`) dessincronizam a cadência de "skip a cada outro frame".
- **B5.** `utils/ExtendedSprite.ts:61-99` — hitmap de alpha em `WeakMap<TextureSource>`; uma TextureSource redesenhada in-place (não roteada por pool release) mantém o hitmap antigo → click/hover errado.
- **B6.** `room/RoomObjectManager.ts:22-24, 58-70` — `createObject` sempre faz `new RoomObject(...)` antes de `addObject` checar id existente; na colisão dá dispose no objeto recém-criado e retorna `undefined` (alocação desperdiçada + falha silenciosa).
- **B7.** `room/object/RoomObject.ts:47-54` — `dispose()` não anula `_model/_location/_direction/_states` nem tem guard de re-entrância; chamadas pós-dispose retornam `undefined`/stale (use-after-dispose silencioso).
- **B8.** `room/object/RoomPlaneParser.ts:38-46` — `dispose()` limpa `_planes/_tileMatrix` mas não `_highlights`/`floorTiles` (retêm `RoomPlaneData`/matrizes do último mapa).
- **B9.** `room/object/logic/RoomLogic.ts:364-382` — canais de cor do fundo não truncados: `color = (r<<16)+(g<<8)+b` com `b` fracionário (float) alimentado em `hslToRGB` → cor levemente off no meio do fade.
- **B10.** `room/object/logic/PetLogic.ts:215` — `FigureGesture` resetado para `null` em vez de `0` (avatar usa `0`) → leitura numérica downstream pode dar `NaN`.
- **B11.** `room/object/logic/TileCursorLogic.ts:24` — dedup `(this._lastEventId && this._lastEventId === sourceEventId)` quebra para id `0` (reprocessa o mesmo update).
- **B12.** `furniture/FurnitureVisualizationData.ts:119` — `_sizes.sort()` lexicográfico enquanto `getSizeIndex()` assume ordem numérica (funciona por acidente com 1/32/64; um tamanho de 3 dígitos ordenaria errado).
- **B13.** `room/object/visualization/RoomObjectSprite.ts:39-43` — `dispose()` reseta só `_texture/_width/_height`; `_filters` (pode reter um `Filter`), `_blendMode`, `_color`, etc. ficam sujos (referência de Filter bloqueia GC).
- **B14.** `room/object/visualization/room/RoomVisualization.ts:71, 849-858` — `_highlightFilter` (recurso de GPU) nunca destruído em `clearHighlightArea`/`dispose`; e `getBoundingRectangle` aloca um `Rectangle` novo a cada chamada apesar do valor cacheado (alocação por frame no culling).
- **B15.** `avatar/AvatarVisualization.ts:258-267` — feature de highlight totalmente comentada (`GlowFilter`): computa `highlightEnabled` e busca uma imagem highlighted separada (`:253`), mas não aplica filtro nenhum → recompõe um segundo image set sem benefício visual.
- **B16.** `furniture/FurnitureDynamicThumbnailVisualization.ts:22-33` — `image.onload` seta textura numa visualização possivelmente já destruída, sem guard `_disposed`, e a `Texture.from(image)` nunca é destruída.
- **B17.** `cache/ImageData.ts:23-25` e `structure/FigureSetData.ts:14-16` — `dispose()` são stubs vazios (trap: se algum dia `ImageData` for dono de uma RenderTexture, os `image.dispose()` existentes vazam silenciosamente).
- **B18.** `room/object/logic/FurnitureEditableRoomLinkLogic.ts:38-42` — o único `setTimeout` da árvore de logic; é limpo em `dispose()/useObject()`, mas o corpo do callback (`this.object.model`) não tem null-check (depende de todo teardown limpar o timer).

---

## ✅ Verificados e considerados corretos (não re-sinalizar)
- `AvatarImageBodyPartCache.disposeActions/disposeInactiveActions` — eviction por TTL (`(now-lastAccess) >= ttl`) está correta; `dispose()` usa `max=Int.MAX` para forçar limpeza.
- `AvatarImageCache.dispose` cascateia action→direction→bodyPartContainer com `destroy({children:true})`; texturas de asset compartilhadas **não** são destruídas (correto).
- `RoomSpriteCanvas.dispose` destruindo `ExtendedSprite` só com `{children:true}` é correto aqui (texturas pertencem às coleções/visualizações; adicionar `texture/textureSource` corromperia sources compartilhadas).
- `TexturePool` adiciona/remove seu callback do ticker corretamente (sem leak de ticker); `_mask`/`_background` usam `Texture.WHITE` compartilhada (corretamente não destruída).
- `Room.getRoomObjectBoundingRectangle` mutar o retângulo retornado é seguro (a visualização retorna um `Rectangle` fresco).
- `RoomObjectCache.dispose` deletando durante iteração de `Map` é seguro; precedência de operadores da interpolação em `MovingObjectLogic` parseia corretamente.

---

## Causa-raiz estrutural e prioridade de correção

O padrão dominante: **o código tem um lifecycle *projetado* (`dispose()`, `addReference/removeReference`, `TexturePool`, caches por TTL) mas os pontos de saída não estão ligados** — nada remove uma coleção do `AssetManager`, `AvatarVisualization.dispose` ignora seus caches, `RoomObjectLogicBase.dispose` ignora `tearDown`, e o `TexturePool` está calibrado para ~10h. O resultado é VRAM/heap subindo continuamente ao longo de uma sessão normal.

**Ordem sugerida de correção:**
1. **C1** — eviction no `AssetManager` (`removeCollection` que faz dispose de texturas + Spritesheet + coleção; refcount/LRU). Maior impacto isolado.
2. **C2** — o `index++`/`continue` no `RoomPlaneParser` (um hole nulo trava o cliente).
3. **C3 + C4 + A9** — `AvatarVisualization.dispose` liberar os caches + remover do cache antes de destruir + `AvatarImage.dispose` chamar `removeDynamicItems`.
4. **C5** — APIs de desregistro nos dois download managers + dedup do `push`.
5. **A1** (`freeNumber`+remover objeto temporário), **A4** (dispose→tearDown), **A11/A12** (limpar `_pendingContentTypes`/`_events`).
6. **A2** (`sort(void …)`) e **M17** (`if (animation & 1)`) — bugs pequenos de alto retorno.
7. **M1** — guard de double-release + recalibrar `_maxIdle` do `TexturePool`.

*Nota:* muitos leaks de GPU aqui compõem com o leak já encontrado no `nitro-react` (o `AvatarImage` da UI nunca chamava `dispose()`), e com o `RoomEngine.getGenericRoomObjectImage` (A1) que alimenta os thumbnails da UI.
