import { useState } from "react";
import Conversations from "./Conversations";
import Header from "./Header";
import InputChat from "./InputChat";
import NavigationTab from "./NavigationTab";
import SideBarChat from "./SideBarChat";
import WellCome from "./WellCome";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  content: string;
  isFavorite: boolean;
  timestamp: Date;
}

function MainChat() {
  const [activeTab, setActiveTab] = useState<"All" | "Favorites" | "Scheduled">(
    "All"
  );
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Building a Full Stack AI Agent for Entrepreneurs",
      preview: "Received your request to build a full...",
      content: `AI Agent Platform - Complete Solution

Core Features Built:
✅ AI Agent Management
Create and configure intelligent AI agents with custom personalities
Support for multiple AI models (OpenAI GPT, Anthropic Claude)
Real-time agent testing and execution
Performance monitoring and analytics

✅ Visual Workflow Builder
Drag-and-drop workflow creation interface
Multiple node types, triggers, AI processing, conditions, actions
Webhook integration for external system connectivity
Automated workflow execution and monitoring

✅ Analytics Dashboard
Real-time performance metrics and KPIs
Agent execution statistics and success rates
Cost tracking and optimization insights
Activity feeds and system monitoring

✅ Visual Workflow Builder
Drag-and-drop workflow creation interface
Multiple node types, triggers, AI processing, conditions, actions
Webhook integration for external system connectivity
Automated workflow execution and monitoring`,
      isFavorite: false,
      timestamp: new Date(),
    },
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `${i + 2}`,
      title: "Building a Full Stack AI Agent for...",
      preview: "Received your request to build a full...",
      content: "Sample conversation content...",
      isFavorite: false,
      timestamp: new Date(),
    })),
  ]);

  const tokenCount =
    inputValue.length > 0 ? Math.min(Math.ceil(inputValue.length / 10), 10) : 0;

  const toggleFavorite = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, isFavorite: !conv.isFavorite }
          : conv
      )
    );
  };

  const shareConversation = (conversationId: string) => {
    // Implement share functionality
    console.log("Sharing conversation:", conversationId);
    // In a real app, this would generate a shareable link or open a share dialog
  };

  const createNewTask = () => {
    setSelectedConversation(null);
    setInputValue("");
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title:
          inputValue.length > 50
            ? inputValue.substring(0, 50) + "..."
            : inputValue,
        preview: "Processing your request...",
        content: "Your request is being processed...",
        isFavorite: false,
        timestamp: new Date(),
      };

      setConversations((prev) => [newConversation, ...prev]);
      setSelectedConversation(newConversation.id);
      setInputValue("");
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    if (activeTab === "Favorites") return conv.isFavorite;
    if (activeTab === "Scheduled") return false; // No scheduled conversations in this example
    return true;
  });

  const hasConversations = conversations.length > 0;

  return (
    <div className="grid grid-cols-5 gap-2">
      {/* left side  */}
      <div className=" border-red-500 w-full h-full">
        <Header createNewTask={createNewTask} />
        {/* Navigation Tabs */}
        <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
        {hasConversations && (
          /* Sidebar - Conversation List */
          <SideBarChat
            filteredConversations={filteredConversations}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        )}
      </div>
      <div className=" border-green-500 w-full h-full col-span-4 p-4 bg-[#f5f5f5]">
        {!hasConversations || !selectedConversation ? (
          /* Empty State */
          <WellCome />
        ) : (
          /* Conversation View */
          <Conversations
            conversations={conversations}
            selectedConversation={selectedConversation}
            shareConversation={shareConversation}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* Input Area */}
        <InputChat
          hasConversations={hasConversations}
          inputValue={inputValue}
          selectedConversation={selectedConversation}
          sendMessage={sendMessage}
          setInputValue={setInputValue}
          tokenCount={tokenCount}
        />
      </div>
    </div>
  );
}

export default MainChat;
