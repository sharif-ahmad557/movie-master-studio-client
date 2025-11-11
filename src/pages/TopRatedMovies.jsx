import React, { useEffect, useState } from "react";

const TopRatedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        const top = data.sort((a, b) => b.rating - a.rating).slice(0, 5);
        setTopMovies(top);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading top rated movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-gray-900 text-white py-16">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          🌟 Top Rated Movies
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          The audience’s favorites you can’t miss
        </p>

        {loading ? (
          <p className="text-gray-400">Loading top movies...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {topMovies.map((movie) => (
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
                  <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
                  <p className="text-gray-400 mb-2">{movie.director}</p>
                  <p className="text-yellow-400 font-bold text-lg">
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

export default TopRatedMovies;
