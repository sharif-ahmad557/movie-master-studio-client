import React, { useEffect, useState } from "react";
import { FaFilm, FaUsers } from "react-icons/fa";

const StatisticsSection = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/movies"),
          fetch("http://localhost:3000/users"),
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
    <div className="w-full bg-gray-950 text-white py-16">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          📊 Platform Statistics
        </h2>
        <p className="text-gray-400 mb-10">
          A quick glance at our growing movie and user community.
        </p>

        {loading ? (
          <p className="text-gray-400">Loading statistics...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
            {/* Total Movies */}
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
              <FaFilm className="text-5xl text-orange-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Total Movies</h3>
              <p className="text-4xl font-bold text-orange-500">{movieCount}</p>
            </div>

            {/* Total Users */}
            <div className="flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
              <FaUsers className="text-5xl text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Total Users</h3>
              <p className="text-4xl font-bold text-blue-500">{userCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsSection;
