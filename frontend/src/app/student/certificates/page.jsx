"use client";
import Certificate from "@/components/Certificate";
import Image from "next/image";
import { useEffect, useState } from "react";

const Certificates = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    // Access the window object safely inside useEffect
    const query = new URLSearchParams(window.location.search);
    const certificateId = query.get("id");
    setId(certificateId); // Set the ID only if it exists
  }, []); // Empty dependency array ensures this runs once on the client

  return (
    <div className="space-y-24 mb-24">
      <div className="h-[120px] bg-bg grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="flex items-center">
          <div className="space-x-2">
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
      {/* Only render Certificate if ID is available */}
      {id ? <Certificate id={id} /> : <p>Loading...</p>}
    </div>
  );
};

export default Certificates;
