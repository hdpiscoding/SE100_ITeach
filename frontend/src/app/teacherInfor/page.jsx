import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TeacherCard from "@/components/teacherCard";
import CourseCardAdmin from "@/components/courseCardAdmin";
const TeacherInfor = () => {
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
                <h1 className="text-xl font-bold p-5">Teacher Information</h1>
              
                <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 border-t border-gray p-5">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm">Họ giảng viên</label>
                            <input type="text" className="border border-gray rounded-md p-2 w-full" />
                        </div>
                       <div className="space-y-2">
                            <label className="text-sm">Tên giảng viên</label>
                            <input type="text" className="border border-gray rounded-md p-2 w-full" />
                       </div>
                        <div className="space-y-2">
                            <label className="text-sm">Email</label>
                            <input type="text" className="border border-gray rounded-md p-2 w-full" />
                        </div >
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm">Số điện thoại</label>
                            <input type="text" id="phone" className="border border-gray rounded-md p-2 w-full" />
                        </div>
                       <Button className="bg-SignUp text-white rounded-3xl lg:text-sm md:text-xs sm:text-xs lg:py-3 sm:py-0 md:py-1 lg:px-10 md:px-5 sm:px-3">Đình chỉ</Button>
                    </div>
                    <div className="flex lg:justify-center items-center sm:mt-5 sm:justify-start">
                       <TeacherCard/>
                    </div>
                </div>
            </div>
            <div className="border border-gray rounded-lg ">
                <h1 className="text-xl font-bold p-4">Khóa học</h1>
                <div className="space-x-5 px-4 pb-4">
                    <span className="text-sm text-SignUp font-bold">Pending</span>
                    <span className="text-sm ">Approved</span>
                    <span className="text-sm ">Suspended</span>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 border-t border-gray p-5">
                   <CourseCardAdmin/>
                   <CourseCardAdmin/>
                   <CourseCardAdmin/>
                   <CourseCardAdmin/>
                </div>
            </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TeacherInfor;
