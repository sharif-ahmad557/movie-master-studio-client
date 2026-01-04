import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
import { useInView } from "react-intersection-observer";
import { FaStar, FaCalendarAlt, FaVideo } from "react-icons/fa";

const TopRatedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true, // Animation runs once for better UX
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("https://movie-master-studio-server-uw8f.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        // Sort by rating descending and take top 4 (Requirement prefers 4 cards per row)
        const top = data.sort((a, b) => b.rating - a.rating).slice(0, 4);
        setTopMovies(top);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading top rated movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full bg-base-200 text-base-content py-20 transition-colors duration-300`}
    >
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${
            inView ? "animate__animated animate__fadeInDown" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            🌟 Top Rated Movies
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            The audience’s favorites you can’t miss
          </p>
        </div>

        {loading ? (
          // Requirement: Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col bg-base-100 rounded-xl p-4 shadow-sm border border-base-300 h-96"
              >
                <div className="skeleton h-48 w-full rounded-lg mb-4"></div>
                <div className="skeleton h-4 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-1/2 mb-4"></div>
                <div className="mt-auto skeleton h-10 w-full rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          // Movie Cards Grid (4 per row as per requirement)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMovies.map((movie, index) => (
              <div
                key={movie._id}
                className={`flex flex-col h-full bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                  inView ? "animate__animated animate__fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={
                      movie.posterUrl || "https://via.placeholder.com/300x450"
                    }
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 badge badge-warning gap-1 font-bold shadow-md">
                    <FaStar /> {movie.rating.toFixed(1)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>

                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                    <p className="flex items-center gap-2">
                      <FaVideo className="text-primary" />
                      <span className="font-medium">Director:</span>{" "}
                      {movie.director}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" />
                      <span className="font-medium">Year:</span>{" "}
                      {movie.releaseYear}
                    </p>
                  </div>

                  {/* Action Button (Requirement 3: View Details button) */}
                  <div className="mt-auto">
                    <Link to={`/movies/${movie._id}`}>
                      <button className="btn btn-primary btn-outline w-full rounded-xl hover:text-white">
                        View Details
                      </button>
                    </Link>
                  </div>
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
