import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div>
      {/* Header section */}
      <div className="h-[120px] bg-bg grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="flex items-center">
          <div className="space-x-2 ">
            <Image
              className="inline-block"
              src="/assets/images/home.png"
              alt="banner"
              width={20}
              height={20}
            />
            <Image
              className="inline-block"
              src="/assets/images/arrow_right.png"
              alt="banner"
              width={5}
              height={5}
            />
            <span className="text-orange font-bold"> Về chúng tôi</span>
          </div>
        </div>
        <div></div>
      </div>

      {/* Hero section */}
      <div className="relative">
        <Image
          src="/assets/images/bg_aboutus.png"
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          width={1400}
          height={100}
          alt="About Us Background"
        />
        <div className="space-y-3 md:space-y-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-0">
          <div className="flex justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-extrabold font-serif text-center">
              About Us
            </h1>
          </div>
          <div className="flex justify-center">
            <p className="w-full text-white text-base md:text-xl text-center">
              From preschool to pre-tertiary, our students enjoy fun,
              interactive and relevant lessons and are empowered to think beyond
              the confines of the classroom.
            </p>
          </div>
          <div className="flex justify-center">
            <Button className="bg-orange px-5 md:px-7">See more</Button>
          </div>
        </div>
      </div>
      <div className=" bg-bg grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-10">
          <div className="flex justify-center mt-5">
            <h1 className="text-SignUp text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif text-center">
              ITeach – Học tập dễ dàng, làm chủ công nghệ
            </h1>
          </div>

          <div className="flex justify-center">
            <Image
              src="/assets/images/frame.png"
              alt="line"
              width={250}
              height={40}
              className="w-[150px] md:w-[200px] lg:w-[250px] h-auto"
            />
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-3 md:space-y-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  text-SignUp">
                Học tập đa dạng và linh hoạt
              </h1>
              <Image
                src="/assets/images/line1.png"
                alt="aboutus"
                width={400}
                height={10}
              />
              <p className="text-base md:text-lg lg:text-xl">
                ITeach cung cấp một môi trường học tập linh hoạt với nhiều khóa
                học từ cơ bản đến nâng cao, phù hợp cho mọi trình độ. Dù bạn là
                người mới bắt đầu hay đang nâng cao kỹ năng, chúng tôi luôn có
                những tài liệu và bài học phù hợp với nhu cầu của bạn.
              </p>
              <Button className="bg-orange px-5 md:px-7">View more</Button>
            </div>
            <div className="flex justify-end">
              <Image
                src="/assets/images/Group1.png"
                alt="aboutus"
                width={500}
                height={500}
                className="h-[250px] md:h-[400px] lg:h-[500px] w-auto"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex justify-start">
              <Image
                src="/assets/images/Group2.png"
                alt="aboutus"
                width={500}
                height={500}
                className="h-[250px] md:h-[400px] lg:h-[500px] w-auto"
              />
            </div>
            <div className="space-y-3 md:space-y-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  text-SignUp">
                Giảng dạy từ chuyên gia trong ngành
              </h1>
              <Image
                src="/assets/images/line1.png"
                alt="aboutus"
                width={400}
                height={10}

              />
              <p className="text-base md:text-lg lg:text-xl ">
                Tất cả khóa học tại ITeach được xây dựng bởi các chuyên gia hàng
                đầu trong lĩnh vực công nghệ thông tin. Với kinh nghiệm thực
                tiễn phong phú, họ mang đến những kiến thức cập nhật, giúp bạn
                nắm bắt xu hướng và ứng dụng ngay vào công việc thực tế.
              </p>
              <Button className="bg-orange px-5 md:px-7">View more</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-3 md:space-y-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-SignUp">
                Hỗ trợ cộng đồng học tập
              </h1>
              <Image
                src="/assets/images/line1.png"
                alt="aboutus"
                width={400}
                height={10}
              />
              <p className="text-base md:text-lg lg:text-xl">
                ITeach không chỉ là nơi học hỏi, mà còn là cộng đồng dành cho
                những người đam mê IT. Chúng tôi khuyến khích sự giao lưu, trao
                đổi kinh nghiệm giữa các học viên và giảng viên, tạo ra một
                không gian học tập năng động, kết nối và sáng tạo.
              </p>
              <Button className="bg-orange px-5 md:px-7">View more</Button>
            </div>
            <div className="flex justify-end">
              <Image
                src="/assets/images/Group3.png"
                alt="aboutus"
                width={500}
                height={500}
                className="h-[250px] md:h-[400px] lg:h-[500px] w-auto"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className=" grid grid-cols-[0.5fr_11fr_0.5fr] mt-10">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-7">
          <div className="flex justify-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-SignUp">
              Teachers
            </h1>
         </div>
          <div className="flex justify-center">
            <Image
              src="/assets/images/frame.png"
              alt="line"
              width={250}
              height={40}
              className="w-[150px] md:w-[200px] lg:w-[250px] h-auto"
            />
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <Image src="/assets/images/teacherj97.png" alt="teacher" width={300} height={300} />
            </div>
            <div className="flex flex-col items-center">
              <Image src="/assets/images/teacherj97.png" alt="teacher" width={400} height={400} />
            </div>
            <div className="flex flex-col items-center">
              <Image src="/assets/images/teacherj97.png" alt="teacher" width={300} height={300} />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default AboutUs;
