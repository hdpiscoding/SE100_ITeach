import React from 'react'
import Image from 'next/image'
const Package = () => {
  return (
    <div className='flex justify-center px-2'>
      <div className='grid grid-cols-7 rounded-xl border border-black w-full overflow-hidden'
           style={{ minHeight: '200px' }}> 
        
       
        <div className='relative col-span-3'>
          <Image 
            className='rounded-l-xl object-cover' 
            src="/assets/images/course.webp"
            alt="Course Image"
            fill  
            style={{ objectFit: 'cover' }}
          />
          <div className='bg-white rounded-xl absolute bottom-4 right-4 p-2 shadow-sm'>
            <span className='text-orange font-semibold text-sm md:text-base lg:text-lg'>$380</span>
            <span className='line-through text-gray-450 ml-2 text-sm md:text-base lg:text-lg'>$500</span>
          </div>
        </div>

       
        <div className='col-span-4 p-4 md:p-6 lg:p-8 flex flex-col gap-3'>
          <p className='text-xs md:text-sm lg:text-lg text-gray-600'>
            1-28 July 2022
          </p>
          <h2 className='text-SignUp font-bold text-sm md:text-lg lg:text-xl'>
            Python cơ bản- Dành cho trẻ em từ 4-8 tuổi
          </h2>
          <p className='text-xs md:text-sm lg:text-lg text-gray-700'>
            Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Package