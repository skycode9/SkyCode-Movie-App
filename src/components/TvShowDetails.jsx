import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { asyncLoadTV, removeTV } from "../store/actions/tvActions";
import { useSelector } from "react-redux";
import noImage from "/no-image.jpg";
import Loading from "./templates/Loading";
import { Link } from "react-router-dom";
import Card from "./templates/Card";

const TvShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tvData = useSelector((state) => state.tv.info);
  tvData;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    dispatch(asyncLoadTV(id));
    return () => {
      dispatch(removeTV());
    };
  }, [id]);
  return tvData ? (
    <div
      className="w-full min-h-screen bg-zinc-900 px-4 md:px-6 overflow-auto relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original/${
          tvData.details.backdrop_path || noImage
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Part-1 Navigation */}
      <nav className="w-full py-4 md:h-[10vh] flex items-center flex-wrap gap-4 md:gap-10 text-xl md:text-2xl text-zinc-100">
        <button
          className="hover:text-[#6556cd] flex items-center gap-1 transition-colors cursor-pointer"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
          <span className="text-sm md:text-base">Back</span>
        </button>

        <a
          target="_blank"
          href={tvData.details.homepage}
          rel="noopener noreferrer"
          aria-label="Visit official website"
          className="hover:text-[#6556cd] transition-colors flex items-center gap-1"
        >
          <i className="ri-home-line"></i>
          <span className="text-sm md:text-base">Website</span>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${tvData.externalId.wikidata_id}`}
          rel="noopener noreferrer"
          aria-label="View on Wikidata"
          className="hover:text-[#6556cd] transition-colors flex items-center gap-1"
        >
          <i className="ri-external-link-line"></i>
          <span className="text-sm md:text-base">Wiki</span>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${tvData.externalId.imdb_id}`}
          rel="noopener noreferrer"
          aria-label="View on IMDB"
          className="hover:text-[#6556cd] transition-colors flex items-center gap-1"
        >
          <i className="ri-imdb-line"></i>
          <span className="text-sm md:text-base">IMDB</span>
        </a>
      </nav>

      {/* Part-2 Main */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0">
        <div className="w-full md:w-[30%] flex justify-center md:justify-start">
          <img
            src={
              tvData.details.poster_path ||
              tvData.details.backdrop_path ||
              tvData.details.profile_path
                ? `https://image.tmdb.org/t/p/w500${
                    tvData.details.poster_path || tvData.details.backdrop_path
                  }`
                : noImage
            }
            alt={
              tvData.details.name || tvData.details.original_name || "No Title"
            }
            className="h-auto max-h-[50vh] md:max-h-[70vh] w-auto max-w-full rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-2"
          />
        </div>
        <div className="content w-full md:w-[67.5%] md:ml-[2.5%]">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {tvData.details.name || tvData.details.original_name}
            <span className="text-zinc-100 font-normal ml-2">
              ({tvData.details.first_air_date?.split("-")[0]})
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-zinc-100 mb-4 mt-2">
            <span>{tvData.details.first_air_date?.split("-").join("/")}</span>
            <span className="hidden md:inline">•</span>
            {tvData.details.number_of_seasons &&
              tvData.details.number_of_episodes && (
                <>
                  <span>
                    {tvData.details.number_of_seasons} Season
                    {tvData.details.number_of_seasons > 1 ? "s" : ""},{" "}
                    {tvData.details.number_of_episodes} Episode
                    {tvData.details.number_of_episodes > 1 ? "s" : ""}
                  </span>
                  <span className="hidden md:inline">•</span>
                </>
              )}
            <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
              {tvData.details.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-zinc-800 rounded-md text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border-2 border-[#6556cd]">
              <div className="text-center">
                <span className="text-white font-bold text-lg md:text-xl">
                  {Math.round(tvData.details.vote_average * 10)}
                </span>
                <span className="text-white text-xs">%</span>
              </div>
            </div>
          </div>

          {tvData.details.tagline && (
            <p className="text-zinc-100 italic mb-3">
              {tvData.details.tagline}
            </p>
          )}

          <div className="mb-4">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
              Overview
            </h3>
            <p className="text-zinc-100 leading-relaxed">
              {tvData.details.overview}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
              TV Show Translated
            </h3>
            <p className="text-zinc-100 leading-relaxed">
              {tvData.translations.join(", ")}
            </p>
          </div>

          <Link
            to={`${pathname}/trailer`}
            className="inline-flex items-center px-4 py-2 bg-[#6556CD] hover:bg-[#5447b0] transition-colors rounded text-white mb-4"
          >
            <i className="ri-play-fill text-xl mr-1"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part-3 Available Platforms */}
      <div className="w-full flex flex-col gap-4 py-5 mt-4 border-t border-zinc-800">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
          Where to Watch
        </h2>

        {tvData.watchProviders && tvData.watchProviders.rent && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <h3 className="text-white text-base md:text-lg font-medium w-full md:w-auto">
              Available on Rent:
            </h3>
            <div className="flex flex-wrap gap-2">
              {tvData.watchProviders.rent.map((w, i) => (
                <img
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  title={w.provider_name}
                  alt=""
                  key={i}
                  className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        {tvData.watchProviders && tvData.watchProviders.flatrate && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <h3 className="text-white text-base md:text-lg font-medium w-full md:w-auto">
              Available on Platforms:
            </h3>
            <div className="flex flex-wrap gap-2">
              {tvData.watchProviders.flatrate.map((w, i) => (
                <img
                  title={w.provider_name}
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                  key={i}
                  className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        {tvData.watchProviders && tvData.watchProviders.buy && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <h3 className="text-white text-base md:text-lg font-medium w-full md:w-auto">
              Available to Buy:
            </h3>
            <div className="flex flex-wrap gap-2">
              {tvData.watchProviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                  key={i}
                  className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Part-4 Seasons */}
      <div className="w-full flex flex-col gap-y-5 py-5 mt-2 border-t border-zinc-800">
        {tvData.details.seasons && tvData.details.seasons.length > 0 && (
          <div className="w-full">
            <h2 className="text-xl md:text-3xl font-semibold text-white mb-4">
              Seasons
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
              {tvData.details.seasons.map((season) => (
                <div
                  key={season.id}
                  className="flex-none w-[18%] mx-[1%] transform transition-all hover:scale-105 duration-300"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-2xl bg-zinc-800 bg-opacity-50 backdrop-filter backdrop-blur-sm">
                    <img
                      src={
                        season.poster_path
                          ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                          : noImage
                      }
                      alt={season.name || "Season"}
                      className="w-full aspect-[2/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white truncate mb-1">
                          {season.name || "Season"}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <span>{season.air_date || "N/A"}</span>
                          <span>{season.episode_count} Episodes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Part-5 Recommendations and Similar */}
      <div className="w-full py-5 mt-2 border-t border-zinc-800">
        <h2 className="text-xl md:text-3xl font-semibold text-white mb-4">
          Recommendations
        </h2>
        <Card
          trending={
            tvData.recommendations ? tvData.recommendations : tvData.similar
          }
          title="Recommendations"
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvShowDetails;
