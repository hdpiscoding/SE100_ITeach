"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import FilterTeacher from "../../../components/Filter/filterTeacher";
import TeacherCard from "../../../components/teacherCard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTeachers, getAllReviews } from "@/services/admin";
const TeacherAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [allteachers, setAllTeachers] = useState([]);
  const coursesPerPage = 12;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const getData = async () => {
      const response = await getTeachers();

      const rawReviews = await getAllReviews();
      const reviews = rawReviews.data.reviews;

      const updatedTeachers = response.data.teachers.map((teacher) => {
        const teacherReviews = reviews.filter(
          (review) => review.teacherId === teacher.id
        );
        return { ...teacher, reviews: teacherReviews };
      });
      setCourses(updatedTeachers);
      setAllTeachers(updatedTeachers);
    };
    getData();
  }, [currentPage]);
  const filterTeachers = (rating, studentCount) => {
    const filteredTeachers = allteachers.filter((teacher) => {
      var averageRating =
        teacher.reviews.reduce((acc, review) => acc + review.star, 0) /
        teacher.reviews.length;
      if (teacher.reviews.length === 0) {
        averageRating = 0;
      }

      return (
        averageRating >= rating && teacher.totalStudentNumber >= studentCount
      );
    });
    setCourses(filteredTeachers);
  };
  const handleSearch = () => {
    const searchInput = document
      .querySelector('input[type="text"]')
      .value.toLowerCase();
    const filteredTeachers = allteachers.filter((teacher) => {
      const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
      return fullName.includes(searchInput);
    });
    setCourses(filteredTeachers);
  };
  const handleChange = () => {
    const searchInput = document
      .querySelector('input[type="text"]')
      .value.toLowerCase();
    if (searchInput === "") {
      setCourses(allteachers);
      return;
    }
  };
  const handleSort = (criteria) => {
    const sortedTeachers = [...allteachers].sort((a, b) => {
      if (criteria === "rating") {
        const avgRatingA =
          a.reviews.reduce((acc, review) => acc + review.star, 0) /
            a.reviews.length || 0;
        const avgRatingB =
          b.reviews.reduce((acc, review) => acc + review.star, 0) /
            b.reviews.length || 0;
        return avgRatingB - avgRatingA;
      } else if (criteria === "students") {
        return b.totalStudentNumber - a.totalStudentNumber;
      } else if (criteria === "courses") {
        return b.totalCourseNumber - a.totalCourseNumber;
      }
      return 0;
    });
    setCourses(sortedTeachers);
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
              <div className="rounded-3xl border-filter border-2 lg:w-[300px] md:w-[250px] sm:w-[230px] w-[200px] flex justify-between items-center p-1">
                <input
                  className="outline-none lg:w-[270px] md:w-[220px] sm:w-[180px] w-[150px] lg:text-base md:text-sm sm:text-xs text-xs rounded-3xl"
                  type="text"
                  placeholder="Tìm giáo viên..."
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
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
                <Select
                  className="md:text-base sm:text-sm lg:text-2xl text-xs"
                  onValueChange={handleSort}
                >
                  <SelectTrigger className="lg:w-[180px] md:w-[180px] sm:w-[120px] w-[100px]">
                    <SelectValue
                      className="lg:text-xl md:text-lg sm:text-sm text-xs"
                      placeholder="Sắp xếp"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Đánh giá</SelectItem>
                    <SelectItem value="students">Số lượng học sinh</SelectItem>
                    <SelectItem value="courses">Số lượng bài học</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-x-1 md:text-base sm:text-sm lg:text-xl text-xs">
              <span>Hiển thị {courses.length} kết quả </span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_4fr] gap-6">
              <FilterTeacher filterTeachers={filterTeachers} />
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 lg:gap-6 md:gap-4 sm:gap-3 gap-2">
                {currentCourses.map((_, index) => (
                  <TeacherCard key={index} teacher={currentCourses[index]} />
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
              Trước
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
              Tiếp
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TeacherAdmin;
