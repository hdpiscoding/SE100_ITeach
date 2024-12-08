'use client';
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Send} from "lucide-react";
const Navbar = () => {
  const [login, setLogin] = useState(true)
  return (
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
          <div className='p-3 flex col-start-2 justify-between'>
              <Link href="/">
                  <Image src='/assets/images/logo.png' alt='logo' width={200} height={15}/>
              </Link>

              <ul className='p-5 flex gap-24'>
                  <li className='active:text-orange hover:text-orange font-semibold'>
                      <Link href="">Trang chủ</Link>
                  </li>

                  <li className='active:text-orange hover:text-orange font-semibold'>
                      <Link href="">Quá trình</Link>
                  </li>

                  <li className='active:text-orange hover:text-orange font-semibold'>
                      <Link href="">Khóa học</Link>
                  </li>

                  <li className='active:text-orange hover:text-orange font-semibold'>
                      <Link href="">Về chúng tôi</Link>
                  </li>
              </ul>
              {!login ? (
                      <div className='p-3 flex items-center gap-5'>
                          <Button className='bg-white text-DarkGreen '>LOG IN</Button>
                          <Button className='bg-DarkGreen'>SIGN UP</Button>
                      </div>) :
                  (
                      <div className='p-3 flex items-center gap-5'>
                          {/*<Image alt="search" className='inline-block cursor-pointer' src="/assets/images/Search.png"*/}
                          {/*       width={30} height={30}/>*/}

                          <TooltipProvider>
                              <Tooltip>
                                  <TooltipTrigger asChild>
                                      <Link href="/student/cart">
                                          <Image alt="bag" className='inline-block cursor-pointer' src="/assets/images/Bag.png"
                                                 width={30} height={30}/>
                                      </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                      <p>Giỏ hàng</p>
                                  </TooltipContent>
                              </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                              <Tooltip>
                                  <TooltipTrigger asChild>
                                      <Link href="/student/account">
                                          <Image alt="user" className='inline-block cursor-pointer' src="/assets/images/user.png"
                                                 width={30} height={30}/>
                                      </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                      <p>Thông tin cá nhân</p>
                                  </TooltipContent>
                              </Tooltip>
                          </TooltipProvider>
                      </div>
                  )}

          </div>
      </div>
  )
}

export default Navbar