import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EmotionContextProvider } from './context/EmotionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmotionContextProvider>
    <App />
  </EmotionContextProvider>
);
