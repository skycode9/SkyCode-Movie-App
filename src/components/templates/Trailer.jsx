import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  ytVideo;

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center absolute left-0 right-0 top-0 z-[1000] bg-[rgba(0,0,0,0.7)]">
      <Link
        className="hover:text-[#6556cd] absolute ri-close-fill cursor-pointer mr-2 text-2xl top-[4%] right-[9%] text-white"
        onClick={() => navigate(-1)}
      ></Link>
      {ytVideo ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
          width="80%"
          height="80%"
          controls={true}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
