import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FilmTmp from "./FilmTmp";
import axios from "axios";

import "../styles/Home.css";

function Home(props) {
  const API_URL = "https://at.usermd.net/api/movies";

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      const movies = response.data;
      const allFilms = movies.map((movie) => {
        return (
          <FilmTmp
            title={movie.title}
            image={movie.image}
            content={movie.content}
          />
        );
      });
      setMovies(allFilms);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim().toLowerCase();
    let matchingMovie = null;
    movies.forEach((movie) => {
      if (movie.props.title.trim().toLowerCase().includes(query)) {
        matchingMovie = movie;
      }
    });
    if (matchingMovie) {
      const updatedMovies = [
        matchingMovie,
        ...movies.filter((movie) => movie !== matchingMovie),
      ];
      setMovies(updatedMovies);
    }
  };

  function refreshMovie() {
    window.location.reload(false);
  }

  return (
    <div
      className="d-flex flex-wrap"
      style={{
        position: "relative",
        paddingBottom: "30px",
      }}
    >
      <Header refreshMovie={refreshMovie} isValidToken={props.isValidToken} />
      <div className="container-search">
        <form className="container-search" onSubmit={handleSubmit}>
          <input ref={inputRef} className="desktop-only" type="text" />
          <button className="search">Szukaj</button>
        </form>
      </div>
      {movies}
      <Footer />
    </div>
  );
}

export default Home;
