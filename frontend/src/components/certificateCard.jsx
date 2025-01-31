/* eslint-disable react/no-unescaped-entities */
"use client";
import { React } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import {format} from "date-fns";
const CertificateCard = ({ certificate }) => {
  const router = useRouter();

  return (
    <div
      className="w-max-[500px] p-4 "
      onClick={() => {
        router.push(`/student/certificates?id=${certificate.id}`);
      }}
    >
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="border-4 md:border-8 border-certificate text-certificate p-1">
          <div className="border-2 border-gray-500 p-1">
            <div className="border-2 border-gray-500 grid grid-cols-[0.5fr_5fr_0.5fr]">
              <div></div>
              <div className=" space-y-1 md:space-y-5 p-1">
                <div className="grid grid-cols-4 md:grid-cols-5">
                  <div className="col-span-3 md:col-span-4">
                    <div className="space-y-1 md:space-y-5">
                      <div className="space-y-1 md:space-y-4">
                        <div className="font-bold text-[8px] md:text-xs lg:text-sm">
                          GIẤY CHỨNG NHẬN
                        </div>
                        <div className="font-medium text-[8px] md:text-xs lg:text-sm">
                          CERTIFICATE OF COMPLETION
                        </div>
                      </div>
                      <div className="text-[8px] md:text-xs lg:text-sm">
                        {certificate?.user?.firstName && certificate?.user?.lastName
                            ?
                            (certificate?.user?.firstName + " " + certificate?.user?.lastName)
                            :
                            certificate?.user?.email
                        }
                        <hr className="bg-certificate w-2/3" />
                      </div>
                      <div className="text-[8px] md:text-sm lg:text-sm">
                        <div>
                          Đã hoàn thành khóa học "
                          {certificate.course.courseName}"
                        </div>
                        <div>
                          Has successfully completed the "
                          {certificate.course.courseName}" course
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* QR code và logo section */}
                  <div className="col-span-1 flex flex-col justify-between">
                    <Image
                      className="w-full lg:w-[50px] lg:h-[20px]  h-[10px] "
                      src="/assets/images/logo.png"
                      alt="signature"
                      width={200}
                      height={100}
                    />
                    <div className="mt-4 flex justify-center">
                      <div className="border-2 border-black p-1 ">
                        <QRCodeSVG
                          className="lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] "
                          value="https://www.google.com.vn/?hl=vi"
                          size={80}
                          level={"H"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer section */}
                <div className="flex  justify-between items-center space-y-1 md:space-y-5">
                  <div className="text-[8px] md:text-sm lg:text-sm">
                    <div>TP.HCM, {certificate?.createdAt ? format(new Date(certificate?.createdAt), "dd/MM/yyyy") : ""}</div>
                    <div>HCMC, {certificate?.createdAt ? format(new Date(certificate?.createdAt), "dd/MM/yyyy") : ""}</div>
                  </div>
                  <Image
                    className="hidden sm:block w-full lg:w-[50px] lg:h-[20px] h-[15px]"
                    src="/assets/images/logo.png"
                    alt="signature"
                    width={200}
                    height={100}
                  />
                  <div className="text-[5px] md:text-xs lg:text-xs text-center md:text-left">
                    <div>GIÁM ĐỐC SẢN XUẤT</div>
                    <div>Chief Delivery Officer</div>
                    <div>PHẠM HOÀNG DUY</div>
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

export default CertificateCard;
