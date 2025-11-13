import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "animate.css";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false); 
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    logIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message || "Login failed! Please try again.");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login successful!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message || "Google Login failed! Try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div
        className={`bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-0 ${
          animate ? "animate__animated animate__fadeInUp" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-12 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={22} />
              ) : (
                <AiFillEye size={22} />
              )}
            </button>
          </div>

          <button type="submit" className="w-full btn btn-dash btn-warning">
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-row border-gray-300" />
          <hr className="flex-row border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full btn btn-dash btn-warning flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
