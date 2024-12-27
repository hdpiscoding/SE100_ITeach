"use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);
const Step2 = (courseId) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("content");
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [markdownContent, setMarkdownContent] = React.useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
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
  
  const [chapters, setChapters] = useState([
  ]);
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
const getAllChapters = () => {
  
}
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

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 md:gap-5 lg:gap-7">
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

          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-3 md:gap-5 lg:gap-7">
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
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
              <div className="w-full border rounded-md">
                {chapters.map((chapter, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    <div
                      className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleChapter(index)}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{chapter.title}</h3>
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

                    {chapter.isOpen && (
                      <div className="px-4">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between py-3 border-t cursor-pointer hover:bg-gray-50"
                            onClick={() => {
                              setLessonTitle(lesson.title);
                              setLessonDuration(lesson.duration.replace('m', ''));
                            }}
                          >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <div className="flex-shrink-0">
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
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-gray-500 text-sm flex-shrink-0">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                        <div className="py-3 border-t flex justify-between border-stroke1">
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
                <div className="h-[50px] border-t flex justify-between p-3 items-center cursor-pointer hover:bg-gray-50">
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
          <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
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