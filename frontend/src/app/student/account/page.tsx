'use client';
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import('@/app/student/account/Profile'));
const Password = dynamic(() => import('@/app/student/account/Password'));
const OrderHistory = dynamic(() => import('@/app/student/account/OrderHistory'));

const StudentAccountPage = () => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (tab: number) => {
        setTab(tab);
    }

    return (
        <div>
            <div className='h-[120px] bg-bg grid grid-cols-[0.5fr_11fr_0.5fr]'>
                <div className="col-start-2 pl-6 flex items-center gap-2">
                    <Link href="">
                        <Image className='inline-block' src='/assets/images/home.png' alt='banner' width={20}
                               height={20}/>
                    </Link>

                    <Image className='inline-block' src='/assets/images/arrow_right.png' alt='banner' width={5}
                           height={5}/>
                    <span className='text-orange font-bold'>Tài khoản</span>
                </div>
            </div>

            <div className="grid grid-cols-[0.5fr_11fr_0.5fr] my-4">
                <div className="col-start-2 flex flex-col gap-6">
                    <div className="flex items-center justify-center">
                        <ul className="flex items-center justify-between gap-20 select-none">
                            {["Thông tin cá nhân", "Mật khẩu", "Lịch sử mua hàng"].map((label, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer flex flex-col gap-0.5"
                                    onClick={() => handleTabChange(index)}
                                >
                                    {/* Text */}
                                    <span
                                        className={`font-semibold ${
                                            tab === index ? "text-Lime scale-110" : "text-black scale-100"
                                        } hover:text-Lime transition-transform duration-300 ease-in-out`}
                                    >
                                      {label}
                                    </span>

                                    {/* Underline bar */}
                                    <div
                                        className={`border-t-[3px] rounded border-Lime transition-all duration-300 ${
                                            tab === index ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                                        }`}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {tab === 0 && <Profile/>}
                    {tab === 1 && <Password/>}
                    {tab === 2 && <OrderHistory/>}
                </div>
            </div>
        </div>
    );
}

export default StudentAccountPage;