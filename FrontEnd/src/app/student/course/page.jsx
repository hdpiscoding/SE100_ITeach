"use client";
import React, { useState } from "react";
import Image from "next/image";
import Filter from "@/components/Filter";
import Coursecard from "@/components/Coursecard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CoursesPage = () => {
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
             className="inline-block lg:w-[20px] md:w-[18px] sm:w-[15px] w-[15px] lg:h-[20px] md:h-[18px] sm:h-[15px] h-[15px]"
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
           <span className="text-orange font-bold"> Khóa học</span>
        
        
       </div>
       </div>
     <div></div>
   </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr] ">
        <div></div>
        <div className="space-y-7 my-10">
          <div className="flex justify-between">
            <div className="flex lg:flex-row flex-col lg:space-x-5 space-y-3 lg:space-y-0">
              <div className="rounded-3xl border-filter border-2 lg:w-[300px] md:w-[250px] sm:w-[230px] w-[200px] flex justify-between items-center p-1">
                <input
                  className="outline-none lg:w-[270px] md:w-[220px] sm:w-[180px] w-[150px] lg:text-base md:text-sm sm:text-xs text-xs rounded-3xl"
                  type="text"
                  placeholder="Search courses..."
                />
                <div className="lg:w-[20px] md:w-[18px] sm:w-[15px] w-[10px] lg:h-[20px] md:h-[18px] sm:h-[15px] h-[10px] flex items-center justify-center">
                  <Image
                    className=""
                    src="/assets/images/search_course.png"
                    width={15}
                    height={0}
                    alt="search"
                  />
                </div>
              </div>
              <div className="  grid grid-cols-[1fr_2fr] gap-6 ">
                <span className="md:text-base sm:text-sm lg:text-xl text-xs flex items-center">Sort by:</span>
                <Select className="md:text-base sm:text-sm lg:text-xl text-xs">
                  <SelectTrigger className="lg:w-[180px] md:w-[150px] sm:w-[120px] w-[100px]">
                    <SelectValue className="lg:text-xl md:text-lg sm:text-sm text-xs" placeholder="Most popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>  
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-x-1 md:text-base sm:text-sm lg:text-xl text-xs">
              <span>Showing {courses.length} results of</span>
              <span className="text-filter font-bold">Java</span>
            </div>
          </div>
          <div>
            <div className="grid lg:grid-cols-[1fr_4fr] md:grid-cols-[1fr_3fr] sm:grid-cols-[1fr_2fr] grid-cols-[1fr_1fr] gap-6">
              <Filter />
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {currentCourses.map((_, index) => (
                  <Coursecard key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-2 my-10 lg:text-base md:text-sm sm:text-xs text-xs">
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

export default CoursesPage;