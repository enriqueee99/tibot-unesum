import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import ChatbotBuble from "./components/chatbot/ChatbotBuble";
import ChatbotWindow from "./components/chatbot/ChatbotWindow";

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <main id="main-content">
        <Home />
      </main>
      <ChatbotWindow />
      <ChatbotBuble />
    </div>
  );
}

export default App;
