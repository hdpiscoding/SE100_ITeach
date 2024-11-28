import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="bg-bg w-full px-4 py-8 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-20 xl:space-x-40">
       
        <div className="space-y-5 max-w-[300px] mb-8 md:mb-0">
          <div className="ml-[-10px]">
            <Image
              className="h-[50px] w-auto"
              src="/assets/images/logo.png"
              width={150}
              height={25}
              alt="logo"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Image
                className="h-[25px] w-auto"
                src="/assets/images/Location.png"
                width={17}
                height={25}
                alt="location"
              />
              <span className="text-SignUp font-bold">Address:</span>
            </div>
            <h1 className="text-SignUp">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h1>

            <div className="flex items-center gap-2">
              <Image
                className="h-[25px] w-auto"
                src="/assets/images/Call.png"
                width={20}
                height={25}
                alt="phone"
              />
              <span className="text-SignUp font-bold">Tel: +9229341037</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                className="h-[25px] w-auto"
                src="/assets/images/Time Circle.png"
                width={20}
                height={25}
                alt="time"
              />
              <span className="text-SignUp font-bold">
                Response hours: 8 to 20
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                className="h-[25px] w-auto"
                src="/assets/images/Group.png"
                width={20}
                height={25}
                alt="email"
              />
              <span className="text-SignUp font-bold">
                Email: info@onlearn.com
              </span>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:gap-8 lg:gap-16">
        
          <div className="space-y-4 min-w-[150px]">
            <h1 className="font-bold text-lg">Categories</h1>
            <div className="space-y-2">
              <h1 className="text-SignUp">Counseling</h1>
              <h1 className="text-SignUp">Health and fitness</h1>
              <h1 className="text-SignUp">Individual development</h1>
              <h1 className="text-SignUp">more</h1>
            </div>
          </div>

          
          <div className="space-y-4 min-w-[150px]">
            <h1 className="font-bold text-lg">Links</h1>
            <div className="space-y-2">
              <h1 className="text-SignUp">About us</h1>
              <h1 className="text-SignUp">Blog</h1>
            </div>
          </div>

       
          <div className="space-y-4 w-full md:w-[300px] lg:w-[400px]">
            <h1 className="text-lg font-bold text-left md:text-center">
              Stay up to date with the latest courses
            </h1>

            <div className="bg-white rounded-2xl p-3 relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 text-SignUp outline-none pr-[100px] text-sm"
              />
              <Button className="bg-SignUp text-white font-bold rounded-xl absolute right-3 top-1/2 transform -translate-y-1/2 w-[90px] text-sm">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;