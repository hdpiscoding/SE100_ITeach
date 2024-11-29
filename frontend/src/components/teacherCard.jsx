import Image from "next/image";

const TeacherCard = () => {
    return (
        <div className="relative  rounded-2xl overflow-hidden lg:w-[300px] lg:h-[400px] md:w-[200px] md:h-[300px] w-[150px] h-[200px] ">
            {/* Ảnh giáo viên */}
            <div className=" h-full w-full">
                <Image 
                    src="/assets/images/teacher.png" 
                    alt="teacher" 
                    fill
                    className="object-cover"
                />
            </div>
            
            {/* Phần thông tin */}
            <div className="absolute bottom-0 left-0 right-0   p-4">
                <h3 className="text-xl font-bold mb-2 text-white flex justify-center">Labie Carthaline</h3>
                
                {/* Thống kê */}
                <div className="flex justify-center text-sm space-x-5">
                    <div className="flex items-center gap-1">
                        <span className="text-white">2</span>
                        <Image 
                            src="/assets/images/sach.png" 
                            alt="courses" 
                            width={16} 
                            height={16}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-white">2k</span>
                        <Image 
                            src="/assets/images/person.png" 
                            alt="students" 
                            width={16} 
                            height={16}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-white">4</span>
                        <Image 
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