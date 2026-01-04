import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.svg";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme toggle function
  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = document.documentElement;

    // Set for DaisyUI
    root.setAttribute("data-theme", theme);

    // Set for Tailwind Dark Mode
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  // Common Navigation Links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allmovies"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "hover:text-primary"
          }
        >
          All Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "hover:text-primary"
          }
        >
          Contact
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/my-collection"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "hover:text-primary"
              }
            >
              My Collection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-movie"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "hover:text-primary"
              }
            >
              Add Movie
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 shadow-md bg-base-100 transition-colors duration-300">
      <div className="navbar w-11/12 mx-auto px-0">
        {/* Left Side - Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="btn btn-ghost text-xl font-semibold p-0 hover:bg-transparent"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Menu (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium text-base-content">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeSwitch}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <FaMoon size={20} className="text-gray-600" />
            ) : (
              <FaSun size={20} className="text-yellow-400" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/YbP7V6G/default-avatar.png"
                    }
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 rounded-box w-52 border border-base-300"
              >
                <li className="mb-2 border-b border-base-300 pb-2">
                  <p className="font-semibold text-center text-base-content truncate">
                    {user.displayName || "User"}
                  </p>
                </li>
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge badge-primary badge-sm">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/my-watchlist">Watchlist</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary btn-sm md:btn-md px-6 text-white font-semibold">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Dropdown Menu */}
          <div className="dropdown dropdown-end lg:hidden ml-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-base-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 rounded-box w-52 border border-base-300"
            >
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
