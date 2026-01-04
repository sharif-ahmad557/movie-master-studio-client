import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaCamera,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import "animate.css";

const Profile = () => {
  const { user, logOut, updateUserProfile, updateUserEmail, auth } =
    useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating profile...");

    try {
      // 1. Update Name & Photo
      await updateUserProfile(name, photoURL);

      // 2. Update Email (if changed) - Requires Re-auth
      if (email !== user.email) {
        if (!password) {
          toast.error("Please enter your password to update email", {
            id: toastId,
          });
          return;
        }
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateUserEmail(email);
      }

      toast.success("Profile updated successfully", { id: toastId });
      setShowForm(false);
      setPassword("");
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-start pt-10 px-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl overflow-hidden border border-base-300">
        {/* Decorative Banner */}
        <div className="h-40 bg-gradient-to-r from-primary to-secondary relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start -mt-16 relative z-10">
            {/* Avatar Section */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="avatar">
                <div className="w-36 h-36 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 shadow-2xl overflow-hidden bg-base-300">
                  <img
                    src={
                      photoURL || "https://i.ibb.co/YbP7V6G/default-avatar.png"
                    }
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Info & Actions */}
            <div className="flex-1 text-center md:text-left pt-16 md:pt-16 space-y-2">
              <h2 className="text-3xl font-bold text-base-content">
                {name || "User Name"}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400">
                <FaEnvelope />
                <span>{email}</span>
                {user?.emailVerified && (
                  <span className="badge badge-success badge-xs text-white">
                    Verified
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className={`btn btn-sm ${
                    showForm ? "btn-neutral" : "btn-primary"
                  }`}
                >
                  <FaUserEdit /> {showForm ? "Cancel Edit" : "Edit Profile"}
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form Section */}
          {showForm && (
            <div className="mt-8 border-t border-base-200 pt-6 animate__animated animate__fadeIn text-base-content">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaUserEdit className="text-primary" /> Update Information
              </h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Display Name
                      </span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full pl-10 focus:input-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Photo URL Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Profile Photo URL
                      </span>
                    </label>
                    <div className="relative">
                      <FaCamera className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="input input-bordered w-full pl-10 focus:input-primary"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email Address
                    </span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full pl-10 focus:input-primary"
                      required
                    />
                  </div>
                  {email !== user.email && (
                    <span className="text-xs text-warning mt-1 ml-1">
                      Changing email requires re-authentication.
                    </span>
                  )}
                </div>

                {/* Password Input (Conditional) */}
                {email !== user.email && (
                  <div className="form-control animate__animated animate__fadeIn">
                    <label className="label">
                      <span className="label-text font-bold text-warning">
                        Confirm Password to Change Email
                      </span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full input-warning"
                      placeholder="Enter your current password"
                      required
                    />
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <button type="submit" className="btn btn-primary px-8">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
