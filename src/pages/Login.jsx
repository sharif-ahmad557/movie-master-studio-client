import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserSecret, FaUser } from "react-icons/fa";
import "animate.css";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handle Normal Login
  const handleLogin = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    logIn(email, password)
      .then(() => {
        toast.success("Login successful!", { id: toastId });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Login failed! Please check credentials.", {
          id: toastId,
        });
      });
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Google Login failed! Try again.");
      });
  };

  // Auto-fill Demo Credentials (Requirement 6)
  const handleDemoFill = (role) => {
    if (role === "admin") {
      setEmail("admin@movie.com");
      setPassword("Admin123!");
      toast.success("Admin credentials filled!");
    } else {
      setEmail("user@movie.com");
      setPassword("User123!");
      toast.success("User credentials filled!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div
        className={`bg-base-100 text-base-content p-8 rounded-2xl shadow-xl w-full max-w-md border border-base-300 transition-all duration-500 ${
          animate ? "animate__animated animate__fadeInUp" : "opacity-0"
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">
            Access your collection and analytics
          </p>
        </div>

        {/* Demo Buttons Section (Requirement 6) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => handleDemoFill("admin")}
            className="btn btn-outline btn-sm btn-error w-full flex items-center gap-2"
          >
            <FaUserSecret /> Demo Admin
          </button>
          <button
            onClick={() => handleDemoFill("user")}
            className="btn btn-outline btn-sm btn-info w-full flex items-center gap-2"
          >
            <FaUser /> Demo User
          </button>
        </div>

        <div className="divider text-xs text-gray-400 uppercase">
          Or Login with Email
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[50px] -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white text-lg rounded-xl mt-2"
          >
            Login
          </button>
        </form>

        <div className="divider my-6">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-neutral w-full flex items-center justify-center gap-3 rounded-xl bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-sm"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
