"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [login, setLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = "student";
  const navLinks = role === "student" ? [
    { href: "/", label: "Trang chủ" },
    { href: "/student/process", label: "Quá trình" },
    { href: "/student/course", label: "Khóa học" },
    { href: "/aboutus", label: "Về chúng tôi" },
  ] : [
    { href: "/", label: "Trang chủ" },
    { href: "/process", label: "Quá trình" },
    { href: "/course", label: "Khóa học" },
    { href: "/aboutus", label: "Về chúng tôi" },
  ];

  return (
    <>
    <div className="lg:h-[72px] md:h-[50px] h-[40px]"></div>
    <div className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="relative">
          <div className="py-3">
            {/* Main Container */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              {/* 1. Logo và Mobile Menu Button Container */}
              <div className="flex justify-between items-center sm:w-[150px] md:w-[175px] lg:w-[200px]">
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  width={150}
                  height={15}
                  className="w-[100px] sm:w-[130px] md:w-[150px] lg:w-[200px]"
                />
                {/* Mobile Menu Button */}
                <button
                  className="sm:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* 2. Desktop Menu */}
              <ul className="hidden sm:flex sm:space-x-8 md:space-x-16 lg:space-x-24 items-center">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`hover:text-orange text-sm sm:text-base ${
                        pathname === link.href ? "text-orange" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* 3. Icons Section */}
              <div className="hidden sm:block sm:w-[125px] md:w-[150px] lg:w-[175px]">
                {!login ? (
                  <div className="space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
                    <Button className="bg-white text-SignUp text-sm sm:text-base">
                      LOG IN
                    </Button>
                    <Button className="bg-SignUp text-sm sm:text-base">
                      SIGN UP
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
                    <Link href="/student/cart">
                      <Image
                        className="w-[18px] sm:w-[22px] md:w-[25px] lg:w-[30px] h-[18px] sm:h-[22px] md:h-[25px] lg:h-[30px]"
                        src="/assets/images/Bag.png"
                        width={30}
                        height={30}
                        alt="bag"
                      />
                    </Link>
                    <Link href="/student/account">
                      <Image
                        className="w-[18px] sm:w-[22px] md:w-[25px] lg:w-[30px] h-[18px] sm:h-[22px] md:h-[25px] lg:h-[30px]"
                        src="/assets/images/user.png"
                        width={30}
                        height={30}
                        alt="user"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="sm:hidden bg-white shadow-lg rounded-lg p-4 absolute left-0 right-0 top-full z-50">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`hover:text-orange text-sm block py-2 ${
                        pathname === link.href ? "text-orange" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* Mobile Icons */}
                {login && (
                  <div className="pt-4 border-t space-y-4">
                    <Link
                      href="/student/cart"
                      className="flex items-center space-x-2 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/assets/images/Bag.png"
                        width={20}
                        height={20}
                        alt="bag"
                      />
                      <span>Giỏ hàng</span>
                    </Link>
                    <Link
                      href="/student/account"
                      className="flex items-center space-x-2 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/assets/images/user.png"
                        width={20}
                        height={20}
                        alt="user"
                      />
                      <span>Tài khoản</span>
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
    </>
  );
};

export default Navbar;