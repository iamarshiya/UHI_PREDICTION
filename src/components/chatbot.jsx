import React, { useState } from "react";
import "./chatbot.css";

const predefinedQuestions = [
  "What is the current risk level of my locality?",
  "Why is my area classified as high/medium/low risk?",
  "Which are the top 10 most livable localities?",
  "Which are the top 10 high-risk (non-livable) localities?",
  "How is the risk score calculated?",
  "What factors are increasing heat stress in my area?",
  "How will the risk change in the next 5 years?",
  "Is my locality improving or worsening over time?",
  "What mitigation strategies can reduce risk in my area?",
  "How accurate and reliable is your prediction model?"
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setLoading(true);

    setMessages((prev) => [...prev, { sender: "user", text }]);

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.response },
    ]);

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2>UHI Assistant</h2>

      <div className="quick-questions">
        {predefinedQuestions.map((q, index) => (
          <button
            key={index}
            onClick={() => sendMessage(q)}
            className="quick-btn"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="bot-msg">Typing...</div>}
      </div>
    </div>
  );
}

export default Chatbot;