import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

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
            <p>Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/all-sessions'}
          >
            <img src={assets.appointment_icon} alt="Sessions Icon" />
            <p>Sessions</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/add-coach'}
          >
            <img src={assets.add_icon} alt="Add Coach Icon" />
            <p>Add Coach</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }  
            to={'/coaches-list'}
          >
            <img src={assets.people_icon} alt="Coaches List Icon" />
            <p>Coaches List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
