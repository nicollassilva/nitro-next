
import type { IMessageDataWrapper, IncomingPacketConstructor, IOutgoingPacket } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetTickerTime } from '@nitrodevco/nitro-renderer';
import { AuthenticationOKMessage, BinaryReader, BinaryWriter, Byte, ClientHelloComposer, EvaWireDataWrapper, GetIncomingPackets, GetOutgoingPackets, Short, SSOTicketComposer } from '@nitrodevco/nitro-shared';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useCommunicationIncoming, useCommunicationOutgoing } from '#base/hooks/communication';
import { useConfigurationStore } from '#base/stores';

import { WebSocketContext } from './WebSocketContext';

type ProviderProps = {
    children: ReactNode;
}

type ConnectionPhase = 'idle' | 'connecting' | 'authenticating' | 'awaitingHandlers' | 'ready' | 'closed';

export const WebSocketContextProvider = ({ children }: ProviderProps) => {
    const phase = useRef<ConnectionPhase>('idle');
    const [renderedPhase, setRenderedPhase] = useState<ConnectionPhase>('idle');
    const { incomingByHeader, incomingCtors, incomingHeaderByCtor, registerManyIncoming } = useCommunicationIncoming();
    const { outgoingHeaderByComposerName, registerManyOutgoing } = useCommunicationOutgoing();
    //const socketUrl = useConfigurationStore(x => x.config['socket.url'] as string) ?? undefined;
    const production = useConfigurationStore(x => x.config['production.version'] as string) ?? undefined;
    const ws = useRef<WebSocket | undefined>(undefined);
    // Incoming bytes are kept as a list of chunks instead of one contiguous buffer, so appending a
    // frame is O(1) and a packet fragmented across many frames is only materialized once it is
    // complete (avoids re-copying a growing buffer on every frame).
    const wsChunks = useRef<Uint8Array[]>([]);
    const wsLength = useRef<number>(0);
    const listeners = useRef<Map<IncomingPacketConstructor<object>, Array<(data: object) => void>>>(new Map());
    const pendingClientMessages = useRef<IOutgoingPacket<object>[]>([]);
    const pendingServerMessages = useRef<IMessageDataWrapper[]>([]);
    const hasConnected = useRef<boolean>(false);

    const connect = () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const socketUrl = params.get('socketUrl') ?? '';

            if (!socketUrl || !socketUrl.length || ws.current) return;
            if (hasConnected.current) return;

            hasConnected.current = true;

            const socket = new WebSocket(socketUrl);

            ws.current = socket;

            socket.binaryType = 'arraybuffer';

            setPhase('connecting');

            socket.onopen = () => {
                setPhase('authenticating');

                send(new ClientHelloComposer({
                    production: production,
                    platform: 'WEB',
                    clientPlatform: 0,
                    deviceCategory: 0
                }));

                const params = new URLSearchParams(window.location.search);
                const sso = params.get('sso');

                if (sso && sso.length) send(new SSOTicketComposer({
                    ssoTicket: sso,
                    elapsedMilliseconds: GetTickerTime()
                }));
            };

            socket.onerror = (event: Event) => {
                NitroLogger.error('WebSocket error:', event);
            };

            socket.onclose = (event: CloseEvent) => {
                NitroLogger.warn('WebSocket closed:', event.code, event.reason);

                if (ws.current !== socket) return;

                ws.current = undefined;
                wsChunks.current = [];
                wsLength.current = 0;

                pendingClientMessages.current = [];
                pendingServerMessages.current = [];

                setPhase('closed');
            };

            socket.onmessage = (event: MessageEvent<ArrayBuffer>) => {
                if (!event.data.byteLength) return;

                wsChunks.current.push(new Uint8Array(event.data));
                wsLength.current += event.data.byteLength;

                processBuffer();
            };
        } catch (err) {
            NitroLogger.error(err);
        }
    }

    const processBuffer = () => {
        try {
            if (wsLength.current === 0) return;

            dispatchWrappers(decodeWrappers());
        } catch (err) {
            NitroLogger.error(err);
        }
    }

    const encode = (header: number, messages: (number | string | boolean | Byte | Short | ArrayBuffer)[]) => {
        const writer = new BinaryWriter();

        writer.writeShort(header);

        for (const value of messages) {
            let type: string = typeof value;

            if (type === 'object') {
                if (value === null) type = 'null';
                else if (value instanceof Byte) type = 'byte';
                else if (value instanceof Short) type = 'short';
                else if (value instanceof ArrayBuffer) type = 'arraybuffer';
            }

            switch (type) {
                case 'undefined':
                case 'null':
                    writer.writeShort(0);
                    break;
                case 'byte':
                    writer.writeByte((value as Byte).value);
                    break;
                case 'short':
                    writer.writeShort((value as Short).value);
                    break;
                case 'number':
                    writer.writeInt(value as number);
                    break;
                case 'boolean':
                    writer.writeByte(value ? 1 : 0);
                    break;
                case 'string':
                    if (!value) writer.writeShort(0);
                    else {
                        writer.writeString(value as string, true);
                    }
                    break;
                case 'arraybuffer':
                    writer.writeBytes(value as ArrayBuffer);
                    break;
            }
        }

        const buffer = writer.getBuffer();

        return new BinaryWriter().writeInt(buffer.byteLength).writeBytes(buffer);
    }

    // Read the big-endian int32 length prefix from the front of the chunk list without consuming it.
    // Caller guarantees wsLength.current >= 4. Handles a prefix split across chunk boundaries.
    const peekPacketLength = () => {
        const b: number[] = [];

        for (let ci = 0; b.length < 4 && ci < wsChunks.current.length; ci++) {
            const chunk = wsChunks.current[ci];

            for (let oi = 0; b.length < 4 && oi < chunk.byteLength; oi++) b.push(chunk[oi]);
        }

        return (b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3];
    }

    // Remove the first `count` bytes from the chunk list and return them as one contiguous array
    // (a single O(count) copy). Caller guarantees wsLength.current >= count.
    const takeFront = (count: number): Uint8Array => {
        const out = new Uint8Array(count);

        let filled = 0;

        while (filled < count) {
            const chunk = wsChunks.current[0];
            const need = count - filled;

            if (chunk.byteLength <= need) {
                out.set(chunk, filled);
                filled += chunk.byteLength;
                wsChunks.current.shift();
            } else {
                out.set(chunk.subarray(0, need), filled);
                wsChunks.current[0] = chunk.subarray(need);
                filled += need;
            }
        }

        wsLength.current -= count;

        return out;
    }

    const decodeWrappers = () => {
        const wrappers: IMessageDataWrapper[] = [];

        while (wsLength.current >= 4) {
            const length = peekPacketLength();

            if (length < 2) {
                NitroLogger.error(`WebSocket: Malformed packet length: ${length}`);
                wsChunks.current = [];
                wsLength.current = 0;
                ws.current?.close();
                break;
            }

            // Incomplete packet: wait for more frames without materializing the growing buffer.
            if (wsLength.current < 4 + length) break;

            try {
                const bytes = takeFront(4 + length);
                const reader = new BinaryReader(bytes.buffer as ArrayBuffer);

                reader.readInt();

                const extracted = reader.readBytes(length);

                wrappers.push(new EvaWireDataWrapper(extracted.readShort(), extracted));
            } catch (err) {
                // A throw here (after a completeness check) means the stream is desynced/corrupt.
                // Continuing would re-parse bad bytes forever — drop everything and close instead.
                NitroLogger.error('WebSocket: corrupt packet stream, dropping buffer and closing socket', err);
                wsChunks.current = [];
                wsLength.current = 0;
                ws.current?.close();
                break;
            }
        }

        return wrappers;
    }

    const processWrapper = (wrapper: IMessageDataWrapper) => {
        try {
            const ctor = incomingByHeader.current.get(wrapper.header);

            if (!ctor) return;

            const handlers = listeners.current.get(ctor);

            if (!handlers?.length) return;

            const parsed = new ctor().parse(wrapper);

            for (const handle of handlers) handle(parsed);
        } catch (err) {
            NitroLogger.error(err);
        }
    }

    const dispatchWrappers = (wrappers: IMessageDataWrapper[]) => {
        for (let index = 0; index < wrappers.length; index++) {
            if (phase.current === 'awaitingHandlers') {
                pendingServerMessages.current.push(...wrappers.slice(index));

                return;
            }

            processWrapper(wrappers[index]);
        }
    }

    const send = <T extends object,>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        if (phase.current === 'awaitingHandlers') {
            pendingClientMessages.current.push(...packets);

            return;
        }

        sendRaw(...packets);
    }

    const sendRaw = <T extends object,>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            // Dropping is silent otherwise; surface it so a lost composer during a non-OPEN
            // window (connecting/closed) is at least diagnosable.
            NitroLogger.warn(`WebSocket not open (state ${ws.current?.readyState ?? 'none'}); dropping ${packets.length} outgoing packet(s):`, packets.map(p => p.constructor.name).join(', '));

            return;
        }

        for (const outgoing of packets) {
            try {
                const name = outgoing.constructor.name;
                const header = outgoingHeaderByComposerName.current.get(name);

                if (header == null) {
                    NitroLogger.packets('UnknownOutgoing', name);

                    continue;
                }

                const message = outgoing.compose();
                const encoded = encode(header, message);

                if (!encoded) continue;

                NitroLogger.packets('OutgoingComposer', header, name, message);

                ws.current.send(encoded.getBuffer());
            } catch (e) {
                NitroLogger.error(e);
            }
        }
    }

    const setPhase = (next: ConnectionPhase) => {
        phase.current = next;

        setRenderedPhase(next);
    }

    const subscribe = <T extends object>(
        event: IncomingPacketConstructor<T>,
        handler: (data: T) => void
    ) => {
        if (!incomingCtors.current.has(event)) {
            const header = incomingHeaderByCtor.current.get(event);

            NitroLogger.error(
                'CommunicationStore',
                `Invalid listener: packet ${event?.name ?? '(unknown)'} is not registered.` +
                (header != null ? ` (header: ${header})` : ''),
            );

            return () => { };
        }

        const existing = listeners.current.get(event) ?? [];

        listeners.current.set(event, [...existing, handler]);

        return () => {
            const existing = listeners.current.get(event) ?? [];
            const next = existing.filter(x => x !== handler);

            if (next.length) listeners.current.set(event, next);
            else listeners.current.delete(event);
        };
    };

    const setReady = () => {
        if (phase.current !== 'awaitingHandlers') return;

        const pendingClient = pendingClientMessages.current;
        const pendingServer = pendingServerMessages.current;

        pendingServerMessages.current = [];
        pendingClientMessages.current = [];

        setPhase('ready');

        dispatchWrappers(pendingServer);
        sendRaw(...pendingClient);
    }

    useEffect(() => {
        registerManyIncoming(GetIncomingPackets());
        registerManyOutgoing(GetOutgoingPackets());

        return subscribe(AuthenticationOKMessage, () => setPhase('awaitingHandlers'));
    }, []);

    useEffect(() => () => {
        const socket = ws.current;

        ws.current = undefined;

        socket?.close(1000, 'Client shutting down');
    }, []);

    const isAuthenticated = renderedPhase === 'awaitingHandlers' || renderedPhase === 'ready';
    const isDisconnected = renderedPhase === 'closed';

    return (
        <WebSocketContext.Provider value={{ isAuthenticated, isDisconnected, connect, send, subscribe, setReady }}>
            {children}
        </WebSocketContext.Provider>
    );
};