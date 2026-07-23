import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './app';
import './styles/globals.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('#root が見つかりません');
}

/**
 * prerender 済みの HTML は「クローラー向けの下書き」なので hydrate せず、
 * createRoot でそのまま描き直す。localStorage 由来の差分を気にせずに済む。
 */
container.replaceChildren();

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
