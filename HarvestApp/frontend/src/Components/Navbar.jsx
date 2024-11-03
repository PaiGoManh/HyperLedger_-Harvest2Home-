import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className='w-screen h-20 bg-[white] pt-5'>
        <div className='flex items-center gap-3 pl-[5%]'> 
            <TbTruckDelivery className='text-4xl text-[#111d25]'/>
            <div className='text-2xl text-[#111d25] font-extrabold'>Harvest2Home</div>
        </div>
    </div>
  )
}

export default Navbar