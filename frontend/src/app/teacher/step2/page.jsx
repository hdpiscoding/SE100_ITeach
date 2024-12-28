"use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { postAChapter, postALesson, getDetailCourse } from "@/services/teacher";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
const Step2 = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("content");
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [hienFormChuongMoi, setHienFormChuongMoi] = useState(false);
  const [tenChuongMoi, setTenChuongMoi] = useState("");
  const [chapters, setChapters] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDetailCourse = async () => {
    try {
      setIsLoading(true);
      const response = await getDetailCourse(courseId);
      
      if (response.data) {
        console.log("Chapters:", response.data.data.chapters);
        console.log("Data từ API:", response.data);
      
        setCourseInfo(response.data.data.course);
        setChapters(response.data.data.chapters);
       
   
      }
    } catch (error) {
      toast.error("Lỗi khi tải thông tin khóa học!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (courseId) {
         fetchDetailCourse();
      }
    };
    fetchData();
  }, []);
  
  const xuLyThemChuong = () => {
    setHienFormChuongMoi(true);
  };
  const xuLyLuuChuong = async () => {
    if (!tenChuongMoi.trim()) {
      toast.error("Vui lòng nhập tên chương!");
      return;
    }

    try {
      const response = await postAChapter({
        chapterName: tenChuongMoi,
        courseId: courseId,
      });

      if (response && response.data) {
        setChapters([
          ...chapters,
          {
            id: response.data.chapterId,
            chapterName: tenChuongMoi,
            lessons: [],
          },
        ]);
        setHienFormChuongMoi(false);
        setTenChuongMoi("");

        toast.success("Thêm chương mới thành công!");
      }
    } catch (error) {
      toast.error("Thêm chương mới thất bại!");
    }
  };

  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const toggleChapter = (index) => {
    setChapters(
      chapters.map((chapter, i) => ({
        ...chapter,
        isOpen: i === index ? !chapter.isOpen : chapter.isOpen,
      }))
    );
  };

  const deleteChapter = (index, e) => {
    e.stopPropagation();
    const newChapters = chapters.filter((_, i) => i !== index);
    setChapters(newChapters);
  };

  return (
    <div className="mb-20">
      <div className="space-y-3 md:space-y-5 lg:space-y-7 grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-7">
          <div className="flex items-center space-x-5">
            <Image
              onClick={() => router.push("/teacher/step1")}
              className="inline-block cursor-pointer"
              src="/assets/images/vector.png"
              alt="step1"
              width={20}
              height={15}
            />
            <span className="lg:text-2xl md:text-xl text-lg font-bold text-SignUp">
              Nội dung chi tiết
            </span>
          </div>

          {!hidden && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 md:gap-5 lg:gap-7 ">
              <div className="lg:col-span-1 md:col-span-2 col-span-2">
                <label htmlFor="name">Tên bài giảng</label>
                <input
                  type="text"
                  id="name"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Tên bài"
                  className="w-full h-[40px] border border-gray rounded-md p-2"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="name">Thời lượng</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="name"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    className="w-full h-[40px] border border-gray rounded-md p-2"
                  />
                  <span className="ml-2">min</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-3 md:gap-5 lg:gap-7">
            {hidden ? (
              <div></div>
            ) : (
              <div className="lg:col-span-1 md:col-span-1 col-span-1 h-fit">
                <div
                  className="w-full lg:h-[300px] md:h-[200px] h-[100px] border border-gray rounded-md p-2 flex items-center justify-center cursor-pointer relative"
                  onClick={handleImageClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Selected image"
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/images/video.png"
                      alt="image"
                      width={40}
                      height={30}
                      className="lg:w-[40px] lg:h-[30px] md:w-[30px] md:h-[20px] w-[20px] h-[15px]"
                    />
                  )}
                </div>
              </div>
            )}
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
              <div className="w-full border rounded-md">
              {isLoading ? (
          
          [...Array(3)].map((_, i) => (
            <div key={i} className="border-b last:border-b-0 p-2 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))
        ) : (
                chapters?.map((chapter, index) => (
                  <div key={chapter.id} className="border-b last:border-b-0">
                    <div
                      className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleChapter(index)}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">
                          {chapter.chapterName}
                        </h3>
                        <span className="text-stroke1 text-sm">
                          {chapter.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 flex-shrink-0">
                        <button
                          className="text-gray-500"
                          onClick={(e) => deleteChapter(index, e)}
                        >
                          <Image
                            src="/assets/images/delete.png"
                            width={20}
                            height={20}
                            alt="delete"
                          />
                        </button>
                        {chapter.isOpen ? (
                          <Image
                            src="/assets/images/arrow_up.png"
                            width={20}
                            height={20}
                            alt="up"
                          />
                        ) : (
                          <Image
                            src="/assets/images/arrow_down.png"
                            width={20}
                            height={20}
                            alt="down"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center space-x-10 my-10 lg:text-xl md:text-lg text-xs">
            <div
              className="inline-block cursor-pointer"
              onClick={() => setActiveTab("content")}
            >
              <h1>Nội dung</h1>
              {activeTab === "content" && (
                <Image
                  src="/assets/images/lineorange.png"
                  width={80}
                  height={15}
                  alt="line"
                />
              )}
            </div>
            <div
              className="inline-block cursor-pointer"
              onClick={() => setActiveTab("exercise")}
            >
              <h1>Bài tập</h1>
              {activeTab === "exercise" && (
                <Image
                  src="/assets/images/lineorange.png"
                  width={60}
                  height={15}
                  alt="line"
                />
              )}
            </div>
          </div>
          <div className="border border-gray rounded-md p-5">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button className="bg-white text-orange px-5 py-2 rounded-md border border-orange">
              Xóa bài học
            </button>
            <button
              onClick={() => router.push("/step2")}
              className="bg-orange text-white px-10 py-2 rounded-md"
            >
              Hoàn thành
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Step2;
