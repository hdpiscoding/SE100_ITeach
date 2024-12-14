import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className=' h-fit bg-bg font-poppins'>
      <div className='grid grid-cols-[0.5fr_11fr_0.5fr]'>
        <div></div>
       <div className='grid grid-cols-2 lg:py-10 md:py-8 sm:py-7 py-5 ' >
          <div className='col-span-1 justify-center items-center '>
            <div className="rounded-lg w-fit bg-white p-1.5 text-xs sm:text-sm md:text-base lg:text-lg">Never stop learning</div>
            <div className=''>
              <h1 className='text-base sm:text-xl md:text-4xl lg:text-6xl text-DarkGreen font-bold lg:py-2 md:py-1 sm:py-0.5 py-0.5'>"Sáng tạo tương lai,</h1>
              <h1 className='text-base sm:text-xl md:text-4xl lg:text-6xl text-DarkGreen font-bold lg:py-2 md:py-1 sm:py-0.5 py-0.5'>làm chủ công nghệ</h1>
              <h1 className='text-base sm:text-xl md:text-4xl lg:text-6xl text-DarkGreen font-bold lg:py-2 md:py-1 sm:py-0.5 py-0.5'>cùng ITeach!"</h1>
            </div>
            <div className='lg:py-2 md:py-1 sm:py-0.5 py-0.5 grid grid-cols-2'>

              <div className='col-span-1'>
                <button className='bg-orange text-white lg:text-base md:text-sm sm:text-xs
                 text-[5px] lg:px-7 lg:py-3 md:px-2 md:py-1 sm:px-3 sm:py-1 px-3 py-1
                  lg:rounded-lg md:rounded-lg sm:rounded-sm rounded-sm '>HỌC NGAY</button>
              </div>
             <div className='col-span-1 flex  items-center justify-start'> <Image src="/assets/images/estimation.png" alt="Banner" width={400} height={400} className='w-2/3 ' /></div>
            </div>
          </div>
          <div className='col-span-1 flex justify-center items-center '>
            <Image
              src="/assets/images/j97.png"
              alt="Banner"
              width={400}
              height={400}
              className='w-2/3 '
            />
          </div>
       </div>
       <div></div>
      </div>
    </div>
  )
}

export default Banner;