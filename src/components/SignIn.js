import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";
import jwt_decode from "jwt-decode";

function SignIn() {
  const [signedIn, setSignedIn] = useState(false);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    const isValidToken = () => {
      const token = localStorage.getItem("token");
      try {
        const decodedToken = jwt_decode(token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        const currentDate = new Date();
        return expirationDate > currentDate;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    setSignedIn(isValidToken());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://at.usermd.net/api/user/auth", {
        login: formData.login,
        password: formData.password,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setSignedIn(true);
      })
      .catch((err) => console.log(err));
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
          Hasło:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Zaloguj</button>
      </form>
      <div className="signup-links">
        <Link className="signup-link" to="/">
          Home
        </Link>
        <Link className="signup-link" to="/signup">
          Sign Up
        </Link>
        {signedIn && <Navigate to="/add" replace={true} />}
      </div>
    </div>
  );
}

export default SignIn;
