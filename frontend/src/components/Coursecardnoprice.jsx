import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Coursecardnoprice = () => {
  return (
    <div className='rounded-md overflow-hidden bg-slate-100 w-[300px] space-y-3'>
           <div className='flex justify-center p-3'> 
            <Image alt="online_course" width={50} height={50} src="/assets/images/online_course.png" />
            </div>
            <h5 className='ml-2 text-center text-DarkGreen font-semibold text-2xl'>
               Thuật toán
            </h5>
           <div className='flex justify-center'>
                <h4 className='mx-4 text-center'>
                One powerful online software suite that combines
                </h4>
           </div >
           
           <div className='flex justify-center p-2'>
             <Button className='bg-white text-DarkGreen w-[150px]'>More</Button>
            </div>
        </div>
  )
}

export default Coursecardnoprice