"use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
const md = new MarkdownIt();

const Step2 = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("content");
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [markdownContent, setMarkdownContent] = React.useState("");
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
  const [chapters, setChapters] = React.useState([
    {
      title: "Chapter 1: Course Overview",
      duration: "28m",
      isOpen: true,
      lessons: [],
    },
    {
      title: "Chapter 2: Curriculum",
      duration: "1h 28m",
      isOpen: true,
      lessons: [
        { title: "Installing Vue JS", duration: "10m", completed: true },
        {
          title: "Understand Vue Components",
          duration: "59m",
          completed: true,
        },
        { title: "Vue Templating", duration: "15m", completed: false },
        { title: "Vue Forms", duration: "20m", completed: false },
        { title: "Vue Styling", duration: "15m", completed: false },
        { title: "Vue Routing", duration: "15m", completed: false },
      ],
    },
    {
      title: "Chapter 3: Components",
      duration: "1h 28m",
      isOpen: false,
      lessons: [],
    },
  ]);
  const toggleChapter = (index) => {
    setChapters(
      chapters.map((chapter, i) => ({
        ...chapter,
        isOpen: i === index ? !chapter.isOpen : chapter.isOpen,
      }))
    );
  };
  return (
    <div className="mb-20">
      <div className="space-y-3 md:space-y-5 lg:space-y-7 grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-7">
          <div className="flex items-center space-x-5">
            <Image
              className="inline-block"
              src="/assets/images/vector.png"
              alt="step1"
              width={20}
              height={15}
            />
            <span className="lg:text-2xl md:text-xl text-lg font-bold text-SignUp">
              Nội dung chi tiết
            </span>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 space-x-3 md:space-x-5 lg:space-x-7 ">
            <div className="lg:col-span-1 md:col-span-2 col-span-2">
              <label htmlFor="name">Tên bài giảng</label>
              <input
                type="text"
                id="name"
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
                  className="w-full h-[40px] border border-gray rounded-md p-2"
                />
                <span className="ml-2">min</span>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 space-x-3 md:space-x-5 lg:space-x-7">
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
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
            <div className="border rounded-md grid grid-cols-1">
              {chapters.map((chapter, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <div
                    className="flex justify-between items-center p-2 cursor-pointer"
                    onClick={() => toggleChapter(index)}
                  >
                    <div>
                      <h3 className="font-bold">{chapter.title}</h3>
                      <span className="text-stroke1 text-sm">
                        {chapter.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-500">
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

                  {chapter.isOpen && (
                    <div className="px-4">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between py-3 border-t"
                        >
                          <div className="flex items-center space-x-2">
                            <div>
                              {lesson.completed ? (
                                <Image
                                  src="/assets/images/play.png"
                                  width={20}
                                  height={20}
                                  alt="check"
                                />
                              ) : (
                                <Image
                                  src="/assets/images/play1.png"
                                  width={20}
                                  height={20}
                                  alt="play1"
                                />
                              )}
                            </div>
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                      <div className="py-3 border-t flex justify-between border-stroke1 ">
                        <span className="text-stroke1 font-bold">Bài mới</span>
                        <Image
                          src="/assets/images/add.png"
                          width={25}
                          height={20}
                          alt="plus"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className=" border-t flex justify-between p-3 items-center">
                <span className="text-stroke1 font-bold">Chương mới</span>
                <Image
                  src="/assets/images/add.png"
                  width={25}
                  height={20}
                  alt="plus"
                  className="w-[25px] h-[25px]"
                />
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
          <div className=" border border-gray rounded-md p-5">
            <MDEditor
              value={markdownContent}
              onChange={setMarkdownContent}
              preview="live" // Hiển thị cả editor và preview
              height={400}
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
