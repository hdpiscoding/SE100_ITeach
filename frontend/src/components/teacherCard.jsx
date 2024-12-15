import Image from "next/image";

const TeacherCard = () => {
    return (
        <div className="relative  rounded-2xl overflow-hidden lg:w-[300px] lg:h-[400px] md:w-[200px] md:h-[300px] w-[100px] h-[150px] ">
            
            <div className=" h-full w-full">
                <Image 
                    src="/assets/images/teacher.png" 
                    alt="teacher" 
                    fill
                    className="object-cover"
                />
            </div>
            
        
            <div className="absolute bottom-0 left-0 right-0  p-4">
                <h3 className="lg:text-xl md:text-lg sm:text-sm text-xs font-bold mb-2 text-white flex justify-center">Labie Carthaline</h3>
                
              
                <div className="flex justify-center  lg:space-x-5 md:space-x-4 sm:space-x-3 space-x-2 lg:text-base md:text-sm sm:text-xs text-xs">
                    <div className="flex items-center gap-1">
                        <span className="text-white ">2</span>
                        <Image className="lg:w-[16px] md:w-[14px] sm:w-[12px]  lg:h-[16px] md:h-[14px] sm:h-[12px] w-[10px] h-[10px]"
                            src="/assets/images/sach.png" 
                            alt="courses" 
                            width={16} 
                            height={16}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-white">2k</span>
                        <Image className="lg:w-[16px] md:w-[14px] sm:w-[12px] w-[10px] lg:h-[16px] md:h-[14px] sm:h-[12px] h-[10px]"
                            src="/assets/images/person.png" 
                            alt="students" 
                            width={16} 
                            height={16}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-white">4</span>
                        <Image className="lg:w-[16px] md:w-[14px] sm:w-[12px] w-[10px] lg:h-[16px] md:h-[14px] sm:h-[12px] h-[10px]"
                            src="/assets/images/starwhite.png" 
                            alt="rating" 
                            width={16} 
                            height={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherCard;