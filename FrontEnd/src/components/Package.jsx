import React from 'react'
import Image from 'next/image'
const Package = () => {
  return (
   
      <div className=' flex justify-center'>
        <div className='grid grid-cols-7 rounded-xl  lg:h-[45vh] h-[17vh] border border-black ' >
             <div className='relative col-span-3 w-full h-full'>
            <Image className='rounded-l-xl w-full h-full' width={350} height={250} src="/assets/images/course.webp" />
           <div className='bg-white rounded-xl absolute bottom-5 right-4 py-2 px-1 md:text-lg lg:text-xl text-xs'>
              <span className='text-orange p-2 font-semibold'>$ 380</span>
              <span className='line-through p-2 text-gray-450'>$ 500</span>
           </div>
          </div>
             <div className='space-y-4 col-span-4 lg:m-7 md:m-4 sm:m-2 m-1 sm:text-sm md:text-lg lg:text-xl text-xs'>
             <h5 className=''>
                    1-28 July 2022
                </h5>
                <h1 className='text-SignUp font-bold'>
                    Python cơ bản- Dành cho trẻ em từ 4-8 tuổi
                </h1>
                <h1>
                Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.
                </h1>
             </div>
  
     </div>
      </div>
  )
}

export default Package