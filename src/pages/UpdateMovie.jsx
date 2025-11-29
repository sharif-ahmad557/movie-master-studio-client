import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://movie-master-studio-server-uw8f.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) throw new Error("Movie not found");
        if (data.email !== user.email) {
          toast.error("You are not authorized to edit this movie!");
          navigate("/allmovies");
          return;
        }
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load movie");
        navigate("/allmovies");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = {
      ...movie,
      rating: Number(movie.rating),
      duration: Number(movie.duration),
      releaseYear: Number(movie.releaseYear),
    };

    fetch(`https://movie-master-studio-server-uw8f.vercel.app/movies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        toast.success("Movie updated successfully!");
        navigate(`/movies/${id}`);
      })
      .catch(() => toast.error("Failed to update movie"));
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  return (
    <div className="w-full py-16 bg-gray-950 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Movie</h2>
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
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Genre */}
        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Director */}
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Director"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Cast */}
        <input
          type="text"
          name="cast"
          value={movie.cast}
          onChange={handleChange}
          placeholder="Cast"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Release Year */}
        <input
          type="number"
          name="releaseYear"
          value={movie.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Rating */}
        <input
          type="number"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          placeholder="Rating"
          step="0.1"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Duration */}
        <input
          type="number"
          name="duration"
          value={movie.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Plot Summary */}
        <textarea
          name="plotSummary"
          value={movie.plotSummary}
          onChange={handleChange}
          placeholder="Plot Summary"
          rows={5}
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Poster URL */}
        <input
          type="text"
          name="posterUrl"
          value={movie.posterUrl}
          onChange={handleChange}
          placeholder="Poster URL"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Language */}
        <input
          type="text"
          name="language"
          value={movie.language}
          onChange={handleChange}
          placeholder="Language"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Country */}
        <input
          type="text"
          name="country"
          value={movie.country}
          onChange={handleChange}
          placeholder="Country"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <button type="submit" className="btn btn-dash btn-warning mt-2 w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
