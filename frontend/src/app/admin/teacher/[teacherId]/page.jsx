"use client";

import React, { useEffect ,useState,useRef} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TeacherCard from "@/components/teacherCard";
import CourseCardAdmin from "@/components/courseCardAdmin";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getATeacherInfo } from "@/services/student";
import { getAllCourseOfATeacher } from "@/services/admin";

import { toast } from "react-toastify";
import AlertModal from "@/components/AlertDialog2/AlertModal";


import Filter from "@/components/Filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCourses } from "@/services/admin";
const TeacherInfor = () => {
  const [teacher, setTeacher] = useState(null);
    const [all, setAll] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {        console.log("Fetching all courses...");

      const response = await getAllCourses();
      const allCourses = response.data.data;        console.log("All courses fetched:", allCourses);

      setAll(allCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchTeacher = async () => {
    try {        console.log("Fetching teacher info...");

      const teacherId = window.location.pathname.split("/").pop();
      const data = await getATeacherInfo(teacherId);
        console.log("Teacher info fetched:", data);
      if (data && data.errCode === 0) {
        setTeacher(data.teacher);
      } else {
        toast.error("Lỗi khi lấy thông tin giáo viên");
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  fetchTeacher();
}, [all]);
    const triggerRef = useRef(null);

  const handleConfirm = async () => {
    // handle confirm logic
  };

  const handleOnClick = () => {
    triggerRef.current?.click();
  };

  //*********************** */
    const [activeTab, setActiveTab] = useState("public");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await getAllCourses();
  //       const allCourses = response.data.data;
  //       setAll(allCourses);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };
  //   getData();
  // }, []);
  const handleClick = (cs) => {
    const searchInput = document
      .querySelector('input[type="text"]')
      .value.toLowerCase();
    if (searchInput === "" || searchInput === null) {
      const filterCourse = filteredCourses.filter((course) => {
        return course.courseStatus === cs;
      });
      setCourses(filterCourse);
    } else {
      const filterCourse = filteredCourses.filter((course) => {
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
  const handleFilter = async (
    selectedCategories,
    selectedDurations,
    rateValue
  ) => {
    if (
      selectedCategories.length === 0 &&
      selectedDurations.length === 0 &&
      rateValue === ""
    ) {
      setFilteredCourses(all);
      return;
    }
    const response = await getAllCourses();
    const allCourses = response.data.data;
    const filter = allCourses.filter((course) => {
      var abovecost = 0;
      const courseCost = parseInt(course.cost);
      if (rateValue === "1") {
        abovecost = 0;
      }
      if (rateValue === "2") {
        abovecost = 100000;
      }
      if (rateValue === "3") {
        abovecost = 10000000;
      }
      const costCondition = courseCost >= abovecost;

      const categoryCondition = selectedCategories.includes(
        course.category?.id?.toString()
      );

      const durationCondition = selectedDurations.includes(course.level);
      return categoryCondition && durationCondition && costCondition;
    });

    setFilteredCourses(filter);
  };
  const handleSort = (criteria) => {
    if (criteria === "light") {
      const sortedCourses = [...courses].sort((a, b) => {
        return a.cost - b.cost;
      });
      setCourses(sortedCourses);
    }
    if (criteria === "high") {
      const sortedCourses = [...courses].sort((a, b) => {
        return b.cost - a.cost;
      });
      setCourses(sortedCourses);
    }
  };

  useEffect(() => {
    if (activeTab === "public") {
      handleClick("CS1");
    }
    if (activeTab === "pending") {
      handleClick("CS2");
    }
    if (activeTab === "paused") {
      handleClick("CS3");
    }
  }, [filteredCourses]);
  return (
    <div className="space-y-10 mb-20">
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
            <span className="text-SignUp "> Giáo viên</span>
            <Image
              className="inline-block"
              src="/assets/images/arrow_right.png"
              alt="banner"
              width={5}
              height={5}
            />
            <span className="text-orange font-bold"> Thông tin giảng viên</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr] ">
        <div></div>
        <div className="space-y-10">
            <div className="border border-gray rounded-lg ">
                <h1 className="text-xl font-bold p-5">Thông tin giảng viên</h1>
              
                <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 border-t border-gray p-5">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm">Họ </label>
                            <input type="text" value={teacher ? teacher.firstName : ''} disabled="true" className="border border-gray rounded-md p-2 w-full" />
                        </div>
                       <div className="space-y-2">
                            <label className="text-sm">Tên</label>
                            <input type="text" value={teacher ? teacher.lastName : ''} disabled="true" className="border border-gray rounded-md p-2 w-full" />
                       </div>
                        <div className="space-y-2">
                            <label className="text-sm">Email</label>
                            <input type="text" value={teacher ? teacher.email : ''} disabled="true" className="border border-gray rounded-md p-2 w-full" />
                        </div >
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm">Số điện thoại</label>
                            <input type="text" id="phone" value={teacher ? teacher.phoneNumber : ''} disabled="true" className="border border-gray rounded-md p-2 w-full" />
                        </div>
                     
                    </div>
                    <div className="flex lg:justify-center items-center sm:mt-5 sm:justify-start mt-5">
                       <TeacherCard teacher={teacher}/>
                    </div>
                </div>
               <div className="p-5">
                  <button className="bg-SignUp text-white lg:rounded-3xl md:rounded-2xl sm:rounded-2xl rounded-xl lg:text-sm md:text-xs
                          sm:text-xs text-xs lg:py-3 sm:py-0 md:py-1 lg:px-10 md:px-5 sm:px-3 px-3 py-1" onClick={handleOnClick}>Đình chỉ</button>
               </div>
            </div>
            <div className="border border-gray rounded-lg ">
                <h1 className="text-xl font-bold p-4">Khóa học</h1>
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
                <Select
                  className="md:text-base sm:text-sm lg:text-xl text-xs "
                  onValueChange={(value) => handleSort(value)}
                >
                  <SelectTrigger className="lg:w-[180px] md:w-[150px] sm:w-[120px] w-[100px]">
                    <SelectValue
                      className="lg:text-xl md:text-lg sm:text-sm text-xs"
                      placeholder="Sắp xếp"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Giá thấp nhất</SelectItem>
                    <SelectItem value="high">Giá cao nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-x-1 lg:text-xl md:text-lg sm:text-sm text-xs">
              <span>{courses.length} kết quả </span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_4fr] gap-6">
              <Filter parentFilter={handleFilter} />
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {currentCourses.map((_, index) => (
                  <CourseCardAdmin
                    key={index}
                    course={currentCourses[index]}
                    type={activeTab}
                  />
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
          </div>

        </div>
        <div></div>
      </div>
      <AlertModal
                                    title="Xác nhận lưu thay đổi"
                                    description="Bạn có chắc chắn muốn thay đổi thông tin trên?"
                                    trigger={
                                        <button
                                            ref={triggerRef}
                                            style={{ display: "none" }} // Ẩn trigger button
                                        />
                                    }
                                    onConfirm={handleConfirm}
                                />
    </div>
  );
};

export default TeacherInfor;
