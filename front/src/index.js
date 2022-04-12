import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/AuthProvider';

// import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
