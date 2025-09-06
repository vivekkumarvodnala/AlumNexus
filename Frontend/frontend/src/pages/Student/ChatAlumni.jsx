// src/pages/Student/ChatAlumni.jsx
import React, { useState } from "react";
import { Send, Search } from "lucide-react";

export default function ChatAlumni() {
  // Dummy chat list
  const alumniList = [
    { id: 1, name: "Ravi Kumar", lastMessage: "Sure, let’s connect!", online: true },
    { id: 2, name: "Anjali Sharma", lastMessage: "I’ll share my notes.", online: false },
    { id: 3, name: "Pranav Reddy", lastMessage: "Congrats on your exam!", online: true },
  ];

  // Dummy messages
  const messagesData = {
    1: [
      { from: "alumni", text: "Hey! How can I help you?", time: "10:30 AM" },
      { from: "student", text: "I wanted to ask about Google interviews.", time: "10:32 AM" },
      { from: "alumni", text: "Sure, let’s connect!", time: "10:35 AM" },
    ],
    2: [
      { from: "alumni", text: "Hi! What’s up?", time: "9:20 AM" },
      { from: "student", text: "Could you share Azure prep materials?", time: "9:25 AM" },
      { from: "alumni", text: "I’ll share my notes.", time: "9:28 AM" },
    ],
  };

  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState(messagesData[1]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const updatedMessages = [
      ...messages,
      { from: "student", text: newMessage, time: "Now" },
    ];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-accent flex">
      {/* Left Sidebar */}
      <aside className="w-1/4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
        {/* Search */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alumni..."
              className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm bg-white dark:bg-gray-800 text-accent dark:text-gray-200"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {alumniList.map((alumnus) => (
            <div
              key={alumnus.id}
              onClick={() => {
                setActiveChat(alumnus.id);
                setMessages(messagesData[alumnus.id] || []);
              }}
              className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                activeChat === alumnus.id ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={`https://i.pravatar.cc/150?img=${alumnus.id + 40}`}
                  className="w-10 h-10 rounded-full"
                  alt={alumnus.name}
                />
                {alumnus.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-accent dark:text-gray-100">
                  {alumnus.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {alumnus.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-900">
          <img
            src={`https://i.pravatar.cc/150?img=${activeChat + 40}`}
            className="w-10 h-10 rounded-full"
            alt="Active Alumni"
          />
          <div>
            <h2 className="text-sm font-semibold text-accent dark:text-gray-100">
              {alumniList.find((a) => a.id === activeChat)?.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {alumniList.find((a) => a.id === activeChat)?.online
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.from === "student" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow ${
                  msg.from === "student"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white dark:bg-gray-900 text-accent dark:text-gray-200 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] opacity-70 block mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-900">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm text-accent dark:text-gray-200"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-primary text-white rounded-full hover:bg-teal-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
