import React from 'react'
// import Button from '@mui/material/Button';
const Hero = () => {
  return (
    <>
        <div className='mt-3 ml-3 flex gap-4'>
            <button className='border bg-red-400 p-2 px-3 rounded-lg text-white'>Trending Now</button>
            <button className='bg-gray-400 p-2 rounded-lg px-4 text-white'>All</button>
            <button className='bg-gray-400 p-2 rounded-lg px-4 text-gray-600'>New</button>
            <button className='bg-gray-400 p-2 rounded-lg px-4 text-gray-600'>Mens</button>
            <button className='bg-gray-400 p-2 rounded-lg px-4 text-gray-600'>Women</button>
            <button className='bg-gray-400 p-2 rounded-lg px-4 text-gray-600'>Mens</button>
        </div>
      <img src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-1/2'/>
    </>
  )
}

export default Hero
