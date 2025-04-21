import React from "react";
import { Link } from "react-router-dom";
import noImage from "/no-image.jpg";

const Header = ({ homeWallpaper }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original/${
          homeWallpaper.backdrop_path || homeWallpaper.poster_path || noImage
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[90vh] flex justify-start items-end"
    >
      <div className="w-[70%] flex flex-col justify-end items-start gap-2 p-[2%]">
        <h1 className="text-5xl text-white font-black">
          {homeWallpaper.title ||
            homeWallpaper.name ||
            homeWallpaper.original_title ||
            homeWallpaper.original_name}
        </h1>
        <p className="text-white mt-2">
          {homeWallpaper.overview
            ? homeWallpaper.overview.slice(0, 100) + "..."
            : "No overview available"}
          <Link
            className="text-blue-400  font-bold"
            to={`/${homeWallpaper.media_type}/details/${homeWallpaper.id}`}
          >
            More
          </Link>
        </p>
        <p className="text-white mt-1 flex flex-row gap-5  items-center">
          <span className="flex items-center ">
            <i className="ri-calendar-fill mr-1 text-[#6556CD]"></i>
            {homeWallpaper.release_date || homeWallpaper.first_air_date || ""}
          </span>
          <span className="flex items-center">
            <i className="ri-star-fill text-[#6556CD] mr-1"></i>
            {homeWallpaper.vote_average || ""}
          </span>
          <span className="flex items-center">
            <i className="ri-album-fill text-[#6556CD] mr-1"></i>
            {homeWallpaper.media_type
              ? homeWallpaper.media_type.toUpperCase()
              : ""}
          </span>
        </p>
        <p className="text-white mt-1 flex flex-row gap-2  items-center">
          <Link
            className="bg-[#6556CD] px-4 py-2 rounded mt-1 duration-300"
            to={`/${homeWallpaper.media_type}/details/${homeWallpaper.id}/trailer`}
          >
            Watch Trailer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Header;
