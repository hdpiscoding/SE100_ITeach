'use client';
import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image'
import { useState } from 'react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})
const FilterTeacher = () => {
   const [checkedrate, setCheckedrate] = useState(true)
   const [checkedduration, setCheckedduration] = useState(true)
   const [checkedcategories, setCheckedcategories] = useState(true)
   const [checkedsoftware, setCheckedsoftware] = useState(true)
   const [checkedlevel, setCheckedlevel] = useState(true)
   const [checkedlanguage, setCheckedlanguage] = useState(true)
   const [ratevalue, setRatevalue] = useState('')
   const Clear = () => {
      setRatevalue('')
   }
  return (
   <div className='drop-shadow-lg border border-gray-200 rounded-lg bg-white text-textfilter h-fit'>
       <div className='w-[300px] p-3 md:w-[250px] sm:w-[200px]'>
           <div className='space-y-6 sm:space-y-4'>
           <div className='flex justify-between'>
             <button className='text-filter select-none sm:text-sm'>Filter</button>
             <button className='text-filter bg-transparent select-none sm:text-sm' onClick={Clear}>Clear</button>
           </div>
          <div className='flex justify-between'> 
           <h1 className='font-bold'>Rating</h1>
           {checkedrate ? <Image src="/assets/images/arrow_up.png" width={20} height={20} onClick={()=>setCheckedrate(!checkedrate)}/>
            : <Image src="/assets/images/arrow_down.png" width={20} height={20} onClick={()=>setCheckedrate(!checkedrate)}/>}
           </div>
            {checkedrate && (<div className='flex justify-between '> 
             <div>
               <RadioGroup value={ratevalue} onClick={(e)=>
                  {
                     console.log(1)
                     console.log(e.target.value)
                     setRatevalue(e.target.value)
                  }
               } >
               <div className="flex items-center space-x-2">
                 <RadioGroupItem value="option-one" id="option-one" className='text-filter border-filter' />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/hstar.png" width={20} height={20} />
                 
               </div>
               <div className="flex items-center space-x-2">
               <RadioGroupItem value="option-two" id="option-two" className='text-filter border-filter' />
               <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/hstar.png" width={20} height={20} />
                 
                </div>
                <div className="flex items-center space-x-2">
               <RadioGroupItem value="option-three" id="option-three" className='text-filter border-filter'/>
               <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 <Image className='inline-block' src="/assets/images/fstar.png" width={20} height={20} />
                 
                </div>
               </RadioGroup>
             </div>
             <div className='space-y-2 md:text-base sm:text-sm'>
             <h1>(5.8K)</h1>
             <h1>(1.2K)</h1>
             <h1>(867)</h1>
             </div>
          </div>)}
          
          <div className='flex justify-between'> 
           <h1 className='font-bold'>Video Duration</h1>
           {checkedduration ? <Image src="/assets/images/arrow_up.png" width={20} height={20} onClick={()=>setCheckedduration(!checkedduration)}/>
            : <Image src="/assets/images/arrow_down.png" width={20} height={20} onClick={()=>setCheckedduration(!checkedduration)}/>}
   
           </div>
           {checkedduration && (<div className='space-y-3'>
            <div className='space-x-2'>
               <input type="checkbox" className='accent-filter' name="0-2" id="0-2" />
               <label htmlFor="0-2">0-2 hours(9.4K)</label>
            </div>
            <div className='space-x-2'>
               <input type="checkbox" className='accent-filter' name="3-5" id="3-5" />
               <label htmlFor="3-5">3-5 Hours (4.1K)</label>
            </div>
            <div className='space-x-2'> 
               <input type="checkbox" className='accent-filter' name="6-12" id="6-12" />
               <label htmlFor="6-12">6-12 Hours (3.8K)</label>
            </div>
            <div className='space-x-2'>
               <input type="checkbox" className='accent-filter' name="12+" id="12+" />
               <label htmlFor="12+">12+ Hours (1K)</label>
            </div>
           </div>)}
           
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
               <div className='flex justify-between'> 
           <h1 className='font-bold'>Số lượng học sinh</h1>
            {checkedlanguage ? <Image src="/assets/images/arrow_up.png" width={20} height={20} onClick={()=>setCheckedlanguage(!checkedlanguage)}/>
             : <Image src="/assets/images/arrow_down.png" width={20} height={20} onClick={()=>setCheckedlanguage(!checkedlanguage)}/>}
           </div>
           </div>
           
       </div>
    </div>
  )
}

export default FilterTeacher