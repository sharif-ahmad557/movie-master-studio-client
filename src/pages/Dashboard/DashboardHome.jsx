import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaVideo, FaUsers, FaLayerGroup, FaStar } from "react-icons/fa";

const DashboardHome = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Colors for Chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Movies and Users in parallel
        const [moviesRes, usersRes] = await Promise.all([
          fetch("https://movie-master-studio-server-uw8f.vercel.app/movies"),
          fetch("https://movie-master-studio-server-uw8f.vercel.app/users"),
        ]);

        const moviesData = await moviesRes.json();
        const usersData = await usersRes.json();

        setMovies(moviesData);
        setUsers(usersData);

        // --- Process Data for Chart (Count movies per Genre) ---
        const genreCounts = {};
        moviesData.forEach((movie) => {
          const genre = movie.genre || "Unknown";
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });

        const processedChartData = Object.keys(genreCounts).map((key) => ({
          name: key,
          count: genreCounts[key],
        }));

        setChartData(processedChartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate unique categories
  const totalCategories = new Set(movies.map((m) => m.genre)).size;

  // Get last 5 recently added movies (assuming last in array is newest)
  const recentMovies = [...movies].reverse().slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-base-content">
        Dashboard Overview
      </h1>

      {/* 1. Dynamic Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Movies */}
        <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
          <div className="stat-figure text-primary">
            <FaVideo className="text-3xl opacity-80" />
          </div>
          <div className="stat-title">Total Movies</div>
          <div className="stat-value text-primary">{movies.length}</div>
          <div className="stat-desc">Available in library</div>
        </div>

        {/* Total Users */}
        <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl opacity-80" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-secondary">{users.length}</div>
          <div className="stat-desc">Registered members</div>
        </div>

        {/* Total Categories */}
        <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
          <div className="stat-figure text-accent">
            <FaLayerGroup className="text-3xl opacity-80" />
          </div>
          <div className="stat-title">Categories</div>
          <div className="stat-value text-accent">{totalCategories}</div>
          <div className="stat-desc">Distinct Genres</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Dynamic Chart Section */}
        <div className="bg-base-100 p-6 shadow rounded-xl border border-base-200">
          <h2 className="text-xl font-semibold text-base-content mb-4">
            Movies by Genre
          </h2>
          {chartData.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      color: "#fff",
                      borderRadius: "8px",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    name="Movies Count"
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Not enough data for chart
            </p>
          )}
        </div>

        {/* 3. Dynamic Data Table Section */}
        <div className="bg-base-100 p-6 shadow rounded-xl border border-base-200 overflow-x-auto">
          <h2 className="text-xl font-semibold text-base-content mb-4">
            Recent Added Movies
          </h2>
          <table className="table w-full text-base-content">
            {/* head */}
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>#</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {recentMovies.map((movie, index) => (
                <tr key={movie._id} className="hover">
                  <th>{index + 1}</th>
                  <td
                    className="font-medium truncate max-w-[150px]"
                    title={movie.title}
                  >
                    {movie.title}
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {movie.genre}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      <FaStar /> {movie.rating}
                    </div>
                  </td>
                  <td className="font-mono">{movie.releaseYear}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentMovies.length === 0 && (
            <p className="text-center text-gray-400 py-4">
              No recent movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
