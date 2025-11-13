import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./provider/AuthProvider.jsx";
import WatchlistProvider from "./provider/WatchlistProvider.jsx";

import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import MyCollection from "./pages/MyCollection.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import UpdateMovie from "./pages/UpdateMovie.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import MyWatchlist from "./pages/MyWatchlist.jsx";
import Watchlist from "./pages/Watchlist.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "allmovies", element: <AllMovies /> },
      // Protected routes
      {
        path: "mycollection",
        element: (
          <ProtectedRoute>
            <MyCollection />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "movies/add",
        element: (
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-movie/:id",
        element: (
          <ProtectedRoute>
            <UpdateMovie />
          </ProtectedRoute>
        ),
      },
      {
        path: "watchlist",
        element: (
          <ProtectedRoute>
            <MyWatchlist />
          </ProtectedRoute>
        ),
      },
      { path: "watchlist", element: <Watchlist /> },

      // Public routes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "movies/:id", element: <MovieDetails /> },
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
