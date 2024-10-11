import React from 'react'
import Coursecard from '@/components/Coursecard'
import {Button} from '@/components/ui/button'
import Coursecardnoprice from '@/components/Coursecardnoprice'
import { Swiper, SwiperSlide } from 'swiper/react';
import Package from '@/components/Package'
import 'swiper/css';
const Home = () => {
  return (
    
    <div >
         <h1 className='text-orange text-center font-bold text-5xl mt-12 '>Khóa học phổ biến</h1>
         <div className='my-14 flex justify-center space-x-5'>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]' >All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
         </div>
        <div className='flex justify-around mt-10'>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        </div>
        <div className='flex justify-around mt-10'>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        </div>
        <h1 className='text-SignUp text-center font-bold text-5xl mt-12 '>Danh mục khóa học</h1>
        <div className='flex justify-center'>
          <h1 className=' mt-10 text-2xl text-gray-500 w-[1000px] text-center'>Onlearing  is one powerful online software suite that combines all the tools needed to run a successful school or office.
          </h1>
        </div>
        <div className='flex justify-around mt-10'>
        <Coursecardnoprice/>
        <Coursecardnoprice/>
        <Coursecardnoprice/>
        <Coursecardnoprice/>
        </div>
        <div className='flex justify-center mt-[80px] mb-[150px]'>
          <Button className='text-SignUp bg-white border border-SignUp w-[200px]'>Xem tất cả</Button>
        </div>
        <h1 className='text-center text-SignUp font-bold text-4xl'>Các gói phổ biến</h1>
        <div className='flex justify-center'>
          <h1 className=' mt-10 text-2xl text-gray-500 w-[1000px] text-center'>Onlearing  is one powerful online software suite that combines all the tools needed to run a successful school or office.
          </h1>
        </div>
        <div className='my-10 flex justify-center items-center'>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
           className='w-[800px] max-w-[800px]'
        >
          <SwiperSlide><Package/></SwiperSlide>
          <SwiperSlide><Package/></SwiperSlide>
          <SwiperSlide><Package/></SwiperSlide>
          <SwiperSlide><Package/></SwiperSlide>
        </Swiper>
      </div>
    </div>
    
  )
}

export default Home