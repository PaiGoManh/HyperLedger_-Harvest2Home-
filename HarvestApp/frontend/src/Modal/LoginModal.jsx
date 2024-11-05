// LoginModal.js
import React from 'react';
import farmer from '../assets/farmersvg.png';
import quality from '../assets/qualitysvg.png'
import consumer from '../assets/consumersvg.png'
import delivery from '../assets/deliverysvg.png'
import { Link } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className='bg-white text-black w-[500px] h-[200px]'>
          <div className='flex justify-between mx-2'>
              <div>Login as</div>
              <div onClick={onClose} className='cursor-pointer'>x</div>
          </div>
          <div className="flex justify-around gap-5 mt-5">
            <Link to='/farmerlogin' className='className="flex flex-col items-center w-[150px]'>
                <img src={farmer} alt="Farmer" />
                <div className="text-center">Farmer</div>
            </Link>
            <Link to='/agencylogin' className="flex flex-col items-center w-[130px]">
                <img src={quality} alt="Quality Assurance Agency" className="w-full h-auto mb-2" />
                <div className="text-center">Quality Agency</div>
            </Link>
            <Link to='/consumerlogin' className="flex flex-col items-center w-[130px]">
                <img src={consumer} alt="Consumer Association" className="w-full h-auto mb-2" />
                <div className="text-center">Consumer Association</div>
            </Link>
            <Link to='/deliverylogin' className="flex flex-col items-center w-[190px]">
                <img src={delivery} alt="Delivery Partner" className="w-full h-auto mb-2" />
                <div className="text-center">Delivery</div>
                Partner
            </Link>
          </div>

      </div>
    </div>
  );
};

export default LoginModal;
