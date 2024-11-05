import React from 'react'
import farmerlogo from '../assets/deliverysvg.png'
import farmer from '../assets/delivery.avif'

import { Link } from 'react-router-dom'

const FarmerLoginReg = () => {
  return (
    <div className='w-[700px] h-[500px] border border-gray-300 shadow-lg mt-[5%] mx-auto rounded-lg flex overflow-hidden'>
      <div className='w-1/2 bg-green-100 flex items-center justify-center'>
        <img src={farmer} alt='Farming' className='w-full h-full object-cover' />
      </div>

      <div className='w-1/2 p-6 flex flex-col items-center'>
        <img src={farmerlogo} alt='Farmer logo' className='mb-4 w-20 h-20' />
        
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Delivery Agent Login</h2>
        
        <form className='w-full flex flex-col gap-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500'
            />
          </div>

          <Link to='/delivery/' type='submit' className='pl-2 w-full py-2 bg-[#111D2D] text-white font-semibold rounded-md hover:bg-black'>
            Login
          </Link>

          <p className='text-sm text-gray-600 mt-2'>
            Don’t have an account? <a href='#' className='text-[#111D2D] hover:underline'>Register here</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default FarmerLoginReg
