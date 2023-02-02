import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/watch-movie.png";
import { BiLogIn } from "react-icons/bi";

function Header(props) {
  function logOut() {
    localStorage.removeItem("token");
    props.refreshMovie();
  }
  return (
    <div className="header">
      <div>
        <img src={logo} alt="logo of service" onClick={props.refreshMovie} />
      </div>
      <nav>
        <Link className="header-link" to="/signup">
          SIGN UP
        </Link>
        {props.isValidToken() ? (
          <button className="header-link" onClick={logOut}>
            LogOut
          </button>
        ) : (
          <Link className="header-link" to="/signin">
            SIGN IN
          </Link>
        )}
        <BiLogIn size="25px" style={{ marginRight: "10px" }} />
      </nav>
    </div>
  );
}

export default Header;
