import React from "react";
import { useWatchlist } from "../provider/WatchlistProvider";
import MovieCard from "../components/MovieCard"; 

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  if (!watchlist.length) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Your watchlist is empty.
      </p>
    );
  }

  return (
    <div className="py-16 bg-gray-950 min-h-screen">
      <div className="w-11/12 mx-auto text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">My Watchlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
