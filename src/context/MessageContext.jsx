// src/context/MessagesContext.js
import React, { createContext, useState } from "react";

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    // initial messages if any
  ]);

  // Function to add a new message
  const addMessage = (newMsg) => {
    setMessages((prevMessages) => [newMsg, ...prevMessages]);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};
