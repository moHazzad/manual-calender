import React from 'react'
import img from '../../../../public/pexels-dominik-perau-12699625.jpg'
import CalenderChose from './CalenderChose'

const Home = () => {
  return (
    <>
    
    <section className='className= h-96 w-full relative'>
        
            <img src={img} alt="banner image" className='h-full w-full relative'  />
        
        <h3 className='text-4xl font-semibold text-gray-300 absolute bottom-6 left-6'>Calendar</h3>
    </section>

    <section className=' w-[90%] mx-auto py-10'>

    <CalenderChose />
    </section>
    
    </>
  )
}

export default Home