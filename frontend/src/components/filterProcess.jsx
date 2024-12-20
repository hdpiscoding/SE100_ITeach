"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllCoursesCategories } from "@/services/student";

const FilterProcess = () => {
  const [checkedCategories, setCheckedCategories] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleFilter = (categoryName) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(categoryName);
      const updatedCategories = isSelected
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName];
      alert(`Selected categories: ${updatedCategories.join(", ")}`);
      return updatedCategories;
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllCoursesCategories();
        const fetchedCategories = response.data.data;
        setCategories(fetchedCategories);
        setSelectedCategories(fetchedCategories.map((cat) => cat.categoryName));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getData();
  }, []);

  return (
    <div
      className="border border-stroke lg:rounded-2xl md:rounded-xl rounded-lg
          lg:text-xl md:text-lg text-xs lg:px-5 lg:py-3 md:p-3 sm:p-2 p-2 text-textfilter font-poppins w-full h-fit"
    >
      <div className="lg:space-y-4 md:space-y-5 sm:space-y-3 space-y-2">
        <div className="text-SignUp font-bold cursor-pointer">Lọc</div>
        <div className="flex justify-between">
          <h1 className="font-bold lg:text-xl md:text-lg sm:text-xs text-xs">
            Danh mục
          </h1>
          {checkedCategories ? (
            <div className="flex items-center">
              <Image
                className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
                src="/assets/images/arrow_up.png"
                width={20}
                height={20}
                onClick={() => setCheckedCategories(!checkedCategories)}
              />
            </div>
          ) : (
            <div className="flex items-center">
              <Image
                className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
                src="/assets/images/arrow_down.png"
                width={20}
                height={20}
                onClick={() => setCheckedCategories(!checkedCategories)}
              />
            </div>
          )}
        </div>
        {checkedCategories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div className="space-x-2" key={category.id}>
                <input
                  type="checkbox"
                  name={category.categoryName}
                  className="accent-filter"
                  id={category.id}
                  checked={selectedCategories.includes(category.categoryName)}
                  onChange={() => handleFilter(category.categoryName)}
                />
                <label htmlFor={category.id}>{category.categoryName}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterProcess;
