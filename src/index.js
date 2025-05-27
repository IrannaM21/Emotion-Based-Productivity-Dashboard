// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import EmotionProvider from './context/EmotionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmotionProvider>
    <App />
  </EmotionProvider>
);
