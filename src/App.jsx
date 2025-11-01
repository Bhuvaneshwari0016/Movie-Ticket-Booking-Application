import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Booking from "./components/Booking";
import Confirmation from "./components/Confirmation";
import Bookings from "./components/Bookings";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import { AuthContext } from "./AuthContext";
import ManageMovies from "./Admin/ManageMovies";
import CustomerMovies from "./components/CustomerMovies";
import ManageShows from "./Admin/ManageShows";
import Contact from "./Pages/Contact";
import ViewMessages from "./Admin/ViewMessages";

function App() {
  const [bookings, setBookings] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { isAuthenticated, logout } = useContext(AuthContext);
  const [location, setLocation] = useState(localStorage.getItem("location") || "");

  const addBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  return (
    <Router>
      {/* Top Navbar - Enhanced Design */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 40px",
          borderBottom: "none",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>
          <span style={{ color: "black" }}>book</span>
          <span style={{ color: "red" }}>my</span>
          <span style={{ color: "black" }}>show</span>
        </div>

        {/* Right side - buttons and links */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <select
            value={location}
            onChange={(e) => {
              const selected = e.target.value;
              setLocation(selected);
              localStorage.setItem("location", selected);
            }}
            style={{
              padding: "8px 15px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              backgroundColor: "#f5f5f5",
            }}
          >
            <option value="">Select a location</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>

          {isAuthenticated ? (
            <button
              onClick={logout}
              style={{
                backgroundColor: "#444",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 18px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#222")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#444")}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    backgroundColor: "#f84464",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 18px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#e82e4e")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#f84464")}
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    backgroundColor: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 18px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#222")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#444")}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 18px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Contact
            </button>
          </Link>

          {!isAuthenticated && (
            <div style={{ fontSize: "20px", cursor: "pointer" }}>
              <Link
                to="/admin-login"
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#666",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#000")}
                onMouseLeave={(e) => (e.target.style.color = "#666")}
              >
                ☰ Admin
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Secondary Nav - Enhanced Design */}
      <div
        style={{
          padding: "10px 40px",
          borderBottom: "1px solid #eee",
          backgroundColor: "#f8f8f8",
          display: "flex",
          gap: 30,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: "bold",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#f84464")}
          onMouseLeave={(e) => (e.target.style.color = "#333")}
        >
          Movies
        </Link>
        <Link
          to="/Confirmation"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: "bold",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#f84464")}
          onMouseLeave={(e) => (e.target.style.color = "#333")}
        >
          My Bookings
        </Link>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<MovieList searchText={searchText} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/booking/:id" element={<Booking addBooking={addBooking} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/bookings" element={<Bookings bookings={bookings} />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-movies" element={<ManageMovies />} />
        <Route path="/admin/manage-shows" element={<ManageShows />} />
        <Route path="/movies" element={<CustomerMovies />} />
        <Route path="/admin/messages" element={<ViewMessages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;