// src/context/EmotionContext.js
import React, { createContext, useState } from 'react';

export const EmotionContext = createContext();

const EmotionProvider = ({ children }) => {
  const [emotion, setEmotion] = useState("neutral");

  return (
    <EmotionContext.Provider value={{ emotion, setEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
};

export default EmotionProvider;
