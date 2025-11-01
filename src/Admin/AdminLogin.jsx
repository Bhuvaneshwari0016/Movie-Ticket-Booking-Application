import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/admin/signin", {
        username,
        password,
      });

      // No isAdmin check here
      auth.login(res.data.token, res.data.user);
      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.response?.data.message || "Login failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>
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
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
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
    color: "#007bff",
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
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
};

export default AdminLogin;
