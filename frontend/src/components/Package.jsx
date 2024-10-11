import React from 'react'
import Image from 'next/image'
const Package = () => {
  return (
    <div className='flex rounded-3xl  bg-white w-[800px] h-[250px] border border-black'>
         <div className='relative w-[800px] h-[250px]'>
        <Image className='rounded-l-3xl w-full h-full' width={350} height={250} src="/assets/images/course.webp" />
        <span className='absolute bottom-2 right-2 bg-black text-white p-2 rounded-br-3xl'>
          New
        </span>
      </div>
         <div className='space-y-4   m-7'>
         <h5 className=''>
                1-28 July 2022
            </h5>
            <h1 className='text-SignUp font-bold text-2xl'>
                Python cơ bản- Dành cho trẻ em từ 4-8 tuổi
            </h1>
            <h1>
            Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.
            </h1>
         </div>
    </div>
  )
}

export default Package