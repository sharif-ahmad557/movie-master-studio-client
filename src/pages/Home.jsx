import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // ✅ Movies fetch
        const res = await fetch("http://localhost:3000/movies");
        const movies = await res.json();
        console.log(movies);

        setFeaturedMovies(movies.slice(0, 5)); // Featured
        setTopRated(
          [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5)
        ); // Top Rated
        setRecentlyAdded(
          [...movies].sort((a, b) => b.addedAt - a.addedAt).slice(0, 6)
        ); // Recently Added

        // ✅ Stats
        const userRes = await fetch("http://localhost:5000/users/count");
        const userData = await userRes.json();
        setStats({
          totalMovies: movies.length,
          totalUsers: userData.totalUsers,
        });
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="w-full h-[400px] relative overflow-hidden">
        <div className="w-full h-full flex">
          {featuredMovies.map((movie, idx) => (
            <motion.div
              key={movie._id}
              className="min-w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.poster})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.5 }}
            >
              <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white text-3xl font-bold">
                {movie.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="text-center py-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8">Platform Statistics</h2>
        <div className="flex justify-center gap-16 text-xl font-medium">
          <div>Total Movies: {stats.totalMovies}</div>
          <div>Total Users: {stats.totalUsers}</div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Top Rated Movies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
          {topRated.map((movie) => (
            <motion.div
              key={movie._id}
              className="bg-white rounded shadow overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 font-semibold text-center">{movie.title}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Recently Added</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 px-4">
          {recentlyAdded.map((movie) => (
            <motion.div
              key={movie._id}
              className="bg-white rounded shadow overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-1 font-medium text-center text-sm">
                {movie.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Genre Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Genres</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Action", "Drama", "Comedy", "Horror", "Romance", "Sci-Fi"].map(
            (genre) => (
              <span
                key={genre}
                className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition"
              >
                {genre}
              </span>
            )
          )}
        </div>
      </section>

      {/* About */}
      <section className="py-12 bg-gray-100 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About MovieMaster Pro</h2>
        <p className="text-lg text-gray-700">
          MovieMaster Pro is a complete movie management platform. Browse your
          favorite movies, manage collections, and discover top rated films.
          Built for movie enthusiasts!
        </p>
      </section>
    </div>
  );
};

export default Home;
