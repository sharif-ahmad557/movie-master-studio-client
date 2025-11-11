import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams(); // URL থেকে মুভির _id
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // লগইন ইউজার

  // 🎬 মুভি ডেটা লোড করা
  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch(() => toast.error("Failed to load movie details"));
  }, [id]);

  // ❌ ডিলিট হ্যান্ডলার
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Movie deleted successfully!");
            navigate("/allmovies");
          } else {
            toast.error("Failed to delete movie!");
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    }
  };

  // ⏳ লোডিং স্টেট
  if (!movie)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  // ✅ মালিক চেক
  const isOwner = user?.email && movie.email === user.email;

  return (
    <div className="w-11/12 mx-auto py-16 text-white">
      <div className="flex flex-col md:flex-row gap-8 bg-gray-900 p-6 rounded-2xl shadow-lg">
        {/* 🎥 Poster */}
        <img
          src={
            movie.posterUrl ||
            "https://via.placeholder.com/400x600?text=No+Poster"
          }
          alt={movie.title}
          className="w-full md:w-1/3 rounded-2xl object-cover shadow-lg"
        />

        {/* 📋 Details */}
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold mb-4 text-yellow-400">
            {movie.title}
          </h2>
          <p className="mb-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mb-2">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="mb-2">
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p className="mb-2">
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p className="mb-2">
            <strong>Language:</strong> {movie.language}
          </p>
          <p className="mb-2">
            <strong>Country:</strong> {movie.country}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> ⭐ {movie.rating?.toFixed(1)}
          </p>
          <p className="mb-4">
            <strong>Plot:</strong> {movie.plotSummary}
          </p>

          {/* 👑 মালিক হলে Edit/Delete */}
          {isOwner ? (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate(`/update/${movie._id}`)}
                className="btn btn-dash btn-warning mt-2"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-dash btn-warning mt-2"
              >
                🗑️ Delete
              </button>
            </div>
          ) : (
            <p className="mt-6 text-gray-400 italic">
              You can only edit or delete movies you’ve added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
