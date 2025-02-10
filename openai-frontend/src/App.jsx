import React, { useState } from "react";
import "../src/Style/style.css";

const assistantImage = "/don.png";
const defaultUserImage = "/person.jpg";
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userImage, setUserImage] = useState(defaultUserImage);
   
// Function to share the current conversation
const sharePrompt = () => {
  if (!messages.length) return alert("No messages to share!");

  const encodedMessages = encodeURIComponent(JSON.stringify(messages));
  const shareableLink = `${window.location.origin}/chat?data=${encodedMessages}`;

  navigator.clipboard.writeText(shareableLink)
    .then(() => alert("Link copied to clipboard!"))
    .catch(() => alert("Failed to copy link."));
};

// Function to delete the chat history
const deletePrompt = () => {
  if (window.confirm("Are you sure you want to delete this chat?")) {
    setMessages([]);
    setInput("");
  }
};

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input, image: userImage }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.response, image: assistantImage }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setUserImage(newImageURL);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="actions">
          <button className="action-button" onClick={sharePrompt}>🔗 Share link to Prompt</button>
          <button className="action-button" onClick={deletePrompt}>🗑️ Delete Prompt</button>
        </div>
        <h1 className="title">Untitled Prompt</h1>
      </header>

      <main className="main-content">
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.role}`}>
            <div className={`message-bubble ${msg.role}`}>
              <img src={msg.image} alt="profile" className="profile-pic" />
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </main>

      <footer className="footer">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="image-upload" />
        <input
          className="footer-input"
          type="text"
          placeholder="How can I help you?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>➤</button>
      </footer>
    </div>
  );
};

export default ChatApp;
