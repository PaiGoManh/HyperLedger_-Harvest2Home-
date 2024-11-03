import React from 'react'
import Navbar from './Components/Navbar'
import LogNavbar from './Components/LogNavbar'
import farmer from './assets/farmer.webp'
import farmer1 from './assets/supply1.jpg'
import About from './About'

const Homepage = () => {
  return (
    <div>
        <LogNavbar/>
        <Navbar/>
        <div className='flex items-center justify-center mt-[5%]'>
            <div className='w-1/2 mt-[-10%]'>
                <div className='text-4xl font-extrabold ml-[5%]'>Farm-to-Consumer</div>
                <div className='text-4xl font-extrabold ml-[5%]'>Blockchain Marketplace</div>
                <div className='mt-5 font-extralight ml-[5%]'>
                Ensuring Quality, Transparency, and Trust in Every Purchase
                </div>
            </div>
            <div className='w-1/2'>
                <img src={farmer1} alt='farmer' className='w-[70%]'/>
            </div>
        </div>
        <About/>
        {/* <img src={farmer} alt='farmer' className='w-screen'/> */}
    </div>
  )
}

export default Homepage