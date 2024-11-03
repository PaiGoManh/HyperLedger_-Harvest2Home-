import React from 'react'
import { Route, Routes , BrowserRouter as Router} from 'react-router-dom'
import Homepage from './Homepage';
import FarrmerHome from './Farmer/FarmerHome';
import DeliveryHome from './Delivery/DeliveryHome'
import AgencyHome from './Agency/AgencyHome';
import ConsumerHome from './Consumer/ConsumerHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/farmer/*" element={<FarrmerHome/>} />
        <Route path="/delivery/*" element= {<DeliveryHome/>} />
        <Route path="/agency/*" element={<AgencyHome />} />
        <Route path="/consumer/*" element={<ConsumerHome />} />
      </Routes>
    </Router>
  )
}

export default App