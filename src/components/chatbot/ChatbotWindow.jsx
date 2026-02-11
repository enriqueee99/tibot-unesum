import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import faqs from "../data/faqs.json";

const ChatbotWindow = () => {
  const { isOpen, toggleChat, isOnline, messages, setMessages } = useChat();
  const [input, setInput] = useState("");

  // 1. Lógica de Respuesta (Separada para facilitar la lectura de tu tesis)
  const processResponse = async (query, currentMessages) => {
    // 1. Lógica Offline (Resiliencia)
    if (!isOnline) {
      setTimeout(() => {
        const found = faqs.find((f) =>
          query.includes(f.pregunta.toLowerCase()),
        );
        const botReply = found
          ? found.respuesta
          : "Sin conexión. No tengo información local para eso. Intenta con 'malla' o 'becas'.";
        setMessages([...currentMessages, { text: botReply, sender: "bot" }]);
      }, 600);
      return;
    }

    // 2. Lógica Online (IA con Groq vía Netlify)
    try {
      // Llamamos a la función serverless de Netlify que creaste
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      const botReply = data.reply;

      setMessages([...currentMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error en Chatbot:", error);
      setMessages([
        ...currentMessages,
        {
          text: "Lo siento, tuve un problema al conectar con mi cerebro de IA. ¿Deseas intentar de nuevo?",
          sender: "bot",
        },
      ]);
    }
  };

  // 2. Manejador del Formulario (Ahora el input y el botón ya funcionan)
  const handleSend = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages); // Guardamos en el Contexto (y LocalStorage automáticamente)
    processResponse(input.toLowerCase(), newMessages);
    setInput(""); // Limpia el campo de texto
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`fixed z-50 bg-white shadow-2xl border flex flex-col transition-all duration-300
      ${window.innerWidth < 768 ? "inset-0 w-full h-full" : "bottom-24 right-6 w-96 h-[550px] rounded-2xl overflow-hidden"}`}
    >
      {/* HEADER SEMÁNTICO */}
      <header className="bg-[#003366] p-4 text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-sm">TI-Bot UNESUM</h2>
          <p className="text-[10px] opacity-80">
            {isOnline ? "● Modo Inteligente" : "○ Modo Local (Sin Conexión)"}
          </p>
        </div>
        <button
          onClick={toggleChat}
          className="p-1 hover:bg-white/10 rounded"
          aria-label="Cerrar chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      {/* ÁREA DE MENSAJES */}
      <section className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((msg, index) => (
          <article
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg text-sm max-w-[85%] ${
                msg.sender === "user"
                  ? "bg-[#003366] text-white rounded-br-none"
                  : "bg-white border text-slate-700 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </article>
        ))}
      </section>

      {/* FORMULARIO DE ENTRADA (Refactorizado para accesibilidad) */}
      <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Escribe tu consulta
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe una pregunta..."
          className="flex-1 border p-2 rounded-lg text-sm outline-none focus:border-[#003366]"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-[#003366] text-white px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50 transition-colors"
        >
          Enviar
        </button>
      </form>
    </aside>
  );
};

export default ChatbotWindow;
