import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.png";
import { FaSun, FaMoon } from "react-icons/fa";

const ColorfulSpinner = ({ size = 48 }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-16 h-16 rounded-full animate-spin"
        style={{
          border: "6px solid",
          borderImage:
            "linear-gradient(45deg, #ff5f6d, #ffc371, #7bdff6, #9b5cff) 1",
          borderTopColor: "transparent",
        }}
      ></div>
    </div>
  );
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  //  Theme toggle function
  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.dispatchEvent(new Event("themeChange"));
  };

  // Theme effect
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //  Page load spinner
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-950">
        <ColorfulSpinner size={64} />
      </div>
    );
  }

  return (
    <div
      className={`shadow-sm transition-colors duration-500 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="shadow-sm bg-[#ebe1e1] transition-colors duration-300 ">
        <div className="navbar w-11/12 mx-auto flex justify-between items-center">
          {/* Left Side - Logo */}
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl font-semibold p-0">
              <img src={logo} alt="Logo" className="w-32 h-32 object-contain" />
            </Link>
          </div>

          {/* Center Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-lg font-medium">
              <li className="hover:text-gray-700 dark:hover:text-black">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-gray-700 dark:hover:text-black">
                <Link to="/allmovies">All Movies</Link>
              </li>
              <li className="hover:text-gray-700 dark:hover:text-black">
                <Link to="/mycollection">My Collection</Link>
              </li>
              <li className="hover:text-gray-700 dark:hover:text-black">
                <Link to="/movies/add">Add Movie</Link>
              </li>
            </ul>
          </div>

          {/* Right Side - User */}
          <div className="navbar-end flex items-center gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/YbP7V6G/default-avatar.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52"
                >
                  <li>
                    <p className="font-semibold text-center text-gray-900 dark:text-gray-100">
                      {user.displayName || "User"}
                    </p>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/watchlist">Watchlist</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary w-24">Login</button>
              </Link>
            )}

            {/* Theme Button */}
            <button
              onClick={handleThemeSwitch}
              className="btn btn-ghost btn-circle mr-2"
            >
              {theme === "light" ? (
                <FaMoon size={20} className="text-gray-700" />
              ) : (
                <FaSun size={20} className="text-amber-400" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="navbar-end lg:hidden">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle bg-black hover:bg-gray-800 text-white transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900 dark:text-gray-100"
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
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-gradient-to-b from-[#ffecd2] via-[#fcb69f] to-[#ff7e5f] rounded-box w-52 transition-all duration-300"
              >
                <li className="hover:bg-[#ffc371] rounded-md">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:bg-[#ffc371] rounded-md">
                  <Link to="/allmovies">All Movies</Link>
                </li>
                <li className="hover:bg-[#ffc371] rounded-md">
                  <Link to="/mycollection">My Collection</Link>
                </li>
                <li className="hover:bg-[#ffc371] rounded-md">
                  <Link to="/movies/add">Add Movie</Link>
                </li>
                {user ? (
                  <>
                    <li className="hover:bg-[#ffc371] rounded-md">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="hover:bg-[#ffc371] rounded-md">
                      <Link to="/watchlist">Watchlist</Link>
                    </li>
                    <li className="hover:bg-[#ff6b6b] rounded-md">
                      <button
                        onClick={handleLogout}
                        className="font-medium text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="hover:bg-[#ffc371] rounded-md">
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
