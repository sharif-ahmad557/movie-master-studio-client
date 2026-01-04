import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "animate.css";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Movie Critic",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    comment:
      "The best platform to keep track of my watched movies. The UI is incredibly smooth and the dark mode is a lifesaver for night browsing!",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Film Student",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 4.5,
    comment:
      "I love the detailed statistics section. It really helps me analyze my watching habits. Highly recommended for movie buffs.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Casual Viewer",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment:
      "Simple, fast, and responsive. Adding movies is super easy. The recommendation engine is also quite spot on.",
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="w-full bg-base-100 text-base-content py-20 transition-colors duration-300"
    >
      <div className="w-11/12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12">
          Join thousands of satisfied users who trust MovieMaster Studio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`bg-base-200 p-8 rounded-3xl shadow-lg border border-base-300 relative text-left hover:-translate-y-2 transition-transform duration-300 ${
                inView ? "animate__animated animate__zoomIn" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <FaQuoteLeft className="text-4xl text-primary/20 absolute top-6 right-6" />

              <div className="flex items-center gap-4 mb-6">
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={review.image} alt={review.name} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{review.name}</h3>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>

              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(review.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
