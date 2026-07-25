import './index.css';

import.meta.glob('./views/**/*.css', { eager: true });

import { createRoot } from 'react-dom/client';

import { UserContextProvider, WebSocketContextProvider } from './context';
import { Nitro } from './Nitro';

const element = document.getElementById('root');

if (element)
    createRoot(element).render(
        <WebSocketContextProvider>
            <UserContextProvider>
                <Nitro />
            </UserContextProvider>
        </WebSocketContextProvider>,
    );
