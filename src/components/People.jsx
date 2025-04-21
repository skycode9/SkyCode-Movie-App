import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/axios";
import Loading from "./templates/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Topbar from "./templates/Topbar";
import MainCard from "./templates/MainCard";

const People = () => {
  const navigate = useNavigate();
  document.title = "SkyCode | People";
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPeople = async () => {
    try {
      const { data } = await baseUrl.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching people data:", error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      getPeople();
    } else {
      setPage(1);
      setPeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return people.length > 0 ? (
    <div className="w-full h-full  bg-zinc-900">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer mr-2"
            onClick={() => navigate(-1)}
          ></i>
          People
        </h1>

        <div className="flex items-center justify-end w-[100%]">
          <Topbar />

          <div className="w-[1%]"></div>
        </div>
      </div>

      <div
        id="scrollableDiv"
        style={{ height: "calc(100vh - 100px)", overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={people.length}
          next={getPeople}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <MainCard data={people} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
