'use client';
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Profile from "@/app/student/account/Profile";
import Password from "@/app/student/account/Password";
import OrderHistory from "@/app/student/account/OrderHistory";

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
                            <li className={`cursor-pointer flex flex-col gap-0.5`} onClick={() => handleTabChange(0)}>
                            <span className={`${tab === 0 ? "text-Lime" : "text-black"} hover:text-Lime font-semibold`}>
                                Thông tin cá nhân
                            </span>

                                <div className={`border-t-[3px] rounded border-Lime ${tab !== 0 ? "invisible" : ""}`}/>
                            </li>

                            <li className="cursor-pointer flex flex-col gap-0.5" onClick={() => handleTabChange(1)}>
                            <span className={`hover:text-Lime ${tab === 1 ? "text-Lime" : "text-black"} font-semibold`}>
                                Mật khẩu
                            </span>

                                <div className={`border-t-[3px] rounded border-Lime ${tab !== 1 ? "invisible" : ""}`}/>
                            </li>

                            <li className="cursor-pointer flex flex-col gap-0.5" onClick={() => handleTabChange(2)}>
                            <span className={`hover:text-Lime ${tab === 2 ? "text-Lime" : "text-black"} font-semibold`}>
                                Lịch sử mua hàng
                            </span>

                                <div className={`border-t-[3px] rounded border-Lime ${tab !== 2 ? "invisible" : ""}`}/>
                            </li>
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