import React from "react";
import { Link } from "react-router-dom";
import noImage from "/no-image.jpg";

const MainCard = ({ data, title }) => {
  return (
    <div className="px-6 py-4 bg-zinc-900 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-full">
        {data.map((elem, index) => (
          <Link
            to={`/${elem.media_type || title}/details/${elem.id}`}
            key={index}
            className="block relative overflow-hidden rounded-xl group"
          >
            <div className="relative aspect-[2/3]">
              <img
                src={
                  elem.poster_path || elem.backdrop_path || elem.profile_path
                    ? `https://image.tmdb.org/t/p/w500${
                        elem.poster_path ||
                        elem.backdrop_path ||
                        elem.profile_path
                      }`
                    : noImage
                }
                alt={
                  elem.title ||
                  elem.name ||
                  elem.original_title ||
                  elem.original_name ||
                  "No Title"
                }
                className="w-full h-full object-cover rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
              />

              {/* Rating Badge */}
              {elem.vote_average > 0 && (
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
                  <i className="ri-star-fill text-amber-400 text-sm" />
                  <span className="text-white font-semibold text-sm">
                    {elem.vote_average.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h1 className="text-white text-lg font-semibold line-clamp-2 mb-1">
                  {elem.title ||
                    elem.name ||
                    elem.original_title ||
                    elem.original_name ||
                    elem.known_for ||
                    "No Title"}
                </h1>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <span>
                    {elem.release_date?.split("-")[0] ||
                      elem.first_air_date?.split("-")[0] ||
                      elem.known_for_department ||
                      "N/A"}
                  </span>
                  {elem.original_language && (
                    <span className="uppercase px-2 py-0.5 bg-zinc-800 rounded-md text-xs">
                      {elem.original_language}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainCard;
