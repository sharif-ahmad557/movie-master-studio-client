import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}/movies`,
        { ...formData, addedBy: user.email },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        Toast.success("Movie added");
        navigate("/movies/my-collection");
      })
      .catch(() => Toast.error("Add movie failed"));
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
