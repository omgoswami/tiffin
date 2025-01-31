// src/pages/Messages/MessageThreadPage.jsx
import React, { useState } from "react";

const MessageThreadPage = () => {
  const [messages, setMessages] = useState([
    { sender: "Chef Mario", content: "Hi! Your order is confirmed.", time: "10:00 AM" },
    { sender: "You", content: "Great, see you then!", time: "10:05 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", content: newMessage, time: "Now" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Chat with Chef Mario</h1>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${msg.sender === "You" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}
          >
            <p className="font-bold">{msg.sender}</p>
            <p>{msg.content}</p>
            <p className="text-xs text-gray-500">{msg.time}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow border rounded px-4 py-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageThreadPage;
