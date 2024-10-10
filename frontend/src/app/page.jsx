
"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import Course from '@/components/Course'


const page = () => {
  return (
  <div className=''>
  <div className='bg-bg rounded-b-3xl' >
    <Navbar/>
    <Banner/>
  </div>
    <Course/>
  </div>
  )
}

export default page