import React, { useState } from "react";

const PaymentPage = ({ bookingData, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [mobileNumber, setMobileNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handlePay = () => {
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
    // Simulate payment success
    setTimeout(() => {
      onPaymentSuccess();
    }, 1000);
  };

  const totalAmount = bookingData.total;

  // Reusable input and button styles
  const inputStyle = {
    padding: "12px",
    width: "100%",
    marginBottom: "15px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box", // Ensure padding is included in the width
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

  return (
    <div style={{
      padding: 30,
      maxWidth: 800,
      margin: "0 auto",
      fontFamily: "sans-serif",
      backgroundColor: "#f7f7f7",
      borderRadius: "16px"
    }}>
      <h2 style={{ marginBottom: 30, textAlign: "center", color: "#333" }}>💳 Choose Your Payment Method</h2>

      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        {/* Left Side - Payment Method Selection */}
        <div style={{ flex: 1, paddingRight: 20 }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "18px" }}>
                <input
                  type="radio"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  style={{ transform: "scale(1.2)" }}
                />
                <span style={{ fontWeight: paymentMethod === "upi" ? "bold" : "normal" }}>Pay by UPI</span>
              </label>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "18px" }}>
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  style={{ transform: "scale(1.2)" }}
                />
                <span style={{ fontWeight: paymentMethod === "card" ? "bold" : "normal" }}>Debit/Credit Card</span>
              </label>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "18px" }}>
                <input
                  type="radio"
                  checked={paymentMethod === "qr"}
                  onChange={() => setPaymentMethod("qr")}
                  style={{ transform: "scale(1.2)" }}
                />
                <span style={{ fontWeight: paymentMethod === "qr" ? "bold" : "normal" }}>Scan QR Code</span>
              </label>
            </li>
          </ul>
        </div>

        {/* Right Side - Payment UI */}
        <div style={{ flex: 2, padding: "0 10px" }}>
          {/* UPI Payment */}
          {paymentMethod === "upi" && (
            <div style={paymentOptionStyle}>
              <h4 style={{ marginTop: 0, marginBottom: "20px" }}>Google Pay / PhonePe / Paytm</h4>
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={handlePay}
                style={buttonStyle}
              >
                Verify & Pay ₹{totalAmount.toFixed(2)}
              </button>
            </div>
          )}

          {/* Debit / Credit Card */}
          {paymentMethod === "card" && (
            <div style={paymentOptionStyle}>
              <h4 style={{ marginTop: 0, marginBottom: "20px" }}>Enter Card Details</h4>
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                style={inputStyle}
              />
              <div style={{ display: "flex", gap: "15px" }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                style={inputStyle}
              />
              <button
                onClick={handlePay}
                style={buttonStyle}
              >
                Pay Now ₹{totalAmount.toFixed(2)}
              </button>
            </div>
          )}

          {/* QR Code Payment */}
          {paymentMethod === "qr" && (
            <div style={{ ...paymentOptionStyle, textAlign: "center" }}>
              <h4 style={{ marginTop: 0, marginBottom: "20px" }}>Scan to Pay</h4>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=MovieBooking"
                alt="QR Code"
                style={{ marginBottom: 20, border: "5px solid #fff", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}
              />
              <button
                onClick={handlePay}
                style={buttonStyle}
              >
                I Have Paid ₹{totalAmount.toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;