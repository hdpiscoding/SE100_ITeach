'use client';
import React from "react";
import Image from "next/image";
import { ApproveCourse, StopCourse, deleteCourse } from "../services/admin";
import {useRouter} from "next/navigation";

const CourseCardAdmin = ({ course, type }) => {
  const handelApprove = async () => {
    await ApproveCourse({ courseId: course.id });
    window.location.reload();
  };

  const handleStop = async () => {
    await StopCourse({ courseId: course.id });
    window.location.reload();
  };
  const handleDelete = async () => {
    //await deleteCourse({ courseId: course.id });
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse({ courseId: course.id });
    }
    window.location.reload();
  };

  const router = useRouter();
  const handleToCourseDetail = () => {
    router.push(`/admin/course/${course.id}`);
  }
  return (
    <div className=" max-h-[300px] rounded-md overflow-hidden bg-slate-100 lg:w-[300px] md:w-[250px] sm:w-[200px] w-[200px] space-y-2 sm:space-y-3 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          width={300}
          height={200}
          src={course?.anhBia}
          alt="course image"
          className="w-full h-auto"
        />
      </div>

      <div>
        <h5 className="mx-3 sm:mx-4 text-gray-600 text-xs sm:text-sm">
          {new Date(course?.createdAt).toLocaleDateString()}
        </h5>

        <h3 className="font-bold text-SignUp mx-3 sm:mx-4 lg:text-xl md:text-base sm:text-sm text-sm cursor-pointer" onClick={handleToCourseDetail}>
          {course?.courseName}
        </h3>

        <h4 className="mx-3 sm:mx-4 text-gray-700 lg:text-base md:text-sm sm:text-xs text-xs">
          {course?.instructor}
        </h4>

        <div className="flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2">
          <div className="flex items-center">
            <span className="text-orange font-semibold lg:text-lg md:text-base sm:text-sm text-xs">
              {/*{course?.discount && course?.discount > 0*/}
              {/*  ? course?.cost - course?.discount*/}
              {/*  : course?.cost}*/}
              {/*{" đ"}*/}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(Number(((course?.cost ?? 0) * (1 - (course?.discount ?? 0) / 100)).toFixed(0)))}
            </span>
            {course?.discount && course?.discount > 0 && (
              <span className="line-through ml-2 text-gray-500 text-xs">
                {/*{course?.cost}*/}
                {/*{" đ"}*/}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course?.cost ?? 0)}
              </span>
            )}
          </div>
          {type !== "public" && (
            <div className="flex gap-2">
              <Image
                className="lg:w-[30px] lg:h-[30px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[15px] h-[15px]"
                src="/assets/images/check.png"
                alt="check"
                width={30}
                height={30}
                onClick={handelApprove}
              />
              <Image
                className="lg:w-[30px] lg:h-[30px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[15px] h-[15px]"
                src="/assets/images/deny.png"
                alt="delete"
                width={30}
                height={30}
                onClick={handleDelete}
              />
            </div>
          )}
          {type === "public" && (
            <div className="flex gap-2">
              <p onClick={handleStop} className="text-amber-500 font-bold">
                Dừng
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCardAdmin;
