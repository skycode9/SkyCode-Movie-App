import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import TvShow from "./components/TvShows";
import People from "./components/People";
import Movie from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Trailer from "./components/templates/Trailer";
import TvShowDetails from "./components/TvShowDetails";
import PersonDetails from "./components/PersonDetails";
import About from "./components/About";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div className="w-screen h-screen bg-zinc-900 flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/tv-shows" element={<TvShow />} />
        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv/details/:id" element={<TvShowDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
