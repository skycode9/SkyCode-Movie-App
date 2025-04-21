import React from "react";
import { Link } from "react-router-dom";
import noImage from "/no-image.jpg";

const Card = ({ trending }) => {
  return (
    <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
      {trending.map((item) => (
        <div
          key={item.id}
          className="flex-none w-52 transform transition-all hover:scale-105 duration-300"
        >
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src={
                item.poster_path || item.backdrop_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/w500${
                      item.poster_path ||
                      item.backdrop_path ||
                      item.profile_path
                    }`
                  : noImage
              }
              alt={
                item.title ||
                item.name ||
                item.original_title ||
                item.original_name ||
                "No Title"
              }
              className="w-full h-75 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold text-white truncate mb-2">
                  {item.title ||
                    item.name ||
                    item.original_title ||
                    item.original_name ||
                    "No Title"}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                  <span>
                    {item.release_date ||
                      item.first_air_date ||
                      item.air_date ||
                      "N/A"}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {item.overview || "No description available"}
                </p>
                <Link
                  to={`/${item.media_type}/details/${item.id}`}
                  className="text-sm text-blue-400"
                >
                  More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
