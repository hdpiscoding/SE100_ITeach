"use client";
import React from "react";
import CourseCard from "@/components/Coursecard";
import TeacherCard from "@/components/teacherCard";
import { useRouter } from "next/navigation";
const Statistics = () => {
  const router = useRouter();
  return (
    <div className="mb-20">
      <div className="bg-bg text-orange font-bold  flex justify-center items-center lg:h-[150px] md:h-[130px] sm:h-[100px] h-[100px]">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl">Thống kê</h1>
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-16">
          <div className="grid grid-cols-5 p-4 lg:gap-6 md:gap-4 sm:gap-3 gap-2 lg:text-2xl md:text-lg sm:text-base text-base lg:h-[60vh] md:h-[60vh] sm:h-[50vh] h-[50vh]">
            <div className="border p-4 flex flex-col items-center justify-between col-span-2 rounded-lg border-SignUp h-full ">
              <div className=" font-bold">500M</div>
              <div className="text-SignUp">+ 30%</div>
              <div className="text-gray-500">học sinh</div>
            </div>
            <div className="col-span-3 space-y-1 lg:text-2xl md:text-lg sm:text-base text-xs h-full ">
              <div className="lg:h-1/2">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 md:gap-3 sm:gap-2 gap-1  h-full">
                  <div className="border p-4 flex flex-col items-center rounded-lg">
                    <div className="text-gray-500">thu nhập</div>
                    <div className=" font-bold">25B $</div>
                  </div>
                  <div className="border p-4 flex flex-col items-center rounded-lg">
                    <div className="text-gray-500">khóa học bán ra</div>
                    <div className=" font-bold">500M</div>
                  </div>
                  <div className="border p-4 flex flex-col items-center rounded-lg">
                    <div className="text-gray-500">bài học</div>
                    <div className=" font-bold">500M</div>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 lg:h-1/2">
                <div className="border p-4 flex flex-col justify-between bg-SignUp text-white rounded-lg h-full">
                  <div className=" font-bold">420</div>
                  <div className="flex justify-between">
                    <div className="text-gray-500">giảng viên</div>
                    <a
                      onClick={() => router.push("/teacherAdmin")}
                      className="cursor-pointer"
                    >
                      View All
                    </a>
                  </div>
                </div>
                <div className="border p-4 flex flex-col justify-between bg-white text-SignUp rounded-lg border-SignUp">
                  <div className=" font-bold">230</div>
                  <div className="flex justify-between">
                    <div className="text-gray-500">khóa học</div>
                    <a
                      onClick={() => router.push("/courseAdmin")}
                      className="cursor-pointer"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-orange text-center">
            Biểu đồ
          </h1>
          <div className="h-[70vh] border rounded-lg border-SignUp"></div>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-orange text-center">
            Khóa học phổ biến
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 justify-items-center">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/admin/course")}
              className="bg-white text-SignUp px-10 py-2
               rounded-lg border-SignUp border hover:bg-SignUp
                hover:text-white transition-all duration-300 lg:text-base md:text-sm sm:text-xs text-xs"
            >
              Xem tất cả
            </button>
          </div>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-SignUp text-center">
            Giảng viên danh giá
          </h1>
          <h1 className="text-gray-500 text-center">
            Onlearing is one powerful online software suite that combines all
            the tools needed to run a successful school or office.
          </h1>
          <div className="grid grid-cols-[1fr_4fr_1fr]">
            <div></div>
            <div className="grid grid-cols-3  gap-4 ">
              <TeacherCard />
              <TeacherCard />
              <TeacherCard />
            </div>
            <div></div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/admin/teacherAdmin")}
              className="bg-white text-SignUp px-10 py-2 rounded-lg
               border-SignUp border hover:bg-SignUp hover:text-white
                transition-all duration-300 lg:text-base md:text-sm sm:text-xs text-xs"
            >
              Xem tất cả
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Statistics;
