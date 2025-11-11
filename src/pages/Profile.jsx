import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const Profile = () => {
  const { user, logOut, updateUserProfile, updateUserEmail, auth } =
    useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [password, setPassword] = useState(""); // Recent login জন্য

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // DisplayName & PhotoURL আপডেট
      await updateUserProfile(name, photoURL);

      // Email পরিবর্তনের জন্য
      if (email !== user.email) {
        if (!password) {
          toast.error("Please enter your password to update email");
          return;
        }
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateUserEmail(email);
      }

      toast.success("Profile updated successfully");
      setShowForm(false);
      setPassword(""); // Password clear
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen py-10 text-white">
      <div className="max-w-4xl mx-auto my-12 p-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <img
              src={photoURL || "https://i.ibb.co/YbP7V6G/default-avatar.png"}
              alt="User Avatar"
              className="w-48 h-48 object-cover rounded-full border-4 border-gray-300"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold">{name || "User"}</h2>
            <p className="text-gray-400">{email}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleUpdate}
                className="mt-6 p-4 border rounded-lg shadow space-y-4 bg-gray-800"
              >
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-700 text-white"
                    required
                  />
                </div>

                {email !== user.email && (
                  <div>
                    <label className="block mb-1">
                      Enter Password to confirm
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-700 text-white"
                      placeholder="Your current password"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-700 text-white"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 w-1/2 bg-gray-600 rounded hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 w-1/2 bg-blue-600 rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
