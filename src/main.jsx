import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import MyCollection from "./pages/MyCollection.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import Profile from "./pages/Profile.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

// ✅ Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "allmovies", element: <AllMovies /> },
      { path: "mycollection", element: <MyCollection /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "movies/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);

// ✅ Rendering
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* 🔹 Toaster wrap করা হলো */}
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </>
    </AuthProvider>
  </StrictMode>
);
