import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading movies...</p>;

  return (
    <div className="py-16 bg-gray-950">
      <div className="w-11/12 mx-auto  text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">All Movies</h2>
        <p className="text-center text-gray-400 mb-10 ">Browse our extensive collection of movies across genres, ratings, and years.<br></br> Discover your next favorite film or explore hidden gems curated just for you!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/200x300"}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-400">
                  Rating: ⭐ {movie.rating.toFixed(1)}
                </p>
                <p className="text-gray-400">Genre: {movie.genre}</p>
                <p className="text-gray-400">Release: {movie.releaseYear}</p>
                <Link to={`/movies/${movie._id}`}>
                  <button className="btn btn-dash btn-warning mt-2 w-full">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
