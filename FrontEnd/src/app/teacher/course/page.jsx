"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Coursecard from "@/components/Coursecard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const CourseTeacher = () => {
  let username = "Username";
  let khoahoc = 24;
  let hocvien = 24;
  const [activeTab, setActiveTab] = useState("registered");
  const router = useRouter();
  return (
    <div className="space-y-3 md:space-y-5 lg:space-y-7">
      <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh]">
        <Image
          src="/assets/images/bg_aboutus.png"
          alt="process"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 flex items-center justify-center lg:text-5xl md:text-4xl text-2xl">
          <div className="p-6 rounded-lg">
            <span className="font-bold text-orange">Hello </span>
            <span className="text-white ">{username}</span>
            <p className="font-bold">
              <span className="text-white">Bạn đã tạo ra </span>
              <span className="text-process">{khoahoc}</span>
              <span className="text-white"> khóa học và có </span>
              <span className="text-process">{hocvien}</span>
              <span className="text-white"> học viên tham gia</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-7">
          <div className="flex justify-between items-center">
            <div className="lg:text-2xl md:text-xl text-xs font-bold">
              Khóa học của tôi
            </div>
            <Button
              onClick={() => router.push("/step1")}
              className="bg-orange text-white h-[30px] w-[100px] text-[10px] sm:h-[35px] sm:w-[120px] sm:text-xs md:h-[40px] md:w-[140px] md:text-sm lg:h-[45px] lg:w-[160px] lg:text-base"
            >
              Tạo khóa học
            </Button>
          </div>

          <div className="flex justify-start items-center space-x-10 my-10 lg:text-2xl md:text-xl text-xs">
            <span
              className={`cursor-pointer ${
                activeTab === "registered" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("registered")}
            >
              Đang hoạt động({khoahoc})
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "suggested" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("suggested")}
            >
              Đang chờ duyệt
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "certificate" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("certificate")}
            >
              Tạm dừng
            </span>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 ">
            <Coursecard />
            <Coursecard />
            <Coursecard />
            <Coursecard />
            <Coursecard />
            <Coursecard />
            <Coursecard />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CourseTeacher;
