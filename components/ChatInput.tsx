import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="border-t border-gray-700 bg-gray-900 px-4 py-4">
      <div className="flex items-end gap-3 bg-gray-800 rounded-2xl px-4 py-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask TechBro anything..."
          disabled={isLoading}
          rows={1}
          className="flex-1 bg-transparent text-white placeholder-gray-500 
                     resize-none outline-none text-sm leading-6 
                     max-h-40 overflow-y-auto disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="shrink-0 w-8 h-8 rounded-full bg-green-500 
                     flex items-center justify-center
                     hover:bg-green-400 active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-white"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>

      <p className="text-center text-gray-600 text-xs mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
