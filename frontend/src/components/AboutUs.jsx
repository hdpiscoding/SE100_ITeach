import React from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'

const AboutUs = () => {
  return (
    <div>
         <div className='h-[120px] bg-bg flex  items-center '>
            <div className='space-x-2 ml-[80px]'>
                <Image className='inline-block' src='/assets/images/home.png' alt='banner' width={20} height={20} />
                <Image className='inline-block' src='/assets/images/arrow_right.png' alt='banner' width={5} height={5}/>
                <span className='text-orange font-bold'> Về chúng tôi</span>
            </div>
        </div>
      <div className='relative'>
           <Image src="/assets/images/bg_aboutus.png " className='w-full h-[500px]' width={1400} height={100}>
           </Image>
           <div className='space-y-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
            <div className='flex justify-center'>
                <h1 className='text-white text-7xl font-extrabold font-serif'>About Us
                </h1>
            </div>
           <div className='flex justify-center '>
                <p className='w-[600px] text-white text-xl text-center'>
                    From preschool to pre-tertiary, our students enjoy fun, interactive and relevant 
                    lessons and are empowered to think beyond the confines of the classroom.
                </p>
           </div>
                <div className='flex justify-center '>
                    <Button className='bg-orange px-7'>See more</Button>
                </div>
               
           </div>
      </div>
        </div>
  )
}

export default AboutUs