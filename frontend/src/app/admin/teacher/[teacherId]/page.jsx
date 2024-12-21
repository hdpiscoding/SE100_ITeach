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

const TeacherInfor = () => {
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const teacherId = window.location.pathname.split("/").pop();
      const data = await getATeacherInfo(teacherId);
      console.log("data", data);
      if (data && data.errCode === 0) {
        setTeacher(data.teacher);
      }
      else {
        toast.error("Lỗi khi lấy thông tin giáo viên");
      }
    };
    fetchData();
  }, []);
    const triggerRef = useRef(null);

  const handleConfirm = async () => {
    // handle confirm logic
  };

  const handleOnClick = () => {
    triggerRef.current?.click();
  };
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
                          <Tabs>
            <TabList>
              <Tab >Đã duyệt</Tab>
              <Tab  >Đang chờ duyệt</Tab>
              <Tab >Tạm dừng</Tab>

            </TabList>

            <TabPanel>
               <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 border-t border-gray p-5 justify-items-center">
                   <CourseCardAdmin/>
                   <CourseCardAdmin/>
                   <CourseCardAdmin/>
                   <CourseCardAdmin/>
                </div>
            </TabPanel>
            <TabPanel>
               <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 border-t border-gray p-5 justify-items-center">
                   <CourseCardAdmin/>
                    
                </div>
              </TabPanel>
              <TabPanel>
               <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 border-t border-gray p-5 justify-items-center">
                   <CourseCardAdmin/>
                                       <CourseCardAdmin/>

                </div>
            </TabPanel>
          </Tabs>
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
