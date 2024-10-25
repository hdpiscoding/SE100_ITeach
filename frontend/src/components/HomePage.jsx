import React from 'react'
import Image from 'next/image'
import Coursecard from '@/components/Coursecard'
import {Button} from '@/components/ui/button'
import Coursecardnoprice from '@/components/Coursecardnoprice'
import Package from '@/components/Package'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
const Home = () => {
  return (
    
    <div className='mx-20' >
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
        <div className='rounded-lg bg-red-600 mx-40 relative h-[350px] '>
          <Image src="/assets/images/banner.png" width={600} height={10} className=' absolute  right-0 bottom-0 h-[450px]'/>
          <div className='w-[500px] relative top-14 left-14'>
            <h1 className='font-bold text-4xl text-white'>Tại sao bạn nên tham gia khóa học của ITeach ?</h1>
            <div className='mt-7'>
              <div>
                <Image className='inline-block' src="/assets/images/star.png" width={25} height={25}/>
                <span className='text-sm text-white'>Teachers don’t get lost in the grid view and have a dedicated Podium space.
                </span>
              </div>
              <div>
                <Image className='inline-block' src="/assets/images/star.png" width={25} height={25}/>
                <span className='text-sm text-white'>Teachers don’t get lost in the grid view and have a dedicated Podium space.
                </span>
              </div>
              <div>
                <Image className='inline-block' src="/assets/images/star.png" width={25} height={25}/>
                <span className='text-sm text-white'>Teachers don’t get lost in the grid view and have a dedicated Podium space.
                </span>
              </div>
            </div>
            <Button className='text-SignUp bg-white w-[125px] mt-7'>BUY NOW</Button>
          </div>
          
        </div>
        <h1 className='text-center text-SignUp font-bold text-4xl mt-20'>Các gói phổ biến</h1>
        <div className='flex justify-center'>
          <h1 className=' mt-10 text-2xl text-gray-500 w-[800px] text-center'>Onlearing  is one powerful online software suite that combines all the tools needed to run a successful school or office.
          </h1>
        </div>
       
        <div className='my-10 flex justify-center items-center '>
        <Swiper  
        slidesPerView={'1'}
          spaceBetween={30}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
         modules={[Pagination, Navigation]}
           className='w-[900px] max-w-[900px]'
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