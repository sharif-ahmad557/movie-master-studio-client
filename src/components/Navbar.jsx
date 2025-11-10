import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="shadow-sm bg-[#ebe1e1]">
      <div className="navbar w-11/12 mx-auto">
        {/* Left Side */}
        <div className="navbar-start">
          {/* Hamburger Menu */}
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu font-medium menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allmovies">All Movies</Link>
              </li>
              <li>
                <Link to="/mycollection">My Collection</Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl font-semibold" to="/">
            🎬 MovieMaster Pro
          </Link>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allmovies">All Movies</Link>
            </li>
            <li>
              <Link to="/mycollection">My Collection</Link>
            </li>
          </ul>
        </div>

        {/* Right Side (Login Button) */}
        <div className="navbar-end">
          <Link to="/login">
            <button className="btn btn-dash btn-primary w-24">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
