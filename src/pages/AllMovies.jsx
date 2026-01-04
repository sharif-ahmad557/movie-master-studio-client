import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard"; // Assuming MovieCard handles its own internal design
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const AllMovies = () => {
  // State management
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch Data
  useEffect(() => {
    fetch("https://movie-master-studio-server-uw8f.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); // Initially show all
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle Filtering & Sorting
  useEffect(() => {
    let result = [...movies];

    // 1. Filter by Search Text
    if (searchText) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 2. Filter by Genre (Requirement: Filter)
    if (selectedGenre !== "All") {
      result = result.filter(
        (movie) =>
          movie.genre &&
          movie.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    // 3. Sorting (Requirement: Sort)
    if (sortOption === "rating_desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "rating_asc") {
      result.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "year_desc") {
      result.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortOption === "year_asc") {
      result.sort((a, b) => a.releaseYear - b.releaseYear);
    }

    setFilteredMovies(result);
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [searchText, selectedGenre, sortOption, movies]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  // Extract Unique Genres for Filter Dropdown
  const uniqueGenres = [
    "All",
    ...new Set(movies.map((m) => m.genre).filter(Boolean)),
  ];

  return (
    <div className="py-16 bg-base-100 min-h-screen text-base-content transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Explore All Movies</h2>
          <p className="text-gray-500">
            Discover your next favorite film from our vast collection.
          </p>
        </div>

        {/* Controls Bar (Search, Filter, Sort) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-base-200 p-4 rounded-2xl shadow-sm border border-base-300">
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-full focus:input-primary"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filters Wrapper */}
          <div className="flex gap-4 w-full lg:w-auto overflow-x-auto">
            {/* Genre Filter */}
            <select
              className="select select-bordered rounded-full focus:select-primary w-full md:w-auto"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="All">All Genres</option>
              {uniqueGenres.map((genre, idx) => (
                <option key={idx} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              className="select select-bordered rounded-full focus:select-primary w-full md:w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort By: Default</option>
              <option value="rating_desc">Rating (High to Low)</option>
              <option value="rating_asc">Rating (Low to High)</option>
              <option value="year_desc">Year (Newest First)</option>
              <option value="year_asc">Year (Oldest First)</option>
            </select>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          // Spinner / Loader
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        ) : (
          <div>
            {filteredMovies.length > 0 ? (
              <>
                {/* Movie Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentItems.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))}
                </div>

                {/* Pagination Controls (Requirement 5) */}
                <div className="flex justify-center mt-12">
                  <div className="join shadow-sm border border-base-300 rounded-full">
                    <button
                      className="join-item btn btn-md hover:bg-primary hover:text-white"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      « Prev
                    </button>

                    {/* Dynamic Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`join-item btn btn-md ${
                          currentPage === index + 1
                            ? "btn-primary text-white"
                            : "hover:bg-primary/20"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      className="join-item btn btn-md hover:bg-primary hover:text-white"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next »
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // No Data Found State
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">😢</div>
                <h3 className="text-2xl font-bold mb-2">No Movies Found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchText("");
                    setSelectedGenre("All");
                  }}
                  className="btn btn-primary mt-6 text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
