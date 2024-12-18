"use client";
import React from "react";
import Image from "next/image";
import { QRCodeSVG } from 'qrcode.react';
const Certificate = () => {
    return (
      <div className="lg:w-full md:w-[500px] sm p-4 ">
        <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
          <div></div>
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
                          Nguyễn Duy Hưng
                          <hr className="bg-certificate w-2/3" />
                        </div>
                        <div className="text-base md:text-lg lg:text-xl">
                          <div>Đã hoàn thành khóa học "Python cơ bản"</div>
                          <div>Has successfully completed the "Python fundamentals" course</div>
                        </div>
                      </div>
                    </div>
                    {/* QR code và logo section */}
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
                          <QRCodeSVG
                            value="https://www.google.com.vn/?hl=vi"
                            size={80}
                            level={"H"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Footer section */}
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
