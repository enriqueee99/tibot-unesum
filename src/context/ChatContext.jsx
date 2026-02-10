import React, { createContext, useState, useEffect, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_history");
    return saved
      ? JSON.parse(saved)
      : [
          {
            text: "Hola, bienvenido a TI-Bot UNESUM. ¿En qué puedo ayudarte?",
            sender: "bot",
          },
        ];
  });

  // Detectar cambios de red para el modo Offline
  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);
    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, []);

  // Persistencia en LocalStorage
  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <ChatContext.Provider
      value={{ isOpen, toggleChat, isOnline, messages, setMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
