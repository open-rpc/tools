import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReusableProvider } from 'reusable';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ReusableProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ReusableProvider>
);
