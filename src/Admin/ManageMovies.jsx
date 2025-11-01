import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    poster: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch movies on load
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add movie using POST
  const handleAddMovie = async (e) => {
    e.preventDefault();
    const { title, description, poster } = newMovie;

    if (!title || !description || !poster) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newMovie,
          shows: [
            { id: "1", time: "12:00 PM" },
            { id: "2", time: "3:00 PM" },
            { id: "3", time: "6:00 PM" },
            { id: "4", time: "9:00 PM" },
          ],
        }),
      });

      const data = await res.json();
      setMovies((prev) => [...prev, data]);
      setNewMovie({ title: "", description: "", poster: "" });
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  // ✅ Delete movie using DELETE
  const handleDeleteMovie = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await fetch(`http://localhost:5000/api/movies/${_id}`, {
        method: "DELETE",
      });

      setMovies((prev) => prev.filter((movie) => movie._id !== _id));
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  const goBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div style={styles.container}>
      <button onClick={goBackToDashboard} style={styles.backButton}>
        ← Back to Dashboard
      </button>

      <h2>Manage Movies</h2>

      <form onSubmit={handleAddMovie} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="poster"
          placeholder="Poster URL"
          value={newMovie.poster}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add Movie
        </button>
      </form>

      <div style={styles.movieList}>
        {movies.map((movie) => (
          <div key={movie._id} style={styles.movieCard}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={styles.poster}
              onError={(e) => (e.target.src = "https://via.placeholder.com/100x150")}
            />
            <div style={styles.movieInfo}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteMovie(movie._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    flex: "1 1 250px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
   backButton: {
    marginBottom: "20px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  movieList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: "20px",
  },
  movieCard: {
    display: "flex",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  poster: {
    width: "100px",
    height: "150px",
    objectFit: "cover",
  },
  movieInfo: {
    padding: "10px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  deleteButton: {
    marginTop: "auto",
    alignSelf: "flex-start",
    backgroundColor: "#dc3545",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ManageMovies;
