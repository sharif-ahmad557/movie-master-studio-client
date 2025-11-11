import React from "react";
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
    <div className="w-full bg-gray-900 text-white py-16">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          🎬 Browse by Genre
        </h2>
        <p className="text-gray-400 mb-10">
          Explore movies by your favorite genres
        </p>

        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          loop={true} 
          speed={4000}
          autoplay={{
            delay: 1000, // কোন delay নেই
            disableOnInteraction: false, // ইউজার interaction এও চলবে
          }}
          modules={[Autoplay]}
        >
          {genres.map((genre, index) => (
            <SwiperSlide key={index}>
              <div>
                <button className="btn btn-dash btn-warning py-4 px-6 rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300">
                        {genre}
                      </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GenreSection;
