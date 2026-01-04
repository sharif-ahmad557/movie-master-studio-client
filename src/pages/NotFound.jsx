import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-base-100 text-base-content mb-4">
      <div className="animate__animated animate__bounceIn">
        <FaExclamationTriangle className="text-9xl text-warning mb-4 mx-auto opacity-80" />
      </div>

      <h1 className="text-7xl md:text-9xl font-extrabold text-primary tracking-widest">
        404
      </h1>

      <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4">
        Oops! The scene you're looking for doesn't exist.
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        The page you requested might have been removed, had its name changed, or
        is temporarily unavailable.
      </p>

      <Link to="/">
        <button className="btn btn-primary btn-lg rounded-full px-8 text-white shadow-lg hover:scale-105 transition-transform">
          <FaHome className="mr-2" /> Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
