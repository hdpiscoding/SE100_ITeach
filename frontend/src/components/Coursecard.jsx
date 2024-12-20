"use client";
import { React, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { create } from "domain";
import { set } from "date-fns";
const Coursecard = ({ type, course }) => {
  if (!course || (!course.Course && type == 1)) {
    return null; // or some fallback UI
  }
  const [createdAt, setCreatedAt] = useState("");
  const [courseName, setCourseName] = useState("");
  const [intro, setIntro] = useState("");

  useEffect(() => {
    if (type == 1) {
      setCreatedAt(
        course.Course.createdAt
          ? new Date(course.Course.createdAt).toLocaleDateString()
          : ""
      );
      setCourseName(course.Course.courseName ? course.Course.courseName : "");
      setIntro(course.Course.intro ? course.Course.intro : "");
    } else {
      setCreatedAt(
        course.createdAt ? new Date(course.createdAt).toLocaleDateString() : ""
      );
      setCourseName(course.courseName ? course.courseName : "");
      setIntro(course.intro ? course.introZ : "");
    }
  }, []);
  return (
    <div className="rounded-md overflow-hidden bg-slate-100 w-full sm:max-w-[300px] space-y-1 sm:space-y-2 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          width={300}
          height={200}
          src="/assets/images/course.webp"
          alt="course image"
          className="w-full h-auto"
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
              {course.discount && course.discount > 0
                ? course.cost - course.discount
                : course.cost}
              {" đ"}
            </span>
            {course.discount && course.discount > 0 && (
              <span className="line-through ml-2 text-gray-500 text-xs">
                {course.cost}
                {" đ"}
              </span>
            )}
          </div>
          <button className="bg-SignUp hover:bg-SignUp/90 text-xs sm:text-sm md:text-base lg:text-base text-white px-3 py-1 rounded-md">
            Enroll Now
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2">
          <button className="bg-[#FD661F] hover:bg-[#FD661F]/90 text-xs sm:text-sm md:text-base lg:text-base text-white px-3 py-1 rounded-md">
            Study Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Coursecard;
