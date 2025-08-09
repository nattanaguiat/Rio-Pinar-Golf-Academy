import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
    className="flex flex-col md:flex-row flex-wrap bg-cover bg-center rounded-lg px-6 md:px-10 lg:px-20 w-full max-w-[90vw] mx-auto"
    style={{
      backgroundImage: `url(${assets.bgImage})`,
    }}
  >
  
      <div className="md:w-1/2 flex flex-col justify-center items-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight
          bg-primary/60 border border-white rounded px-4 py-2 text-white max-w-max text-center"
        >
          RIO GOLF ACADEMY
        </h2>
        <p className="text-white text-sm font-semibold px-3 py-1 max-w-max text-center">
          CHASE YOUR DREAMS, ELEVATE YOUR GAME AND BECOME BETTER THAN YOU EVER
          THOUGHT POSSIBLE!
        </p>
        <Link
          to="/coaches"
          className="text-white font-medium flex items-center gap-2 mt-4"
        >
          <button className="bg-white/70 text-black px-6 py-2 rounded border font-medium hover:bg-gray-100 transition flex items-center gap-2 justify-center">
            Book Now <img src={assets.arrow_icon} alt="arrow icon" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
