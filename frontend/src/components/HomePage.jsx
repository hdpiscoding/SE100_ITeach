'use client'
import React from "react";
import Image from "next/image";
import Coursecard from "@/components/Course/Coursecard";
import { Button } from "@/components/ui/button";
import Coursecardnoprice from "@/components/Course/Coursecardnoprice";
import Package from "@/components/Package";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Banner from "@/components/Banner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllCoursesCategories,getAllCourse } from "@/services/student";
import { useEffect } from "react";

const Home = () => {  
  const [activeButton, setActiveButton] = useState("");
  const router = useRouter();
  const [courseCategory, setCourseCategory] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const fetchCourseCategory = async () => {
    const response = await getAllCoursesCategories();
    setCourseCategory(response.data.data);
  };
  useEffect(() => {
    
    fetchCourseCategory();
  }, []);
  const fetchAllCourse = async () => {
    const response = await getAllCourse();
   
    setAllCourse(response.data);
  };
  console.log(courseCategory);
  useEffect(() => {
   
    fetchAllCourse();
  }, []);


  return (
    <div className="">
      <div className="relative w-full h-fit">
        <Image
          src="/assets/images/bg-home.png"
          width={600}
          height={10}
          alt="banner"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative z-10">
          <Banner />
        </div>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-20">
        <h1 className="text-orange text-center font-bold  md:text-4xl lg:text-5xl sm:text-3xl text-2xl mt-8 md:mt-12 ">
          Khóa học phổ biến
        </h1>

        <div className="flex flex-wrap gap-3 justify-center my-8 md:my-14 ">
          {courseCategory.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveButton(category.categoryName)}
              className={`border-2 whitespace-nowrap text-[8px] sm:text-sm md:text-base lg:text-lg  lg:rounded-lg
                md:rounded-lg sm:rounded-lg rounded-sm  lg:px-3 lg:py-2 md:px-2 md:py-1 sm:px-2 sm:py-1 px-2 py-1 ${
                activeButton === category.categoryName
                  ? "bg-SignUp text-white"
                  : "bg-white text-black hover:bg-SignUp hover:text-white"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6 justify-items-center">

        {allCourse
         .filter(course => {
         return course.category.categoryName === activeButton ;
         
        })
        .filter((course) => course.courseStatus === "CS1")
        .map((course) => (
          <Coursecard 
            key={course.id}
            courseName={course.courseName}
            cost={course.cost}
            discount={course.discount}
            intro={course.intro}
          />
        ))}
        </div>

        <h1 className="text-SignUp text-center font-bold text-2xl md:text-4xl lg:text-5xl mt-12">
          Danh mục khóa học
        </h1>

        <div className="flex justify-center">
          <h1 className="mt-10 text-base md:text-2xl text-gray-500 w-full md:w-[1000px] text-center px-4">
          Chúng tôi mang đến những khóa học tuyệt vời, mở ra cánh cửa thành công cho tương lai của bạn.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2 gap-6 mt-10 ">
          {courseCategory.map((category) => (
           <div className="w-full">
              <Coursecardnoprice
               key={category.id}
                categoryName={category.categoryName} />
           </div>
          ))}
        </div>

        <div className="flex justify-center p-10 lg:p-20">
          <Button
            onClick={() => router.push("/course")}
            className="text-SignUp bg-white border border-SignUp w-[200px] hover:bg-SignUp hover:text-white"
          >
            Xem tất cả
          </Button>
        </div>

        <div className="rounded-lg bg-red-600 mx-4 md:mx-20  relative h-fit overflow-hidden">
          <Image
            src="/assets/images/banner.png"
            width={600}
            height={10}
            alt="banner"
            className="absolute right-0 bottom-0  hidden md:block  h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] "
          />
          <div className="w-full md:w-[600px] p-8 md:p-14 relative z-10 space-y-4">
            <h1 className="font-bold text-base md:text-4xl text-white">
              Tại sao bạn nên tham gia khóa học của ITeach ?
            </h1>
            <div className="mt-7 space-y-4">
              <div className="flex items-start gap-2">
                <Image
                  className="mt-1"
                  src="/assets/images/star.png"
                  width={25}
                  height={25}
                  alt="star"
                />
                <span className="text-xs md:text-base lg:text-lg text-white">
                Học cùng giảng viên tận tâm, luôn đồng hành và giải đáp mọi thắc mắc của bạn
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Image
                  className="mt-1"
                  src="/assets/images/star.png"
                  width={25}
                  height={25}
                  alt="star"
                />
                <span className="text-xs md:text-base lg:text-lg text-white">
                Học nhanh - Hiểu sâu - Áp dụng ngay! 
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Image
                  className="mt-1"
                  src="/assets/images/star.png"
                  width={25}
                  height={25}
                  alt="star"
                />
                <span className="text-xs md:text-base lg:text-lg text-white">
                Học tập hiệu quả mà không lo chi phí! Khóa học với mức giá phù hợp cho mọi người
                </span>
              </div>
            </div>
            <button className="text-SignUp lg:rounded-lg md:rounded-lg sm:rounded-lg rounded-sm bg-white  lg:py-3 lg:px-7 md:py-2 md:px-5 sm:py-2 sm:px-4 py-2 px-3 text-xs md:text-base lg:text-lg hover:bg-SignUp hover:text-white ">
             Mua ngay
            </button>
          </div>
        </div>

        <h1 className="text-center text-SignUp font-bold text-2xl md:text-4xl mt-20">
          Các gói phổ biến
        </h1>
        <div className="flex justify-center">
          <h1 className="mt-10 text-base md:text-2xl text-gray-500 w-full md:w-[800px] text-center px-4">
          Chúng tôi mang đến những khóa học tuyệt vời, mở ra cánh cửa thành công cho tương lai của bạn.
          </h1>
        </div>

        <div className="my-10 lg:px-1 md:px-0 ">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              type: "bullets",
              clickable: true,
            }}
            modules={[Pagination]}
            className="w-full md:w-[60%] "
          >
            {allCourse.map((course) => (
              <SwiperSlide className="flex justify-center">
                <Package 
                key={course.id}
                courseName={course.courseName}
                cost={course.cost}
                discount={course.discount}
                intro={course.intro}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .swiper {
              padding-bottom: 50px !important;
             
            }
            .swiper-wrapper {
              padding: 0 1px !important; /* Thêm dòng này */
            }

            .swiper-pagination {
              position: relative !important;
              bottom: 0 !important;
              margin-top: 20px;
            }

            .swiper-pagination-bullet {
              background: #000 !important;
            }

            .swiper-pagination-bullet-active {
              background: #00ddc0 !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Home;
