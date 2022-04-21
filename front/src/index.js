import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux';
import store from './store';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
