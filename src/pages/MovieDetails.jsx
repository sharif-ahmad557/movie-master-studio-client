import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = ({ currentUserEmail }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      })
        .then(() => navigate("/all-movies"))
        .catch((err) => console.error(err));
    }
  };

  if (!movie)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  const isOwner = movie.email === currentUserEmail;

  return (
    <div className="w-11/12 mx-auto py-16 bg-gray-950 text-white rounded-2xl">
      <div className="flex flex-col md:flex-row px-4 gap-8">
        <img
          src={movie.posterUrl || "https://via.placeholder.com/300x450"}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg"
        />
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
          <p className="mb-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mb-2">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="mb-2">
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p className="mb-2">
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> ⭐ {movie.rating.toFixed(1)}
          </p>
          <p className="mb-4">
            <strong>Plot:</strong> {movie.plotSummary}
          </p>

          {isOwner && (
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/update-movie/${id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full text-black transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-black transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
