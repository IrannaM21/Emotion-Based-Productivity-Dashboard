import React, { createContext, useState } from 'react';

export const EmotionContext = createContext();

export const EmotionContextProvider = ({ children }) => {
  const [emotion, setEmotion] = useState('neutral');

  return (
    <EmotionContext.Provider value={{ emotion, setEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
};
