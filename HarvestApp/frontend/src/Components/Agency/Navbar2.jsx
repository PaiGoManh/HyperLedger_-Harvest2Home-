import React from 'react';
import { FaHome, FaPlusCircle } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  return (
      <nav className="flex gap-4 text-white mt-5">
        <div className="ml-3 flex items-center gap-2 px-4 py-2 bg-[#111D2D]  cursor-pointer hover:bg-black transition duration-200">
          <FaHome />
          <Link to='/agency/'>Home</Link>
        </div>        
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111D2D] cursor-pointer hover:bg-black transition duration-200">
          <FaCartShopping />
          <Link to='/agency/productlist'>Product List</Link>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111D2D] cursor-pointer hover:bg-black transition duration-200">
          <FaCartShopping />
          <Link to='/agency/approved'>Approved Products</Link>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111D2D] cursor-pointer hover:bg-black transition duration-200">
          <FaCartShopping />
          <Link to='/agency/rejected'>Rejected Products</Link>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111D2D] cursor-pointer hover:bg-black transition duration-200">
          <FaCartShopping />
          <Link to='/agency/orderlist'>Order List</Link>
        </div>
      </nav>
  );
};

export default Navbar2;
