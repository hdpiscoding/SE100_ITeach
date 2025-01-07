/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { React, useState, useEffect } from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
const Coursecard = ({ type, course }) => {
  if (!course || (!course.Course && type == 1)) {
    return null; // or some fallback UI
  }
  const [createdAt, setCreatedAt] = useState("");
  const [courseName, setCourseName] = useState("");
  const [intro, setIntro] = useState("");
  const [anhBia, setAnhBia] = useState("");

  const handleredirect = () => {
    const role = localStorage.getItem("role");
    if (role === "student") {
      window.location.href = "course/" + course.id;
    } else if (role === "teacher") {
      window.location.href = "course/" + course.id;
    } else if (role === "admin") {
      window.location.href = "course/" + course.id;
    } else {
      window.location.href = "course/" + course.id;
    }
  };

  useEffect(() => {
    if (type == 1) {
      setCreatedAt(
        course.Course.createdAt
          ? new Date(course.Course.createdAt).toLocaleDateString()
          : ""
      );
      setCourseName(course.Course.courseName ? course.Course.courseName : "");
      setIntro(course.Course.intro ? course.Course.intro : "");
      setAnhBia(course.Course.anhBia);
    } else {
      setCreatedAt(
        course.createdAt ? new Date(course.createdAt).toLocaleDateString() : ""
      );
      setCourseName(course.courseName ? course.courseName : "");
      setIntro(course.intro ? course.introZ : "");
        setAnhBia(course.anhBia);
    }
  }, []);

  const router = useRouter();

  const handleStudyNow = () => {
    console.log("study now");
    router.push(`/student/course/${course.courseId}`);
  }

  useEffect(() => {
    console.log(course.anhBia);
  }, [course]);

  return (
    <div className="cursor-pointer rounded-md overflow-hidden flex flex-col justify-between gap-1
     bg-slate-100 w-full max-w-[300px] min-h-[250px] 
      hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          width={300}
          height={200}
          src={anhBia}
          alt="course image"
         className="w-full max-h-[160px] object-cover"
        />
      </div>

      <h5 className="mx-3 sm:mx-4 text-gray-600 text-xs sm:text-sm">
        {createdAt}
      </h5>

      <h3 className="font-bold text-SignUp mx-3 sm:mx-4 sm:text-sm md:text-lg lg:text-xl text-xs">
        {courseName}
      </h3>

      <h4 className="mx-3 sm:mx-4 text-gray-700 text-xs sm:text-sm">{intro}</h4>

      {type !== "1" ? (
        <div className="flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2">
          <div className="flex items-center">
            <span className="text-orange font-semibold lg:text-lg md:text-base sm:text-sm text-xs">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(Number(((course.cost ?? 0) * (1 - (course.discount ?? 0) / 100)).toFixed(0)))}
            </span>
            {course.discount ? (
              <span className="line-through ml-2 text-gray-500 text-xs">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.cost)}
              </span>
            ) : <div></div>}
          </div>
          <button
            onClick={handleredirect}
            className="bg-SignUp hover:bg-SignUp/90 text-xs sm:text-sm md:text-base lg:text-base text-white px-3 py-1 rounded-md"
          >
            Đăng ký ngay
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2">
          <button className="bg-[#FD661F] hover:bg-[#FD661F]/90 text-xs sm:text-sm md:text-base lg:text-base text-white px-3 py-1 rounded-md" onClick={handleStudyNow}>
            Học ngay
          </button>
        </div>
      )}
    </div>
  );
};

export default Coursecard;
