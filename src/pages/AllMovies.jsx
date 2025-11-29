import React, { useEffect, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieCard from "../components/MovieCard";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://movie-master-studio-server-uw8f.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    if (value === "") {
      setFilteredMovies(movies);
    } else {
      setLoading(true);
      setTimeout(() => {
        const filtered = movies.filter((movie) =>
          movie.title.toLowerCase().includes(value)
        );
        setFilteredMovies(filtered);
        setLoading(false);
      }, 700);
    }
  };

  return (
    <div className="py-16 bg-gray-950 min-h-screen">
      <MovieFilter />

      <div className="w-11/12 mx-auto text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">All Movies</h2>

        {/* Search Bar */}
        <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={searchText}
            onChange={handleSearch}
            className="px-4 py-2 w-64 rounded-full border border-gray-600 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          />
        </div>

        {/* Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <div className="w-12 h-12 border-4 border-t-transparent border-pink-500 rounded-full animate-spin ml-[-30px] opacity-70"></div>
            <div className="w-12 h-12 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin ml-[-30px] opacity-50"></div>
          </div>
        ) : (
          <div>
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                No movies found 😢
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
