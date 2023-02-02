import React, { useEffect } from "react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Add from "./components/Add";
import Details from "./components/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
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
  useEffect(() => {
    isValidToken();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home isValidToken={isValidToken} />}
        ></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route
          exact
          path="/add"
          element={<Add isValidToken={isValidToken} />}
        ></Route>
        <Route exact path="/details" element={<Details />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
