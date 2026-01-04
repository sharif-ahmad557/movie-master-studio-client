import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaFilm,
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaUserTie,
  FaGlobe,
  FaLanguage,
  FaImage,
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
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`https://movie-master-studio-server-uw8f.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) throw new Error("Movie not found");
        // Security Check
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
  }, [id, user.email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const validateForm = () => {
    if (movie.rating < 0 || movie.rating > 10) {
      toast.error("Rating must be between 0 and 10");
      return false;
    }
    if (movie.duration <= 0) {
      toast.error("Duration must be positive");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setUpdating(true);

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
        navigate(`/movies/${id}`); // Redirect to details page
      })
      .catch(() => toast.error("Failed to update movie"))
      .finally(() => setUpdating(false));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-6 px-4 pb-10">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-300">
        {/* Header */}
        <div className="card-body pb-0">
          <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-base-content">
            <FaEdit className="text-warning" /> Update Movie
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Editing details for:{" "}
            <span className="font-semibold text-primary">{movie.title}</span>
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
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Poster URL & Preview */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaImage /> Poster URL
                </span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  name="posterUrl"
                  value={movie.posterUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
                <div className="avatar">
                  <div className="w-12 h-16 rounded shadow-md border border-base-300">
                    <img
                      src={movie.posterUrl}
                      alt="Preview"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Genre */}
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
                className="input input-bordered w-full focus:input-primary"
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
                className="input input-bordered w-full focus:input-primary"
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
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>

            {/* Cast */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold">Cast</span>
              </label>
              <input
                type="text"
                name="cast"
                value={movie.cast}
                onChange={handleChange}
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
                rows={5}
                className="textarea textarea-bordered w-full focus:textarea-primary"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-neutral w-1/3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="btn btn-warning w-2/3 text-lg"
            >
              {updating ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
