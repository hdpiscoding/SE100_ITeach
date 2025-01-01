"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllCourseCategories } from "@/services/student";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  const [courseCategory, setCourseCategory] = useState([]);
   const fetchCourseCategory = async () => {
      const response = await getAllCourseCategories();
     console.log("respone data",response.data);
      if (response.data.length > 0) {
       setCourseCategory(response.data);
     }
    };
      useEffect(() => {
         
         fetchCourseCategory();
       }, []);
  return (
    <div className="bg-bg w-full px-4 lg:py-8 py-4 md:px-8 lg:px-16 lg:text-xl md:text-lg sm:text-base text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row  sm:space-y-5 md:space-x-8 lg:space-x-20 xl:space-x-40">
       
        <div className="space-y-5 max-w-[300px] mb-8 md:mb-0">
          <div className="ml-[-10px]">
            <Image
              className="w-auto lg:h-[60px] md:h-[55px] sm:h-[50px] h-[30px] "
              src="/assets/images/logo.png"
              width={150}
              height={25}
              alt="logo"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Image
                className="lg:h-[17px] md:h-[17px] sm:h-[15px] h-[15px] w-auto"
                src="/assets/images/Location.png"
                width={17}
                height={25}
                alt="location"
              />
              <span className="text-SignUp font-bold lg:text-base md:text-base sm:text-base text-xs">Địa chỉ:</span>
            </div>
            <h1 className="text-SignUp lg:text-base md:text-base sm:text-base text-xs">
            Trường đại học Công nghệ thông tin
            </h1>

            <div className="flex items-center gap-2">
              <Image
                className="lg:h-[17px] md:h-[17px] sm:h-[15px] h-[15px] w-auto"
                src="/assets/images/Call.png"
                width={20}
                height={25}
                alt="phone"
              />
              <span className="text-SignUp font-bold lg:text-base md:text-base sm:text-base text-xs">SĐT: +9229341037</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                className="lg:h-[17px] md:h-[17px] sm:h-[15px] h-[15px] w-auto"
                src="/assets/images/Time Circle.png"
                width={20}
                height={25}
                alt="time"
              />
              <span className="text-SignUp font-bold lg:text-base md:text-base sm:text-base text-xs">
                Giờ làm việc: 8h tới 20h
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                className="lg:h-[17px] md:h-[17px] sm:h-[15px] h-[15px] w-auto"
                src="/assets/images/Group.png"
                width={20}
                height={25}
                alt="email"
              />
              <span className="text-SignUp font-bold lg:text-base md:text-base sm:text-base text-xs">
                Email: info@onlearn.com
              </span>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:gap-8 lg:gap-16">
        
          <div className="space-y-4 min-w-[150px]">
            <h1 className="font-bold lg:text-lg md:text-lg sm:text-base text-sm">Loại khóa học</h1>
            <div className="space-y-2 lg:text-base md:text-base sm:text-base text-xs">
             {courseCategory.map((category) => (
              <h1 className="text-SignUp">{category.categoryName}</h1>
             ))}
            </div>
          </div>

          
          <div className="space-y-4 min-w-[150px] ">
            <h1 className="font-bold lg:text-lg md:text-lg sm:text-base text-sm">Khác</h1>
            <div className="space-y-2 lg:text-base md:text-sm sm:text-xs text-xs">
              <h1 onClick={()=>router.push("/aboutus")} className="text-SignUp cursor-pointer">Về chúng tôi</h1>
             
            </div>
          </div>

       
          <div className="space-y-4  md:w-[300px] lg:w-[400px] sm:w-[250px] w-[250px] ">
            <h1 className="lg:text-base md:text-xl sm:text-base text-xs font-bold text-left md:text-center">
             Cập nhật thông tin mới nhất
            </h1>

            <div className="bg-white rounded-2xl px-4 py-2 relative ">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 text-SignUp outline-none pr-[100px] lg:text-base md:text-xl sm:text-base text-xs"
              />
              <button className="bg-SignUp text-white font-bold lg:rounded-xl md:rounded-lg sm:rounded-md rounded-md lg:px-4 md:px-3 sm:px-2 px-2 py-1 absolute right-3 top-1/2 transform -translate-y-1/2  lg:text-base md:text-xl sm:text-base text-xs">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;