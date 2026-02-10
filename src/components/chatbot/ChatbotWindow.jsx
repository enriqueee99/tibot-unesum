import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import faqs from "../data/faqs.json";

const ChatbotWindow = () => {
  const { isOpen, toggleChat, isOnline, messages, setMessages } = useChat();
  const [input, setInput] = useState("");

  // 1. Lógica de Respuesta (Separada para facilitar la lectura de tu tesis)
  const processResponse = (query, currentMessages) => {
    setTimeout(() => {
      let botReply = "";

      if (!isOnline) {
        // MODO OFFLINE: Búsqueda de coincidencia en el JSON local
        const found = faqs.find((f) =>
          query.includes(f.pregunta.toLowerCase()),
        );
        botReply = found
          ? found.respuesta
          : "Lo siento, no tengo esa información registrada localmente. Intenta con palabras clave como 'malla' o 'requisitos'.";
      } else {
        // MODO ONLINE: Respuesta provisional hasta conectar la API de Groq
        botReply =
          "Recibido. Estoy procesando tu consulta con inteligencia artificial a través de Groq.";
      }

      setMessages([...currentMessages, { text: botReply, sender: "bot" }]);
    }, 600);
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
