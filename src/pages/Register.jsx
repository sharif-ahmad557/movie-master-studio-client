import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import "animate.css";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password Validation (As per logic)
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter.");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password must contain at least 1 lowercase letter.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await createUser(email, password);

      // Update Profile
      await updateUserProfile(name, photoURL);

      // Manually update local state if needed immediately
      if (result.user) {
        result.user.displayName = name;
        result.user.photoURL = photoURL;
      }

      toast.success("Registration successful! Welcome aboard.");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div
        className={`bg-base-100 text-base-content p-8 rounded-2xl shadow-xl w-full max-w-md border border-base-300 transition-all duration-500 ${
          animate ? "animate__animated animate__fadeInUp" : "opacity-0"
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm">
            Join us to start your movie journey
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              required
              className="input input-bordered w-full focus:input-primary bg-base-200"
            />
          </div>

          {/* Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
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
            <label className="label">
              <span className="label-text-alt text-gray-400">
                Must contain uppercase, lowercase & 6+ chars.
              </span>
            </label>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-white text-lg rounded-xl mt-4 flex items-center gap-2"
          >
            <FaUserPlus /> Register
          </button>
        </form>

        <div className="divider my-6">OR</div>

        {/* Google login button */}
        <button
          onClick={handleGoogle}
          className="btn btn-neutral w-full flex items-center justify-center gap-3 rounded-xl bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-sm"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Login link */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
