import React from 'react'
import Image from 'next/image'

const Process = () => {
  return (
    <div>
      <div className="relative w-full h-[33vh]">
      <Image 
        src='/assets/images/course.png' 
        alt='process' 
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
    </div>
  )
}

export default Process