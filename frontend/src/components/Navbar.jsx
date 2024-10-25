import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
const Navbar = () => {
  const [Login, setLogin] = useState(true)
  return (
    <div className='p-3 flex justify-around '>
        <Image src='/assets/images/logo.png' alt='logo' width={200} height={15}  />
        <ul className='p-5 flex space-x-40'>
            <li className='active:text-orange hover:text-orange '><a  href="">Trang chủ</a></li>
            <li className='active:text-orange hover:text-orange'><a href="">Quá trình</a></li>
            <li className='active:text-orange hover:text-orange'><a href="">Khóa học</a></li>
            <li className='active:text-orange hover:text-orange'><a href="">Về chúng tôi</a></li>
        </ul>
        {!Login ?(
        <div className='p-3 space-x-5'>
            <Button className='bg-white text-SignUp '>LOG IN</Button>
            <Button className='bg-SignUp' >SIGN UP</Button>
        </div>):
        (
        <div className='p-3 space-x-5'>
            <Image className='inline-block' src="/assets/images/Search.png" width={30} height={30}/>
            <Image  className='inline-block' src="/assets/images/Bag.png" width={30} height={30}/>
            <Image  className='inline-block' src="/assets/images/user.png" width={30} height={30}/>
        </div>
        )}
        
    </div>
  )
}

export default Navbar