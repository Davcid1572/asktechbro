import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import MessageBubble from "@/components/MessageBubble";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-4xl mb-4">👨🏿‍💻</div>
          <h2 className="text-xl font-semibold text-white mb-2">AskTechBro</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Your African tech mentor. Ask me anything about code, careers, or
            tech. I keep it real.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 mb-4">
          <div className="shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">TB</span>
          </div>
          <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-none">
            <div className="flex gap-1 items-center h-4">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
