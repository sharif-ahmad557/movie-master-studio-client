import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { div } from "framer-motion/client";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/movies?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your movies");
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    fetch(`http://localhost:3000/movies/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Movie deleted successfully!");
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch(() => toast.error("Failed to delete movie"));
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  if (!movies.length)
    return (
      <p className="text-center mt-10 text-gray-400">
        You have not added any movies yet.
      </p>
    );

  return (
    <div className="w-full bg-gray-950">
      <div className="w-11/12 md:w-4/5 mx-auto py-10">
        <h2 className="text-3xl text-center font-bold mb-6 text-white">
          My Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-800 text-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/300x450"}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {movie.rating.toFixed(1)}
                </p>
                <p>
                  <strong>Release Year:</strong> {movie.releaseYear}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/update-movie/${movie._id}`)}
                    className="btn btn-dash btn-warning mt-2 w-1/2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-dash btn-warning mt-2 w-1/2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
