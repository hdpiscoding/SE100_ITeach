"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Coursecard from "@/components/Course/Coursecard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import{useEffect,useRef} from "react";
import { getMyAccount,getMyCourse } from "@/services/teacher";
const CourseTeacher = () => {
  let tId = "98e89016-b2d1-49a4-84b5-7d1e361a007c";
  const [username, setUsername] = useState("");
  const [khoahoc, setKhoahoc] = useState(0);
  const [hocvien, setHocvien] = useState(0);
  const [myCourse, setMyCourse] = useState([]);
  const [courseStats, setCourseStats] = useState({ CS1: 0, CS2: 0, CS3: 0 });
  const [activeTab, setActiveTab] = useState("active");
  const router = useRouter();
  const fetchRef = useRef(false);
  const fetchMyAccount = async () => {
    const response = await getMyAccount(tId);
    if (response && response.data) {
      console.log(response.data);
      setUsername(response.data.teacher.firstName+" "+response.data.teacher.lastName) ;
      
    }
  };
  const fetchMyCourse = async () => {
    const response = await getMyCourse(tId);
    if (response && response.data) {
      setKhoahoc(response.data.courses.length);
      let totalStudents = 0;
      response.data.courses.forEach((course) => {
        totalStudents += course.totalStudent;
        if (course.courseStatus === "CS1") courseStats.CS1 += 1;
        if (course.courseStatus === "CS2") courseStats.CS2 += 1;
        if (course.courseStatus === "CS3") courseStats.CS3 += 1;
      });
      setHocvien(totalStudents);
      setMyCourse(response.data.courses);
    }
  };
  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true;
      fetchMyCourse();
      fetchMyAccount();
    }
  }, []);
  return (
    <div className="space-y-3 md:space-y-5 lg:space-y-7 p-3">
     
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
              onClick={() => router.push("/teacher/step1")}
              className="bg-orange text-white h-[30px] w-[100px] text-[10px] sm:h-[35px] sm:w-[120px] sm:text-xs md:h-[40px] md:w-[140px] md:text-sm lg:h-[45px] lg:w-[160px] lg:text-base"
            >
              Tạo khóa học
            </Button>
          </div>

          <div className="flex justify-start items-center space-x-10 my-10 lg:text-2xl md:text-xl text-xs">
            <span
              className={`cursor-pointer ${
                activeTab === "active" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Đang hoạt động({courseStats.CS1})
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "approval" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("approval")}
            >
              Đang chờ duyệt({courseStats.CS2})
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "pause" ? "text-orange" : "text-black"
              }`}
              onClick={() => setActiveTab("pause")}
            >
              Tạm dừng({courseStats.CS3})
            </span>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 ">
          {myCourse
    .filter(course => {
      if (activeTab === "active") return course.courseStatus === "CS1";
      if (activeTab === "approval") return course.courseStatus === "CS2";
      if (activeTab === "pause") return course.courseStatus === "CS3";
      return false;
    })
    .map((course) => (
      <Coursecard
        key={course.id}
        courseName={course.courseName}
        cost={course.cost}
        discount={course.discount}
        intro={course.intro}
      
      />
    ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CourseTeacher;
