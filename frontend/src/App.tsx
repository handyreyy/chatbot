import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendMessage } from "./api/message";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";
import type { ChatMessage } from "./types/message";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      const botMsg: ChatMessage = { role: "bot", text: data.response };
      setMessages((prev) => [...prev, botMsg]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Maaf, terjadi kesalahan." },
      ]);
    },
  });

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    mutation.mutate({ text });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Chatbot Internal</h1>
      <ChatWindow messages={messages} />
      {mutation.isPending && (
        <p className="mt-2 text-sm text-gray-400">Bot is typing...</p>
      )}
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
