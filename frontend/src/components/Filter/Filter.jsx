"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useState } from "react";
import Rating from "@mui/material/Rating";

const Filter = () => {
  const [checkedrate, setCheckedrate] = useState(true);
  const [checkedduration, setCheckedduration] = useState(true);
  const [durationChecked, setDurationChecked] = useState({
    "0-2": false,
    "3-5": false,
    "6-12": false,
    "12+": false,
  });
  const [checkedcategories, setCheckedcategories] = useState(true);
  const [categoriesChecked, setCategoriesChecked] = useState({
    Design: false,
    Programming: false,
    Business: false,
    Finance: false,
    "Music & Film": false,
    "Photo & Video": false,
    Writing: false,
  });

  const [checkedsoftware, setCheckedsoftware] = useState(true);
  const [checkedlevel, setCheckedlevel] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [checkedlanguage, setCheckedlanguage] = useState(true);
  const [ratevalue, setRatevalue] = useState("");
  const Clear = () => {
    setRatevalue("");
    setDurationChecked({
      "0-2": false,
      "3-5": false,
      "6-12": false,
      "12+": false,
    });
    setCategoriesChecked({
      Design: false,
      Programming: false,
      Business: false,
      Finance: false,
      "Music & Film": false,
      "Photo & Video": false,
      Writing: false,
    });
    setSelectedLevel("");
  };
  const handleDurationChange = (e) => {
    const { id, checked } = e.target;
    setDurationChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const handleCategoriesChange = (e) => {
    const { id, checked } = e.target;
    setCategoriesChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const handleLevelChange = (value) => {
    setSelectedLevel(value);
  };
  return (
    <div className="font-poppins drop-shadow-lg
     border border-gray-200 rounded-lg bg-white text-textfilter
      h-fit ">
      <div className="w-full p-3">
        <div className="space-y-6 sm:space-y-4 w-full">
          <div className="flex justify-between lg:text-xl md:text-lg sm:text-sm text-sm">
            <button className="text-filter select-none ">
              Filter
            </button>
            <button
              className="text-filter bg-transparent select-none "
              onClick={Clear}
            >
              Clear
            </button>
          </div>
          <div className="flex justify-between lg:text-base md:text-sm sm:text-sm text-sm">
            <h1 className="font-bold flex items-center">Rating</h1>
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
                      id="option-one"className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                      
                    />
                    <Rating value={4.5} precision={0.5} readOnly size="small" />
                    <span>(5.8K)</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-two"
                      id="option-two"
                     className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <Rating value={3.5} precision={0.5} size="small" readOnly />
                    <span>(1.2K)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-three"
                      id="option-three"
                     className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                    />
                    <Rating value={3} size="small" readOnly />
                    <span>(867)</span>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="flex justify-between ">
            <h1 className="font-bold lg:text-base md:text-sm sm:text-sm text-sm">Video Duration</h1>
            {checkedduration ? (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedduration(!checkedduration)}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedduration(!checkedduration)}
                />
              </div>
            )}
          </div>
          {checkedduration && (
            <div className="space-y-3 lg:text-base md:text-sm sm:text-xs text-xs">
              <div className="space-x-2">
                <input
                  type="checkbox"
                  className="accent-filter"
                  name="0-2"
                  id="0-2"
                  checked={durationChecked["0-2"]}
                  onChange={handleDurationChange}
                />
                <label htmlFor="0-2">0-2 hours(9.4K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  className="accent-filter"
                  name="3-5"
                  id="3-5"
                  checked={durationChecked["3-5"]}
                  onChange={handleDurationChange}
                />
                <label htmlFor="3-5">3-5 Hours (4.1K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  className="accent-filter"
                  name="6-12"
                  id="6-12"
                  checked={durationChecked["6-12"]}
                  onChange={handleDurationChange}
                />
                <label htmlFor="6-12">6-12 Hours (3.8K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  className="accent-filter"
                  name="12+"
                  id="12+"
                  checked={durationChecked["12+"]}
                  onChange={handleDurationChange}
                />
                <label htmlFor="12+">12+ Hours (1K)</label>
              </div>
            </div>
          )}

          <div className="flex justify-between lg:text-base md:text-sm sm:text-sm text-sm ">
            <h1 className="font-bold">Categories</h1>
            {checkedcategories ? (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedcategories(!checkedcategories)}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedcategories(!checkedcategories)}
                />
              </div>
            )}
          </div>
          {checkedcategories && (
            <div className="space-y-3 lg:text-base md:text-sm sm:text-xs text-xs">
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Design"
                  className="accent-filter"
                  id="Design"
                  checked={categoriesChecked["Design"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Design">Design (3.2K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Programming"
                  className="accent-filter"
                  id="Programming"
                  checked={categoriesChecked["Programming"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Programming">Programming (1.4K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Business"
                  className="accent-filter"
                  id="Business"
                  checked={categoriesChecked["Business"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Business">Business & Marketing (809)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Finance"
                  className="accent-filter"
                  id="Finance"
                  checked={categoriesChecked["Finance"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Finance">Finance (548)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Music & Film"
                  className="accent-filter"
                  id="Music & Film"
                  checked={categoriesChecked["Music & Film"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Music & Film">Music & Film (1.9K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Photo & Video"
                  className="accent-filter"
                  id="Photo & Video"
                  checked={categoriesChecked["Photo & Video"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Photo & Video">Photo & Video (2.3K)</label>
              </div>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  name="Writing"
                  className="accent-filter"
                  id="Writing"
                  checked={categoriesChecked["Writing"]}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor="Writing">Writing (753)</label>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <h1 className="font-bold lg:text-base md:text-sm sm:text-sm text-sm">Software</h1>
            {checkedsoftware ? (
             <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedsoftware(!checkedsoftware)}
                />
              </div>
              ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedsoftware(!checkedsoftware)}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <h1 className="font-bold lg:text-base md:text-sm sm:text-sm text-sm">Level</h1>
            {checkedlevel ? (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedlevel(!checkedlevel)}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedlevel(!checkedlevel)}
                />
              </div>
            )}
          </div>
          {checkedlevel && (
            <RadioGroup value={selectedLevel} onValueChange={handleLevelChange} className="lg:text-base md:text-sm sm:text-xs text-xs">
              <div className="flex items-center space-x-2 lg:text-base md:text-sm sm:text-xs text-xs">
                <RadioGroupItem
                  value="All"
                  id="All"
               className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                />
                <label htmlFor="All">All Levels</label>
              </div>
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem
                  value="Beginner"
                  id="Beginner"
                  className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                />
                <label htmlFor="Beginner">Beginner</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Intermediate"
                  id="Intermediate"
                 className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                />
                <label htmlFor="Intermediate">Intermediate</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Advanced"
                  id="Advanced"
                  className="text-filter border-filter w-[15px] h-[15px] sm:w-[14px] sm:h-[14px] md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px]"
                />
                <label htmlFor="Advanced">Advanced</label>
              </div>
            </RadioGroup>
          )}

          <div className="flex justify-between">
            <h1 className="font-bold lg:text-base md:text-sm sm:text-sm text-sm">Language</h1>
            {checkedlanguage ? (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_up.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedlanguage(!checkedlanguage)}
                />
             </div>
            ) : (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer sm:w-[15px] sm:h-[15px] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px] "
                  src="/assets/images/arrow_down.png"
                  width={20}
                  height={20}
                  onClick={() => setCheckedlanguage(!checkedlanguage)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
