import React from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[25%] h-screen overflow-y-auto border-r border-zinc-100 p-10 bg-zinc-900">
      <Link to="/" className="block">
        <h1 className="text-3xl text-white font-bold hover:text-[#6556CD] transition-colors duration-300">
          <i className="text-[#6556CD] ri-video-ai-fill mr-2"></i>
          <span>Movie App</span>
        </h1>
      </Link>
      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-xl text-white font-semibol mt-10 mb-5">
          Movie Feed
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-1 ri-fire-fill"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-2 ri-sparkling-fill"></i>
          Popular
        </Link>
        <Link
          to="/movies"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-2 ri-movie-2-line"></i>
          Movies
        </Link>
        <Link
          to="/tv-shows"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-2 ri-tv-fill"></i>
          Tv Shows
        </Link>
        <Link
          to="/people"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-2 ri-team-fill"></i>
          People
        </Link>
      </nav>

      <hr className="border-none bg-zinc-300 h-[1px] mt-4.5" />

      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-xl text-white font-semibol mt-5 mb-5">
          Website Information
        </h1>
        <Link
          to="/about"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-2 ri-information-2-fill"></i>
          About Us
        </Link>
        <Link
          to="/contact"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded p-2.5"
        >
          <i className="mr-2 ri-phone-fill"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
