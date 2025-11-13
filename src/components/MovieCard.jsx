import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useWatchlist } from "../provider/WatchlistProvider";
import { toast } from "react-hot-toast";

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const isInWatchlist = watchlist.some((m) => m._id === movie._id);

  const handleWatchlistToggle = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isInWatchlist) {
      removeFromWatchlist(movie._id);
      toast.success(`${movie.title} removed from your watchlist`);
    } else {
      addToWatchlist(movie);
      toast.success(`${movie.title} added to your watchlist`);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-4">
      <img
        src={movie.posterUrl || "https://via.placeholder.com/200x300"}
        alt={movie.title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{movie.title}</h3>
      <p className="text-gray-400">Genre: {movie.genre}</p>
      <p className="text-yellow-400 font-bold">⭐ {movie.rating}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleWatchlistToggle}
          className={`w-1/2 py-2 font-semibold rounded transition ${
            isInWatchlist
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-yellow-500 text-black hover:bg-yellow-600"
          }`}
        >
          {isInWatchlist ? "Remove Watchlist" : "Add Watchlist"}
        </button>
        <button
          onClick={() => navigate(`/movies/${movie._id}`)}
          className="w-1/2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
