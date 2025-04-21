import React from "react";
import Sidebar from "./templates/Sidebar";
import Topbar from "./templates/Topbar";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="w-full min-h-screen overflow-auto overflow-x-hidden">
        <Topbar />
        Home
      </div>
    </div>
  );
};

export default Home;
