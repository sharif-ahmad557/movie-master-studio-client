import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useWatchlist } from "../provider/WatchlistProvider";
import { toast } from "react-hot-toast";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const isInWatchlist = watchlist.some((m) => m._id === movie._id);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation(); 
    if (!user) {
      navigate("/login");
      return;
    }
    if (isInWatchlist) {
      removeFromWatchlist(movie._id);
      toast.success(`${movie.title} removed from watchlist`);
    } else {
      addToWatchlist(movie);
      toast.success(`${movie.title} added to watchlist`);
    }
  };

  return (
    <div className="card bg-base-100 w-full shadow-md hover:shadow-2xl transition-all duration-300 border border-base-300 h-full group overflow-hidden">
      {/* Image Section */}
      <figure className="relative h-64 overflow-hidden">
        <img
          src={
            movie.posterUrl ||
            "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 badge badge-warning gap-1 shadow-sm font-bold">
          <FaStar /> {movie.rating?.toFixed(1) || "N/A"}
        </div>

        {/* Genre Badge */}
        <div className="absolute bottom-2 left-2 badge badge-neutral bg-black/60 text-white backdrop-blur-md border-none">
          {movie.genre}
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body p-5 flex flex-col flex-grow">
        {/* Title */}
        <h2
          className="card-title text-lg font-bold truncate block"
          title={movie.title}
        >
          {movie.title}
        </h2>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <FaClock className="text-primary" />
            <span>{movie.duration ? `${movie.duration} min` : "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-primary" />
            <span>{movie.releaseYear}</span>
          </div>
        </div>

        <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-200">
          {/* Watchlist Icon Button */}
          <button
            onClick={handleWatchlistToggle}
            className="btn btn-circle btn-ghost btn-sm tooltip tooltip-right"
            data-tip={
              isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
            }
          >
            {isInWatchlist ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-400 text-xl hover:text-red-500 transition-colors" />
            )}
          </button>

          <button
            onClick={() => navigate(`/movies/${movie._id}`)}
            className="btn btn-sm btn-primary rounded-full px-6 text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
