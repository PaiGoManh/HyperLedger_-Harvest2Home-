import React,{ useState } from 'react'
import LoginModal from '../Modal/LoginModal'
import RegisterModal from '../Modal/RegisterModal'

const LogNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRegModal = () => setIsRegModalOpen(true);
  const closeRegModal = () => setIsRegModalOpen(false);

  return (
    <div className='w-screen h-10 pt-2 pr-5 flex justify-end gap-3 text-l f text-white bg-[#111d25] '>
        <div onClick={ openModal } className='cursor-pointer'>Login</div>
        <div>|</div>
        <div onClick={ openRegModal }>Register</div>
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        <RegisterModal isregOpen={isRegModalOpen} onregClose={closeRegModal}/>
    </div>
  )
}

export default LogNavbar