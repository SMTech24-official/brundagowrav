// import { useEffect, useRef, useState } from "react";
// import Conversations from "./Conversations";
// import Header from "./Header";
// import InputChat from "./InputChat";
// import NavigationTab from "./NavigationTab";
// import SideBarChat from "./SideBarChat";
// import WellCome from "./WellCome";
// import { useAppSelector } from "../../redux/hooks";
// import {
//   selectCurrentToken,
//   selectCurrentUser,
// } from "../../redux/features/auth/userCredentialSlice";
// import { toast } from "sonner";

// interface Conversation {
//   id: string;
//   title: string;
//   preview: string;
//   content: string;
//   isFavorite: boolean;
//   timestamp: Date;
// }

// const WS_URL = "ws://172.252.13.71:5002";

// function MainChat() {
//   const ws = useRef<WebSocket | null>(null);
//   const latestConversationId = useRef<string | null>(null);
//   const [connected, setConnected] = useState(false);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"All" | "Favorites" | "Scheduled">(
//     "All"
//   );
//   const [selectedConversation, setSelectedConversation] = useState<
//     string | null
//   >(null);
//   const [inputValue, setInputValue] = useState("");
//   const [conversations, setConversations] = useState<Conversation[]>([]);

//   const tokenCount =
//     inputValue.length > 0 ? Math.min(Math.ceil(inputValue.length / 10), 10) : 0;

//   // Get user and token from Redux store
//   const user = useAppSelector(selectCurrentUser);
//   const rawToken = useAppSelector(selectCurrentToken);
//   // Revert to original token cleaning logic to handle potential quotes
//   const token =
//     typeof rawToken === "string" ? rawToken.replace(/^"|"$/g, "") : null;

//   // Use user email for storage key, fallback to token or anonymous
//   const storageKey = user?.email
//     ? `conversations_${user.email}`
//     : token
//     ? `conversations_${token}`
//     : "conversations_anonymous";

//   // 🔍 Log info
//   console.log("📦 rawToken:", rawToken);
//   console.log("✅ token:", token);
//   console.log("👤 user:", user);
//   console.log("🔑 storageKey:", storageKey);

//   // 🧠 Load conversations on user or token change
//   useEffect(() => {
//     if (!token) {
//       setConversations([]);
//       localStorage.removeItem(storageKey);
//       return;
//     }

//     const raw = localStorage.getItem(storageKey);
//     console.log("📥 localStorage.getItem:", raw);

//     if (raw) {
//       try {
//         const parsed: Conversation[] = JSON.parse(raw);
//         setConversations(
//           parsed.map((c) => ({
//             ...c,
//             timestamp: new Date(c.timestamp),
//             isFavorite: c.isFavorite ?? false, // Ensure isFavorite is defined
//           }))
//         );
//       } catch (error) {
//         console.error("❌ Failed to parse localStorage conversations:", error);
//         setConversations([]);
//         localStorage.removeItem(storageKey); // Clear invalid data
//         toast.error("Failed to load conversations", {
//           description: "Cleared invalid data. Please try again.",
//         });
//       }
//     }
//   }, [storageKey, token]);

//   // 💾 Save to localStorage on updates
//   useEffect(() => {
//     if (token && conversations.length > 0) {
//       console.log("📤 Saving conversations to localStorage:", conversations);
//       try {
//         localStorage.setItem(storageKey, JSON.stringify(conversations));
//       } catch (error) {
//         console.error(
//           "❌ Failed to save conversations to localStorage:",
//           error
//         );
//         toast.error("Failed to save conversations", {
//           description: "Please try again.",
//         });
//       }
//     }
//   }, [conversations, storageKey, token]);

//   // 🔌 Setup WebSocket connection
//   useEffect(() => {
//     if (!token) {
//       toast.error("Authentication required", {
//         description: "Please log in to start chatting.",
//       });
//       return;
//     }

//     const socket = new WebSocket(WS_URL);
//     ws.current = socket;

//     socket.onopen = () => {
//       console.log("✅ WebSocket connected");
//       setConnected(true);
//       socket.send(JSON.stringify({ type: "authenticate", token }));
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("📬 WebSocket message:", data);

