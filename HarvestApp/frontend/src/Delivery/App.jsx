import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Homepage from './DeliveryHome';
import Navbar1 from '../Components/Delivery/Navbar1';
import Navbar2 from '../Components/Delivery/Navbar2';
import UpcomingOrders from './UpcomingOrders';
import DeliveredOrders from './DeliveredOrder';

const App = () => {
  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="w-full md:w-[99%] lg:w-[99%] xl:w-[98%] mx-3 mt-4 -mb-5 h-[calc(100vh-140px)] border border-[#111D2D] overflow-y-auto shadow-4xl p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/upcoming' element={<UpcomingOrders/>} />
          <Route path='/delivered' element={<DeliveredOrders/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
