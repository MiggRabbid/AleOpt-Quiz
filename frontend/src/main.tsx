import React from 'react';
import ReactDOM from 'react-dom/client';

import initApp from './app/init';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{initApp()}</React.StrictMode>,
);
