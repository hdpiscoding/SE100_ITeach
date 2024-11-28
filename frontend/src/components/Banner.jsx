import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center mt-10 gap-8'>
      <div className='text-center md:text-left'>
        <div className="rounded-lg w-fit bg-white p-1.5 mx-auto md:mx-0">Never stop learning</div>
        <div className='my-5 space-y-0'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-SignUp font-bold'>"Sáng tạo tương lai,</h1>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-SignUp font-bold'>làm chủ công nghệ</h1>
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-SignUp font-bold'>cùng ITeach!"</h1>
        </div>
        <div>
          <Button className='bg-orange'>HỌC NGAY</Button>
        </div>
      </div>
      <div className='h-fit'>
        <Image 
          src="/assets/images/j97.png" 
          alt="Banner" 
          width={400} 
          height={400}
          className='w-[250px] md:w-[300px] lg:w-[400px]'
        />
      </div>
    </div>
  )
}

export default Banner;