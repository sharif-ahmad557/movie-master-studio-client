import React from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaHeart, FaChartLine, FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "animate.css";

const AboutPlatform = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`w-full bg-base-100 text-base-content py-20 transition-colors duration-300 overflow-hidden`}
    >
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div
          className={`space-y-6 ${
            inView ? "animate__animated animate__fadeInLeft" : "opacity-0"
          }`}
        >
          <div className="badge badge-primary badge-outline font-bold">
            Who We Are
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Redefining Your <br />
            <span className="text-primary">Movie Experience</span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Movie Master Studio is your ultimate platform for discovering and
            exploring movies from all genres. We combine dynamic data with
            user-centric design to bring you a seamless entertainment journey.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <FaVideo size={20} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Limitless Discovery</h4>
                <p className="text-sm text-gray-500">
                  Explore curated lists from Action to Sci-Fi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                <FaHeart size={20} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Track Favorites</h4>
                <p className="text-sm text-gray-500">
                  Create your personal watchlist and collection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-lg text-accent">
                <FaChartLine size={20} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Live Analytics</h4>
                <p className="text-sm text-gray-500">
                  Real-time statistics on movies and users.
                </p>
              </div>
            </div>
          </div>

          <Link to="/contact">
            <button className="btn btn-primary mt-4 rounded-full px-8">
              Get in Touch <FaArrowRight />
            </button>
          </Link>
        </div>

        {/* Right Side: Image/Visual */}
        <div
          className={`relative ${
            inView ? "animate__animated animate__fadeInRight" : "opacity-0"
          }`}
        >
          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop"
            alt="Movie Studio Ambience"
            className="rounded-2xl shadow-2xl w-full object-cover h-[500px] border-4 border-base-200"
          />

          {/* Floating Card Effect */}
          <div className="absolute -bottom-6 -left-6 bg-base-100 p-6 rounded-xl shadow-xl border border-base-200 hidden md:block animate__animated animate__fadeInUp animate__delay-1s">
            <div className="flex items-center gap-4">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://i.pravatar.cc/150?img=1" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://i.pravatar.cc/150?img=2" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://i.pravatar.cc/150?img=3" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-12 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-lg">10k+ Users</p>
                <p className="text-xs text-gray-500">Trusted Community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPlatform;
