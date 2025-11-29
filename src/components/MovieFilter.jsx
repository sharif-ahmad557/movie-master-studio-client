import React, { useState, useEffect } from "react";

const MovieFilter = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  const fetchMovies = async () => {
    if (!genre && !minRating && !maxRating) {
      setMovies([]);
      return;
    }

    setLoading(true);
    const query = [];

    if (genre) query.push(`genre=${encodeURIComponent(genre)}`);
    if (minRating) query.push(`minRating=${minRating}`);
    if (maxRating) query.push(`maxRating=${maxRating}`);

    const queryString = query.length ? `?${query.join("&")}` : "";

    try {
      const res = await fetch(
        `https://movie-master-studio-server-uw8f.vercel.app/movies${queryString}`
      );
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-950 text-white py-8">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Filter Movies{" "}
          <span className="text-lg text-yellow-400">
            ({movies.length} found)
          </span>
        </h2>

        {/* Filter Inputs */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Genre (Action,Comedy...)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-2 rounded border border-gray-300 bg-gray-800"
          />
          <input
            type="number"
            placeholder="Min Rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="p-2 rounded border border-gray-300 bg-gray-800"
          />
          <input
            type="number"
            placeholder="Max Rating"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            className="p-2 rounded border border-gray-300 bg-gray-800"
          />
          <button
            onClick={fetchMovies}
            className="bg-blue-500 px-4 py-2 rounded font-semibold"
          >
            Filter
          </button>
          <button
            onClick={() => {
              setGenre("");
              setMinRating("");
              setMaxRating("");
              setMovies([]);
            }}
            className="bg-gray-700 px-4 py-2 rounded font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Movies List */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400 text-center">No movies found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-2xl shadow-lg p-4"
              >
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/200x300"}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">{movie.title}</h3>
                <p className="text-gray-400">Genre: {movie.genre}</p>
                <p className="text-yellow-400 font-bold">⭐ {movie.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieFilter;
