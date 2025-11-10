import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ একসাথে ঠিক করা হয়েছে
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import MyCollection from "./pages/MyCollection.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./provider/AuthProvider.jsx"; // ✅ AuthProvider ইমপোর্ট করা হয়েছে
import Register from "./pages/Register.jsx";

// ✅ Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ Component → element
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allmovies",
        element: <AllMovies />,
      },
      {
        path: "mycollection",
        element: <MyCollection />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

// ✅ Rendering
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
