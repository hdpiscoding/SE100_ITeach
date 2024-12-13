import React from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'

const SignIn = () => {
  return (
    <div className='flex justify-center space-x-3 rounded-xl  w-fit pr-2'>
    <Image alt="bg-login" className='inline-block' src="/assets/images/bg_login.png" width={400} height={100} />
    <div className=' w-[400px]'>
       <div className='flex justify-end mt-2'>
         <Image alt="close" src="/assets/images/close.png" width={20} height={20}/>
        </div>
        <Image alt="logo" src="/assets/images/logo.png" width={150} height={20} />
        <h1>Join us and get more benefits. We promise to keep your data safely. </h1>
        <div className='bg-xanhface flex p-2 justify-center rounded-2xl space-x-2 my-3'>
        <Image alt="facebook" className='inline-block' src="/assets/images/facebook.png" width={25} height={20}/>
        <h1 className='font-bold text-white'>Sign Up with Facebook</h1>
        </div>
        <div className='bg-white flex p-2 justify-center rounded-2xl space-x-2 border-2 border-gray mt-3'>
        <Image alt="google" className='inline-block' src="/assets/images/google.png" width={20} height={20}/>
        <h1 className='font-bold text-black'>Continue with Google</h1>
        </div>
        <div className='flex justify-center'> <h1 className=''>Or you can</h1></div>
       <div className='space-y-2 mt-5'>
        <div className='border-2  p-2 flex justify-between bg-gray'> 
            <input className='outline-none w-full bg-transparent' type="email" placeholder='Email Address' />
        </div>
        <div className='border-2  p-2 flex justify-between bg-gray'> 
            <input className='outline-none w-full bg-transparent ' type="password" placeholder='Password' />
        </div>
        <div className='border-2  p-1 flex justify-between bg-gray'> 
            <input className='outline-none w-full bg-transparent' type="email" placeholder='Sign up as...' />
            <Image alt="arrow down" className='inline-block' src="/assets/images/arrow_down.png" width={25} height={20} />
        </div>
         </div>
        <Button className='bg-filter w-full rounded-2xl font-bold text-white text-1xl my-3'>Create Account</Button>
       
       
       <div className='flex justify-center mt-4'>
            <span>Already have an Account?</span>
            <span className='font-bold text-filter'>Sign up</span>
       </div>
    </div>
    
</div>
  )
}

export default SignIn