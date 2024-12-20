"use client";

import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { getAllCoursesCategories } from "@/services/student";

const Filter = ({ parentFilter }) => {
  const [categories, setCategories] = useState([]);
  const [checkedRate, setCheckedRate] = useState(true);
  const [checkedDuration, setCheckedDuration] = useState(true);
  const [checkedCategories, setCheckedCategories] = useState(true);
  const [rateValue, setRateValue] = useState("1");
  const [durationChecked, setDurationChecked] = useState({});
  const [categoriesChecked, setCategoriesChecked] = useState({});

  const durations = [
    { id: "begin", name: "Cơ bản" },
    { id: "intermediate", name: "Trung cấp" },
    { id: "advanced", name: "Nâng cao" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCoursesCategories();
        const fetchedCategories = response.data.data || [];
        setCategories(fetchedCategories);

        const initialCategoriesState = fetchedCategories.reduce(
          (acc, category) => {
            acc[category.id] = true;
            return acc;
          },
          {}
        );
        setCategoriesChecked(initialCategoriesState);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const initialDurationsState = durations.reduce((acc, duration) => {
      acc[duration.id] = true;
      return acc;
    }, {});
    setDurationChecked(initialDurationsState);
  }, []);

  const clearFilters = () => {
    setCategoriesChecked(
      categories.reduce((acc, category) => {
        acc[category.id] = true;
        return acc;
      }, {})
    );
    setDurationChecked(
      durations.reduce((acc, duration) => {
        acc[duration.id] = true;
        return acc;
      }, {})
    );
    setRateValue("1");
  };

  const handleFilter = () => {
    const selectedCategories = Object.keys(categoriesChecked).filter(
      (key) => categoriesChecked[key]
    );
    const selectedDurations = Object.keys(durationChecked).filter(
      (key) => durationChecked[key]
    );
    parentFilter(selectedCategories, selectedDurations, rateValue);
  };

  useEffect(() => {
    handleFilter();
  }, [durationChecked, categoriesChecked, rateValue]);

  return (
    <div className="font-poppins drop-shadow-lg border border-gray-200 rounded-lg bg-white text-textfilter h-fit">
      <div className="w-full p-3">
        <div className="space-y-6 sm:space-y-4 w-full">
          <div className="flex justify-between lg:text-xl md:text-lg sm:text-sm text-sm">
            <button className="text-filter select-none">Lọc</button>
            <button
              className="text-filter bg-transparent select-none"
              onClick={clearFilters}
            >
              Làm mới
            </button>
          </div>

          {/* Giá */}
          <div className="flex justify-between lg:text-base md:text-sm sm:text-sm text-sm">
            <h1 className="font-bold flex items-center">Giá</h1>
            <Image
              className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
              src={`/assets/images/arrow_${checkedRate ? "up" : "down"}.png`}
              width={20}
              height={20}
              onClick={() => setCheckedRate((prev) => !prev)}
            />
          </div>

          {checkedRate && (
            <div className="flex justify-between lg:text-base md:text-sm sm:text-xs text-xs ">
              <RadioGroup
                value={rateValue}
                onValueChange={(value) => setRateValue(value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="1"
                    id="rate-1"
                    className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                  />
                  <label htmlFor="rate-1" className="text-sm lg:text-base">
                    Tất cả
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="2"
                    id="rate-2"
                    className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                  />
                  <label htmlFor="rate-2" className="text-sm lg:text-base">
                    Trên 100k
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="3"
                    id="rate-3"
                    className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                  />
                  <label htmlFor="rate-3" className="text-sm lg:text-base">
                    Trên 1000k
                  </label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Cấp độ */}
          <div className="flex justify-between">
            <h1 className="font-bold lg:text-base md:text-sm sm:text-sm text-sm">
              Cấp độ
            </h1>
            <Image
              className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
              src={`/assets/images/arrow_${
                checkedDuration ? "up" : "down"
              }.png`}
              width={20}
              height={20}
              onClick={() => setCheckedDuration((prev) => !prev)}
            />
          </div>

          {checkedDuration && (
            <div className="space-y-3 lg:text-base md:text-sm sm:text-xs text-xs">
              {durations.map((duration) => (
                <div key={duration.id} className="space-x-2">
                  <input
                    type="checkbox"
                    id={duration.id}
                    checked={durationChecked[duration.id]}
                    onChange={(e) =>
                      setDurationChecked((prev) => ({
                        ...prev,
                        [e.target.id]: e.target.checked,
                      }))
                    }
                    className="accent-filter"
                  />
                  <label htmlFor={duration.id}>{duration.name}</label>
                </div>
              ))}
            </div>
          )}

          {/* Danh mục */}
          <div className="flex justify-between lg:text-base md:text-sm sm:text-sm text-sm">
            <h1 className="font-bold">Danh mục</h1>
            <Image
              className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
              src={`/assets/images/arrow_${
                checkedCategories ? "up" : "down"
              }.png`}
              width={20}
              height={20}
              onClick={() => setCheckedCategories((prev) => !prev)}
            />
          </div>

          {checkedCategories && (
            <div className="space-y-3 lg:text-base md:text-sm sm:text-xs text-xs">
              {categories.map((category) => (
                <div key={category.id} className="space-x-2">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={categoriesChecked[category.id]}
                    onChange={(e) =>
                      setCategoriesChecked((prev) => ({
                        ...prev,
                        [e.target.id]: e.target.checked,
                      }))
                    }
                    className="accent-filter"
                  />
                  <label htmlFor={category.id}>{category.categoryName}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
