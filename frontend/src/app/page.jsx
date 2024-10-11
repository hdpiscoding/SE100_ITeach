
"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import Home from '@/components/Home'


const page = () => {
  return (
  <div className=''>
  <div className='bg-bg rounded-b-3xl' >
    <Navbar/>
    <Banner/>
  </div>
    <Home/>
  </div>
  )
}

export default page