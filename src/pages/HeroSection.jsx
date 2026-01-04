import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaCalendarAlt, FaPlay } from "react-icons/fa";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://movie-master-studio-server-uw8f.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        // Filter high-rated movies
        const featured = data.filter((m) => m.rating >= 8);
        setMovies(featured.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading movies:", err);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div style={{ bottom: "20px" }}>
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
  };

  if (loading) {
    return (
      <div className="w-full h-[65vh] flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[75vh] md:h-[80vh] bg-black overflow-hidden group">
      {movies.length === 0 ? (
        <div className="flex justify-center items-center h-full text-white">
          <p>No featured movies available.</p>
        </div>
      ) : (
        <Slider {...settings} className="w-full h-full hero-slider">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="relative w-full h-[75vh] md:h-[80vh] outline-none"
            >
              {/* 1. BLURRED BACKGROUND IMAGE (Ambience) */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-110 opacity-50"
                style={{ backgroundImage: `url(${movie.posterUrl})` }}
              ></div>

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>

              {/* 2. MAIN CONTENT CONTAINER */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-11/12 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left: Text Content */}
                  <div className="space-y-5 text-white order-2 md:order-1 text-center md:text-left">
                    <span className="badge badge-warning text-xs font-bold uppercase tracking-wider">
                      Top Rated
                    </span>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                      {movie.title}
                    </h1>

                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm md:text-base text-gray-300 font-medium">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <FaStar /> {movie.rating}
                      </span>
                      <span className="hidden md:inline">|</span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {movie.releaseYear}
                      </span>
                      <span className="hidden md:inline">|</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs border border-white/30">
                        {movie.genre}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm md:text-lg max-w-lg mx-auto md:mx-0 line-clamp-3 md:line-clamp-4 leading-relaxed">
                      {movie.summary ||
                        "Dive into this amazing cinematic experience. A story that captivates and inspires."}
                    </p>

                    <div className="pt-2 flex justify-center md:justify-start gap-4">
                      <Link to={`/movies/${movie._id}`}>
                        <button className="btn btn-primary border-none text-white px-8 shadow-lg hover:shadow-primary/50 transition-all">
                          <FaPlay className="mr-2" /> View Details
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Original Poster (Visible clearly now) */}
                  <div className="hidden md:flex justify-center order-1 md:order-2">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      referrerPolicy="no-referrer"
                      className="w-auto h-[400px] lg:h-[500px] object-contain rounded-xl shadow-2xl border-4 border-white/10 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Visual Hint (Animated Scroll Down) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20 opacity-80">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
