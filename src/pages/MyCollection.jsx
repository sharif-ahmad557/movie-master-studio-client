import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";
import Swal from "sweetalert2"; // Optional: Better alert than window.confirm

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://movie-master-studio-server-uw8f.vercel.app/movies?email=${user.email}`
    )
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
    // Custom Confirm Dialog (Better than window.confirm)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://movie-master-studio-server-uw8f.vercel.app/movies/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your movie has been deleted.", "success");
            setMovies(movies.filter((movie) => movie._id !== id));
          })
          .catch(() => toast.error("Failed to delete movie"));
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="w-full min-h-[80vh]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
        <div>
          <h2 className="text-3xl font-bold text-base-content">My Collection</h2>
          <p className="text-gray-500 text-sm">Manage your added movies here</p>
        </div>
        <div className="badge badge-primary badge-lg mt-2 md:mt-0 p-4">
          Total Movies: {movies.length}
        </div>
      </div>

      {movies.length === 0 ? (
        // Empty State (Requirement 9: No placeholder text, guide user)
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl border border-dashed border-base-300">
          <FaFilm className="text-6xl text-gray-300 mb-4" />{" "}
          {/* Ensure FaFilm is imported or use another icon */}
          <h3 className="text-2xl font-bold text-gray-500">
            No movies added yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start building your collection today!
          </p>
          <Link to="/dashboard/add-movie">
            <button className="btn btn-primary btn-wide rounded-full">
              <FaPlusCircle /> Add Your First Movie
            </button>
          </Link>
        </div>
      ) : (
        // Movie Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Area */}
              <figure className="relative h-56 overflow-hidden">
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/300x450"}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 badge badge-warning font-bold shadow-sm">
                  <FaStar className="mr-1" /> {movie.rating?.toFixed(1)}
                </div>
              </figure>

              {/* Content Area */}
              <div className="card-body p-5">
                <h3
                  className="card-title text-lg font-bold truncate"
                  title={movie.title}
                >
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="badge badge-ghost badge-sm">
                    {movie.genre}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt /> {movie.releaseYear}
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions justify-between mt-auto pt-4 border-t border-base-200">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/update-movie/${movie._id}`)
                    } // Fixed Route
                    className="btn btn-sm btn-warning btn-outline flex-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-sm btn-error btn-outline flex-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Add Missing Icon Import if needed
import { FaFilm } from "react-icons/fa";

export default MyCollection;
