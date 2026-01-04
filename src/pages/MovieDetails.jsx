import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useWatchlist } from "../provider/WatchlistProvider";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaEdit,
  FaTrash,
  FaPlay,
  FaStar,
  FaCalendarAlt,
  FaUserTie,
  FaLanguage,
  FaCheck,
} from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToWatchlist, watchlist } = useWatchlist();

  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInWatchlist = movie && watchlist.some((m) => m._id === movie._id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`https://movie-master-studio-server-uw8f.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);

        fetch("https://movie-master-studio-server-uw8f.vercel.app/movies")
          .then((res) => res.json())
          .then((allMovies) => {
            const related = allMovies.filter(
              (m) => m.genre === data.genre && m._id !== data._id
            );
            setRelatedMovies(related.slice(0, 4));
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Failed to load movie details");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this movie? This action cannot be undone."
      )
    ) {
      fetch(`https://movie-master-studio-server-uw8f.vercel.app/movies/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Movie deleted successfully!");
            navigate("/allmovies");
          } else {
            toast.error("Failed to delete movie!");
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    }
  };

  const handleAddToWatchlist = () => {
    if (!user) {
      toast.error("Please login to add to watchlist");
      navigate("/login");
      return;
    }
    if (isInWatchlist) {
      toast.error("Already in your watchlist!");
      return;
    }
    addToWatchlist(movie);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!movie) return <p className="text-center mt-10">Movie not found!</p>;

  // --- ROLE LOGIC ---
  const isAdmin = user?.email === "admin@movie.com";
  const isOwner = user?.email && movie.email === user.email;

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300 pb-16">
      <div className="relative w-full bg-base-200">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 blur-xl"
          style={{ backgroundImage: `url(${movie.posterUrl})` }}
        ></div>

        <div className="w-11/12 max-w-7xl mx-auto py-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Poster */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <img
                src={movie.posterUrl || "https://via.placeholder.com/400x600"}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-2xl w-80 lg:w-full max-h-[500px] object-cover border-4 border-base-100"
              />
            </div>

            {/* Info */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="badge badge-primary font-bold uppercase tracking-wider">
                    {movie.genre}
                  </span>
                  <span className="badge badge-outline">
                    {movie.duration || "N/A"} min
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-4 text-lg">
                  <div className="flex items-center gap-1 text-yellow-400 font-bold">
                    <FaStar /> {movie.rating?.toFixed(1)}
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="font-medium">{movie.releaseYear}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToWatchlist}
                  disabled={isInWatchlist}
                  className={`btn rounded-full px-6 ${
                    isInWatchlist ? "btn-success text-white" : "btn-primary"
                  }`}
                >
                  {isInWatchlist ? (
                    <>
                      <FaCheck /> Saved
                    </>
                  ) : (
                    <>
                      <FaHeart /> Add to Watchlist
                    </>
                  )}
                </button>
                <button className="btn btn-outline btn-secondary rounded-full px-6">
                  <FaPlay /> Watch Trailer
                </button>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-xl font-bold mb-2 border-b border-base-300 pb-1">
                  Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {movie.summary || "No description available."}
                </p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <FaUserTie />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Director
                    </p>
                    <p className="font-medium">{movie.director || "Unknown"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                    <FaLanguage />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Language
                    </p>
                    <p className="font-medium">{movie.language || "English"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-full text-accent">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Release Date
                    </p>
                    <p className="font-medium">{movie.releaseYear}</p>
                  </div>
                </div>

                {(isOwner || isAdmin) && (
                  <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4 border-t border-base-200 pt-4">
                    {/* EDIT: Visible to Owner AND Admin */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-movie/${movie._id}`)
                      }
                      className="btn btn-sm btn-warning"
                    >
                      <FaEdit /> Edit {isAdmin && !isOwner ? "(Admin)" : ""}
                    </button>

                    <button
                      onClick={handleDelete}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash /> Delete {isAdmin && !isOwner ? "(Admin)" : ""}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <div className="w-11/12 max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedMovies.map((relMovie) => (
              <Link
                to={`/movies/${relMovie._id}`}
                key={relMovie._id}
                className="group"
              >
                <div className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={relMovie.posterUrl}
                      alt={relMovie.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 badge badge-warning text-xs font-bold">
                      ⭐ {relMovie.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                      {relMovie.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {relMovie.releaseYear} • {relMovie.genre}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
