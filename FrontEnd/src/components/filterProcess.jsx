"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const FilterProcess = () => {
    const [checkedcategories, setCheckedcategories] = useState(false);
    return (
        <div className="border border-stroke lg:rounded-2xl md:rounded-xl rounded-lg
          lg:text-xl md:text-lg text-xs  lg:px-5 lg:py-3 md:p-3 sm:p-2 p-2 text-textfilter font-poppins w-full h-fit ">
       <div className="lg:space-y-4 md:space-y-5 sm:space-y-3 space-y-2">
         <div className="text-SignUp font-bold cursor-pointer ">Lọc</div>
           <div className='flex justify-between'> 
              <h1 className='font-bold lg:text-xl md:text-lg sm:text-xs text-xs'>Categories</h1>
               {checkedcategories ? <Image src="/assets/images/arrow_up.png" width={20} height={20} onClick={()=>setCheckedcategories(!checkedcategories)}/>
                : <Image src="/assets/images/arrow_down.png" width={20} height={20} onClick={()=>setCheckedcategories(!checkedcategories)}/>}
              </div>
               {checkedcategories && (<div className='space-y-3'>
               <div className='space-x-2'>
                  <input type="checkbox" name="Design" className='accent-filter' id="Design" />
                  <label htmlFor="Design">Design (3.2K)</label>
               </div>
               <div className='space-x-2'>
                  <input type="checkbox" name="Programming" className='accent-filter' id="Programming" />
                  <label htmlFor="Programming">Programming (1.4K)</label>
               </div>
               <div className='space-x-2'> 
                  <input type="checkbox" name="Business" className='accent-filter' id="Business" />
                  <label htmlFor="Business">Business & Marketing (809)</label>
               </div>
               <div className='space-x-2'>
                  <input type="checkbox" name="Finance" className='accent-filter' id="Finance" />
                  <label htmlFor="Finance">Finance (548)</label>
               </div>
               <div className='space-x-2'>
                  <input type="checkbox" name="Music & Film"className='accent-filter' id="Music & Film" />
                  <label htmlFor="Music & Film">Music & Film (1.9K)</label>
               </div>
               <div className='space-x-2'>
                  <input type="checkbox" name="Photo & Video" className='accent-filter' id="Photo & Video" />
                  <label htmlFor="Photo & Video">Photo & Video (2.3K)</label>
               </div>
               <div className='space-x-2'> 
                  <input type="checkbox" name="Writing" className='accent-filter' id="Writing" />
                  <label htmlFor="Writing">Writing (753)</label>
               </div>
              </div>)}
       </div>
        </div>
    )
}
export default FilterProcess;
