import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-2">
          <span className="text-white text-xs font-bold">TB</span>
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-green-500 text-white rounded-tr-none"
            : "bg-gray-800 text-gray-100 rounded-tl-none"
        }`}
      >
        {message.content}
      </div>

      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2">
          <span className="text-white text-xs font-bold">You</span>
        </div>
      )}
    </div>
  );
}
