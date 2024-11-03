import React from 'react'
import farmerabout from './assets/farmerabout.jpeg'

const About = () => {
  return (
    <div className='flex justify-center mt-[10%] mx-20 gap-[3%]'>
        <div className='w-1/2'>
            <img src={farmerabout} alt='' className='w-[100%] h-[100%]'/>
        </div>
        <div className='w-1/2'>
            <div className='text-3xl font-bold mb-2'>About Our Platform</div>
            <div className='text-2xl'>Revolutionizing Farm-to-Consumer Connections Through Blockchain Technology</div>
            <div className='text-l text-justify mt-3'>
                Our platform is on a mission to empower farmers, assure quality for consumers, and create a transparent, secure marketplace for fresh, high-quality produce. We believe that technology can bridge the gap between farm and table by eliminating intermediaries, establishing trust, and providing an efficient, safe way for consumers to access products directly from the source. Leveraging the power of blockchain, our platform guarantees that every step in the process is transparent, immutable, and accessible to all users.
            </div>
            <div className='text-l text-justify mt-2'>
                By placing quality and transparency at the forefront, we enable a sustainable and direct farm-to-consumer pipeline, giving farmers the tools they need to succeed and providing consumers with the information and assurance they desire.
            </div>
        </div>
    </div>
  )
}

export default About