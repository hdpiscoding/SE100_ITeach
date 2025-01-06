import React from "react";
import Image from "next/image";
const Coursecard = ({ courseName, cost, discount, intro, onClick, anhBia }) => {
  const role = localStorage.getItem("role");
  return (
    <div
      onClick={onClick}
      className=" cursor-pointer rounded-md overflow-hidden flex flex-col justify-between gap-1
     bg-slate-100 w-full max-w-[300px] min-h-[250px] 
      hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <Image
          width={300}
          height={200}
          src={anhBia}
          alt="course image"
          className="w-full max-h-[160px] object-cover"
        />
      </div>

      <div className="space-y-1 sm:space-y-2">
        <h5 className="mx-3 sm:mx-4 text-gray-600 text-xs sm:text-sm">
          1-28 July 2022
        </h5>

        <h3 className="font-bold text-SignUp mx-3 sm:mx-4  sm:text-sm md:text-lg lg:text-xl text-xs">
          {courseName}
        </h3>

        <h4 className="mx-3 sm:mx-4 text-gray-700 text-xs sm:text-sm lg:h-[60px] md:h-[40px] sm:h-[30px] h-[20px] ">
          {intro}
        </h4>
      </div>

      <div className=" flex flex-wrap justify-between mx-3 sm:mx-4 items-center lg:pb-3 md:pb-3 sm:pb-2 pb-1 gap-2 ">
        <div className="flex items-center">
          <span className="text-orange font-semibold sm:text-sm md:text-lg lg:text-xl text-xs">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              Number(((cost ?? 0) * (1 - (discount / 100 ?? 0))).toFixed(0))
            )}
          </span>
          {discount > 0 && (
            <span className="line-through ml-2 text-gray-500 text-sm">
              ${cost}
            </span>
          )}
        </div>
        {role !== "teacher" && role !== "admin" && (
          <button className="bg-SignUp hover:bg-SignUp/90 text-xs sm:text-sm md:text-base lg:text-base text-white px-3 py-1 rounded-md">
            Đăng ký ngay
          </button>
        )}
      </div>
    </div>
  );
};

export default Coursecard;
