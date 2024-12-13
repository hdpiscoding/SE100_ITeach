"use client";
import React, { useState } from "react";
import Image from "next/image";
import FilterTeacher from "@/components/filterTeacher";
import TeacherCard from "@/components/teacherCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeacherAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  
  const courses = new Array(17).fill(null); 


  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  
  const totalPages = Math.ceil(courses.length / coursesPerPage);


  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-7">
        
        <div className="h-[120px] bg-bg grid grid-cols-[0.5fr_11fr_0.5fr]">
       
       <div></div>
       <div className="flex items-center">
         <div className="space-x-2 ">
       
           <Image
             className="inline-block"
             src="/assets/images/home.png"
             alt="banner"
             width={20}
             height={20}
           />
           <Image
             className="inline-block"
             src="/assets/images/arrow_right.png"
             alt="banner"
             width={5}
             height={5}
           />
           <span className="text-orange font-bold"> Giáo viên</span>
        
        
       </div>
       </div>
     <div></div>
   </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr] ">
        <div></div>
        <div className="space-y-7 my-10">
          <div className="flex justify-between">
            <div className="flex lg:flex-row flex-col lg:space-x-5 space-y-3 lg:space-y-0">
              <div className="rounded-3xl border-filter border-2 lg:w-[300px] w-full flex justify-between py-1">
                <input
                  className="outline-none lg:w-[270px] w-full ml-2"
                  type="text"
                  placeholder="Search courses..."
                />
                <Image
                  className="inline-block mr-2 mt-1 h-[20px]"
                  src="/assets/images/search_course.png"
                  width={15}
                  height={0}
                  alt="search"
                />
              </div>
              <div className="flex items-center lg:flex-row flex-col lg:space-x-5 space-y-2 lg:space-y-0">
                <span className="md:text-base text-sm">Sort by:</span>
                <Select>
                  <SelectTrigger className="lg:w-[180px] w-full">
                    <SelectValue placeholder="Most popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-x-1 md:text-base sm:text-sm">
              <span>Showing {courses.length} results of</span>
              <span className="text-filter font-bold">Java</span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_4fr] gap-6">
              <FilterTeacher />
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {currentCourses.map((_, index) => (
                  <TeacherCard key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-2 my-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 rounded ${
                  currentPage === number ? "bg-white text-strokeswap border border-strokeswap" : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TeacherAdmin;