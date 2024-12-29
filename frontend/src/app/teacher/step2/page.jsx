"use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect,useRef } from "react";
import {
  postAChapter,
  postALesson,
  getDetailCourse,
  deleteAChapter,
  putAChapter,
  putALesson,
  deleteALesson,
} from "@/services/teacher";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editingChapterName, setEditingChapterName] = useState("");
  const contentMarkDown = useRef("");
  const contentHtml = useRef("");
  const exerciseMarkDown = useRef("");
  const exerciseHtml = useRef("");

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
   if(activeTab==="content")
   {
     contentHtml.current = html;
     contentMarkDown.current = text;
   }
    else
    {
      exerciseHtml.current = html;
      exerciseMarkDown.current = text
    }
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
  const deleteChapter = async (id) => {
    try {
      const response = await deleteAChapter(id);
      if (response.data) {
        toast.success("Xóa chương thành công!");
        setChapters(chapters.filter((chapter) => chapter.id !== id));
      }
    } catch (error) {
      toast.error("Xóa chương thất bại!");
    }
  };
  const handleDeleteChapter = (id, e) => {
    e.stopPropagation();
    console.log("Chapter ID:", id);
    deleteChapter(id);
  };
  const handleEditChapter = (id, name, e) => {
    e.stopPropagation();
    setEditingChapterId(id);
    setEditingChapterName(name);
    setIsEditing(true);
  };
  const handleSaveEdit = async () => {
    if (!editingChapterName.trim()) {
      toast.error("Vui lòng nhập tên chương!");
      return;
    }

    const chapterExists = chapters.some(
      (chapter) =>
        chapter.chapterName === editingChapterName &&
        chapter.id !== editingChapterId
    );

    if (chapterExists) {
      toast.error("Tên chương đã tồn tại!");
      return;
    }
    try {
      const response = await putAChapter({
        id: editingChapterId,
        chapterName: editingChapterName,
      });
      console.log("Response:", response);
      if (response.data.errCode === 0) {
        setChapters(
          chapters.map((chapter) =>
            chapter.id === editingChapterId
              ? { ...chapter, chapterName: editingChapterName }
              : chapter
          )
        );

        setIsEditing(false);
        setEditingChapterId(null);
        setEditingChapterName("");

        toast.success("Cập nhật chương thành công!");
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      toast.error("Cập nhật chương thất bại!");
    }
  };
  const handleAddLesson = async (chapterId) => {
    setHidden(false);
    if (!lessonTitle.trim() || !lessonDuration.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await postALesson({
        courseId: courseId,
      chapter: chapterId,
      studyTime: parseInt(lessonDuration),
      video: "data.video", // Cần cập nhật theo dữ liệu thực tế
      contentHtml: editorContent.current, // Nội dung HTML từ editor
      contentMarkDown: "data.contentMarkDown", // Nội dung Markdown từ editor
      exerciseHtml: "data.exerciseHtml", // Bài tập dạng HTML
      exerciseMarkDown: "data.exerciseMarkDown" // Bài tập dạng Markdown
      });

      if (response && response.data) {
        // const newLesson = {
        //   id: response.data.lessonId,
        //   name: lessonTitle,
        //   studyTime: lessonDuration,
        //   video: "data.video",
        //   contentHtml: editorContent.current,
        //   contentMarkDown: "data.contentMarkDown",
        //   exerciseHtml: "data.exerciseHtml",
        //   exerciseMarkDown: "data.exerciseMarkDown"
        // };

        // setChapters(
        //   chapters.map((chapter) =>
        //     chapter.id === chapterId
        //       ? {
        //           ...chapter,
        //           lessons: [...chapter.lessons, newLesson],
        //         }
        //       : chapter
        //   )
        // );

        setLessonTitle("");
        setLessonDuration("");

        toast.success("Thêm bài học mới thành công!");
      }
    } catch (error) {
      toast.error("Thêm bài học mới thất bại!");
    }
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
                  <span className="p-3"> Đang tải dữ liệu ....</span>
                ) : (
                  <div className="border border-gray rounded-md p-5">
                    {/* Hiển thị các chương hiện có */}
                    {chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className="border-b last:border-b-0"
                      >
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
                              className="text-gray-500 "
                              onClick={(e) =>
                                handleEditChapter(
                                  chapter.id,
                                  chapter.chapterName,
                                  e
                                )
                              }
                            >
                              <EditIcon sx={{ color: "gray" }} />
                            </button>
                            <button
                              className="text-gray-500"
                              onClick={(e) =>
                                handleDeleteChapter(chapter.id, e)
                              }
                            >
                              <DeleteIcon sx={{ color: "gray" }} />
                            </button>
                            {chapter.isOpen ? (
                              <ExpandLessIcon sx={{ color: "gray" }} />
                            ) : (
                              <ExpandMoreIcon sx={{ color: "gray" }} />
                            )}
                          </div>
                        </div>
                        {chapter.isOpen && (
                          <div className="pl-4 py-2 bg-gray-50">
                            {/* Danh sách lessons hiện tại */}
                            {chapter.lessons &&
                              chapter.lessons.length > 0 &&
                              chapter.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex justify-between items-center p-2 border-b last:border-b-0"
                                >
                                  <span className="text-sm">{lesson.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {lesson.studyTime} phút
                                  </span>
                                </div>
                              ))}

                            {/* Nút thêm lesson mới */}
                            <div
                              className="flex justify-between items-center p-2 mt-2 cursor-pointer hover:bg-gray-100 border-t"
                              onClick={() => handleAddLesson(chapter.id)}
                            >
                              <span className="text-sm text-gray-500">
                                Thêm bài học mới
                              </span>
                             
                              <button className="text-gray-500 bg-stroke1 rounded-sm">
                                <AddIcon sx={{ color: "white" }} />
                              </button>
                           
                              
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="mt-4 space-y-2 p-4 border rounded-md">
                        <span>Nhập tên chương mới</span>
                        <input
                          type="text"
                          placeholder="Nhập tên chương"
                          value={editingChapterName}
                          onChange={(e) =>
                            setEditingChapterName(e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-stroke1 text-white rounded hover:bg-orange-600"
                          >
                            Lưu
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Nút thêm chương mới */}
                    <div className="mt-4">
                      <button
                        onClick={xuLyThemChuong}
                        className="w-full py-2 bg-stroke1 text-white rounded-md"
                      >
                        Thêm chương mới
                      </button>
                    </div>

                    {/* Form thêm chương mới */}
                    {hienFormChuongMoi && (
                      <div className="mt-4 p-4 border rounded-md">
                        <input
                          type="text"
                          placeholder="Nhập tên chương"
                          value={tenChuongMoi}
                          onChange={(e) => setTenChuongMoi(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => setHienFormChuongMoi(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={xuLyLuuChuong}
                            className="px-4 py-2 bg-stroke1 text-white rounded hover:bg-orange-600"
                          >
                            Lưu
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
