import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <div className="w-full h-[70px] bg-[#111D2D] flex justify-between items-center px-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-white font-bold text-lg">
          <img
            src="/path/to/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full" 
          />
        </div>
        <div className="text-white font-semibold text-xl">
          Consumer Dashboard
        </div>
      </div>

      <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow bg-transparent focus:outline-none px-2 text-gray-700"
        />
        <FaSearch className="text-[#111D2D]" />
      </div>

      <div className="flex items-center gap-6">
        <div className="text-white text-lg cursor-pointer hover:text-gray-300 transition">
          <FaBell />
        </div>
        <div className="text-white font-semibold">
          Hello, !
        </div>
        <Link to='/' className="text-white text-lg cursor-pointer hover:text-gray-300 transition">
          <IoLogOutOutline />
        </Link>
      </div>
    </div>
  );
};

export default Navbar1;
