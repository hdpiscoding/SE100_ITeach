 import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";


const TeacherCard = ({ teacher }) => {
  const [teachername, setTeacherName] = useState("");
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [rating, setRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setTeacherName(teacher?.firstName + " " + teacher?.lastName);
    console.log("teacher", teacher);

    setRating(
      teacher?.reviews && teacher?.reviews.length > 0
        ? teacher?.reviews.reduce((sum, review) => sum + review.star, 0) /
            teacher?.reviews.length
        : 0
    );
    setCourse(teacher?.totalCourseNumber ? teacher?.totalCourseNumber : "0");
    setStudent(teacher?.totalStudentNumber ? teacher?.totalStudentNumber : "0");
  }, [teacher]);
  const handleClick = () => {
    router.push(`/admin/teacher/${teacher.id}`);
  };
  return (
    <div
      className="relative  rounded-2xl overflow-hidden lg:w-[300px] lg:h-[400px] md:w-[200px] md:h-[300px] w-[100px] h-[150px] "
      onClick={handleClick}
    >
      <div className=" h-full w-full">
        <Image
          src={teacher?.avatar}
          alt="teacher"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-DarkGreen_Hover p-4">
        <h3 className="lg:text-xl md:text-lg sm:text-sm text-xs font-bold mb-2 text-white flex justify-center">
          {teachername}
        </h3>

        <div className="flex justify-center  lg:space-x-5 md:space-x-4 sm:space-x-3 space-x-2 lg:text-base md:text-sm sm:text-xs text-xs">
          <div className="flex items-center gap-1">
            <span className="text-white ">{course}</span>
            <Image
              className="lg:w-[16px] md:w-[14px] sm:w-[12px]  lg:h-[16px] md:h-[14px] sm:h-[12px] w-[10px] h-[10px]"
              src="/assets/images/sach.png"
              alt="courses"
              width={16}
              height={16}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white">{student}</span>
            <Image
              className="lg:w-[16px] md:w-[14px] sm:w-[12px] w-[10px] lg:h-[16px] md:h-[14px] sm:h-[12px] h-[10px]"
              src="/assets/images/person.png"
              alt="students"
              width={16}
              height={16}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white">{rating}</span>
            <Image
              className="lg:w-[16px] md:w-[14px] sm:w-[12px] w-[10px] lg:h-[16px] md:h-[14px] sm:h-[12px] h-[10px]"
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
};

export default TeacherCard;
