import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Users() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get all users
        const res = await axios.get("http://localhost:8000/api/users/allUsers");

        // Filter: students see alumni, alumni see students, exclude self
        const filtered = res.data.filter(
          (u) => u._id !== user._id && u.role !== user.role
        );
        setUsers(filtered);

        // Fetch last message with each user
        const lastMsgs = {};
        await Promise.all(
          filtered.map(async (u) => {
            const msgRes = await axios.get(
              `http://localhost:8000/api/messages/${user.id}/${u._id}`
            );
            if (msgRes.data.length) {
              lastMsgs[u._id] = msgRes.data[msgRes.data.length - 1];
            }
          })
        );
        setLastMessages(lastMsgs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-600 dark:text-yellow-400 mb-4">
        Chats
      </h1>
      <div className="flex flex-col gap-4">
        {users.map((u) => {
          const lastMsg = lastMessages[u._id];
          return (
            <div
              key={u._id}
              onClick={() => navigate(`/chat/${user.id}`)}
              className="cursor-pointer flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg"
            >
              {/* Avatar */}
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mr-4">
                {u.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    {u.name} ({u.role})
                  </p>
                  {lastMsg && (
                    <span className="text-xs text-gray-400">
                      {dayjs(lastMsg.createdAt).format("hh:mm A")}
                    </span>
                  )}
                </div>
                {lastMsg && (
                  <p className="text-gray-500 dark:text-gray-400 truncate max-w-xs">
                    {lastMsg.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
