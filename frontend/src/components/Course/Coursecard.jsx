import React from 'react'
import Image from 'next/image'
const Coursecard = ({courseName, cost, discount, intro,onClick}) => {
  const role=localStorage.getItem("role");
  return (
    <div onClick={onClick} className='cursor-pointer rounded-md overflow-hidden bg-slate-100 w-full sm:max-w-[300px] space-y-1 sm:space-y-2 hover:shadow-lg transition-all duration-300'>
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

      <h3 className='font-bold text-SignUp mx-3 sm:mx-4  sm:text-sm md:text-lg lg:text-xl text-xs'>
        {courseName}
      </h3>

      <h4 className='mx-3 sm:mx-4 text-gray-700 text-xs sm:text-sm lg:h-[60px] md:h-[40px] sm:h-[30px] h-[20px]'>
        {intro}
      </h4>

      <div className='flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2 '>
        <div className='flex items-center'>
          <span className='text-orange font-semibold sm:text-sm md:text-lg lg:text-xl text-xs'>
           ${(1-discount)*cost}
          </span>
          <span className='line-through ml-2 text-gray-500 text-sm'>
            ${cost}
          </span>
        </div>
        {(role !== "teacher" && role !== "admin") &&(

        <button className='bg-SignUp hover:bg-SignUp/90 text-xs sm:text-sm md:text-base lg:text-base text-white px-3 py-1 rounded-md'>
          Đăng ký ngay
        </button>)
}
      </div>
    </div>
  )
}

export default Coursecard