import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Homepage from './AgencyHome';
import Navbar1 from '../Components/Agency/Navbar1';
import Navbar2 from '../Components/Agency/Navbar2';
import ProductList from './ProductList';
import ApprovedProducts from './ApprovedProducts';
import RejectedProducts from './RejectedProducts'
import OrderList from './OrderList';

const App = () => {
  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="w-full md:w-[99%] lg:w-[99%] xl:w-[98%] mx-3 mt-4 -mb-5 h-[calc(100vh-140px)] border border-[#111D2D] overflow-y-auto shadow-4xl p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/productlist' element={<ProductList/>} />
          <Route path='/approved' element={<ApprovedProducts/>} />
          <Route path='/rejected' element={<RejectedProducts/>} />
          <Route path='/orderlist' element={<OrderList/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
