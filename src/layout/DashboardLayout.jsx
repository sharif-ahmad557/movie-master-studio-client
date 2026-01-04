import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaHome,
  FaUser,
  FaList,
  FaSignOutAlt,
  FaChartPie,
  FaSun,
  FaMoon,
  FaPlusCircle,
  FaHeart,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Check if Admin
  const isAdmin = user?.email === "admin@movie.com";

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen transition-colors duration-300">
        {/* Header */}
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40 px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl text-base-content">
            Dashboard
          </div>
          <div className="flex-none">
            <button
              onClick={handleThemeSwitch}
              className="btn btn-ghost btn-circle"
            >
              {theme === "light" ? (
                <FaMoon size={20} />
              ) : (
                <FaSun size={20} className="text-yellow-400" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content border-r border-base-300">
          {/* User Info */}
          <div className="mb-6 text-center pt-4">
            <div className="avatar placeholder mb-2">
              <div className="bg-neutral text-neutral-content rounded-full w-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xl">
                    {user?.displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>

            <h2 className="font-bold text-lg flex items-center justify-center gap-2">
              {user?.displayName || "User"}
              {/* ADMIN BADGE */}
              {isAdmin && (
                <span className="badge badge-error badge-xs text-white font-bold">
                  ADMIN
                </span>
              )}
            </h2>

            <p className="text-xs text-gray-500 truncate px-2">{user?.email}</p>
          </div>

          {/* Links */}
          <li className="mb-1">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? "active bg-primary text-white font-bold" : ""
              }
            >
              <FaChartPie /> Overview
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to="/dashboard/add-movie"
              className={({ isActive }) =>
                isActive ? "active bg-primary text-white font-bold" : ""
              }
            >
              <FaPlusCircle /> Add Movie
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to="/dashboard/my-collection"
              className={({ isActive }) =>
                isActive ? "active bg-primary text-white font-bold" : ""
              }
            >
              <FaList /> My Collection
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to="/dashboard/my-watchlist"
              className={({ isActive }) =>
                isActive ? "active bg-primary text-white font-bold" : ""
              }
            >
              <FaHeart /> My Watchlist
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? "active bg-primary text-white font-bold" : ""
              }
            >
              <FaUser /> My Profile
            </NavLink>
          </li>

          <div className="divider my-4"></div>

          <li className="mb-1">
            <Link to="/">
              <FaHome /> Back to Home
            </Link>
          </li>
          <li>
            <button
              onClick={logOut}
              className="text-error hover:bg-error/10 font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
