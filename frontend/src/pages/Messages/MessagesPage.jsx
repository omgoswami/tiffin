// src/pages/Messages/MessagesPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const MessagesPage = () => {
  const messageThreads = [
    { id: 1, name: "Chef Mario", lastMessage: "Your order will be ready at 7 PM.", time: "2 hours ago" },
    { id: 2, name: "Chef Rosa", lastMessage: "Can you pick up at 5 PM?", time: "1 day ago" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="space-y-4">
        {messageThreads.map((thread) => (
          <Link
            to={`/messages/${thread.id}`}
            key={thread.id}
            className="block bg-white shadow rounded-lg p-4 hover:bg-gray-100"
          >
            <h3 className="font-bold text-lg">{thread.name}</h3>
            <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
            <p className="text-xs text-gray-400">{thread.time}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
