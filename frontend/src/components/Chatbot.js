import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat

    setInput(""); // Clear input field

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-4",
          messages: [{ role: "user", content: input }],
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
          }
        }
      );

      const botMessage = { text: response.data.choices[0].message.content, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]); // Add bot response to chat
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [...prev, { text: "Error: Unable to fetch response", sender: "bot" }]);
    }
  };

  return (
    <div>
      {/* Floating Chatbot Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "15px",  // Increased padding for larger button
          borderRadius: "50%",
          fontSize: "24px", // Adjusted font size for the icon
          cursor: "pointer",
          zIndex: 1001,
          minWidth: "50px", // Ensure the button maintains a minimum size
          minHeight: "50px", // Ensure the button maintains a minimum size
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        💬
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "100px",  // Adjusted to move the popup upwards
          right: "20px",
          width: "350px",
          height: "450px",
          background: "white",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
        }}>
          {/* Chatbot Header */}
          <div style={{
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            AI Assistant
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}>
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: "15px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#dcf8c6" : "#f1f1f1",
                  padding: "10px 15px",
                  borderRadius: "20px",
                  margin: "5px 0",
                  maxWidth: "70%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            display: "flex",
            padding: "15px",
            borderTop: "1px solid #ddd",
            background: "#f9f9f9",
            alignItems: "center",
          }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontSize: "14px",
                marginRight: "10px",
              }}
              placeholder="Type your message..."
            />
            <button 
              onClick={sendMessage}
              style={{
                padding: "10px 15px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
