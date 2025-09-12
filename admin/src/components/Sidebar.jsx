import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from 'react-router-dom';
import { CoachContext } from "../context/CoachContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { cToken } = useContext(CoachContext);

  return (
    <div className="bg-white min-h-screen">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            } 
            to={'/admin-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard Icon" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/all-bookings'}
          >
            <img src={assets.appointment_icon} alt="Sessions Icon" />
            <p className="hidden md:block">Bookings</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/add-coach'}
          >
            <img src={assets.add_icon} alt="Add Coach Icon" />
            <p className="hidden md:block">Add Coach</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/coaches-list'}
          >
            <img src={assets.people_icon} alt="Coaches List Icon" />
            <p className="hidden md:block">Coaches List</p>
          </NavLink>
        </ul>
      )}
      {cToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            } 
            to={'/coach-dashboard'}
          >
            <img src={assets.home_icon} alt="Dashboard Icon" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/coach-bookings'}
          >
            <img src={assets.appointment_icon} alt="Sessions Icon" />
            <p className="hidden md:block">Bookings</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/coach-profile'}
          >
            <img src={assets.people_icon} alt="Coaches List Icon" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
