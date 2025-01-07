"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useState } from "react";
import Rating from "@mui/material/Rating";

const Filter = ({ filterTeachers }) => {
  const [checkedrate, setCheckedrate] = useState(true);
  const [ratevalue, setRatevalue] = useState("");
  const [Number, setNumber] = useState(true);
  const [numvalue, setnumvalue] = useState("");

  const Clear = () => {
    setRatevalue("");
    setnumvalue("");
    filterTeachers(0, 0);
  };
  const handleFilter = (op, value) => {
    if (op === 1) {
      if (value === "option-one") {
        filterTeachers(0, numvalue);
      } else if (value === "option-two") {
        filterTeachers(2, numvalue);
      } else {
        filterTeachers(4, numvalue);
      }
    } else {
      var ratingnum = 0;
      if (ratevalue === "option-one") {
        ratingnum = 0;
      } else if (ratevalue === "option-two") {
        ratingnum = 2;
      } else {
        ratingnum = 4;
      }

      if (value === "0") {
        filterTeachers(ratingnum, 0);
      } else if (value === "100") {
        filterTeachers(ratingnum, 100);
      } else if (value === "1000") {
        filterTeachers(ratingnum, 1000);
      } else {
        filterTeachers(ratingnum, 10000);
      }
    }
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
                  onClick={async () => {
                    await setCheckedrate(!checkedrate);
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={async () => {
                    await setCheckedrate(!checkedrate);
                  }}
                />
              </div>
            )}
          </div>
          {checkedrate && (
            <div className="flex justify-between lg:text-base md:text-sm sm:text-xs text-xs ">
              <div>
                <RadioGroup
                  value={ratevalue}
                  onClick={async (e) => {
                    console.log(1);
                    console.log(e.target.value);
                    await setRatevalue(e.target.value);
                    handleFilter(1, e.target.value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-one"
                      id="option-one"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <p>{"Tất cả"}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-two"
                      id="option-two"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <p>{"Trên"}</p>
                    <Rating value={2} precision={0.5} size="small" readOnly />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-three"
                      id="option-three"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <p>{"Trên"}</p>
                    <Rating value={4} size="small" readOnly />
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
                  onClick={async () => {
                    await setNumber(!Number);
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={async () => {
                    await setNumber(!Number);
                  }}
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
                    handleFilter(2, e.target.value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="0"
                      id="100"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <label htmlFor="100">Tất cả</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="100"
                      id="1000"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <label htmlFor="1000">Trên 100</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="1000"
                      id="10000"
                      className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <label htmlFor="10000">Trên 1000</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="10000"
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
