import React, { useContext, useState } from "react";
import { MessagesContext } from "../context/MessageContext";
import { useNavigate } from "react-router-dom"; 
const ViewMessages = () => {
  const { messages, addMessage } = useContext(MessagesContext);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    addMessage(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ← Back to Dashboard
        </button></div>
      <h2 style={{ marginBottom: 20, color: "#2c3e50" }}>Send a Message</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: 15,
            padding: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: 15,
            padding: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          style={{
            width: "100%",
            marginBottom: 15,
            padding: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
            resize: "vertical",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send Message
        </button>
      </form>

      <h2 style={{ marginBottom: 20, color: "#2c3e50" }}>User Messages</h2>

      {messages.length === 0 ? (
        <p style={{ color: "#888" }}>No messages available.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 15,
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <p>
                <strong>Name:</strong> {msg.name}
              </p>
              <p>
                <strong>Email:</strong> {msg.email}
              </p>
              <p>
                <strong>Message:</strong>
                <br />
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMessages;
