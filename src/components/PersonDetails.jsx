import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { asyncLoadPerson } from "../store/actions/personActions";
import { removePerson } from "../store/reducers/personSlice";
import { useSelector } from "react-redux";
import noImage from "/no-image.jpg";
import Loading from "./templates/Loading";
import Card from "./templates/Card";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("movies");

  const personData = useSelector((state) => state.person.info);
  personData;

  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);
  return personData ? (
    <div className="w-full h-full px-[10%] bg-zinc-900 overflow-auto">
      {/* Navigation */}
      <div className="w-full h-[10vh] flex items-center gap-10 text-2xl text-zinc-100">
        <i
          className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer mr-2 text-2xl"
          onClick={() => navigate(-1)}
        ></i>
        {/*  */}
      </div>
      {/* Main */}
      <div className="w-full flex">
        <div className="w-[20%]">
          <img
            src={
              personData.details.profile_path
                ? `https://image.tmdb.org/t/p/w500${personData.details.profile_path}`
                : noImage
            }
            alt={
              personData.details.name ||
              personData.details.original_name ||
              "No Name"
            }
            className="h-[40vh] object-cover rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          />
          <hr className="my-3 border-0 h-[2px] bg-zinc-500" />
          {/* Social Media */}
          <div className="flex gap-5 items-center text-zinc-100 text-xl">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${personData.externalId.wikidata_id}`}
            >
              <i className="ri-external-link-line"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${personData.externalId.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${personData.externalId.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.imdb.com/name/${personData.externalId.imdb_id}`}
            >
              <span>Imdb</span>
              <i className="ri-imdb-line"></i>
            </a>
          </div>

          {/* Person Details */}
          <h1 className="text-2xl font-semibold text-zinc-400 my-5">
            Person Info
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400 mt-2">
            Known For
          </h1>
          <h1 className="text-zinc-400 text-sm">
            {personData.details.known_for_department}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Gender</h1>
          <h1 className="text-zinc-400 text-sm">
            {personData.details.gender === 1 ? "Female" : "Male"}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Birthday</h1>
          <h1 className="text-zinc-400 text-sm">
            {personData.details.birthday}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400 mt-2">Deathday</h1>
          <h1 className="text-zinc-400 text-sm">
            {personData.details.deathday
              ? personData.details.deathday
              : "Alive"}
          </h1>

          <h1 className="text-lg font-semibold text-zinc-400 mt-2">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400 text-sm">
            {personData.details.place_of_birth}
          </h1>
        </div>
        <div className="w-[80%] ml-[2.5%]">
          <h1 className="text-6xl font-black text-zinc-300">
            {personData.details.name || personData.details.original_name}
          </h1>
          {/* Biography */}
          <h1 className="text-2xl font-semibold text-zinc-400 mt-5">
            Biography
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            {personData.details.biography}
          </p>

          <h1 className="text-2xl font-semibold text-zinc-400 mt-5 mb-2">
            Known For
          </h1>
          <Card trending={personData.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="text-2xl font-semibold text-zinc-400 mt-5 mb-2">
              Acting
            </h1>
            <Dropdown
              label="Category"
              options={["tvShows", "movies"]}
              onChange={(e) => setSelectedFilter(e.target.value)}
            />
          </div>
          <div className="w-full h-[70vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.3)] mb-10 mt-5 border-2 border-zinc-800 list-disc text-zinc-400 p-4">
            {personData[selectedFilter].cast.length > 0 &&
              personData[selectedFilter].cast.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white duration-300 cursor-pointer hover:bg-[#19191d] p-3 rounded"
                >
                  <Link
                    to={`/${
                      selectedFilter === "movies" ? "movie" : "tv"
                    }/details/${item.id}`}
                  >
                    <span>{item.title || item.name}</span>
                    {item.character && (
                      <span className="block ml-5">
                        Character Name : {item.character}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
