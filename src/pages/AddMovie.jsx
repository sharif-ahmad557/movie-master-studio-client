import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import {
  FaFilm,
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaUserTie,
  FaGlobe,
  FaLanguage,
  FaImage,
  FaPlusCircle,
} from "react-icons/fa";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Animation",
  "Documentary",
  "Mystery",
  "Fantasy",
  "Crime",
];

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

  const validateForm = () => {
    const currentYear = new Date().getFullYear();

    if (movie.rating < 0 || movie.rating > 10) {
      toast.error("Rating must be between 0 and 10");
      return false;
    }
    if (movie.releaseYear < 1888 || movie.releaseYear > currentYear + 5) {
      toast.error("Please enter a valid Release Year");
      return false;
    }
    if (movie.duration <= 0) {
      toast.error("Duration must be a positive number");
      return false;
    }
    if (!movie.genre) {
      toast.error("Please select a genre");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
      navigate("/dashboard/my-collection"); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-6 px-4">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-300">
        {/* Header */}
        <div className="card-body pb-0 text-base-content">
          <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <FaPlusCircle className="text-primary" /> Add New Movie
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Share your favorite movies with the community
          </p>
          <div className="divider my-2"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-body pt-2 gap-6 text-base-content"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaFilm /> Movie Title
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChange}
                placeholder="e.g. Inception"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Poster URL with Preview */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaImage /> Poster URL
                </span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="url"
                  name="posterUrl"
                  value={movie.posterUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/poster.jpg"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
                {movie.posterUrl && (
                  <div className="avatar">
                    <div className="w-12 h-16 rounded shadow-md border border-base-300">
                      <img
                        src={movie.posterUrl}
                        alt="Preview"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Genre Selection (Dropdown) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  Genre
                </span>
              </label>
              <select
                name="genre"
                value={movie.genre}
                onChange={handleChange}
                className="select select-bordered w-full focus:select-primary"
                required
              >
                <option value="" disabled>
                  Select Genre
                </option>
                {genres.map((g, idx) => (
                  <option key={idx} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaClock /> Duration (min)
                </span>
              </label>
              <input
                type="number"
                name="duration"
                value={movie.duration}
                onChange={handleChange}
                placeholder="e.g. 120"
                className="input input-bordered w-full focus:input-primary"
                min="1"
                required
              />
            </div>

            {/* Release Year */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaCalendarAlt /> Release Year
                </span>
              </label>
              <input
                type="number"
                name="releaseYear"
                value={movie.releaseYear}
                onChange={handleChange}
                placeholder="e.g. 2024"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaStar className="text-yellow-500" /> Rating (0-10)
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={movie.rating}
                onChange={handleChange}
                placeholder="e.g. 8.5"
                className="input input-bordered w-full focus:input-primary"
                min="0"
                max="10"
                required
              />
            </div>

            {/* Language */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaLanguage /> Language
                </span>
              </label>
              <input
                type="text"
                name="language"
                value={movie.language}
                onChange={handleChange}
                placeholder="e.g. English"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Country */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaGlobe /> Country
                </span>
              </label>
              <input
                type="text"
                name="country"
                value={movie.country}
                onChange={handleChange}
                placeholder="e.g. USA"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Director */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaUserTie /> Director
                </span>
              </label>
              <input
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChange}
                placeholder="e.g. Christopher Nolan"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold">
                  Cast (Comma separated)
                </span>
              </label>
              <input
                type="text"
                name="cast"
                value={movie.cast}
                onChange={handleChange}
                placeholder="e.g. Leonardo DiCaprio, Joseph Gordon-Levitt"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Plot Summary */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold">Plot Summary</span>
              </label>
              <textarea
                name="plotSummary"
                value={movie.plotSummary}
                onChange={handleChange}
                placeholder="Write a brief summary of the movie..."
                rows={4}
                className="textarea textarea-bordered w-full focus:textarea-primary"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-white font-bold text-lg rounded-xl"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Movie"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
