import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./templates/Topbar";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import baseUrl from "../utils/axios";
import MainCard from "./templates/MainCard";
import Loading from "./templates/Loading";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getTrending = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { data } = await baseUrl.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trending data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setHasMore(true);
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-full bg-zinc-900 overflow-x-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer mr-2"
            onClick={() => navigate(-1)}
          ></i>
          Trending
          <span className="text-zinc-400 text-sm ml-1">({category})</span>
        </h1>
        <div className="flex items-center w-[70%]">
          <Topbar />
          <Dropdown
            label="Category"
            options={["all", "movie", "tv"]}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="w-[1%]"></div>
          <Dropdown
            label="Duration"
            options={["week", "day"]}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <div
        id="scrollableDiv"
        style={{ height: "calc(100vh - 100px)", overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={trending.length}
          next={getTrending}
          hasMore={hasMore}
          loader={
            <div className="py-4 text-center">
              <Loading />
            </div>
          }
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden", width: "100%" }}
          endMessage={
            <p className="text-center text-zinc-500 py-4">
              You have seen all trending {category} content!
            </p>
          }
        >
          <MainCard data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
