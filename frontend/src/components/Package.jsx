import React from 'react'
import Image from 'next/image'
const Package = ({courseName, cost, discount, intro,anhBia,day,onClick}) => {
  return (
    <div onClick={onClick} className='flex justify-center px-2 lg:h-[200px] md:h-[150px] sm:h-[100px] h-[100px] '>
      <div className='grid grid-cols-7 rounded-xl border border-black w-full overflow-hidden lg:h-[200px] md:h-[150px] sm:h-[100px] h-[100px]'
           > 
        
       
        <div className='relative col-span-3'>
          <Image 
            className='rounded-l-xl lg:h-[200px] md:h-[150px] sm:h-[100px] h-[100px] w-full ' 
            src={anhBia}
            alt="Course Image"
            width={300}
            height={200}
          />
          <div className='bg-white rounded-xl absolute bottom-4 right-4 p-2 shadow-sm text-[10px] md:text-base lg:text-lg'>
            <span className="font-semibold text-orange">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(Number(((cost ?? 0) * (1 - (discount/100 ?? 0))).toFixed(0)))}
            </span>

            {discount && discount > 0
                ?
                <span className='line-through text-gray-450 ml-2 text-sm'> {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(Number((cost).toFixed(0)))}</span>
                :
                <div></div>
            }

          </div>
        </div>


        <div className='col-span-4 p-4 md:p-6 lg:p-8 flex flex-col gap-3'>
          <p className='text-xs md:text-sm lg:text-lg text-gray-600'>
            {new Date(day).toLocaleDateString()}
          </p>
          <h2 className='text-SignUp font-bold text-sm md:text-lg lg:text-xl'>
            {courseName}
          </h2>
          <p className='text-xs md:text-sm lg:text-lg text-gray-700'>
            {intro}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Package