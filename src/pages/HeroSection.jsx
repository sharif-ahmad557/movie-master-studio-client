import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((m) => m.rating >= 8);
        setMovies(featured.slice(0, 10));
        console.log("Movies loaded:", featured.slice(0, 10));
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className=" w-full bg-gray-900 text-white py-8">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          🎬 Featured Movies
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Discover the most loved Islamic & historical masterpieces
        </p>

        {movies.length === 0 ? (
          <p className="text-center text-gray-400">
            Loading featured movies...
          </p>
        ) : (
          <Slider {...settings} className="overflow-hidden">
            {movies.map((movie) => (
              <div key={movie._id} className="px-3">
                <div className="relative h-[500px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full"
                  />

                  <div className="absolute inset-0  bg-opacity-100 flex flex-col justify-center items-center bg-black/60 text-center p-4 text-white">
                    <h3 className="text-2xl font-semibold">{movie.title}</h3>
                    <p className="text-gray-300 mb-3">
                      ⭐ {movie.rating} | {movie.genre} | 📅 {movie.releaseYear}
                    </p>
                    <button
                      onClick={() => navigate(`/movies/${movie._id}`)}
                      className=" px-5 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      <button className="btn btn-dash btn-warning">
                        View Details
                      </button>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
