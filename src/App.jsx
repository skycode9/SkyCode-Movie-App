import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import TvShow from "./components/TvShows";

const App = () => {
  return (
    <div className="w-screen h-screen bg-zinc-900 flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/tv-shows" element={<TvShow />} />
      </Routes>
    </div>
  );
};

export default App;
