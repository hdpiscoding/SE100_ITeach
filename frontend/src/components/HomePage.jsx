'use client'
import React from "react";
import Image from "next/image";
import Coursecard from "@/components/Coursecard";
import { Button } from "@/components/ui/button";
import Coursecardnoprice from "@/components/Coursecardnoprice";
import Package from "@/components/Package";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Banner from "@/components/Banner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [activeButton, setActiveButton] = useState("All Program");
  const router = useRouter();
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
          {[
            "All Program",
            "Thuật Toán",
            "Kiến thức cơ sở",
            "Lập trình cơ bản",
            "Lập trình nâng cao",
            "Giải quyết vấn đề",
          ].map((text) => (
            <button
              key={text}
              onClick={() => setActiveButton(text)}
              className={`border-2 whitespace-nowrap text-[8px] sm:text-sm md:text-base lg:text-lg  lg:rounded-lg
                md:rounded-lg sm:rounded-lg rounded-sm  lg:px-3 lg:py-2 md:px-2 md:py-1 sm:px-2 sm:py-1 px-2 py-1 ${
                activeButton === text
                  ? "bg-SignUp text-white"
                  : "bg-white text-black hover:bg-SignUp hover:text-white"
              }`}
            >
              {text}
            </button>
          ))}
        </div>

        <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6 justify-items-center">
          <Coursecard />
          <Coursecard />
          <Coursecard />
          <Coursecard />
          <Coursecard />
          <Coursecard />
          <Coursecard />
          <Coursecard />
        </div>

        <h1 className="text-SignUp text-center font-bold text-2xl md:text-4xl lg:text-5xl mt-12">
          Danh mục khóa học
        </h1>

        <div className="flex justify-center">
          <h1 className="mt-10 text-base md:text-2xl text-gray-500 w-full md:w-[1000px] text-center px-4">
            Onlearing is one powerful online software suite that combines all
            the tools needed to run a successful school or office.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 grid-cols-2 gap-6 mt-10 justify-items-center">
          <Coursecardnoprice />
          <Coursecardnoprice />
          <Coursecardnoprice />
          <Coursecardnoprice />
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
          <div className="w-full md:w-[500px] p-8 md:p-14 relative z-10 space-y-4">
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
                  Teachers don't get lost in the grid view and have a dedicated
                  Podium space.
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
                  Teachers don't get lost in the grid view and have a dedicated
                  Podium space.
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
                  Teachers don't get lost in the grid view and have a dedicated
                  Podium space.
                </span>
              </div>
            </div>
            <button className="text-SignUp lg:rounded-lg md:rounded-lg sm:rounded-lg rounded-sm bg-white  lg:py-3 lg:px-7 md:py-2 md:px-5 sm:py-2 sm:px-4 py-2 px-3 text-xs md:text-base lg:text-lg hover:bg-SignUp hover:text-white ">
              BUY NOW
            </button>
          </div>
        </div>

        <h1 className="text-center text-SignUp font-bold text-2xl md:text-4xl mt-20">
          Các gói phổ biến
        </h1>
        <div className="flex justify-center">
          <h1 className="mt-10 text-base md:text-2xl text-gray-500 w-full md:w-[800px] text-center px-4">
            Onlearing is one powerful online software suite that combines all
            the tools needed to run a successful school or office.
          </h1>
        </div>

        <div className="my-10 px-4 md:px-0">
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
            <SwiperSlide className="flex justify-center">
              <Package />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <Package />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <Package />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <Package />
            </SwiperSlide>
          </Swiper>

          <style jsx global>{`
            .swiper {
              padding-bottom: 50px !important;
              overflow: visible !important;
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
