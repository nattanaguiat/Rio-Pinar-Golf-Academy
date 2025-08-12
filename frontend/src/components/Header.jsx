import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${assets.bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

    
      <div className="relative z-10 flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20 w-full max-w-[90vw] mx-auto h-full items-center justify-center text-center text-white">
        <div className="md:w-1/2 flex flex-col justify-center items-center gap-4 py-10 m-auto">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight
            bg-primary/60 border border-white rounded px-4 py-2 max-w-max mx-auto"
          >
            RIO GOLF ACADEMY
          </h2>
          <p className="text-sm font-semibold px-3 py-1 max-w-max mx-auto">
            CHASE YOUR DREAMS, ELEVATE YOUR GAME AND BECOME BETTER THAN YOU EVER
            THOUGHT POSSIBLE!
          </p>
          <Link
            to="/coaches"
            className="text-white font-medium flex items-center gap-2 mt-4 justify-center"
          >
            <button className="bg-white/70 text-black px-6 py-2 rounded border font-medium hover:bg-gray-100 transition flex items-center gap-2 justify-center">
              Schedule Your Lesson Now <img src={assets.arrow_icon} alt="arrow icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;


