import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Homepage from './FarmerHome';
import FarmerNavbar from '../Components/Farmer/Navbar1';
import Navbar2 from '../Components/Farmer/Navbar2';
import AddProduct from './AddProduct';
import OrderList from './ProductList';

const App = () => {
  return (
    <>
      <FarmerNavbar />
      <Navbar2 />
      <div className="w-full md:w-[99%] lg:w-[99%] xl:w-[98%] mx-3 mt-4  h-[calc(100vh-140px)] border border-[#111D2D] overflow-y-auto shadow-4xl p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/orderlist' element={<OrderList/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
