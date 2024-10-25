import React from 'react'
import Image from 'next/image'
import Filter from '@/components/Filter'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
const CoursesPage = () => {
  return (
    <div className='space-y-7'> 
        <div className='h-[120px] bg-bg flex  items-center '>
            <div className='space-x-2 ml-[80px]'>
                <Image className='inline-block' src='/assets/images/home.png' alt='banner' width={20} height={20} />
                <Image className='inline-block' src='/assets/images/arrow_right.png' alt='banner' width={5} height={5}/>
                <span className='text-orange font-bold'> Khóa học</span>
            </div>
        </div>
       <div className='flex justify-between mx-[80px]'>
           <div className='flex space-x-5'>
                <div className='rounded-3xl border-filter border-2 w-[300px] flex justify-between py-1 '>
                    <input className='outline-none w-[270px] ml-2' type="text" placeholder=''/>
                    <Image className='inline-block mr-2 mt-1 h-[20px]' src="/assets/images/search_course.png" width={15} height={0}/>
                </div>
                <span className='mt-2'>Sort by:</span>
                <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Most popular" />
                </SelectTrigger>
             <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
             <SelectItem value="dark">Dark</SelectItem>
             <SelectItem value="system">System</SelectItem>
                </SelectContent>
                </Select>
    
           </div>
           <div className='space-x-1'>
               <span>Showing 2,312 results of</span>
               <span className='text-filter font-bold'>Java</span>
           </div>
       </div>
       <div className='ml-[80px]'>
        <Filter/>
       
       </div>

    </div>
  )
}

export default CoursesPage