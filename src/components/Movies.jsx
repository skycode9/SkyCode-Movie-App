import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/axios";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";
import MainCard from "./templates/MainCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Topbar from "./templates/Topbar";

const Movie = () => {
  document.title = "SkyCode | Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async () => {
    try {
      const { data } = await baseUrl.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return movie.length > 0 ? (
    <div className="w-full h-full  bg-zinc-900">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer mr-2"
            onClick={() => navigate(-1)}
          ></i>
          Movies{" "}
          <span className="text-zinc-400 text-sm ml-1">({category})</span>
        </h1>

        <div className="flex items-center justify-end w-[70%]">
          <Topbar />
          <Dropdown
            label="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            category={(e) => setCategory(e.target.value)}
          />

          <div className="w-[1%]"></div>
        </div>
      </div>

      <div
        id="scrollableDiv"
        style={{ height: "calc(100vh - 100px)", overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={movie.length}
          next={getMovie}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <MainCard data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
