import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token and user
    navigate("/admin/login"); // Redirect to login
  };

  return (
    <div style={enhancedStyles.container}>
      <header style={enhancedStyles.header}>
        {/*
          MODIFICATION: Changed title to match the requested branding
        */}
        <h1 style={enhancedStyles.heading}>
          Welcome to <span style={enhancedStyles.brandAccent}>BookMyShow</span>
        </h1>
        {/*
          MODIFICATION: Removed the subtitle text (e.g., "Welcome back to Book.My.Show")
        */}
      </header>

      <main style={enhancedStyles.mainContent}>
        {/* Changed 'CardGrid' back to 'buttonGroup' style for a flatter layout */}
        <div style={enhancedStyles.buttonGroup}>
          {/* Dashboard Action Buttons */}
          <button
            style={enhancedStyles.button}
            onClick={() => navigate("/admin/manage-movies")}
          >
            🎬 Manage Movies
          </button>
          <button
            style={enhancedStyles.button}
            onClick={() => navigate("/admin/manage-shows")}
          >
            🎟️ Manage Shows
          </button>
          <button
            style={enhancedStyles.button}
            onClick={() => navigate("/admin/messages")}
          >
            ✉️ View Messages
          </button>
        </div>
      </main>
      
      <div style={enhancedStyles.logoutContainer}>
        <button onClick={handleLogout} style={enhancedStyles.logoutButton}>
          <span style={{ marginRight: "8px" }}>🔒</span> Logout
        </button>
      </div>
    </div>
  );
};

// --- Enhanced Styles (Inspired by the BSM aesthetic) ---
const PRIMARY_COLOR = "#E51937"; // BookMyShow's signature Red
const LIGHT_BLUE = "#e0f7fa";
const LIGHT_PINK = "#fce4ec";
const LIGHT_PURPLE = "#ede7f6";

const enhancedStyles = {
  container: {
    maxWidth: "750px", // A bit wider than the original
    margin: "80px auto",
    padding: "40px",
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "1px solid #f0f0f0",
  },
  header: {
    marginBottom: "40px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#333333",
    marginBottom: "8px",
  },
  brandAccent: {
    color: PRIMARY_COLOR,
    fontWeight: "900", // Extra bold for the brand name
  },
  mainContent: {
    padding: "20px 0",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  button: {
    // Style as a light, rounded card/button
    backgroundColor: LIGHT_BLUE, // Default light blue/cyan for a fresh look
    color: "#1f2937",
    border: "1px solid #b3e5fc",
    padding: "20px 25px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    minWidth: "180px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
  },
  logoutContainer: {
      marginTop: "30px",
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
    color: "#fff",
    border: "none",
    padding: "12px 35px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
};

// **Note on Button Colors:**
// I set a default color (LIGHT_BLUE) for all buttons for simplicity, 
// but you can easily customize them to match the different colors 
// in the image (e.g., pink for 'Manage Shows', purple for 'View Messages') 
// by checking the original code's styling approach.

export default AdminDashboard;