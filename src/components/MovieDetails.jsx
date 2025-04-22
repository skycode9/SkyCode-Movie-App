import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { asyncLoadMovie } from "../store/actions/movieActions";
import { removeMovie } from "../store/reducers/movieSlice";
import { useSelector } from "react-redux";
import noImage from "/no-image.jpg";
import Loading from "./templates/Loading";
import { Link } from "react-router-dom";
import Card from "./templates/Card";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [sectionsLoading, setSectionsLoading] = useState({
    details: true,
    recommendations: true,
    similar: true,
  });

  const movieData = useSelector((state) => state.movie.info);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    setIsLoading(true);
    setSectionsLoading({
      details: true,
      recommendations: true,
      similar: true,
    });

    dispatch(asyncLoadMovie(id));

    // Set loading to false after a short delay to ensure UI updates
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSectionsLoading({
        details: false,
        recommendations: false,
        similar: false,
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      dispatch(removeMovie());
    };
  }, [id]);

  return movieData ? (
    <div
      className="w-full min-h-screen bg-zinc-900 px-4 md:px-6 overflow-auto relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original/${
          movieData.details.backdrop_path || noImage
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

        {movieData.details.homepage && (
          <a
            target="_blank"
            href={movieData.details.homepage}
            rel="noopener noreferrer"
            aria-label="Visit official website"
            className="hover:text-[#6556cd] transition-colors flex items-center gap-1"
          >
            <i className="ri-home-line"></i>
            <span className="text-sm md:text-base">Website</span>
          </a>
        )}

        {movieData.externalId?.wikidata_id && (
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${movieData.externalId.wikidata_id}`}
            rel="noopener noreferrer"
            aria-label="View on Wikidata"
            className="hover:text-[#6556cd] transition-colors flex items-center gap-1"
          >
            <i className="ri-external-link-line"></i>
            <span className="text-sm md:text-base">Wiki</span>
          </a>
        )}

        {movieData.externalId?.imdb_id && (
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${movieData.externalId.imdb_id}`}
            rel="noopener noreferrer"
            aria-label="View on IMDB"
            className="hover:text-[#6556cd] transition-colors flex items-center gap-1"
          >
            <i className="ri-imdb-line"></i>
            <span className="text-sm md:text-base">IMDB</span>
          </a>
        )}
      </nav>

      {/* Part-2 Main */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0">
        <div className="w-full md:w-[30%] flex justify-center md:justify-start">
          <img
            src={
              movieData.details.poster_path ||
              movieData.details.backdrop_path ||
              movieData.details.profile_path
                ? `https://image.tmdb.org/t/p/w500${
                    movieData.details.poster_path ||
                    movieData.details.backdrop_path
                  }`
                : noImage
            }
            alt={
              movieData.details.title ||
              movieData.details.name ||
              movieData.details.original_title ||
              movieData.details.original_name ||
              "Movie poster"
            }
            className="h-auto max-h-[50vh] md:max-h-[70vh] w-auto max-w-full rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-2"
          />
        </div>

        <div className="content w-full md:w-[67.5%] md:ml-[2.5%]">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {movieData.details.title ||
              movieData.details.name ||
              movieData.details.original_title ||
              movieData.details.original_name}
            {movieData.details.release_date && (
              <span className="text-zinc-100 font-normal ml-2">
                ({movieData.details.release_date?.split("-")[0]})
              </span>
            )}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-zinc-100 mb-4 mt-2">
            {movieData.details.release_date && (
              <>
                <span>
                  {movieData.details.release_date?.split("-").join("/")}
                </span>
                <span className="hidden md:inline">•</span>
              </>
            )}
            {movieData.details.runtime > 0 && (
              <>
                <span>{formatRuntime(movieData.details.runtime)}</span>
                <span className="hidden md:inline">•</span>
              </>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
              {movieData.details.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-zinc-800 rounded-md text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {movieData.details.vote_average > 0 && (
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border-2 border-[#6556cd]">
                <div className="text-center">
                  <span className="text-white font-bold text-lg md:text-xl">
                    {Math.round(movieData.details.vote_average * 10)}
                  </span>
                  <span className="text-white text-xs">%</span>
                </div>
              </div>
            </div>
          )}

          {movieData.details.tagline && (
            <p className="text-zinc-100 italic mb-3">
              {movieData.details.tagline}
            </p>
          )}

          {movieData.details.overview && (
            <div className="mb-4">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
                Overview
              </h3>
              <p className="text-zinc-100 leading-relaxed">
                {movieData.details.overview}
              </p>
            </div>
          )}

          {movieData.translations && movieData.translations.length > 0 && (
            <div className="mb-4">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
                Available Languages
              </h3>
              <p className="text-zinc-100 leading-relaxed">
                {movieData.translations.join(", ")}
              </p>
            </div>
          )}

          {movieData.videos && (
            <Link
              to={`${pathname}/trailer`}
              className="inline-flex items-center px-4 py-2 bg-[#6556CD] hover:bg-[#5447b0] transition-colors rounded text-white mb-4"
              aria-label="Play movie trailer"
            >
              <i className="ri-play-fill text-xl mr-1"></i>
              Play Trailer
            </Link>
          )}
        </div>
      </div>

      {/* Part-3 Available Platforms */}
      {movieData.watchProviders && (
        <div className="w-full flex flex-col gap-4 py-5 mt-4 border-t border-zinc-800">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            Where to Watch
          </h2>

          {movieData.watchProviders.rent &&
            movieData.watchProviders.rent.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <h3 className="text-white text-base md:text-lg font-medium w-full md:w-auto">
                  Available on Rent:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.watchProviders.rent.map((w, i) => (
                    <img
                      src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                      title={w.provider_name}
                      alt={`${w.provider_name} logo`}
                      key={i}
                      className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}

          {movieData.watchProviders.flatrate &&
            movieData.watchProviders.flatrate.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <h3 className="text-white text-base md:text-lg font-medium w-full md:w-auto">
                  Available on Streaming:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.watchProviders.flatrate.map((w, i) => (
                    <img
                      title={w.provider_name}
                      src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                      alt={`${w.provider_name} logo`}
                      key={i}
                      className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}

          {movieData.watchProviders.buy &&
            movieData.watchProviders.buy.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <h3 className="text-white text-base md:text-lg font-medium w-full md:w-auto">
                  Available to Buy:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.watchProviders.buy.map((w, i) => (
                    <img
                      src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                      title={w.provider_name}
                      alt={`${w.provider_name} logo`}
                      key={i}
                      className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Recommendations */}
      <div className="w-full py-5 mt-2 border-t border-zinc-800">
        <h2 className="text-xl md:text-3xl font-semibold text-white mb-4">
          Recommendations
        </h2>
        {sectionsLoading.recommendations ? (
          <Loading />
        ) : movieData.recommendations &&
          movieData.recommendations.length > 0 ? (
          <Card trending={movieData.recommendations} />
        ) : movieData.similar && movieData.similar.length > 0 ? (
          <>
            <h3 className="text-lg text-zinc-400 mb-3">
              No recommendations found. You might like these similar movies:
            </h3>
            <Card trending={movieData.similar} />
          </>
        ) : (
          <p className="text-zinc-400">
            No recommendations available for this movie.
          </p>
        )}
      </div>

      <Outlet context={{ videoId: movieData.videos?.key }} />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
