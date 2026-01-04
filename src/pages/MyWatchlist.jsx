import React from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../provider/WatchlistProvider";
import MovieCard from "../components/MovieCard";
import { FaHeartBroken, FaSearch } from "react-icons/fa";

const MyWatchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="w-full min-h-[80vh]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
        <div>
          <h2 className="text-3xl font-bold text-base-content">My Watchlist</h2>
          <p className="text-gray-500 text-sm">
            Movies you want to watch later
          </p>
        </div>
        <div className="badge badge-secondary badge-lg mt-2 md:mt-0 p-4 text-white">
          Saved Items: {watchlist.length}
        </div>
      </div>

      {/* Content Section */}
      {!watchlist || watchlist.length === 0 ? (
        // Empty State (Requirement 9)
        <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-2xl border border-dashed border-base-300 text-center">
          <div className="bg-base-200 p-6 rounded-full mb-4">
            <FaHeartBroken className="text-6xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-500 mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-gray-400 mb-6 max-w-md">
            Looks like you haven't added any movies yet. Explore our collection
            and save your favorites here!
          </p>
          <Link to="/allmovies">
            <button className="btn btn-primary btn-wide rounded-full text-white">
              <FaSearch /> Explore Movies
            </button>
          </Link>
        </div>
      ) : (
        // Movie Grid (Requirement 3 & 5)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWatchlist;
