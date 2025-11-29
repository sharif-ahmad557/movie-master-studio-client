import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      ...movie,
      releaseYear: Number(movie.releaseYear),
      rating: Number(movie.rating),
      duration: Number(movie.duration),
      email: user.email,
    };

    try {
      setLoading(true);
      const res = await fetch(
        "https://movie-master-studio-server-uw8f.vercel.app/movies",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMovie),
        }
      );

      if (!res.ok) throw new Error("Failed to add movie");

      toast.success("Movie added successfully!");
      navigate("/mycollection");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-16 bg-gray-950 text-white">
      <h2 className="text-3xl text-center font-bold mb-6">Add New Movie</h2>

      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-2/3 mx-auto flex flex-col gap-4"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Genre */}
        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Director */}
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Director"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Cast */}
        <input
          type="text"
          name="cast"
          value={movie.cast}
          onChange={handleChange}
          placeholder="Cast"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Release Year */}
        <input
          type="number"
          name="releaseYear"
          value={movie.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Rating */}
        <input
          type="number"
          step="0.1"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Duration */}
        <input
          type="number"
          name="duration"
          value={movie.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Plot Summary */}
        <textarea
          name="plotSummary"
          value={movie.plotSummary}
          onChange={handleChange}
          placeholder="Plot Summary"
          rows={5}
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Poster URL */}
        <input
          type="text"
          name="posterUrl"
          value={movie.posterUrl}
          onChange={handleChange}
          placeholder="Poster URL"
          className="p-2 rounded-md bg-gray-800 text-white"
        />

        {/* Language */}
        <input
          type="text"
          name="language"
          value={movie.language}
          onChange={handleChange}
          placeholder="Language"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        {/* Country */}
        <input
          type="text"
          name="country"
          value={movie.country}
          onChange={handleChange}
          placeholder="Country"
          className="p-2 rounded-md bg-gray-800 text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-dash btn-warning mt-2 w-full"
        >
          {loading ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
