import React, { useEffect, useState } from "react";

const RecentlyAdded = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        const moviesWithPoster = data.filter((movie) => movie.posterUrl);

        const recent = moviesWithPoster
          .sort(
            (a, b) =>
              new Date(b.addedAt || b.joinedAt) -
              new Date(a.addedAt || a.joinedAt)
          )
          .slice(0, 6);

        setRecentMovies(recent);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading recently added movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-gray-950 text-white py-16">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          🆕 Recently Added
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          Catch the latest hits fresh from our collection
        </p>

        {loading ? (
          <p className="text-gray-400">Loading recently added movies...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/200x300"}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                  <p className="text-gray-400 mb-2">
                    {movie.director} | {movie.releaseYear}
                  </p>
                  <p className="text-yellow-400 font-bold text-md">
                    ⭐ {movie.rating.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
