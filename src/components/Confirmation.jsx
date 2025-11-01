import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Confirmation = () => {
  const { state } = useLocation();
  const auth = useContext(AuthContext);
  const token = auth?.token;

  const [allBookings, setAllBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllBookings(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch bookings", err.response?.data || err.message);
      setError("Could not load bookings. Please check login or try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
  const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
  if (!confirmCancel) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh bookings after delete
      setAllBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel booking", err.response?.data || err.message);
      alert("Could not cancel booking. Please try again.");
    }
  };

  useEffect(() => {
    if (!state && token) {
      fetchBookings();
    }
  }, [state, token]);

  if (state) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Booking Confirmed!</h1>
       
        <Link to="/">Back to Movies</Link> | <Link to="/Confirmation">My Bookings</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && allBookings.length === 0 && <p>No bookings yet.</p>}
      {!loading && !error && allBookings.map((booking) => (
        <div
          key={booking._id}
          style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
        >
          <p><strong>Booking ID:</strong> {booking._id}</p>
          <p><strong>Movie:</strong> {booking.movie}</p>
           <p><strong>Show Time:</strong> {booking.showTime}</p>
          <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Amount:</strong> ₹{booking.amount}</p>
          <button onClick={() => cancelBooking(booking._id)} style={{ color: "white", background: "red", padding: "6px 10px", border: "none", cursor: "pointer", borderRadius: "4px" }}>
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
};

export default Confirmation;

