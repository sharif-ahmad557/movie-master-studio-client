import React, { useEffect, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieCard from "../components/MovieCard";

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

  if (loading)
    return <p className="text-center mt-10 text-white">Loading movies...</p>;

  return (
    <div className="py-16 bg-gray-950">
      <MovieFilter />
      <div className="w-11/12 mx-auto text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">All Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
