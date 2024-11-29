import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Footer = () => {
  return (
    <div className='bg-bg flex space-x-40 pt-16'>
        <div className='space-y-5 ml-10 w-[300px]'>
            <div className='ml-[-10px]'>
                <Image alt="logo" className="h-[50px]" src="/assets/images/logo.png" width={150} height={25} />
            </div>
            <div className='space-x-5'>
            <Image alt="location" className="h-[25px] inline-block" src="/assets/images/Location.png" width={17} height={25} />
            <span className='text-DarkGreen font-bold'>Address:</span>
           
            </div>
            <h1 className='text-DarkGreen'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h1>
            <div className='space-x-5'>
            <Image alt="call" className="h-[25px] inline-block" src="/assets/images/Call.png" width={20} height={25} />
            <span className='text-DarkGreen font-bold'>Tel :+9229341037</span>
           
            </div>
            <div className='space-x-5'>
            <Image alt="time" className="h-[25px] inline-block" src="/assets/images/Time Circle.png" width={20} height={25} />
            <span className='text-DarkGreen font-bold'>Response hours: 8 to 20</span>
           
            </div>
            <div className='space-x-5'>
            <Image alt="group" className="h-[25px] inline-block" src="/assets/images/Group.png" width={20} height={25} />
            <span className='text-DarkGreen font-bold'>Email: info@onlearn.com</span>
            </div>
        </div>
        <div className='space-y-5 mt-5'>
            <h1 className='font-bold'>Categories</h1>
            <h1 className='text-DarkGreen'>Counseling</h1>
            <h1 className='text-DarkGreen'>Health and fitness</h1>
            <h1 className='text-DarkGreen'>Individual development</h1>
            <h1 className='text-DarkGreen'> more</h1>
        </div>
        <div className='space-y-5 mt-5'>
            <h1 className='font-bold'>Links</h1>
            <h1 className='text-DarkGreen'>About us</h1>
            <h1 className='text-DarkGreen'>Blog</h1>
        </div>
        <div className='space-y-4' >
            <h1 className='text-center'>Stay up to date with the latest courses</h1>
            <div className='bg-white rounded-2xl flex justify-between p-3 w-[400px]'>
                <h1 className='text-DarkGreen'>Email</h1>
                <Button className='bg-DarkGreen text-white font-bold rounded-xl w-[120px] p-5'>Send</Button>
            </div>
        </div>
    </div>
  )
}

export default Footer