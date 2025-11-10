import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-teal-600 via-purple-700 to-indigo-700 text-white pt-16">
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

      <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between md:items-start gap-8 relative z-10">
        {/* Quick Links */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h2 className="font-bold text-lg mb-4 tracking-wide">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "All Movies", "My Collection", "Profile"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className="hover:text-teal-200 transition-all duration-300 hover:scale-105 block px-2 py-1 rounded hover:bg-white/10"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h2 className="font-bold text-lg mb-4 tracking-wide">Follow Us</h2>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 bg-white text-teal-700 rounded-full hover:text-white hover:bg-teal-700 shadow-lg hover:scale-110 transform transition duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="md:w-1/3">
          <h2 className="font-bold text-lg mb-4 tracking-wide">About</h2>
          <p className="text-gray-100 text-sm mb-4">
            MovieMaster Pro brings your favorite movies to your fingertips.
            Discover, collect, and enjoy in style.
          </p>
        </div>
      </div>

      {/* Copyright at the bottom */}
      <div className="mt-8 border-t border-white border-opacity-20 pt-4 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
      </div>

      {/* Subtle animated shine */}
      <div className="absolute inset-0 bg-white opacity-5 animate-pulse pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
