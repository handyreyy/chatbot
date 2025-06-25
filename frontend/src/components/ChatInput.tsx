import React, { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Tulis pertanyaanmu..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Kirim
      </button>
    </div>
  );
};

export default ChatInput;
