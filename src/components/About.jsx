import React from "react";
import Sidebar from "./templates/Sidebar";
import Topbar from "./templates/Topbar";

const About = () => {
  document.title = "SkyCode | About Us";

  return (
    <>
      <Sidebar />
      <div className="w-[77%] h-screen overflow-y-auto">
        <Topbar />
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
            <i className="ri-information-2-fill text-[#6556CD] mr-3"></i>
            About Us
          </h1>

          <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Welcome to Movie App, your ultimate destination for discovering
              movies and TV shows. Our mission is to create a seamless and
              enjoyable experience for film enthusiasts to explore, discover,
              and keep track of their favorite content across different
              streaming platforms.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              We believe that great stories bring people together, and our goal
              is to help you find those stories easily, whether they're
              blockbuster hits or hidden gems.
            </p>
          </div>

          <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              What We Offer
            </h2>
            <ul className="text-zinc-300 space-y-4">
              <li className="flex items-start">
                <i className="ri-check-line text-[#6556CD] text-xl mr-2 mt-1"></i>
                <span>
                  Comprehensive database of movies and TV shows with detailed
                  information
                </span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-[#6556CD] text-xl mr-2 mt-1"></i>
                <span>
                  Up-to-date information on where to watch your favorite content
                </span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-[#6556CD] text-xl mr-2 mt-1"></i>
                <span>Trending and popular content recommendations</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-[#6556CD] text-xl mr-2 mt-1"></i>
                <span>
                  Trailers, ratings, and reviews to help you decide what to
                  watch
                </span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-[#6556CD] text-xl mr-2 mt-1"></i>
                <span>
                  User-friendly interface designed for movie enthusiasts
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Data</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              We source our data from The Movie Database (TMDB), one of the most
              comprehensive and reliable sources for movie and TV show
              information. This allows us to provide you with accurate and
              up-to-date details about your favorite content.
            </p>
            <div className="flex items-center space-x-2 text-zinc-300">
              <i className="ri-database-2-line text-[#6556CD]"></i>
              <span>Powered by the TMDB API</span>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Team</h2>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Movie App was created by a team of passionate developers and movie
              enthusiasts who wanted to build a better way to discover and track
              films and TV shows. We're constantly working to improve the app
              and add new features based on user feedback.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#6556CD] flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-fill text-white text-3xl"></i>
                </div>
                <h3 className="text-white font-medium">SkyCode</h3>
                <p className="text-zinc-400">Founder & Developer</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#6556CD] flex items-center justify-center mx-auto mb-3">
                  <i className="ri-code-s-slash-line text-white text-3xl"></i>
                </div>
                <h3 className="text-white font-medium">AI Team</h3>
                <p className="text-zinc-400">Development Support</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#6556CD] flex items-center justify-center mx-auto mb-3">
                  <i className="ri-movie-2-fill text-white text-3xl"></i>
                </div>
                <h3 className="text-white font-medium">Movie Enthusiasts</h3>
                <p className="text-zinc-400">Content Curators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
