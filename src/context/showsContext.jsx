import React, { createContext, useState, useEffect } from "react";

export const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);

  // Fetch all shows from backend
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/shows");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched shows:", data);
        setShows(data);
      } catch (err) {
        console.error("Error fetching shows:", err);
      }
    };
    fetchShows();
  }, []);

  const uniqueTimes = [...new Set(shows.map((show) => show.time))];

  // Add new show
  const addShow = async (newShow) => {
    try {
      const response = await fetch("http://localhost:5000/api/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShow),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to create show");
      }

      const data = await response.json();
      console.log("Show added:", data);
      setShows((prevShows) => [...prevShows, data]);
    } catch (error) {
      console.error("Failed to add show:", error);
    }
  };

  // Delete show
  const deleteShow = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/shows/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete show");
      setShows((prev) => prev.filter((show) => show._id !== id));
    } catch (err) {
      console.error("Failed to delete show:", err);
    }
  };

  return (
    <ShowsContext.Provider value={{ shows, addShow, deleteShow, uniqueTimes }}>
      {children}
    </ShowsContext.Provider>
  );
};
