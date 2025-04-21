import React, { useEffect, useState } from "react";
import baseUrl from "../../utils/axios";
import { Link } from "react-router-dom";
import noImage from "/no-image.jpg";

const Topbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await baseUrl.get(`search/multi?query=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("error:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    // Only search if there's actually a query
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500); // Debounce search by 500ms

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="w-full h-[10vh] flex items-center justify-center">
      <div className="relative flex items-center w-full max-w-md rounded-full transition-all duration-300">
        <div className="flex items-center w-full rounded-full bg-zinc-800/40 border border-zinc-700 focus-within:border-[#6556CD] focus-within:ring-1 focus-within:ring-[#6556CD] transition-all duration-300">
          <i className="ri-search-line text-zinc-400 ml-4 text-lg"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search Movies, TV shows, Person..."
            className="bg-transparent text-white px-3 py-2.5 w-full placeholder-zinc-500 focus:outline-none rounded-full text-sm"
          />
          {searchQuery && (
            <i
              className="ri-close-line text-zinc-400 mr-4 text-lg cursor-pointer hover:text-zinc-200 transition-colors"
              onClick={handleClear}
            ></i>
          )}
        </div>

        {searchQuery && searchResults.length > 0 && isFocused && (
          <div className="absolute top-[105%] max-h-[70vh] w-full bg-zinc-900 rounded-xl overflow-hidden z-50 shadow-lg border border-zinc-700">
            <div className="p-3 bg-zinc-800 border-b border-zinc-700">
              <h3 className="text-white font-medium">
                Search Results for "{searchQuery}"
              </h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {searchResults.map((result) => {
                const mediaType = result.media_type || "movie";
                const mediaTypeLabel =
                  mediaType === "movie"
                    ? "Movie"
                    : mediaType === "tv"
                    ? "TV Show"
                    : mediaType === "person"
                    ? "Person"
                    : "Other";

                return (
                  <Link
                    key={result.id}
                    to={`/${mediaType}/details/${result.id}`}
                    className="flex items-center p-3 border-b border-zinc-800 hover:bg-zinc-800 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 relative w-12 h-16 md:w-14 md:h-20 overflow-hidden rounded-md mr-3">
                      <img
                        src={
                          result.poster_path ||
                          result.backdrop_path ||
                          result.profile_path
                            ? `https://image.tmdb.org/t/p/w200${
                                result.poster_path ||
                                result.backdrop_path ||
                                result.profile_path
                              }`
                            : noImage
                        }
                        alt={result.title || result.name || "Media"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">
                        {result.title ||
                          result.name ||
                          result.original_title ||
                          result.original_name}
                      </h4>

                      <div className="flex items-center mt-1">
                        <span className="px-2 py-0.5 text-xs bg-[#6556CD] text-white rounded-md mr-2">
                          {mediaTypeLabel}
                        </span>

                        {result.release_date && (
                          <span className="text-zinc-400 text-xs">
                            {new Date(result.release_date).getFullYear()}
                          </span>
                        )}

                        {result.first_air_date && (
                          <span className="text-zinc-400 text-xs">
                            {new Date(result.first_air_date).getFullYear()}
                          </span>
                        )}

                        {result.vote_average > 0 && (
                          <div className="flex items-center ml-2">
                            <i className="ri-star-fill text-yellow-500 text-xs mr-1"></i>
                            <span className="text-zinc-400 text-xs">
                              {result.vote_average.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {result.overview && (
                        <p className="text-zinc-400 text-xs mt-1 line-clamp-1">
                          {result.overview}
                        </p>
                      )}
                    </div>

                    <i className="ri-arrow-right-s-line text-zinc-500 ml-2"></i>
                  </Link>
                );
              })}
            </div>

            {searchResults.length > 5 && (
              <div className="p-2 bg-zinc-800 text-center">
                <Link
                  to={`/search?q=${searchQuery}`}
                  className="text-[#6556CD] hover:text-white text-sm transition-colors"
                >
                  View all results
                </Link>
              </div>
            )}
          </div>
        )}

        {searchQuery && searchResults.length === 0 && isFocused && (
          <div className="absolute top-[105%] w-full bg-zinc-900 rounded-xl p-4 z-50 shadow-lg border border-zinc-700 text-center">
            <i className="ri-search-eye-line text-zinc-500 text-3xl mb-2"></i>
            <p className="text-zinc-400">
              No results found for "{searchQuery}"
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              Try different keywords or check spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
