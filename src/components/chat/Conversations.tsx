/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuShare2, LuStar } from "react-icons/lu";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  content: string;
  isFavorite: boolean;
  timestamp: Date;
}

const Conversations = ({
  conversations,
  shareConversation,
  toggleFavorite,
  selectedConversation,
}: {
  conversations: Conversation[];
  shareConversation: (conversationId: string) => void;
  toggleFavorite: (conversationId: string) => void;
  selectedConversation: string;
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Conversation Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {conversations.find((c) => c.id === selectedConversation)?.title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => shareConversation(selectedConversation)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Share conversation"
          >
            <LuShare2 size={16} />
          </button>
          <button
            onClick={() => toggleFavorite(selectedConversation)}
            className={`p-2 transition-colors ${
              conversations.find((c) => c.id === selectedConversation)
                ?.isFavorite
                ? "text-yellow-500 hover:text-yellow-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Add to favorites"
          >
            <LuStar
              size={16}
              className={
                conversations.find((c) => c.id === selectedConversation)
                  ?.isFavorite
                  ? "fill-current"
                  : ""
              }
            />
          </button>
        </div>
      </div>

      {/* Conversation Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl">
          <div className="prose prose-gray max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
              {
                conversations.find((c: any) => c.id === selectedConversation)
                  ?.content
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
