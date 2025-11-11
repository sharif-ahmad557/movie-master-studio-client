import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./provider/AuthProvider.jsx";

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
      { path: "update/:id", element: <UpdateMovie /> },
      { path: "movies/add", element: <AddMovie /> },
      {
        path: "/update-movie/:id",
        element: <UpdateMovie />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
