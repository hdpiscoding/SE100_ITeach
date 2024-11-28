"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import FilterProcess from "@/components/filterProcess";
import Coursecard from "@/components/Coursecard";
const Process = () => {
  let username = "Username";
  let khoahoc = 24;
  let chungchi = 24;
  const [activeTab, setActiveTab] = useState("registered");
  return (
    <div className="">
      <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh]">
        <Image
          src="/assets/images/bg_aboutus.png"
          alt="process"
          fill
          priority
          className="object-cover z-0"
          sizes="100vw"
        />
      
        <div className="absolute inset-0 flex items-center justify-center lg:text-5xl md:text-4xl text-2xl">
          <div className="p-6 rounded-lg">
            <span className="font-bold text-orange">Hello </span>
            <span className="text-white ">{username}</span>
            <p className="font-bold">
              <span className="text-white">Bạn đã tham gia </span>
              <span className="text-process">{khoahoc}</span>
              <span className="text-white"> khóa học và được cấp </span>
              <span className="text-process">{chungchi}</span>
              <span className="text-white"> chứng chỉ</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div>
          <div className="flex justify-center items-center space-x-10 my-10 lg:text-2xl md:text-xl text-xs">
            <span
              className={`cursor-pointer ${
                activeTab === "registered" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("registered")}
            >
              Khóa đã đăng ký({khoahoc})
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "suggested" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("suggested")}
            >
              Khóa học gợi ý
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "certificate" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("certificate")}
            >
              Chứng chỉ
            </span>
          </div>
          <div className="grid grid-cols-[1fr_4fr] gap-6 p-3 ">
            <div className=" ">
              <FilterProcess />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              <Coursecard/>
              <Coursecard/>
              <Coursecard/>
              <Coursecard/>
              <Coursecard/>
              <Coursecard/>
              <Coursecard/>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Process;
