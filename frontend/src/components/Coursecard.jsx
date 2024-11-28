import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Coursecard = () => {
  return (
    <div className='rounded-md overflow-hidden bg-slate-100 w-full sm:max-w-[300px] space-y-2 sm:space-y-3 hover:shadow-lg transition-all duration-300'>
      <div className='relative'>
        <Image 
          width={300} 
          height={200} 
          src="/assets/images/course.webp" 
          alt="course image"
          className='w-full h-auto'
        />
      </div>
      
      <h5 className='mx-3 sm:mx-4 text-gray-600 text-xs sm:text-sm'>
        1-28 July 2022
      </h5>
      
      <h3 className='font-bold text-SignUp mx-3 sm:mx-4 text-base sm:text-lg'>
        Product Management Basic-Course
      </h3>
      
      <h4 className='mx-3 sm:mx-4 text-gray-700 text-xs sm:text-sm'>
        Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.
      </h4>
      
      <div className='flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2'>
        <div className='flex items-center'>
          <span className='text-orange font-semibold text-base sm:text-lg'>
            $ 380
          </span>
          <span className='line-through ml-2 text-gray-500 text-sm'>
            $ 500
          </span>
        </div>
        <Button className='bg-SignUp hover:bg-SignUp/90 text-sm sm:text-base'>
          Enroll Now
        </Button>
      </div>
    </div>
  )
}

export default Coursecard