import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Coursecard = () => {
  return (
        <div className='rounded-md overflow-hidden bg-slate-100 w-[300px] space-y-3'>
            <Image  width={300} height={50} src="/assets/images/course.webp" />
            <h5 className='mx-4'>
                1-28 July 2022
            </h5>
            <h3 className='font-bold text-SignUp mx-4'>
                Product Management Basic-Course
            </h3>
            <h4 className='mx-4'>
            Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.
            </h4>
           
           <div className='flex justify-between mx-4'>
          <div className=''>
               <span  className='text-orange font-semibold '>
                    $ 380
                </span>
                <span className='line-through ml-2'>
                    $ 500
                </span>
          </div >
             <Button className='bg-SignUp m-2'>Enroll Now</Button>
            </div>
        </div>
        
  )
}

export default Coursecard