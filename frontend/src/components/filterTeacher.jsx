"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useState } from "react";
import { Poppins } from "next/font/google";
import Rating from "@mui/material/Rating";

const Filter = () => {
  const [checkedrate, setCheckedrate] = useState(true);
  const [ratevalue, setRatevalue] = useState("");
  const [Number, setNumber] = useState(true);
  const[numvalue,setnumvalue]=useState("")

  const Clear = () => {
    setRatevalue("");
    setnumvalue("");
  };
 
  
  return (
    <div
      className="font-poppins drop-shadow-lg
     border border-gray-200 rounded-lg bg-white text-textfilter
      h-fit "
    >
      <div className="w-full p-3">
        <div className="space-y-6 sm:space-y-4 w-full">
          <div className="flex justify-between lg:text-xl md:text-lg sm:text-sm text-sm">
            <button className="text-filter select-none ">Bộ lọc</button>
            <button
              className="text-filter bg-transparent select-none "
              onClick={Clear}
            >
              Làm mới
            </button>
          </div>
          <div className="flex justify-between lg:text-base md:text-sm sm:text-sm text-sm">
            <h1 className="font-bold flex items-center">Đánh giá</h1>
            {checkedrate ? (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png "
                  width={20}
                  height={20}
                  onClick={() => setCheckedrate(!checkedrate)}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedrate(!checkedrate)}
                />
              </div>
            )}
          </div>
          {checkedrate && (
            <div className="flex justify-between lg:text-base md:text-sm sm:text-xs text-xs ">
              <div>
                <RadioGroup
                  value={ratevalue}
                  onClick={(e) => {
                    console.log(1);
                    console.log(e.target.value);
                    setRatevalue(e.target.value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-one"
                      id="option-one"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <Rating value={4.5} precision={0.5} readOnly size="small" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-two"
                      id="option-two"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <Rating value={3.5} precision={0.5} size="small" readOnly />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-three"
                      id="option-three"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <Rating value={3} size="small" readOnly />
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="flex justify-between ">
            <h1 className="font-bold lg:text-base md:text-sm sm:text-sm text-sm">
              Số lượng học sinh
            </h1>
            {Number ? (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png"
                  width={20}
                  height={20}
                  onClick={() => setNumber(!Number)}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setNumber(!Number)}
                />
              </div>
            )}
          </div>
          {Number && (
            <div className="flex justify-between lg:text-base md:text-sm sm:text-xs text-xs ">
              <div>
                <RadioGroup
                  value={numvalue}
                  onClick={(e) => {
              
                    console.log(e.target.value);
                    setnumvalue(e.target.value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="100"
                      id="100"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                      
                    />
                  <label htmlFor="100">100</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="1000"
                      id="1000"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <label htmlFor="1000">1000</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="10000"
                      id="10000"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <label htmlFor="10000">10000</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Trên 10000"
                      id="10000+"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <label htmlFor="10000+">Trên 10000</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
