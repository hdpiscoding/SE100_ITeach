"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Login from "@/components/login";
import SignIn from "@/components/signin";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [role, setRole] = useState("student");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roleLocal = localStorage.getItem("role");
      if (roleLocal) {
        setRole(roleLocal);
      }
      const check = localStorage.getItem("isLogin");
      if (!check) {
        localStorage.setItem("isLogin", "false");
      }
      setLogin(localStorage.getItem("isLogin"));
    }
  }, []);
  const isLoginLocal = localStorage.getItem("isLogin");

  const getNavLinks = (role) => {
    switch (role) {
      case "student":
        return [
          { href: "/", label: "Trang chủ" },
          { href: "/student/process", label: "Quá trình" },
          { href: "/student/course", label: "Khóa học" },
          { href: "/aboutus", label: "Về chúng tôi" },
        ];
      case "teacher":
        return [
          { href: "/teacher/course", label: "Khóa học" },
          { href: "/aboutus", label: "Về chúng tôi" },
        ];
      case "admin":
        return [
          { href: "/admin/statistics", label: "Trang chủ" },
          { href: "/admin/teacherAdmin", label: "Giáo viên" },
          { href: "/admin/course", label: "Quản lý khóa học" },
        ];
      
      default:
        return [
          { href: "/", label: "Trang chủ" },
          { href: "/aboutus", label: "Về chúng tôi" },
        ];
    }
  };

  const navLinks = getNavLinks(role);
  const handleSignIn = () => {
    setShowLoginModal(true);
    setShowSignInModal(false);
  };
  const handleLoginIn = () => {
    setShowSignInModal(true);
    setShowLoginModal(false);
  };
  const setRoleWhenLogin = (role) => { 
    setRole(role);

  }

  return (
    <>
      <div className="lg:h-[72px] md:h-[50px] h-[40px]"></div>
      <div className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="grid grid-cols-[0.5fr_11fr_0.5fr]">
          <div></div>
          <div className="relative">
            <div className="py-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex justify-between items-center sm:w-[150px] md:w-[175px] lg:w-[200px]">
                  <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={150}
                    height={15}
                    className="w-[100px] sm:w-[130px] md:w-[150px] lg:w-[200px]"
                  />

                  <button
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>

                <ul className="hidden sm:flex sm:space-x-8 md:space-x-16 lg:space-x-24 items-center">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`hover:text-orange text-sm sm:text-base font-semibold ${
                          pathname === link.href ? "text-orange" : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="hidden sm:block sm:w-[125px] md:w-[150px] lg:w-[175px]">
                  {(  isLoginLocal==="false")? (
                    <div className=" grid grid-cols-2 lg:gap-x-2 sm:gap-x-1 md:gap-x-2">
                      <Button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-white text-SignUp font-semibold lg:text-sm sm:text-sm md:text-sm text-xs col-span-1 hover:bg-SignUp hover:text-white"
                      >
                        Đăng nhập
                      </Button>
                      <Button
                        onClick={() => setShowSignInModal(true)}
                        className="bg-SignUp font-semibold lg:text-sm sm:text-sm md:text-sm text-xs col-span-1 hover:bg-white hover:text-SignUp"
                      >
                        Đăng kí
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5">
                      {role === "student" && (
                        <div className="relative flex items-center space-x-4">
                          <Link href="/student/cart">
                            <Image
                              src="/assets/images/Bag.png"
                              width={27}
                              height={27}
                              alt="bag"
                            />
                          </Link>
                          <button
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <Image
                              src="/assets/images/user.png"
                              width={27}
                              height={27}
                              alt="user"
                            />
                          </button>
                          {isMenuOpen && (
                            <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2">
                              <ul className="space-y-2">
                                <li>
                                  <Link
                                    href="/student/account"
                                    className="block py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    Tài khoản
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="block py-2 w-full text-left"
                                      onClick={() => {
                                        localStorage.setItem("isLogin", "false");

                                      setLogin(false);
                                      setIsMenuOpen(false);
                                      router.push("/");
                                        setRole("student");
                                        localStorage.removeItem("access_token");
                                        localStorage.setItem("role", "student");
                                      localStorage.removeItem("user");
                                     
                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {role === "teacher" && (
                        <div className="relative">
                          <button
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <Image
                              src="/assets/images/user.png"
                              width={20}
                              height={20}
                              alt="user"
                            />
                           </button>
                          {isMenuOpen && (
                            <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2">
                              <ul className="space-y-2">
                                <li>
                                  <Link
                                    href="/teacher/account"
                                    className="block py-2"
                                    
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                   Tài khoản
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="block py-2 w-full text-left"
                                    onClick={() => {
                                      localStorage.setItem("isLogin", "false");
                                      setLogin(false);
                                      setIsMenuOpen(false);
                                      router.push("/");
                                      setRole("student");
                                      localStorage.removeItem("access_token");
                                      
                                        localStorage.setItem("role", "student");
                                      

                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {role === "admin" && (
                        <div className="relative">
                          <button
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <Image
                              src="/assets/images/user.png"
                              width={27}
                              height={27}
                              alt="user"
                            />
                           </button>
                          {isMenuOpen && (
                            <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2">
                              <ul className="space-y-2">
                                 
                                <li>
                                  <button
                                    className="block py-2 w-full text-left"
                                    onClick={() => {
                                      setLogin(false);
                                      setIsMenuOpen(false);
                                      router.push("/");
                                      setRole("student");
                                      localStorage.setItem("isLogin", "false");
localStorage.removeItem("access_token");
                                        localStorage.setItem("role", "student");
                                      
                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

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

                  {/* Thay đổi phần này */}
                  {login && (
                    <div className="pt-4 border-t space-y-4">
                      {role === "student" && (
                        <div className="relative">
                          <button
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <Image
                              src="/assets/images/user.png"
                              width={20}
                              height={20}
                              alt="user"
                            />
                           </button>
                          {isMenuOpen && (
                            <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2">
                              <ul className="space-y-2">
                                <li>
                                  <Link
                                    href="/student/account"
                                    className="block py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    Tài khoản
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="block py-2 w-full text-left"
                                    onClick={() => {
                                      localStorage.removeItem("access_token");
                                        localStorage.setItem("role", "student");                                      setLogin(false);
                                      setIsMenuOpen(false);
                                      router.push("/");
                                      setRole("student");
                                      localStorage.setItem("isLogin", "false");
                                      localStorage.removeItem("user");

                                      

                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {role === "teacher" && (
                        <div className="relative">
                          <button
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <Image
                              src="/assets/images/user.png"
                              width={20}
                              height={20}
                              alt="user"
                            />
                           </button>
                          {isMenuOpen && (
                            <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2">
                              <ul className="space-y-2">
                                <li>
                                  <Link
                                    href="/teacher/account"
                                    className="block py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                   Tài khoản
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    className="block py-2 w-full text-left"
                                    onClick={() => {
                                      localStorage.setItem("isLogin", "false");
                                      setLogin(false);
                                      setIsMenuOpen(false);
                                      router.push("/");
                                      setRole("student");
                                      localStorage.removeItem("access_token");
                                      localStorage.setItem("role", "student");
                                      localStorage.removeItem("user");

                                      
                                      
                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {role === "admin" && (
                        <div className="relative">
                          <button
                            className="flex items-center space-x-2 py-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <Image
                              src="/assets/images/user.png"
                              width={20}
                              height={20}
                              alt="user"
                            />
                           </button>
                          {isMenuOpen && (
                            <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2">
                              <ul className="space-y-2">
                                
                                <li>
                                  <button
                                    className="block py-2 w-full text-left"
                                    onClick={() => {
                                       localStorage.setItem("isLogin", "false");
                                      setLogin(false);
                                      setIsMenuOpen(false);
                                      router.push("/");
                                      setRole("student");
                                      localStorage.removeItem("access_token");
                                      localStorage.setItem("role", "student");
                                      localStorage.removeItem("user");
                                      
                                     
                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
      <Login
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginIn}
        setLogin={setLogin}
        setRole={setRoleWhenLogin}
      />
      <SignIn
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
        setLogin={setLogin}
       />
    </>
  );
};

export default Navbar;
