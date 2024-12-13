"use client";
import React from "react";
import CourseCard from "@/components/Coursecard";
import TeacherCard from "@/components/teacherCard";
import { useRouter } from "next/navigation";
const Statistics = () => {
  const router = useRouter();
  return (
    <div className="mb-20">
      <div className="bg-bg text-orange font-bold text-4xl flex justify-center items-center h-[150px]">
        <h1>Thống kê</h1>
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-16">
          <div className="grid grid-cols-5 gap-4 p-4 ">
            <div className="border p-4 flex flex-col items-center justify-between col-span-2 rounded-lg border-SignUp h-[62vh]">
              <div className="text-5xl font-bold">500M</div>
              <div className="text-SignUp">+ 30%</div>
              <div className="text-gray-500">học sinh</div>
            </div>
            <div className="col-span-3 space-y-4 ">
              <div>
                <div className="grid grid-cols-3 gap-4 col-span-2 h-[30vh]">
                  <div className="border p-4 flex flex-col items-center rounded-lg">
                    <div className="text-gray-500">thu nhập</div>
                    <div className="text-2xl font-bold">25B $</div>
                  </div>
                  <div className="border p-4 flex flex-col items-center rounded-lg">
                    <div className="text-gray-500">khóa học bán ra</div>
                    <div className="text-2xl font-bold">500M</div>
                  </div>
                  <div className="border p-4 flex flex-col items-center rounded-lg">
                    <div className="text-gray-500">bài học</div>
                    <div className="text-2xl font-bold">500M</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 h-[30vh]">
                <div className="border p-4 flex flex-col justify-between bg-SignUp text-white rounded-lg">
                  <div className="text-5xl font-bold">420</div>
                  <div className="flex justify-between">
                    <div className="text-gray-500">giảng viên</div>
                    <a onClick={() => router.push("/teacherAdmin")} className="cursor-pointer">
                      View All
                    </a>
                  </div>
                </div>
                <div className="border p-4 flex flex-col justify-between bg-white text-SignUp rounded-lg border-SignUp">
                  <div className="text-5xl font-bold">230</div>
                  <div className="flex justify-between">
                    <div className="text-gray-500">khóa học</div>
                    <a onClick={() => router.push("/courseAdmin")} className="cursor-pointer">
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-orange text-center">
            Biểu đồ
          </h1>
          <div className="h-[70vh] border rounded-lg border-SignUp"></div>
          <h1 className="text-4xl font-bold text-orange text-center">
            Khóa học phổ biến
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4">
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
            <button onClick={() => router.push("/courseAdmin")} className="bg-white text-SignUp px-10 py-2 rounded-lg border-SignUp border">
              Xem tất cả
            </button>
          </div>
          <h1 className="text-4xl font-bold text-SignUp text-center">
            Giảng viên danh giá
          </h1>
          <h1 className="text-gray-500 text-center">
            Onlearing is one powerful online software suite that combines all
            the tools needed to run a successful school or office.
          </h1>
        <div className="grid grid-cols-[1fr_4fr_1fr]">
            <div></div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
                <TeacherCard />
                <TeacherCard />
                <TeacherCard />
              </div>
              <div></div>
        </div>
        <div className="flex justify-center">
            <button onClick={() => router.push("/teacherAdmin")} className="bg-white text-SignUp px-10 py-2 rounded-lg border-SignUp border">
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
