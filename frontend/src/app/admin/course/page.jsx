"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Filter from "@/components/Filter";
import CourseCardAdmin from "@/components/courseCardAdmin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCourses } from "@/services/admin";
const CoursesAdmin = () => {
  const [activeTab, setActiveTab] = useState("public");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const [courses, setCourses] = useState([]);
  const [all, setAll] = useState([]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllCourses();
        const allCourses = response.data.data;
        setAll(allCourses);

        const filterCourse = allCourses.filter((course) => {
          return course.courseStatus === "CS1";
        });
        setCourses(filterCourse);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getData();
  }, []);
  const handleClick = (cs) => {
    const searchInput = document
      .querySelector('input[type="text"]')
      .value.toLowerCase();
    if (searchInput === "" || searchInput === null) {
      const filterCourse = all.filter((course) => {
        return course.courseStatus === cs;
      });
      setCourses(filterCourse);
    } else {
      const filterCourse = all.filter((course) => {
        return (
          course.courseStatus === cs &&
          course.courseName.toLowerCase().includes(searchInput)
        );
      });

      setCourses(filterCourse);
    }
  };
  const handleSearch = () => {
    if (activeTab === "public") {
      handleClick("CS1");
    }
    if (activeTab === "pending") {
      handleClick("CS2");
    }
    if (activeTab === "paused") {
      handleClick("CS3");
    }
  };

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
            <span className="text-orange font-bold"> Khóa học</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr] ">
        <div></div>

        <div className="space-y-7 my-10">
          <div className="flex justify-center space-x-10 lg:text-xl md:text-lg sm:text-sm text-xs">
            <span
              className={`cursor-pointer ${
                activeTab === "public" ? "text-orange" : ""
              }`}
              onClick={() => {
                setActiveTab("public");
                handleClick("CS1");
              }}
            >
              Khóa học công khai
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "pending" ? "text-orange" : ""
              }`}
              onClick={() => {
                setActiveTab("pending");
                handleClick("CS2");
              }}
            >
              Khóa học chờ duyệt
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "paused" ? "text-orange" : ""
              }`}
              onClick={() => {
                setActiveTab("paused");
                handleClick("CS3");
              }}
            >
              Khóa học tạm ngưng
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex lg:flex-row flex-col lg:space-x-5 space-y-3 lg:space-y-0">
              <div className="rounded-3xl border-filter border-2 lg:w-[300px] md:w-[250px] sm:w-[230px] w-[200px] flex justify-between items-center p-1">
                <input
                  className="outline-none lg:w-[270px] md:w-[220px] sm:w-[180px] w-[150px] lg:text-base md:text-sm sm:text-xs text-xs rounded-3xl"
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  onChange={handleSearch}
                />
                <div className="lg:w-[20px] md:w-[18px] sm:w-[15px] w-[10px] lg:h-[20px] md:h-[18px] sm:h-[15px] h-[10px] flex items-center justify-center">
                  <Image
                    className=""
                    src="/assets/images/search_course.png"
                    width={15}
                    height={0}
                    alt="search"
                    onClick={handleSearch}
                  />
                </div>
              </div>
              <div className="  grid grid-cols-[1fr_2fr] gap-6 ">
                <span className="md:text-base sm:text-sm lg:text-xl text-xs flex items-center">
                  Sắp xếp theo:
                </span>
                <Select className="md:text-base sm:text-sm lg:text-xl text-xs">
                  <SelectTrigger className="lg:w-[180px] md:w-[150px] sm:w-[120px] w-[100px]">
                    <SelectValue
                      className="lg:text-xl md:text-lg sm:text-sm text-xs"
                      placeholder="Most popular"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-x-1 lg:text-xl md:text-lg sm:text-sm text-xs">
              <span>2900 kết quả tìm kiếm</span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_4fr] gap-6">
              <Filter />
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {currentCourses.map((_, index) => (
                  <CourseCardAdmin key={index} course={currentCourses[index]} />
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
                  currentPage === number
                    ? "bg-white text-strokeswap border border-strokeswap"
                    : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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

export default CoursesAdmin;
