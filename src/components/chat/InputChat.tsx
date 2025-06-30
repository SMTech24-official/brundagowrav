// import { LuSend } from "react-icons/lu";

// const InputChat = ({
//   setInputValue,
//   inputValue,
//   hasConversations,
//   selectedConversation,
//   tokenCount,
//   sendMessage,
// }: {
//   setInputValue: React.Dispatch<React.SetStateAction<string>>;
//   inputValue: string;
//   hasConversations: boolean;
//   selectedConversation: string | null;
//   tokenCount: number;
//   sendMessage: () => void;
// }) => {
//   return (
//     <div className="  p-4 rounded-md bg-white">
//       <div className="max-w-3xl mx-auto">
//         <div className="relative">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             placeholder={
//               hasConversations && selectedConversation
//                 ? "Building a Full Stack AI Agent for Entrepreneurs"
//                 : "Building a Full Stack AI Agent for Entrepreneurs"
//             }
//             className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
//             <span className="text-xs  bg-primary/40 text-primary px-2 py-1 rounded">
//               {tokenCount}/10
//             </span>
//             <button
//               onClick={sendMessage}
//               disabled={!inputValue.trim() || tokenCount >= 10}
//               className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <LuSend size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InputChat;

// import { LuSend } from "react-icons/lu";
// import React from "react";

// interface InputChatProps {
//   setInputValue: React.Dispatch<React.SetStateAction<string>>;
//   inputValue: string;
//   hasConversations: boolean;
//   selectedConversation: string | null;
//   tokenCount: number;
//   sendMessage: () => void;
// }

// const InputChat = ({
//   setInputValue,
//   inputValue,
//   hasConversations,
//   selectedConversation,
//   tokenCount,
//   sendMessage,
// }: InputChatProps) => {
//   return (
//     <div className="p-4 rounded-md bg-white">
//       <div className="max-w-3xl mx-auto">
//         <div className="relative">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder={
//               hasConversations && selectedConversation
//                 ? "Continue your conversation..."
//                 : "Start a new conversation..."
//             }
//             className="w-full pl-4 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
//             <span className="text-xs bg-primary/40 text-primary px-2 py-1 rounded">
//               {tokenCount}/10
//             </span>
//             <button
//               onClick={sendMessage}
//               disabled={!inputValue.trim() || tokenCount >= 10}
//               className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <LuSend size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InputChat;

import { LuSend, LuUpload } from "react-icons/lu";
import React, { useRef } from "react";

interface InputChatProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  hasConversations: boolean;
  selectedConversation: string | null;
  tokenCount: number;
  sendMessage: () => void;
  ws: React.MutableRefObject<WebSocket | null>;
}

const InputChat = ({
  setInputValue,
  inputValue,
  hasConversations,
  selectedConversation,
  tokenCount,
  sendMessage,
  ws,
}: InputChatProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLimitReached = tokenCount >= 10;

  const handleFileUpload = (file: File) => {
    if (!ws.current) {
      console.warn("WebSocket is not connected");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      ws.current?.send(
        JSON.stringify({
          type: "fileUpload",
          file: base64,
          fileName: file.name,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = ""; // Reset input
  };

  return (
    <div className="p-4 rounded-md bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-center">
          {/* File Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 mr-2 text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Upload file"
          >
            <LuUpload size={20} />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.png"
            className="hidden"
            onChange={onFileChange}
          />

          {/* Text Input */}
          <input
            type="text"
            value={inputValue}
            disabled={isLimitReached}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isLimitReached && sendMessage()
            }
            placeholder={
              isLimitReached
                ? "Monthly usage complete"
                : hasConversations && selectedConversation
                ? "Continue your conversation..."
                : "Start a new conversation..."
            }
            className={`flex-grow pl-3 pr-20 py-3 border rounded-lg focus:outline-none transition-all ${
              isLimitReached
                ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }`}
          />

          {/* Token count & Send button */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <span
              className={`text-xs px-2 py-1 rounded ${
                isLimitReached
                  ? "bg-red-100 text-red-500"
                  : "bg-primary/40 text-primary"
              }`}
            >
              {tokenCount}/10
            </span>
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLimitReached}
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
