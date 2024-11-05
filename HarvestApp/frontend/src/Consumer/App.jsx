import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Homepage from './ConsumerHome';
import Navbar1 from '../Components/Consumer/Navbar1';
import Navbar2 from '../Components/Consumer/Navbar2';
import TrackOrder from './TrackOrder';
import Cart from './Cart';


const App = () => {
  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="w-full md:w-[99%] lg:w-[99%] xl:w-[98%] mx-3 mt-4 -mb-5 h-[calc(100vh-140px)] border border-[#111D2D] overflow-y-auto shadow-4xl p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/trackorder' element={<TrackOrder/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
