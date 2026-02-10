export default function ChatbotWindow({ onClose }) {
  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">
      <header className="p-3 bg-blue-600 text-white flex justify-between">
        <span>Asistente Académico</span>
        <button onClick={onClose}>✕</button>
      </header>

      <div className="flex-1 p-3 overflow-y-auto text-sm">
        <p className="text-gray-500">Hola 👋 ¿En qué puedo ayudarte?</p>
      </div>

      <footer className="p-2 border-t">
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Escribe tu consulta..."
        />
      </footer>
    </div>
  );
}
