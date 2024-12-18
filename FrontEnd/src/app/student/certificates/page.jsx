import React from "react";
import Certificate from "@/components/Certificate";
import Coursecard from "@/components/Coursecard";
import Image from "next/image";
const Certificates = () => {
  return (
    <div className="space-y-24 mb-24">
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
            <span className="text-orange font-bold"> Thông tin chứng chỉ</span>
          </div>
        </div>
        <div></div>
      </div>
      <Certificate/>
    </div>
  );
};

export default Certificates;
