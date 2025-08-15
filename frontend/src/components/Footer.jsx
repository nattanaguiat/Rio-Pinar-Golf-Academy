import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className=" justify-center items-center">
          <img className="mb-5 w-20" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 text-sm">
            CHASE YOUR DREAMS, ELEVATE YOUR GAME AND BECOME BETTER THAN YOU EVER
            THOUGHT POSSIBLE!
          </p>
        </div>

        <div>
          <p className="tetx-xl text-gray-800 font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li>Address: 8600 El Prado Avenue Orlando, FL 32825</li>
            <li>Phone: (407) 286-6920</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright © 2025 Rio Golf Academy All Rights Reserved. Powered by</p>
      </div>
    </div>
  );
};

export default Footer;
