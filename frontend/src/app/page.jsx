
"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import Home from '@/components/HomePage'
import Footer from '@/components/Footer'
import CoursePage from '@/components/CoursesPage'


const page = () => {
  return (
  <div className=''>
  {/* <div className='bg-bg rounded-b-3xl' >
    <Navbar/>
    <Banner/>
  </div>
    <Home/>
    <Footer/> */}
    
    <Navbar></Navbar>
    <CoursePage/>
  </div>
  ) 
}

export default page