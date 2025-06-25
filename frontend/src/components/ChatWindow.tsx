import React, { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/message";

type Props = {
  messages: ChatMessage[];
};

const ChatWindow: React.FC<Props> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 overflow-y-auto bg-gray-100 rounded h-96">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
        >
          <span
            className={`inline-block px-3 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-900"
            }`}
          >
            {msg.text}
          </span>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
