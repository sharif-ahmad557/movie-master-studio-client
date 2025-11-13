import React, { useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { AuthContext } from "../provider/AuthProvider";

const Footer = () => {
  const { user } = useContext(AuthContext); // Auth state
  const navigate = useNavigate();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const links = [
    { name: "Home", path: "/", private: false },
    { name: "All Movies", path: "/allmovies", private: false },
    { name: "My Collection", path: "/mycollection", private: true },
    { name: "Profile", path: "/profile", private: true },
    { name: "Add Movie", path: "/addmovie", private: true },
    { name: "Update Movie", path: "/updatemovie", private: true },
  ];

  const handleClick = (link) => {
    if (link.private && !user) {
      navigate("/login");
    } else {
      navigate(link.path);
    }
  };

  return (
    <footer className="relative bg-gradient-to-r from-teal-600 via-purple-700 to-indigo-700 text-white pt-16 pb-10 overflow-hidden">
      {/* Curved top edge */}
      <div className="absolute -top-10 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.53,22.64,104.84,35.33,158,28.88C230,66.2,288,44.74,348,42.86c70.34-2.24,137.08,22.43,207,35.77,70.12,13.37,141.78,14.06,211,0,71.17-14.52,136.78-44.33,208-36.6,46.83,5.4,96.3,32.9,144,41.6V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 md:flex md:justify-between md:items-start gap-8 relative z-10 transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Quick Links */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h2 className="font-bold text-lg mb-4 tracking-wide animate-pulse">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {links.map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleClick(link)}
                  className="block px-2 py-1 rounded transition-all duration-300 transform hover:scale-110 hover:text-teal-200 hover:bg-white/20 w-full text-left"
                >
                  {link.name} {link.private && "(Private)"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h2 className="font-bold text-lg mb-4 tracking-wide animate-bounce">
            Follow Us
          </h2>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 bg-white text-teal-700 rounded-full shadow-lg transform transition duration-500 hover:scale-125 hover:bg-teal-700 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="md:w-1/3">
          <h2 className="font-bold text-lg mb-4 tracking-wide animate-pulse">
            About
          </h2>
          <p className="text-gray-100 text-sm mb-4 animate-fadeIn">
            MovieMaster Pro brings your favorite movies to your fingertips.
            Discover, collect, and enjoy in style.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-white border-opacity-20 pt-4 text-center text-gray-200 text-sm animate-pulse">
        &copy; {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
      </div>

      <div className="absolute inset-0 bg-white opacity-5 animate-pulse pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
