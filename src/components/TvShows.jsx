import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/axios";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";
import MainCard from "./templates/MainCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Topbar from "./templates/Topbar";

const TvShow = () => {
  const navigate = useNavigate();
  document.title = "SkyCode | Tv Shows";
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTv = async () => {
    try {
      const { data } = await baseUrl.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching tv data:", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tv.length > 0 ? (
    <div className="w-full h-full  bg-zinc-900">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer mr-2"
            onClick={() => navigate(-1)}
          ></i>
          Tv Shows{" "}
          <span className="text-zinc-400 text-sm ml-1">({category})</span>
        </h1>

        <div className="flex items-center justify-end w-[70%]">
          <Topbar />
          <Dropdown
            label="Category"
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="w-[1%]"></div>
        </div>
      </div>

      <div
        id="scrollableDiv"
        style={{ height: "calc(100vh - 100px)", overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={tv.length}
          next={getTv}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <MainCard data={tv} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShow;
