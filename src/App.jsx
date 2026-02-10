import "./App.css";
import Home from "./pages/Home";
import ChatbotBuble from "./components/chatbot/ChatbotBuble";
import ChatbotWindow from "./components/chatbot/ChatbotWindow";

function App() {
  return (
    <main className="min-h-screen bg-white">
      <Home />
      <ChatbotWindow />
      <ChatbotBuble />
    </main>
  );
}

export default App;
