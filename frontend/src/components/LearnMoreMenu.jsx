import React from "react";
import { GiGolfTee } from "react-icons/gi";
import { TbGolf, TbGolfFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const LearnMoreMenu = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-gray-800">
      <h3 className="text-2xl font-medium">LEARN MORE</h3>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-48 gap-12 w-full px-6 sm:px-0">
        <Link className="flex flex-col items-center gap-6 mx-6" to="/about">
          <TbGolfFilled size={48} />
          ABOUT
        </Link>
        <Link className="flex flex-col items-center gap-6 mx-6" to="/junior-academy">
          <GiGolfTee size={48} />
          JUNIOR ACADEMY
        </Link>
        <Link className="flex flex-col items-center gap-6 mx-6" to="/coaches">
          <TbGolf size={48} />
          LESSONS
        </Link>
      </div>
    </div>
  );
};

export default LearnMoreMenu;



