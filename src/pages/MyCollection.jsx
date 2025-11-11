import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!user?.email) return; // ✅ নিরাপদ চেক

    axios
      .get(`https://your-api-url.com/collections?email=${user.email}`)
      .then((res) => setCollections(res.data))
      .catch(() => toast.error("Failed to load collections"));
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10">Please login to see your collection.</p>
    );
  }

  return (
    <div className="w-10/12 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">My Movie Collection</h2>
      {collections.length > 0 ? (
        <ul>
          {collections.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MyCollection;
