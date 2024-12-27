"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { getACertificate } from "@/services/student";

const Certificate = ({ id }) => {
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getACertificate(id);
        setCertificate(response.data.certificate);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="lg:w-full md:w-[500px] sm p-4 ">
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div onClick={handleOnclik}>Button </div>
        <div className="border-4 md:border-8 border-certificate text-certificate p-2">
          <div className="border-2 border-gray-500 p-2">
            <div className="border-2 border-gray-500 grid grid-cols-[0.5fr_5fr_0.5fr]">
              <div></div>
              <div className="py-4 md:py-10 space-y-12 md:space-y-24">
                <div className="grid grid-cols-4 md:grid-cols-5">
                  <div className="col-span-3 md:col-span-4">
                    <div className="space-y-12 md:space-y-24">
                      <div className="space-y-2">
                        <div className="font-bold text sm:text-xl md:text-4xl lg:text-6xl">
                          GIẤY CHỨNG NHẬN
                        </div>
                        <div className="font-medium text-xl md:text-2xl lg:text-4xl">
                          CERTIFICATE OF COMPLETION
                        </div>
                      </div>
                      <div className="text-2xl md:text-3xl lg:text-5xl">
                        {certificate?.user?.firstName}{" "}
                        {certificate?.user?.lastName}
                        <hr className="bg-certificate w-2/3" />
                      </div>
                      <div className="text-base md:text-lg lg:text-xl">
                        <div>
                          Đã hoàn thành khóa học "
                          {certificate?.course?.courseName}"
                        </div>
                        <div>
                          Has successfully completed the "
                          {certificate?.course?.courseName}" course
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col justify-between">
                    <Image
                      className="w-full"
                      src="/assets/images/logo.png"
                      alt="signature"
                      width={200}
                      height={100}
                    />
                    <div className="mt-4 flex justify-center">
                      <div className="border-2 border-black p-1 md:p-2">
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={window.location.href}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-sm md:text-base">
                    <div>Hà Nội,__/__/____</div>
                    <div>Ha Noi,__/__/____</div>
                  </div>
                  <Image
                    className="w-32 md:w-40 lg:w-48"
                    src="/assets/images/logo.png"
                    alt="signature"
                    width={200}
                    height={100}
                  />
                  <div className="text-sm md:text-base text-center md:text-left">
                    <div>GIÁM ĐỐC SẢN XUẤT</div>
                    <div>Chief Delivery Officer</div>
                    <div>ĐỖ VĂN KHẮC</div>
                  </div>
                </div>
                
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Certificate;
