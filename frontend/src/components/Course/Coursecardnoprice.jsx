import React from 'react'
import Image from 'next/image'
const Coursecardnoprice = ({categoryName}) => {
  return (
    <div className='rounded-md overflow-hidden bg-slate-100 w-fit space-y-3'>
           <div className='flex justify-center p-3'> 
            <Image  width={50} height={50} src="/assets/images/online_course.png" />
            </div>
            <h5 className='ml-2 text-center text-SignUp font-semibold sm:text-sm md:text-lg lg:text-xl text-xs'>
               {categoryName}
            </h5>
           <div className='flex justify-center'>
                <h4 className='mx-4 text-center sm:text-sm md:text-lg lg:text-xl text-xs'>
                One powerful online software suite that combines
                </h4>
           </div >
           
           <div className='flex justify-center p-2'>
             <button className='bg-white text-SignUp lg:px-10 md:px-8 px-4 py-1 rounded-md sm:text-sm md:text-lg lg:text-xl text-xs'>More</button>
            </div>
        </div>
  )
}

export default Coursecardnoprice