import React from 'react'
import { Route, Routes , BrowserRouter as Router} from 'react-router-dom'
import Homepage from './Homepage';
import FarmerHome from './Farmer/App';
import DeliveryHome from './Delivery/App'
import AgencyHome from './Agency/App';
import ConsumerHome from './Consumer/App';
import FarmerLoginReg from './Farmer/FarmerLoginReg'
import AgencyLoginReg from './Agency/AgencyLogin';
import ConsumerLoginReg from './Consumer/ConsumerLogin'
import DeliveryLoginReg from './Delivery/DeliveryLoginReg'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/farmerlogin" element={<FarmerLoginReg/>} />
        <Route path="/farmer/*" element={<FarmerHome/>} />
        <Route path="/deliverylogin" element={<DeliveryLoginReg/>} />
        <Route path="/delivery/*" element= {<DeliveryHome/>} />
        <Route path="/agencylogin" element={<AgencyLoginReg/>} />
        <Route path="/agency/*" element={<AgencyHome />} />
        <Route path="/consumerlogin" element={<ConsumerLoginReg/>} />
        <Route path="/consumer/*" element={<ConsumerHome />} />
      </Routes>
    </Router>
  )
}

export default App