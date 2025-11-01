import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Booking = () => {
  const seatLayout = {
    "Box A": [
      { row: "A", seats: [1, 2, 3, 4, 5, 6] },
      { row: "A", seats: [7, 8, 9, 10, 11, 12] },
    ],
    "Box B": [{ row: "A", seats: [21, 22, 23, 24, 25, 26] }],
    "First Class": [
      { row: "B", seats: Array.from({ length: 15 }, (_, i) => i + 1) },
      { row: "C", seats: Array.from({ length: 15 }, (_, i) => i + 1) },
      { row: "D", seats: Array.from({ length: 15 }, (_, i) => i + 1) },
      { row: "E", seats: Array.from({ length: 15 }, (_, i) => i + 1) },
    ],
  };

  const [seatCount, setSeatCount] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [showTime, setShowTime] = useState("");

  const bookedSeats = ["A-3", "C-12", "E-5"];
  const blockedSeats = ["B-7", "D-10"];

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { selectedMovie, selectedShowtime } = location.state;
      setMovieTitle(selectedMovie);
      setShowTime(selectedShowtime);
    }
  }, [location.state]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
    } else if (selectedSeats.length < seatCount) {
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  const getSeatColor = (seatId) => {
    if (blockedSeats.includes(seatId)) return "#ccc";
    if (bookedSeats.includes(seatId)) return "orange";
    if (selectedSeats.includes(seatId)) return "green";
    return "white";
  };

  const handleBookNow = () => {
    navigate("/bookings", {
      state: {
        selectedSeats,
        selectedMovie: movieTitle,
        selectedShowtime: showTime,
      },
    });
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}> Booking Your Seats </h2>
      {movieTitle && showTime && (
        <h4 style={{ textAlign: "center" }}>{movieTitle} - {showTime}</h4>
      )}

      {!seatCount && (
        <div style={{ textAlign: "center" }}>
          <h3>How Many Seats?</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((count) => (
              <button
                key={count}
                onClick={() => setSeatCount(count)}
                style={{
                  padding: 10,
                  borderRadius: "50%",
                  backgroundColor: "#ff4081",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                }}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {seatCount && (
        <>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h4>Select {seatCount} Seat{seatCount > 1 && "s"}</h4>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            {Object.entries(seatLayout).map(([section, rows]) => (
              <div key={section}>
                <h3 style={{ textAlign: "center", marginBottom: 10 }}>{section}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {rows.map(({ row, seats }) => (
                    <div key={`${section}-${row}-${seats[0]}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 20 }}>{row}</span>
                      <div style={{ display: "flex", gap: 4 }}>
                        {seats.map((num) => {
                          const seatId = `${row}-${num}`;
                          const isBooked = bookedSeats.includes(seatId);
                          const isBlocked = blockedSeats.includes(seatId);
                          return (
                            <button
                              key={seatId}
                              onClick={() => !isBooked && !isBlocked && toggleSeat(seatId)}
                              disabled={isBooked || isBlocked}
                              style={{
                                width: 30,
                                height: 30,
                                backgroundColor: getSeatColor(seatId),
                                border: "1px solid #999",
                                borderRadius: 4,
                                cursor: isBooked || isBlocked ? "not-allowed" : "pointer",
                                fontSize: 12,
                              }}
                              title={seatId}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ margin: "40px auto 20px", width: 300, height: 10, background: "#ccc", borderRadius: 4 }} />
          <p style={{ textAlign: "center", fontStyle: "italic", color: "#777" }}>All eyes this way please!</p>

          <div style={{ marginTop: 30, textAlign: "center" }}>
            <h4> Seats:</h4>
            <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected"}</p>
          </div>

          {selectedSeats.length === seatCount && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={handleBookNow}
                style={{
                  padding: "10px 30px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          )}

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <h4>Legend:</h4>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 20, height: 20, background: "white", border: "1px solid #999" }} />
                Available
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 20, height: 20, background: "green", border: "1px solid #999" }} />
                Selected
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 20, height: 20, background: "orange", border: "1px solid #999" }} />
                Booked
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 20, height: 20, background: "#ccc", border: "1px solid #999" }} />
                Blocked
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const confirmBooking = async ({ selectedSeats, selectedMovie, selectedShowtime, name, email, navigate }) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie: selectedMovie,
        showTime: selectedShowtime,
        seats: selectedSeats,
        name,
        email,
        amount: 370.8,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/confirmation", { state: { bookingId: data.bookingId } });
    } else {
      alert(data.message || "Booking failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error confirming booking");
  }
};

export default Booking;