//         if (data.type === "sessionCreated") {
//           setSessionId(data.sessionId);
//           console.log("🔗 Session ID:", data.sessionId);
//           toast.success("Connected to chat server");
//         } else if (data.type === "message") {
//           setConversations((prev) =>
//             prev.map((conv) =>
//               conv.id === latestConversationId.current
//                 ? {
//                     ...conv,
//                     preview: data.response?.substring(0, 50) || "No response",
//                     content:
//                       conv.content +
//                       `\n\nAI: ${data.response || "No response"}`,
//                   }
//                 : conv
//             )
//           );
//         } else if (data.type === "error") {
//           console.error("❌ WebSocket error:", data.message);
//           toast.error("Chat error", {
//             description: data.message || "Failed to process message.",
//           });
//         }
//       } catch (error) {
//         console.error("❌ Failed to parse WebSocket message:", error);
//         toast.error("Chat error", {
//           description: "Invalid message from server.",
//         });
//       }
//     };

//     socket.onclose = () => {
//       console.warn("🔌 WebSocket closed");
//       setConnected(false);
//       toast.warn("Chat disconnected", {
//         description: "Connection to server lost.",
//       });
//     };

//     socket.onerror = (error) => {
//       console.error("❌ WebSocket error:", error);
//       toast.error("Chat connection failed", {
//         description: "Unable to connect to server.",
//       });
//     };

//     return () => {
//       socket.close();
//       console.log("🧹 WebSocket cleanup");
//     };
//   }, [token]);

//   const createNewTask = () => {
//     setSelectedConversation(null);
//     setInputValue("");
//   };

//   const toggleFavorite = (conversationId: string) => {
//     setConversations((prev) =>
//       prev.map((conv) =>
//         conv.id === conversationId
//           ? { ...conv, isFavorite: !conv.isFavorite }
//           : conv
//       )
//     );
//   };

//   const shareConversation = (conversationId: string) => {
//     console.log("📤 Sharing conversation:", conversationId);
//     toast.info("Share feature not implemented yet");
//   };

//   const sendMessage = () => {
//     if (!ws.current || !connected || !inputValue.trim() || !token) {
//       if (!connected) {
//         toast.error("Cannot send message", {
//           description: "Chat server is not connected.",
//         });
//       }
//       if (!token) {
//         toast.error("Authentication required", {
//           description: "Please log in to send messages.",
//         });
//       }
//       return;
//     }

//     let conversationId = selectedConversation;

//     if (!conversationId) {
//       const newConv: Conversation = {
//         id: Date.now().toString(),
//         title:
//           inputValue.length > 50 ? inputValue.slice(0, 50) + "..." : inputValue,
//         preview: "Processing your request...",
//         content: `You: ${inputValue}`,
//         isFavorite: false,
//         timestamp: new Date(),
//       };

//       setConversations((prev) => {
//         const updated = [newConv, ...prev];
//         console.log("📥 Inline save new conversation:", updated);
//         try {
//           localStorage.setItem(storageKey, JSON.stringify(updated));
//         } catch (error) {
//           console.error("❌ Failed to save new conversation:", error);
//           toast.error("Failed to save conversation", {
//             description: "Please try again.",
//           });
//         }
//         return updated;
//       });

//       conversationId = newConv.id;
//       setSelectedConversation(conversationId);
//     } else {
//       setConversations((prev) =>
//         prev.map((conv) =>
//           conv.id === conversationId
//             ? { ...conv, content: conv.content + `\n\nYou: ${inputValue}` }
//             : conv
//         )
//       );
//     }

//     latestConversationId.current = conversationId;

//     ws.current.send(
//       JSON.stringify({ type: "message", business_idea: inputValue })
//     );
//     setInputValue("");
//   };

//   const filteredConversations = conversations.filter((conv) =>
//     activeTab === "Favorites"
//       ? conv.isFavorite
//       : activeTab === "Scheduled"
//       ? false // Implement scheduled logic if needed
//       : true
//   );

//   const hasConversations = conversations.length > 0;

//   return (
//     <div className="grid grid-cols-5 gap-2">
//       <div className="w-full h-full">
//         <Header createNewTask={createNewTask} />
//         <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
//         {hasConversations && (
//           <SideBarChat
//             filteredConversations={filteredConversations}
//             selectedConversation={selectedConversation}
//             setSelectedConversation={setSelectedConversation}
//           />
//         )}
//       </div>

//       <div className="col-span-4 p-4 bg-[#f5f5f5]">
//         {!hasConversations || !selectedConversation ? (
//           <WellCome />
//         ) : (
//           <Conversations
//             conversations={conversations}
//             selectedConversation={selectedConversation}
//             shareConversation={shareConversation}
//             toggleFavorite={toggleFavorite}
//           />
//         )}

//         <InputChat
//           hasConversations={hasConversations}
//           inputValue={inputValue}
//           selectedConversation={selectedConversation}
//           sendMessage={sendMessage}
//           setInputValue={setInputValue}
//           tokenCount={tokenCount}
//         />
//       </div>
//     </div>
//   );
// }

// export default MainChat;
