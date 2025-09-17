import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import io from "socket.io-client";
import axios from "axios";
import dayjs from "dayjs";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

export default function Chat() {
  const { user, token } = useAuth();
  const { id } = useParams(); // receiver ID
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState({});
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const userId = user?._id || user?.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Join user socket room once
  useEffect(() => {
    if (!userId) return;
    socket.emit("join", userId);
  }, [userId]);

  // Fetch receiver info and previous messages
  useEffect(() => {
    if (!userId || !id) return;

    const fetchChatData = async () => {
      try {
        // Get receiver info
        const resUser = await axios.get(
          `http://localhost:8000/api/users/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReceiver(resUser.data);

        // Get previous messages
        const resMsgs = await axios.get(
          `http://localhost:8000/api/messages/${userId}/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(resMsgs.data);
        scrollToBottom();
      } catch (err) {
        console.error("Chat fetch error:", err);
      }
    };

    fetchChatData();

    // Handle live incoming messages
    const handleReceiveMessage = (msg) => {
      if (
        (msg.sender._id === id && msg.receiver._id === userId) ||
        (msg.sender._id === userId && msg.receiver._id === id)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [id, userId, token]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !receiver?._id) return;
    setSending(true);

    const msg = {
      sender: userId,
      receiver: receiver._id,
      message: newMessage.trim(),
    };

    try {
      // Emit via socket
      socket.emit("sendMessage", msg);

      // Store in database
      const res = await axios.post(
        "http://localhost:8000/api/messages",
        msg,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI instantly
      setMessages((prev) => [
        ...prev,
        { ...res.data, sender: { _id: userId, name: user.name } },
      ]);
      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <button
          onClick={() => navigate("/users")}
          className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Back
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white mr-3">
            {receiver.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {receiver.name || "Chat"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => {
          const isSender = (m.sender._id || m.sender) === userId;
          return (
            <div
              key={i}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              {!isSender && (
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white mr-2">
                  {m.sender?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-xs break-words ${
                  isSender
                    ? "bg-teal-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-800 text-gray-700 rounded-bl-none"
                }`}
              >
                <p>{m.message}</p>
                <span className="text-xs text-gray-400 block text-right">
                  {dayjs(m.createdAt).format("hh:mm A")}
                </span>
              </div>
              {isSender && <div className="w-8" />}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-4 bg-white dark:bg-gray-800">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={sending}
          className={`ml-2 px-4 rounded-full text-white ${
            sending ? "bg-gray-400" : "bg-teal-600 dark:bg-yellow-400"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
