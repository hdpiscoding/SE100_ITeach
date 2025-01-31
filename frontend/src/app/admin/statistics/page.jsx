"use client";
import React, { useEffect, useState } from "react";
import Coursecard from "@/components/Course/Coursecard";
import TeacherCard from "@/components/teacherCard";
import { useRouter } from "next/navigation";
import { getAnalysisInfo, getChartData,getPopularCourses,getPopularTeachers } from "@/services/admin";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Statistics = () => {
  const [data, setData] = useState([]);
  const [listTotalCost, setListTotalCost] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularCourses();
      setCourses(data.data.courses);
      console.log("courses", data.data.courses);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularTeachers();
      setTeachers(data.data.teachers);
      console.log("teachers", data.data.teachers);
    };
    fetchData();
  }, []);
     
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnalysisInfo(selectedYear, selectedMonth);
      console.log("chartData", listTotalCost);
      setListTotalCost(await getChartData(selectedYear2));
      data.totalCost = data.totalCost.toLocaleString('vi-VN');
      setData(data);
    };

    fetchData();
  }, [selectedMonth, selectedYear, selectedYear2]);

  useEffect(() => {
    console.log("listTotalCost", listTotalCost);
  }, [listTotalCost]);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    axisY: {
      title: "Doanh thu",
    },
    axisX: {
      title: "Tháng",
      interval: 1,
    },
    data: [
      {
        type: "line",
        toolTipContent: "{y} vnđ",
        dataPoints: listTotalCost,
      },
    ],
  };

  const router = useRouter();

  return (
    <div className="mb-20">
      <div className="bg-bg text-orange font-bold  flex justify-center items-center lg:h-[150px] md:h-[130px] sm:h-[100px] h-[100px]">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl">Thống kê</h1>
      </div>
      {/* Month picker */}
      <div className="flex justify-center my-4">
        <input
          type="month"
          value={`${selectedYear}-${String(selectedMonth).padStart(2, '0')}`}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            console.log(year, month);
            setSelectedYear(parseInt(year, 10));
            setSelectedMonth(parseInt(month, 10));
          }}
          className="border p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-16">
          <div className="grid grid-cols-5 p-4 lg:gap-6 md:gap-4 sm:gap-3 gap-2 lg:text-2xl md:text-lg sm:text-base text-base min-h-[60vh] overflow-auto">
            <div className="border p-4 flex flex-col items-center justify-around col-span-2 rounded-lg border-SignUp h-full ">
             <div className="flex flex-col items-center justify-center h-full space-y-3">
                <div className=" font-bold text-9xl  ">{data.studentsThisMonth}</div>
             </div>
              <div className="text-gray-500 ">học sinh</div>
            </div>
            <div className="col-span-3 space-y-1 lg:text-2xl md:text-lg sm:text-base text-xs h-full ">
              <div className="lg:h-1/2">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 md:gap-3 sm:gap-2 gap-1  h-full">
                  <div className="border p-4 flex flex-col justify-around items-center rounded-lg">
                    <div className="text-gray-500">thu nhập</div>
                    <div className=" font-bold text-2xl ">{data.totalCost}đ</div>
                  </div>
                  <div className="border p-4 flex flex-col items-center justify-around rounded-lg">
                    <div className="text-gray-500">khóa học bán ra</div>
                    <div className=" font-bold text-3xl">{data.totalCourseSell}</div>
                  </div>
                  <div className="border p-4 flex flex-col items-center justify-around rounded-lg">
                    <div className="text-gray-500">bài học</div>
                    <div className=" font-bold text-3xl">{data.totalLessons}</div>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 lg:h-1/2">
                <div className="border p-4 flex flex-col justify-between bg-SignUp text-white rounded-lg h-full">
                  <div className=" font-bold text-8xl">{data.totalTeachers}</div>
                  <div className="flex justify-between">
                    <div className="text-gray-500 ">giảng viên</div>
                    <a
                      onClick={() => router.push("/admin/teacherAdmin")}
                      className="cursor-pointer"
                    >
                      Xem tất cả
                    </a>
                  </div>
                </div>
                <div className="border p-4 flex flex-col justify-between bg-white text-SignUp rounded-lg border-SignUp">
                  <div className=" font-bold text-8xl">{data.totalCourses}</div>
                  <div className="flex justify-between">
                    <div className="text-gray-500">khóa học</div>
                    <a
                      onClick={() => router.push("/admin/course")}
                      className="cursor-pointer"
                    >
                      Xem tất cả
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-orange text-center">
            Biểu đồ biến động doanh thu trong năm {selectedYear2}
          </h1>
          {/* Year picker */}
          <div className="flex justify-center my-4">
            <input
              type="number"
              value={selectedYear2}
              onChange={(e) => setSelectedYear2(parseInt(e.target.value, 10))}
              className="border p-2 rounded"
              min="2000"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="chart">
            <CanvasJSChart options={options} />
          </div>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold text-orange text-center">
            Khóa học phổ biến
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 justify-items-center">
          {courses
          .filter((course) => course.courseStatus === "CS1")
          .map((course) => (
      <Coursecard
      day={course.createdAt}
       anhBia={course.anhBia}
        key={course.id}
        courseName={course.courseName}
        cost={course.cost}
        discount={course.discount}
        intro={course.intro}
        onClick={() => router.push(`/admin/course/${course.id}`)}
      />
    ))}
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
          
          <div className="grid grid-cols-[1fr_4fr_1fr]">
            <div></div>
            <div className="grid grid-cols-3  gap-4 ">
              {teachers.map((teacher, index) => (
                <TeacherCard
                    key={index}
                 teacher={teacher}
                />
              ))}
            </div>
            <div></div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/admin/teacherAdmin")}
              className="bg-white text-SignUp px-10 py-2 rounded-lg
               border-SignUp border hover:bg-SignUp hover:text-white
                transition-all duration-300 lg:text-base md:text-sm sm:text-xs text-xs"
            >              Xem tất cả
</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Statistics;
