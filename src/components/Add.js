import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUp.css";

function Add(props) {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({ title: "", image: "", content: "" });
  const [id, setId] = useState("");

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (props.isValidToken()) {
      try {
        await axios.post("https://at.usermd.net/api/movies", movie);
        setMovie({ title: "", image: "", content: "" });
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/signin");
    }
  };

  const handleDeleteMovie = async (e) => {
    e.preventDefault();
    if (props.isValidToken()) {
      try {
        await axios.delete(`https://at.usermd.net/api/movie/${id}`);
        setId("");
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/signin");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
    } else {
      setMovie({ ...movie, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <form onSubmit={handleAddMovie}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              name="image"
              value={movie.image}
              onChange={handleChange}
            />
          </label>
          <label>
            Content:
            <textarea
              className="m-3 w-100"
              name="content"
              value={movie.content}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Movie</button>
        </form>
      </div>
      <div className="signup-container">
        <form onSubmit={handleDeleteMovie}>
          <label>
            ID:
            <input
              className="m-3"
              type="text"
              name="id"
              value={id}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Delete Movie</button>
        </form>
      </div>
      <Link className="signup-container link" to="/">
        Back to Home
      </Link>
    </div>
  );
}

export default Add;
