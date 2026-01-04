import React, { useEffect, useState } from "react";
import { FaFilm, FaUsers } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "animate.css";

const StatisticsSection = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Trigger animation when 20% of the component is visible
  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate once for better UX
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          fetch("https://movie-master-studio-server-uw8f.vercel.app/movies"),
          fetch("https://movie-master-studio-server-uw8f.vercel.app/users"),
        ]);

        const moviesData = await moviesRes.json();
        const usersData = await usersRes.json();

        setMovieCount(moviesData.length);
        setUserCount(usersData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error loading statistics:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full bg-base-200 text-base-content py-20 transition-colors duration-300`}
    >
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header Section */}
        <div
          className={`text-center mb-12 ${
            inView ? "animate__animated animate__fadeInDown" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            📊 Platform Statistics
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A quick glance at our growing movie library and user community. Join
            us to be part of the numbers!
          </p>
        </div>

        {loading ? (
          // Skeleton Loader (Requirement Met)
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-base-100 p-10 rounded-3xl shadow-sm border border-base-300"
              >
                <div className="skeleton w-16 h-16 rounded-full mb-4"></div>
                <div className="skeleton h-6 w-32 mb-2"></div>
                <div className="skeleton h-10 w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          // Statistics Cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
            {/* Total Movies Card */}
            <div
              className={`flex flex-col items-center bg-base-100 p-10 rounded-3xl shadow-lg border border-base-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${
                inView ? "animate__animated animate__fadeInLeft" : "opacity-0"
              }`}
            >
              <div className="p-4 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                <FaFilm className="text-5xl text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 opacity-80">
                Total Movies
              </h3>
              <p className="text-5xl font-extrabold text-primary">
                {movieCount}
              </p>
            </div>

            {/* Total Users Card */}
            <div
              className={`flex flex-col items-center bg-base-100 p-10 rounded-3xl shadow-lg border border-base-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${
                inView ? "animate__animated animate__fadeInRight" : "opacity-0"
              }`}
            >
              <div className="p-4 bg-secondary/10 rounded-full mb-6 group-hover:bg-secondary/20 transition-colors">
                <FaUsers className="text-5xl text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 opacity-80">
                Total Users
              </h3>
              <p className="text-5xl font-extrabold text-secondary">
                {userCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsSection;
