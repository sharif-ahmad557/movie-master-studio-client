import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, logOut, updateUserProfile } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile(name, photoURL)
      .then(() => {
        toast.success("Profile updated successfully");
        setShowForm(false);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left: Avatar */}
        <div className="flex-shrink-0">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/YbP7V6G/default-avatar.png"
            }
            alt="User Avatar"
            className="w-48 h-48 object-cover rounded-full border-4 border-gray-300"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{user?.displayName || "User"}</h2>
          <p className="text-gray-600">{user?.email}</p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>

          {/* Inline Update Form */}
          {showForm && (
            <form
              onSubmit={handleUpdate}
              className="mt-6 p-4 border rounded shadow space-y-4 bg-gray-50"
            >
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">Photo URL</label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div className="flex justify-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 w-1/2 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 w-1/2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
