import React, { useEffect, useState } from "react";
import Sidebar from "./templates/Sidebar";
import Topbar from "./templates/Topbar";
import baseUrl from "../utils/axios";
import Header from "./templates/Header";

const Home = () => {
  document.title = "SkyCode | Homepage";
  const [homeWallpaper, setHomeWallpaper] = useState("");
  const [loadingWallpaper, setLoadingWallpaper] = useState(true);

  const getHomeWallpaper = async () => {
    setLoadingWallpaper(true);
    try {
      const { data } = await baseUrl.get("/trending/all/day");
      const random =
        data.results[(Math.random() * data.results.length).toFixed()];
      console.log(random);

      setHomeWallpaper(random);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoadingWallpaper(false);
    }
  };

  useEffect(() => {
    !homeWallpaper && getHomeWallpaper();
  }, []);

  // Show full page loading only on initial load when both are loading
  if (loadingWallpaper && !homeWallpaper === 0) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="w-full min-h-screen overflow-auto overflow-x-hidden">
        <Topbar />
        <Header homeWallpaper={homeWallpaper} />
      </div>
    </div>
  );
};

export default Home;
