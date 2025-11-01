import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti"; 

const Bookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSeats = location.state?.selectedSeats || [];
  const selectedMovie = location.state?.selectedMovie || "Unknown Movie";
  const selectedShowTime = location.state?.selectedShowtime || "7:00 PM";

  const [form, setForm] = useState({
    name: "",
    email: "",
    showTime: selectedShowTime,
    ticketType: "m-ticket",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [donate, setDonate] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [mobileNumber, setMobileNumber] = useState("");
  const [timer, setTimer] = useState(300);
  const [showConfetti, setShowConfetti] = useState(false);

  const ticketPrice = 150;
  const convenienceFee = 35.4;
  const donation = donate ? 2 : 0;
  const subtotal = ticketPrice * selectedSeats.length;
  const total = subtotal + convenienceFee + donation;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to make a booking.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedSeats.length > 0 && bookingId === null) {
      setBookingId(Math.floor(100000 + Math.random() * 900000));
    }
  }, [selectedSeats, bookingId]);

  useEffect(() => {
    if (paymentMethod === "qr") {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(countdown);
            alert("Payment time has expired. Please try again.");
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setTimer(300);
    }
  }, [paymentMethod]);

  
  useEffect(() => {
    if (bookingConfirmed) {
      setShowConfetti(true);
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); 
      return () => clearTimeout(confettiTimer);
    }
  }, [bookingConfirmed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = () => {
    if (!form.name || !form.email) {
      alert("Please fill in all fields.");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      if (paymentMethod === "upi" && !mobileNumber) {
        alert("Enter UPI Mobile Number");
        return;
      }
      if (
        paymentMethod === "card" &&
        (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)
      ) {
        alert("Enter all card details");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          movie: selectedMovie,
          showTime: form.showTime,
          seats: selectedSeats,
          name: form.name,
          email: form.email,
          amount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setBookingConfirmed(true);
        setShowPayment(false);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Error occurred while booking.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (selectedSeats.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>No seats selected. Please go back to the movie page to book.</h2>
      </div>
    );
  }


  const inputStyle = {
    padding: "12px",
    width: "100%",
    marginBottom: "15px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "15px",
    background: "#f5586d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  const paymentOptionStyle = {
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  };

  const bookingConfirmedCardStyle = {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: 600,
    margin: "40px auto",
  };

  const buttonPrimary = {
    padding: "12px 25px",
    backgroundColor: "#f5586d",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  };

  if (showPayment) {
    return (
      <div style={{ padding: 30, maxWidth: 800, margin: "0 auto", fontFamily: "sans-serif", backgroundColor: "#f7f7f7", borderRadius: "16px" }}>
        <h2 style={{ marginBottom: 30, textAlign: "center", color: "#333" }}>💳 Choose Your Payment Method</h2>
        <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
          <div style={{ flex: 1, paddingRight: 20 }}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "18px" }}>
                  <input type="radio" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} style={{ transform: "scale(1.2)" }} />
                  <span style={{ fontWeight: paymentMethod === "upi" ? "bold" : "normal" }}>Pay by UPI</span>
                </label>
              </li>
              <li style={{ marginBottom: "15px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "18px" }}>
                  <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} style={{ transform: "scale(1.2)" }} />
                  <span style={{ fontWeight: paymentMethod === "card" ? "bold" : "normal" }}>Debit/Credit Card</span>
                </label>
              </li>
              <li style={{ marginBottom: "15px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "18px" }}>
                  <input type="radio" checked={paymentMethod === "qr"} onChange={() => setPaymentMethod("qr")} style={{ transform: "scale(1.2)" }} />
                  <span style={{ fontWeight: paymentMethod === "qr" ? "bold" : "normal" }}>Scan QR Code</span>
                </label>
              </li>
            </ul>
          </div>
          <div style={{ flex: 2, padding: "0 10px" }}>
            {paymentMethod === "upi" && (
              <div style={paymentOptionStyle}>
                <h4 style={{ marginTop: 0, marginBottom: "20px" }}>Google Pay / PhonePe / Paytm</h4>
                <input type="text" placeholder="Enter mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} style={inputStyle} />
                <button onClick={handlePaymentSuccess} style={buttonStyle}>
                  Verify & Pay ₹{total.toFixed(2)}
                </button>
              </div>
            )}
            {paymentMethod === "card" && (
              <div style={paymentOptionStyle}>
                <h4 style={{ marginTop: 0, marginBottom: "20px" }}>Enter Card Details</h4>
                <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} style={inputStyle} />
                <div style={{ display: "flex", gap: "15px" }}>
                  <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                  <input type="password" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                </div>
                <input type="text" placeholder="Card Holder Name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} style={inputStyle} />
                <button onClick={handlePaymentSuccess} style={buttonStyle}>
                  Pay Now ₹{total.toFixed(2)}
                </button>
              </div>
            )}
            {paymentMethod === "qr" && (
              <div style={{ ...paymentOptionStyle, textAlign: "center" }}>
                <h4 style={{ marginTop: 0, marginBottom: "20px" }}>Scan to Pay</h4>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=MovieBooking"
                  alt="QR Code"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    marginBottom: 20,
                    border: "5px solid #fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  }}
                />
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f5586d", marginBottom: "15px" }}>
                  {formatTime(timer)}
                </div>
                <button onClick={handlePaymentSuccess} style={buttonStyle} disabled={timer === 0}>
                  I Have Paid ₹{total.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} 
          numberOfPieces={500}
        />
      )}
      {!bookingConfirmed ? (
        <>
          <div style={{ padding: 20, maxWidth: 600, margin: "0 auto", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            
            <h1 style={{ textAlign: "center", color: "#f5586d", borderBottom: "2px solid #f5586d", paddingBottom: 10, marginBottom: 25 }}>🎬 Your Booking Details</h1>
            
            {/* User Input Section */}
            <div style={{ marginBottom: 30, padding: 15, border: "1px solid #e0e0e0", borderRadius: 8 }}>
              <h3 style={{ marginTop: 0, color: "#333", marginBottom: 15 }}>Personal Information</h3>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: 5 }}>Name:</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: 5 }}>Email:</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 0 }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: 5 }}>Show Time:</label>
                <select name="showTime" value={form.showTime} onChange={handleChange} style={inputStyle}>
                  <option value={selectedShowTime}>
                    {selectedShowTime} ({selectedMovie})
                  </option>
                </select>
              </div>
            </div>
            
            {/* Booking & Price Summary Card */}
            <div style={{ border: "2px solid #f5586d", padding: 20, borderRadius: 12, marginBottom: 25, backgroundColor: "#FFF8F9" }}>
              <h3 style={{ borderBottom: "1px solid #f5586d", color: "#f5586d", paddingBottom: 10, marginBottom: 15 }}>Ticket & Price Breakdown</h3>
              
              {/* Seats Info */}
              <div style={{ marginBottom: 15, padding: "10px 0", borderBottom: "1px dashed #e0e0e0" }}>
                <p style={{ margin: 0 }}>
                  <strong>Seats:</strong> {selectedSeats.join(", ")} ({selectedSeats.length} Tickets)
                </p>
              </div>

              {/* Price Breakdown */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span>Ticket Price (x{selectedSeats.length})</span>
                <strong>Rs. {subtotal.toFixed(2)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
                <span>Convenience Fees</span>
                <span>Rs. {convenienceFee.toFixed(2)}</span>
              </div>
              
              {/* Donation Checkbox */}
              <div style={{ borderTop: "1px solid #f5586d", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                  <input type="checkbox" checked={donate} onChange={(e) => setDonate(e.target.checked)} style={{ transform: "scale(1.2)", marginRight: 8, accentColor: "#f5586d" }} /> Donate Rs. 2 to BookAChange
                </label>
                <span style={{ fontWeight: "bold" }}>Rs. {donation.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Ticket Type Selection */}
            <div style={{ marginBottom: 20, padding: 15, border: "1px solid #e0e0e0", borderRadius: 8 }}>
              <label style={{ display: "block", marginBottom: 10, fontWeight: "bold" }}>Select Ticket Type:</label>
              <label style={{ marginRight: 20, display: "inline-flex", alignItems: "center" }}>
                <input type="radio" name="ticketType" value="m-ticket" checked={form.ticketType === "m-ticket"} onChange={handleChange} style={{ marginRight: 5, accentColor: "#f5586d" }} /> M-Ticket       </label>
              <label style={{ display: "inline-flex", alignItems: "center" }}>
                <input type="radio" name="ticketType" value="box-office" checked={form.ticketType === "box-office"} onChange={handleChange} style={{ marginRight: 5, accentColor: "#f5586d" }} /> Box Office Pickup
              </label>
            </div>
            
            {/* Final Proceed Button */}
            <button
              onClick={handleProceedToPayment}
              style={{
                padding: "15px 20px",
                backgroundColor: "#f5586d",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: "900",
                fontSize: "18px",
                width: "100%",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(245, 88, 109, 0.4)",
              }}
            >
              TOTAL AMOUNT: Rs. {total.toFixed(2)} — PROCEED TO PAY
            </button>
          </div>
        </>
      ) : (
        <div style={bookingConfirmedCardStyle}>
          <h2 style={{ color: "#f5586d", fontSize: "2.5rem", marginBottom: "10px" }}>🎉 Booking Confirmed!</h2>
          <p style={{ color: "#888", marginBottom: "30px" }}>Enjoy your movie! Your booking details are below.</p>
          <div style={{ textAlign: "left", lineHeight: "1.8" }}>
            <p>
              <strong>Booking ID:</strong> {bookingId}
            </p>
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Movie:</strong> {selectedMovie}
            </p>
            <p>
              <strong>Show Time:</strong> {form.showTime}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Ticket Type:</strong> {form.ticketType === "m-ticket" ? "M-Ticket" : "Box Office Pickup"}
            </p>
            <p>
              <strong>Amount Paid:</strong> Rs. {total.toFixed(2)}
            </p>
          </div>
          <button onClick={() => navigate("/")} style={buttonPrimary}>
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookings;