import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./provider/AuthProvider.jsx";
import WatchlistProvider from "./provider/WatchlistProvider.jsx";

// Layouts
import MainLayout from "./layout/MainLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import MyCollection from "./pages/MyCollection.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import UpdateMovie from "./pages/UpdateMovie.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import MyWatchlist from "./pages/MyWatchlist.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const router = createBrowserRouter([
  // 1. PUBLIC ROUTES (Main Website Layout)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "allmovies", element: <AllMovies /> },
      { path: "movies/:id", element: <MovieDetails /> }, 
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // 2. DASHBOARD ROUTES (Private & Dashboard Layout)
  // Requirement 7: Private CRUD pages must be inside the dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />, // Overview / Stats
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-collection",
        element: <MyCollection />,
      },
      {
        path: "add-movie",
        element: <AddMovie />,
      },
      {
        path: "update-movie/:id",
        element: <UpdateMovie />,
      },
      {
        path: "my-watchlist",
        element: <MyWatchlist />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WatchlistProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </WatchlistProvider>
    </AuthProvider>
  </StrictMode>
);
