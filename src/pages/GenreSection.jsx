import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Horror",
  "Sci-Fi",
  "Fantasy",
  "Adventure",
  "Mystery",
  "Animation",
  "Documentary",
];

const GenreSection = () => {
  return (
    <div className="w-full bg-base-100 text-base-content py-16 transition-colors duration-300">
      <div className="w-11/12 max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            🎬 Browse by Genre
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Explore movies by your favorite categories
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={20}
          loop={true}
          speed={3000} // Smooth continuous scroll speed
          autoplay={{
            delay: 0,
            disableOnInteraction: false, // User interaction won't stop it
            pauseOnMouseEnter: true, // Hovering will pause it
          }}
          modules={[Autoplay]}
          breakpoints={{
            // Mobile (Small screens)
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // Tablet (Medium screens)
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // Laptop (Large screens)
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            // Desktop (Extra large)
            1280: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="py-4"
        >
          {/* Duplicating array for infinite loop effect */}
          {genres.concat(genres).map((genre, index) => (
            <SwiperSlide key={`${genre}-${index}`}>
              <div className="flex justify-center">
                <Link to="/allmovies" className="w-full">
                  <button className="btn btn-outline btn-primary rounded-full w-full text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-sm">
                    {genre}
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GenreSection;
