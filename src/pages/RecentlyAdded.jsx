import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "animate.css";
import { FaCalendarAlt, FaUserTie, FaStar } from "react-icons/fa";

const RecentlyAdded = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true, // Animation runs once for better UX
    threshold: 0.2,
  });

  useEffect(() => {
    fetch("https://movie-master-studio-server-uw8f.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        // Filter valid movies
        const moviesWithPoster = data.filter((movie) => movie.posterUrl);

        // Sort by Newest Year & Take top 4 (To fit 4 cards per row requirement)
        const recent = moviesWithPoster
          .sort((a, b) => b.releaseYear - a.releaseYear)
          .slice(0, 4);

        setRecentMovies(recent);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading recently added movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      ref={ref}
      // Fixed: Removed hardcoded colors, added theme-supported classes
      className={`w-full bg-base-200 text-base-content py-20 transition-colors duration-300`}
    >
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 ${
            inView ? "animate__animated animate__fadeInDown" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            🆕 Recently Added
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Catch the latest hits fresh from our collection
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
          // Grid: 4 Cards per row (Requirement 3)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentMovies.map((movie, index) => (
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
                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2 badge badge-secondary gap-1 shadow-md">
                    <FaStar /> {movie.rating.toFixed(1)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>

                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-4">
                    <p className="flex items-center justify-center md:justify-start gap-2">
                      <FaUserTie className="text-secondary" />
                      <span className="font-medium truncate">
                        {movie.director}
                      </span>
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-2">
                      <FaCalendarAlt className="text-secondary" />
                      <span className="font-medium">{movie.releaseYear}</span>
                    </p>
                  </div>

                  {/* Requirement: View Details Button */}
                  <div className="mt-auto">
                    <Link to={`/movies/${movie._id}`}>
                      <button className="btn btn-secondary w-full rounded-xl text-white">
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

export default RecentlyAdded;
