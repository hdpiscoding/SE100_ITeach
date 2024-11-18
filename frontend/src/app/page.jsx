
"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import Home from '@/components/HomePage'
import Footer from '@/components/Footer'
import CoursePage from '@/components/CoursesPage'
import Login from '@/components/Login'
import SignIn from '@/components/SignIn'
import AboutUs from '@/components/AboutUs'


const page = () => {
  return (
  <div className=''>
  {/* <div className='bg-bg rounded-b-3xl' >
    <Navbar/>
    <Banner/>
  </div>

    <Footer/> */}
    
    {/* <Navbar></Navbar> */}
    {/* <CoursePage/> */}
   {/* <AboutUs></AboutUs> */}
      <Login></Login>
      {/* <Home></Home> */}

  </div>
  ) 
}

export default page