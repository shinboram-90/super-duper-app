import './App.css';
import { EuiProvider } from '@elastic/eui';
import createCache from '@emotion/cache';
// import { StrictMode } from 'react';
// import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const cache = createCache({
  key: 'myapp',
  container: document.querySelector('meta[name="global-style-insert"]'),
});

export default function App() {
  return (
    <EuiProvider colorMode="dark" cache={cache}>
      <div className="App">
        <header className="App-header">
          <h1>Hello</h1>
        </header>
      </div>
    </EuiProvider>
  );
}
