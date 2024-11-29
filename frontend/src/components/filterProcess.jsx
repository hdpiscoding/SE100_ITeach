"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const FilterProcess = () => {
    const [checkedcategories, setCheckedcategories] = useState(false);
    return (
        <div className="border border-stroke rounded-2xl  lg:text-xl md:text-lg text-xs h-fit p-5 text-textfilter ">
        <div className='flex justify-between'> 
           <h1 className='font-bold'>Categories</h1>
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
    )
}
export default FilterProcess;
