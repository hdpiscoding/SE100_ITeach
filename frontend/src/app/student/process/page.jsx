"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import FilterProcess from "@/components/filterProcess";
import Coursecard from "@/components/Coursecard";
import CertificateCard from "@/components/certificateCard";
import { getStudentCertificates, getMyCourses } from "@/services/student";
import { getAllCourses } from "@/services/admin";

const Process = () => {
  const [certificates, setCertificates] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  let [username, setUsername] = useState("");
  let [khoahoc, setKhoahoc] = useState(0);
  let [chungchi, setChungchi] = useState(0);
  const [activeTab, setActiveTab] = useState("registered");

  const isLogin = localStorage.getItem("isLogin");
  useEffect(() => {
    

    const getData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserId = storedUser.id;

    const storedUsername = storedUser.firstName
      ? storedUser.firstName
      : " " + " " + storedUser.lastName
      ? storedUser.lastName
      : " ";
    setUsername(storedUsername);
      const response = await getStudentCertificates(storedUserId);
      setCertificates(response.data.certificates);
      setChungchi(response.data.certificates.length);

      const rawcourses = await getMyCourses(storedUserId);

      if (rawcourses.data && rawcourses.data.data) {
        setRegisteredCourses(rawcourses.data.data);
        setKhoahoc(rawcourses.data.data.length);
      } else {
        setRegisteredCourses([]);
        setKhoahoc(0);
      }
      const responseAllCourses = await getAllCourses();
      setAllCourses(responseAllCourses.data.data);

      if (rawcourses.data && rawcourses.data.data) {
        const registeredCategories = rawcourses.data.data.map(
          (course) => course.Course.category.id
        );

        let suggested = responseAllCourses.data.data
          .filter((course) => registeredCategories.includes(course.category.id))
          .slice(0, 5);
        if (suggested.length === 0) {
          suggested = responseAllCourses.data.data.slice(0, 5);
        }

        setSuggestedCourses(suggested);
      } else {
        const suggest = responseAllCourses.data.data.slice(0, 5);
        setSuggestedCourses(suggest);
      }
    };
    if (isLogin === "true") {
      getData();
    }
  }, []);
  const renderContent = () => {
    if (activeTab === "certificate") {
      return (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 gap-2">
          {certificates.map((certificate) => (
            <CertificateCard certificate={certificate} />
          ))}
        </div>
      );
    }
    if (activeTab === "registered" && registeredCourses !== undefined) {
      return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 gap-2">
          {registeredCourses.map((_, index) => (
            <Coursecard course={registeredCourses[index]} type="1" />
          ))}
        </div>
      );
    }
    if (activeTab === "suggested") {
      return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 gap-2">
          {suggestedCourses.map((_, index) => (
            <Coursecard course={suggestedCourses[index]} type="0" />
          ))}
        </div>
      );
    }
  };
  return (
    <>
      {isLogin === "false" ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-orange">Vui lòng đăng nhập</h1>
        </div>
      ) : (
        <>
          <div className="">
            <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh]">
              <Image
                src="/assets/images/bg_aboutus.png"
                alt="process"
                fill
                priority
                className="object-cover z-0"
                sizes="100vw"
              />

              <div className="absolute inset-0 flex items-center justify-center lg:text-5xl md:text-4xl text-2xl">
                <div className="p-6 rounded-lg">
                  <span className="font-bold text-orange">Hello </span>
                  <span className="text-white ">{username}</span>
                  <p className="font-bold">
                    <span className="text-white">Bạn đã tham gia </span>
                    <span className="text-process">{khoahoc}</span>
                    <span className="text-white"> khóa học và được cấp </span>
                    <span className="text-process">{chungchi}</span>
                    <span className="text-white"> chứng chỉ</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
              <div></div>
              <div>
                <div className="flex justify-center items-center space-x-10 my-10 lg:text-2xl md:text-xl text-xs">
                  <span
                    className={`cursor-pointer ${
                      activeTab === "registered" ? "text-orange" : "text-black"
                    }`}
                    onClick={() => setActiveTab("registered")}
                  >
                    Khóa đã đăng ký({khoahoc})
                  </span>
                  <span
                    className={`cursor-pointer ${
                      activeTab === "suggested" ? "text-orange" : "text-black"
                    }`}
                    onClick={() => setActiveTab("suggested")}
                  >
                    Khóa học gợi ý
                  </span>
                  <span
                    className={`cursor-pointer ${
                      activeTab === "certificate" ? "text-orange" : "text-black"
                    }`}
                    onClick={() => setActiveTab("certificate")}
                  >
                    Chứng chỉ({chungchi})
                  </span>
                </div>
                <div className="grid lg:grid-cols-[1fr_4fr] md:grid-cols-[1fr_3fr] sm:grid-cols-[1fr_2fr] grid-cols-[1fr_1fr] gap-6 p-3  ">
                  <div className="w-full ">{/* <FilterProcess /> */}</div>
                  <div className="w-full">{renderContent()}</div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Process;
