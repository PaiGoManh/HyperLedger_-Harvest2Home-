// RegisterModal.js
import React from 'react';
import farmer from '../assets/farmersvg.png';
import quality from '../assets/qualitysvg.png'
import consumer from '../assets/consumersvg.png'
import delivery from '../assets/deliverysvg.png'

const RegisterModal = ({ isregOpen, onregClose }) => {
  if (!isregOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className='bg-white text-black w-[500px] h-[200px]'>
            <div className='flex justify-between mx-2'>
                <div>Register as</div>
                <div onClick={onregClose} className='cursor-pointer'>x</div>
            </div>
            <div className="flex justify-around gap-5 mt-5">
            <div className="flex flex-col items-center w-[150px]">
                <img src={farmer} alt="Farmer" />
                <div className="text-center">Farmer</div>
            </div>
            <div className="flex flex-col items-center w-[130px]">
                <img src={quality} alt="Quality Assurance Agency" className="w-full h-auto mb-2" />
                <div className="text-center">Quality Agency</div>
            </div>
            <div className="flex flex-col items-center w-[130px]">
                <img src={consumer} alt="Consumer Association" className="w-full h-auto mb-2" />
                <div className="text-center">Consumer Association</div>
            </div>
            <div className="flex flex-col items-center w-[190px]">
                <img src={delivery} alt="Delivery Partner" className="w-full h-auto mb-2" />
                <div className="text-center">Delivery</div>
                Partner
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
