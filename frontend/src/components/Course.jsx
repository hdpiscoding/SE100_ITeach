import React from 'react'
import Coursecard from '@/components/Coursecard'
import {Button} from '@/components/ui/button'
const Course = () => {
  return (
    
    <div >
         <h1 className='text-orange text-center font-bold text-5xl mt-12 '>Khóa học phổ biến</h1>
         <div className='my-14 flex justify-center space-x-5'>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]' >All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
            <Button className='bg-white text-black hover:bg-SignUp active:bg-SignUp border-2 w-[150px]'>All Program</Button>
         </div>
        <div className='flex justify-around mt-10'>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        </div>
        <div className='flex justify-around mt-10'>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        <Coursecard/>
        </div>
        <h1 className='text-SignUp text-center font-bold text-5xl mt-12 '>Danh mục khóa học</h1>
    </div>
    
  )
}

export default Course