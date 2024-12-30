"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { login } from "@/services/auth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ isOpen, onClose, onLogin, setLogin, setRole }) => {
  if (!isOpen) return null;
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    const data = {
      email,
      password,
    };
    login(data).then((response) => {
      console.log("response", response);
      if (response?.errCode === 0) {
        onClose();
        setLogin(true);
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("isLogin", "true");
        if (response.user.role === "R1") {
          router.push("/");
          setRole("student");
          localStorage.setItem("role", "student");
        } else if (response.user.role === "R2") {
          setRole("teacher");
          localStorage.setItem("role", "teacher");
        } else {
          router.push("/admin/statistics");
          setRole("admin");
          localStorage.setItem("role", "admin");
        }
      } else {
        toast.error(response?.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-xl  max-w-[900px] relative">
        <div className="flex flex-col md:flex-row justify-center md:space-x-3">
          <Image
            className="hidden md:inline-block"
            src="/assets/images/bg_signin.png"
            width={400}
            height={100}
          />

          <div className="w-full md:w-[400px] max-w-[400px] mx-auto p-3">
            <div className="flex justify-end mt-5">
              <button onClick={onClose} className="absolute top-2 right-2">
                <Image
                  alt="close"
                  src="/assets/images/close.png"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <Image src="/assets/images/logo.png" width={150} height={20} />
            <h1 className="text-sm md:text-base">
              Tham gia với chúng tôi và nhận được nhiều lợi ích hơn.
            </h1>

            <div className="space-y-2 mt-5">
              <div className="border-2 p-2 flex justify-between bg-MoreLightGray">
                <input
                  className="outline-none w-full bg-transparent"
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                />
                
              </div>
              <div className="border-2 p-2 flex justify-between bg-MoreLightGray">
                <input
                  className="outline-none w-full bg-transparent"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  ref={passwordRef}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="inline-block" width={25} height={20} />
                  ) : (
                    < EyeOff className="inline-block" width={25} height={20} />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="bg-filter w-full rounded-2xl font-bold text-white text-1xl my-3 hover:bg-SignUp"
            >
              Đăng nhập
            </Button>

            <div className="flex justify-center mt-2">
              <h1 className="text-sm md:text-base">Hoặc</h1>
            </div>

            <div
              className="bg-xanhface flex p-2 justify-center rounded-2xl space-x-2 my-3 cursor-pointer"
              onClick={() => {
                window.open("http://localhost:8080/api/auth/facebook", "_self");
              }}
            >
              <Image
                className="inline-block"
                src="/assets/images/facebook.png"
                width={25}
                height={20}
              />
              <h1 className="font-bold text-white text-sm md:text-base">
                Đăng nhập bằng Facebook
              </h1>
            </div>

            <div className="bg-white flex p-2 justify-center rounded-2xl space-x-2 border-2 border-gray mt-3 cursor-pointer hover:bg-MoreLightGray"
              onClick={() => {
                window.open("http://localhost:8080/api/auth/google", "_self");
              }}>
              <Image
                className="inline-block"
                src="/assets/images/google.png"
                width={25}
                height={20}
              />
              <h1 className="font-bold text-black text-sm md:text-base">
                Đăng nhập bằng Google
              </h1>
            </div>

            <div className="flex justify-center mt-4 text-sm md:text-base gap-2">
              <span>Bạn chưa có tài khoản?</span>
              <span
                onClick={onLogin}
                className="font-bold text-filter hover:underline cursor-pointer"
              >
                Đăng kí
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;