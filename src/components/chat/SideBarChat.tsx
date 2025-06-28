import { LuMessageCircle, LuStar } from "react-icons/lu";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  content: string;
  isFavorite: boolean;
  timestamp: Date;
}

const SideBarChat = ({
  filteredConversations,
  setSelectedConversation,
  selectedConversation,
}: {
  filteredConversations: Conversation[];
  setSelectedConversation: React.Dispatch<React.SetStateAction<string | null>>;
  selectedConversation: string | null;
}) => {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedConversation === conversation.id
                ? "bg-blue-50 border-blue-200"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <LuMessageCircle size={16} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {conversation.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {conversation.preview}
                </p>
              </div>
              {conversation.isFavorite && (
                <LuStar size={12} className="text-yellow-500 fill-current" />
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBarChat;
