import React, { useEffect, useState } from "react";
import { useWatchlist } from "../provider/WatchlistProvider";
import MovieCard from "../components/MovieCard";

const MyWatchlist = () => {
  const { watchlist } = useWatchlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [watchlist]);

  return (
    <div className="w-full bg-gray-950 text-white py-8 min-h-screen">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl text-center font-bold mb-6">
          My Watchlist ({watchlist.length})
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading watchlist...</p>
        ) : watchlist.length === 0 ? (
          <p className="text-gray-400 text-center">Your watchlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {watchlist.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWatchlist;
