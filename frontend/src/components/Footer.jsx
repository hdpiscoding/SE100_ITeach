import React from "react";
import Image from "next/image";

const Footer = () => {
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
              <span className="text-SignUp font-bold lg:text-base md:text-base sm:text-base text-xs">Address:</span>
            </div>
            <h1 className="text-SignUp lg:text-base md:text-base sm:text-base text-xs">
            "Code Your Future, One Line at a Time!"
            </h1>

            <div className="flex items-center gap-2">
              <Image
                className="lg:h-[17px] md:h-[17px] sm:h-[15px] h-[15px] w-auto"
                src="/assets/images/Call.png"
                width={20}
                height={25}
                alt="phone"
              />
              <span className="text-SignUp font-bold lg:text-base md:text-base sm:text-base text-xs">Tel: +9229341037</span>
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
                Response hours: 8 to 20
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
            <h1 className="font-bold lg:text-lg md:text-lg sm:text-base text-sm">Categories</h1>
            <div className="space-y-2 lg:text-base md:text-base sm:text-base text-xs">
              <h1 className="text-SignUp">Counseling</h1>
              <h1 className="text-SignUp">Health and fitness</h1>
              <h1 className="text-SignUp">Individual development</h1>
              <h1 className="text-SignUp">more</h1>
            </div>
          </div>

          
          <div className="space-y-4 min-w-[150px] ">
            <h1 className="font-bold lg:text-lg md:text-lg sm:text-base text-sm">Links</h1>
            <div className="space-y-2 lg:text-base md:text-sm sm:text-xs text-xs">
              <h1 className="text-SignUp">About us</h1>
              <h1 className="text-SignUp">Blog</h1>
            </div>
          </div>

       
          <div className="space-y-4  md:w-[300px] lg:w-[400px] sm:w-[250px] w-[250px] ">
            <h1 className="lg:text-base md:text-xl sm:text-base text-xs font-bold text-left md:text-center">
              Stay up to date with the latest courses
            </h1>

            <div className="bg-white rounded-2xl px-4 py-2 relative ">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 text-SignUp outline-none pr-[100px] lg:text-base md:text-xl sm:text-base text-xs"
              />
              <button className="bg-SignUp text-white font-bold lg:rounded-xl md:rounded-lg sm:rounded-md rounded-md lg:px-4 md:px-3 sm:px-2 px-2 py-1 absolute right-3 top-1/2 transform -translate-y-1/2  lg:text-base md:text-xl sm:text-base text-xs">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;