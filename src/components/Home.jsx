import React, { useEffect, useState } from "react";
import Sidebar from "./templates/Sidebar";
import Topbar from "./templates/Topbar";
import Header from "./templates/Header";
import baseUrl from "../utils/axios";
import Dropdown from "./templates/Dropdown";
import Card from "./templates/Card";
import Loading from "./templates/Loading";

const Home = () => {
  document.title = "SkyCode | Homepage";
  const [homeWallpaper, setHomeWallpaper] = useState("");
  const [trending, setTrending] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loadingWallpaper, setLoadingWallpaper] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);

  const getHomeWallpaper = async () => {
    setLoadingWallpaper(true);
    try {
      const { data } = await baseUrl.get("/trending/all/day");
      const random =
        data.results[(Math.random() * data.results.length).toFixed()];
      setHomeWallpaper(random);
    } catch (error) {
      console.error("Error fetching home wallpaper data:", error);
    } finally {
      setLoadingWallpaper(false);
    }
  };

  const getTrending = async () => {
    setLoadingTrending(true);
    try {
      const { data } = await baseUrl.get(`/trending/${selectedFilter}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    } finally {
      setLoadingTrending(false);
    }
  };

  useEffect(() => {
    getTrending();
    !homeWallpaper && getHomeWallpaper();
  }, [selectedFilter]);

  // Show full page loading only on initial load when both are loading
  if (
    loadingWallpaper &&
    !homeWallpaper &&
    loadingTrending &&
    trending.length === 0
  ) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="w-full min-h-screen overflow-auto overflow-x-hidden">
        <Topbar />
        <Header homeWallpaper={homeWallpaper} />
        <div className="w-full p-4 bg-gradient-to-r from-zinc-900 to-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold bg-clip-text bg-gradient-to-r text-zinc-300">
              Trending Now
            </h2>
            <Dropdown
              label="Filter"
              options={["tv", "movie", "all"]}
              category={(e) => setSelectedFilter(e.target.value.toLowerCase())}
            />
          </div>
          <Card trending={trending} />
        </div>
      </div>
    </div>
  );
};

export default Home;
