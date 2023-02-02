import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import "../styles/SignUp.css";

function SignUp() {
  const [isCreated, setIsCreated] = useState(false);

  const [formData, setFormData] = useState({
    login: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://at.usermd.net/api/user/create",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);
      setIsCreated(true);
      setFormData({
        login: "",
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nazwa:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Hasło:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Zarejestruj</button>
        {isCreated && <Navigate to="/signin" replace={true} />}
      </form>
      <div className="signup-links">
        <Link className="signup-link" to="/">
          Home
        </Link>
        <Link className="signup-link" to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
