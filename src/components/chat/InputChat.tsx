import { LuSend } from "react-icons/lu";

const InputChat = ({
  setInputValue,
  inputValue,
  hasConversations,
  selectedConversation,
  tokenCount,
  sendMessage,
}: {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  hasConversations: boolean;
  selectedConversation: string | null;
  tokenCount: number;
  sendMessage: () => void;
}) => {
  return (
    <div className="  p-4 rounded-md bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              hasConversations && selectedConversation
                ? "Building a Full Stack AI Agent for Entrepreneurs"
                : "Building a Full Stack AI Agent for Entrepreneurs"
            }
            className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <span className="text-xs  bg-primary/40 text-primary px-2 py-1 rounded">
              {tokenCount}/10
            </span>
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || tokenCount >= 10}
              className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LuSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputChat;
