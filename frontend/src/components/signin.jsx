"use client"
import React from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'

const SignIn = ({ isOpen, onClose, onSignIn }) => {
   if (!isOpen) return null;
  

  return (
   
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
     
      <div className="bg-white rounded-xl max-w-[900px] relative">
        <div className="flex flex-col md:flex-row justify-center md:space-x-3">
        
          <Image 
            alt="bg-login" 
            className="hidden md:inline-block" 
            src="/assets/images/bg_login.png" 
            width={400} 
            height={100} 
          />

          
          <div className="w-full  md:w-[400px] max-w-[400px] mx-auto p-3">
          
            <div className="flex justify-end mt-2">
              <button onClick={onClose} className="absolute top-2 right-2">
              <Image alt="close" src="/assets/images/close.png" width={24} height={24} />
              </button>
            </div>

          
            <Image alt="logo" src="/assets/images/logo.png" width={150} height={20} />
            <h1 className="text-sm md:text-base">
              Join us and get more benefits. We promise to keep your data safely.
            </h1>

          
            <div className="bg-xanhface flex p-2 justify-center rounded-2xl space-x-2 my-3 cursor-pointer">
              <Image 
                alt="facebook" 
                className="inline-block" 
                src="/assets/images/facebook.png" 
                width={27} 
                height={20}
              />
              <h1 className="font-bold text-white text-sm md:text-base">
                Sign Up with Facebook
              </h1>
            </div>

            <div className="bg-white flex p-2 justify-center rounded-2xl space-x-2 border-2 border-gray mt-3 cursor-pointer hover:bg-MoreLightGray">
              <Image 
                alt="google" 
                className="inline-block" 
                src="/assets/images/google.png" 
                width={25} 
                height={20}
              />
              <h1 className="font-bold text-black text-sm md:text-base">
                Continue with Google
              </h1>
            </div>

            <div className="flex justify-center mt-2">
              <h1 className="text-sm md:text-base">Or you can</h1>
            </div>

          
            <div className="space-y-2 mt-5">
              <div className="border-2 p-2 flex justify-between bg-MoreLightGray"> 
                <input 
                  className="outline-none w-full bg-transparent" 
                  type="email" 
                  placeholder="Email Address" 
                />
              </div>
              <div className="border-2 p-2 flex justify-between bg-MoreLightGray"> 
                <input 
                  className="outline-none w-full bg-transparent" 
                  type="password" 
                  placeholder="Password" 
                />
              </div>
              <div className="border-2 p-2 flex justify-between bg-MoreLightGray"> 
                <input 
                  className="outline-none w-full bg-transparent" 
                  type="email" 
                  placeholder="Sign up as..." 
                />
                <Image 
                  alt="arrow down" 
                  className="inline-block" 
                  src="/assets/images/arrow_down.png" 
                  width={25} 
                  height={20} 
                />
              </div>
            </div>

           
            <Button className="bg-filter w-full rounded-2xl font-bold text-white text-1xl my-3 hover:bg-SignUp">
              Create Account
            </Button>

           
            <div className="flex justify-center mt-4 text-sm md:text-base gap-2">
              <span>Already have an Account?</span>
              <span 
                onClick={onSignIn} 
                className="font-bold text-filter hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;