import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SocketContextComponent from './socket/SocketContextComponent';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketContextComponent>
        <App />
      </SocketContextComponent>
    </BrowserRouter>
  </React.StrictMode>
);
