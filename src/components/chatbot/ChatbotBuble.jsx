import { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";

export default function ChatbotBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatbotWindow onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg"
      >
        💬
      </button>
    </>
  );
}
