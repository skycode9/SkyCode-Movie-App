import noData from "/404.gif";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
      <Link
        className="hover:text-[#6556cd] absolute ri-close-fill cursor-pointer mr-2 text-2xl top-[4%] right-[9%] text-white"
        onClick={() => navigate(-1)}
      ></Link>
      <img
        src={noData}
        className="w-[50%] h-[50%] object-cover"
        alt="not-found"
      />
    </div>
  );
};

export default NotFound;
