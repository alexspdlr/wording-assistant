import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SocketContextComponent from './socket/SocketContextComponent';
import { BrowserRouter, useLocation } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketContextComponent>
        <App />
        <ScrollToTop />
      </SocketContextComponent>
    </BrowserRouter>
  </React.StrictMode>
);
