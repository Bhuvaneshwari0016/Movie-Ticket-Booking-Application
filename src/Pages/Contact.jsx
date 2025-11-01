import React, { useState, useContext } from "react";
import { MessagesContext } from "../context/MessageContext";


const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { addMessage } = useContext(MessagesContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    addMessage(formData); // add message to context
    alert("Message sent! We'll be in touch soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={enhancedStyles.pageContainer}>
      <div style={enhancedStyles.formCard}>
        <h2 style={enhancedStyles.heading}>Get In Touch 📧</h2>
        <p style={enhancedStyles.subheading}>We're here to help! Send us a message and we'll respond within 24 hours.</p>

        <form onSubmit={handleSubmit} style={enhancedStyles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Full Name"
            onChange={handleChange}
            required
            style={enhancedStyles.input}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email Address"
            onChange={handleChange}
            required
            style={enhancedStyles.input}
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Share Your Feedback or issues?"
            rows={6}
            onChange={handleChange}
            required
            style={enhancedStyles.textarea}
          />
          <button
            type="submit"
            style={enhancedStyles.submitButton}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Enhanced Styles ---
const ACCENT_COLOR = "#007bff"; // Primary blue
const LIGHT_GREY = "#e9ecef";

const enhancedStyles = {
  pageContainer: {
    padding: "60px 20px",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa", // Light background for contrast
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  formCard: {
    width: "100%",
    maxWidth: "650px",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Clean, soft shadow
    border: "1px solid #dee2e6",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#343a40",
    marginBottom: "8px",
    textAlign: "center",
  },
  subheading: {
    fontSize: "16px",
    color: "#6c757d",
    marginBottom: "30px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Increased spacing between fields
  },
  input: {
    padding: "14px 15px",
    fontSize: "16px",
    border: `1px solid ${LIGHT_GREY}`,
    borderRadius: "8px", // Smoother corners
    backgroundColor: "#fcfcfc",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
  },
  textarea: {
    padding: "14px 15px",
    fontSize: "16px",
    border: `1px solid ${LIGHT_GREY}`,
    borderRadius: "8px",
    backgroundColor: "#fcfcfc",
    resize: "vertical",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
  },
  submitButton: {
    padding: "14px 20px",
    backgroundColor: ACCENT_COLOR,
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.1s ease",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
  },
};

export default Contact;