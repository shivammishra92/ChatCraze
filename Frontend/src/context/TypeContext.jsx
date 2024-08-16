import React, { createContext, useState, useContext } from "react";

// Create Typing Context
const TypingContext = createContext();

export const useTypingContext = () => useContext(TypingContext);

export const TypingProvider = ({ children }) => {
  const [typing, setTyping] = useState(false);

  return (
    <TypingContext.Provider value={{ typing, setTyping }}>
      {children}
    </TypingContext.Provider>
  );
};
