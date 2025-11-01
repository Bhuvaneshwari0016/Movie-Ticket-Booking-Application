import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", { username, password });
      alert("Signup successful! Please sign in.");
      navigate("/signin");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
      <p style={styles.signinText}>
        Already have an account?{" "}
        <Link to="/signin" style={styles.signinLink}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px 25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    marginBottom: "25px",
    color: "#f84464",
    fontSize: "28px",
    fontWeight: "700",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1.5px solid #ddd",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#f84464",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  signinText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  signinLink: {
    color: "#f84464",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default SignUp;

