import React from "react";
import Image from "next/image";

const CourseCardAdmin = ({ course }) => {
  return (
    <div className=" max-h-[300px] rounded-md overflow-hidden bg-slate-100 lg:w-[300px] md:w-[250px] sm:w-[200px] w-[200px] space-y-2 sm:space-y-3 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          width={300}
          height={200}
          src="/assets/images/course.webp"
          alt="course image"
          className="w-full h-auto"
        />
      </div>

      <div>
        <h5 className="mx-3 sm:mx-4 text-gray-600 text-xs sm:text-sm">
          {new Date(course.createdAt).toLocaleDateString()}
        </h5>

        <h3 className="font-bold text-SignUp mx-3 sm:mx-4 lg:text-xl md:text-base sm:text-sm text-sm">
          {course.courseName}
        </h3>

        <h4 className="mx-3 sm:mx-4 text-gray-700 lg:text-base md:text-sm sm:text-xs text-xs">
          {course.instructor}
        </h4>

        <div className="flex flex-wrap justify-between mx-3 sm:mx-4 items-center pb-3 sm:pb-4 gap-2">
          <div className="flex items-center">
            <span className="text-orange font-semibold lg:text-lg md:text-base sm:text-sm text-xs">
              {course.discount && course.discount > 0
                ? course.cost - course.discount
                : course.cost}
              {" đ"}
            </span>
            {course.discount && course.discount > 0 && (
              <span className="line-through ml-2 text-gray-500 text-xs">
                {course.cost}
                {" đ"}
              </span>
            )}
          </div>
          <Image
            className="lg:w-[30px] lg:h-[30px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[15px] h-[15px]"
            src="/assets/images/check.png"
            alt="check"
            width={30}
            height={30}
          />
          <Image
            className="lg:w-[30px] lg:h-[30px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] w-[15px] h-[15px]"
            src="/assets/images/deny.png"
            alt="delete"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCardAdmin;
