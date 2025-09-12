import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { CoachContext } from "../context/CoachContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const {cToken, setCToken} = useContext(CoachContext)

  const navigate = useNavigate();

  const logout = () => {
    navigate('/')
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    cToken && setCToken('')
    cToken && localStorage.removeItem('cToken')
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-20 sm:w-30 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Coach"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
