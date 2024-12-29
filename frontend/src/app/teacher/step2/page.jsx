"use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  postAChapter,
  postALesson,
  getDetailCourse,
  deleteAChapter,
  putAChapter,
  putALesson,
  deleteALesson,
  getLessonContent,
} from "@/services/teacher";
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
const mdParser = new MarkdownIt(/* Markdown-it options */);
const useCourseState = () => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return {
    courseInfo,
    setCourseInfo,
    chapters,
    setChapters,
    isLoading,
    setIsLoading,
  };
};
const useChapterState = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editingChapterName, setEditingChapterName] = useState("");
  const [showNewChapterForm, setShowNewChapterForm] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");

  return {
    isEditing,
    setIsEditing,
    editingChapterId,
    setEditingChapterId,
    editingChapterName,
    setEditingChapterName,
    showNewChapterForm,
    setShowNewChapterForm,
    newChapterName,
    setNewChapterName,
  };
};
const useLessonState = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [contentMarkDown, setContentMarkDown] = useState("");
  const [exerciseHtml, setExerciseHtml] = useState("");
  const [exerciseMarkDown, setExerciseMarkDown] = useState("");
  const [hidden, setHidden] = useState(true);

  return {
    activeTab,
    setActiveTab,
    lessonTitle,
    setLessonTitle,
    lessonDuration,
    setLessonDuration,
    contentHtml,
    setContentHtml,
    contentMarkDown,
    setContentMarkDown,
    exerciseHtml,
    setExerciseHtml,
    exerciseMarkDown,
    setExerciseMarkDown,
    hidden,
    setHidden,
  };
};

const Step2 = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const router = useRouter();
  const fileInputRef = useRef(null);

  const courseState = useCourseState();
  const chapterState = useChapterState();
  const lessonState = useLessonState();
  const fetchDetailCourse = useCallback(async () => {
    try {
      courseState.setIsLoading(true);
      const response = await getDetailCourse(courseId);

      if (response?.data?.data) {
        const { course, chapters } = response.data.data;
        courseState.setCourseInfo(course);
        courseState.setChapters(chapters);

        // Fetch all lesson contents
        chapters.forEach((chapter) => {
          chapter.lessons?.forEach((lesson) => {
            fetchGetLessonContent(lesson.id);
          });
        });
      }
    } catch (error) {
      toast.error("Lỗi khi tải thông tin khóa học!");
    } finally {
      courseState.setIsLoading(false);
    }
  }, [courseId]);
  const fetchGetLessonContent = async (lessonId) => {
    try {
      const response = await getLessonContent(lessonId);
      if (response?.data) {
        courseState.setChapters((prevChapters) =>
          prevChapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons?.map((lesson) =>
              lesson.id === lessonId
                ? { ...lesson, content: response.data }
                : lesson
            ),
          }))
        );
      }
    } catch (error) {
      toast.error("Lỗi khi tải nội dung bài học!");
    }
  };
  const handleAddChapter = async () => {
    if (!chapterState.newChapterName.trim()) {
      toast.error("Vui lòng nhập tên chương!");
      return;
    }

    try {
      const response = await postNewChapter({
        courseId,
        chapterName: chapterState.newChapterName,
      });

      if (response?.data) {
        courseState.setChapters((prev) => [...prev, response.data]);
        chapterState.setNewChapterName("");
        chapterState.setShowNewChapterForm(false);
        toast.success("Thêm chương thành công!");
      }
    } catch (error) {
      toast.error("Thêm chương thất bại!");
    }
  };
  const xuLyThemChuong = () => {
    chapterState.setShowNewChapterForm(true);
  };

  const xuLyLuuChuong = async () => {
    if (!chapterState.newChapterName.trim()) {
      toast.error("Vui lòng nhập tên chương!");
      return;
    }

    try {
      const response = await postAChapter({
        chapterName: chapterState.newChapterName,
        courseId: courseId,
      });

      if (response && response.data) {
        courseState.setChapters([
          ...courseState.chapters,
          {
            id: response.data.chapterId,
            chapterName: chapterState.newChapterName,
            lessons: [],
          },
        ]);
        chapterState.setShowNewChapterForm(false);
        chapterState.setNewChapterName("");

        toast.success("Thêm chương mới thành công!");
      }
    } catch (error) {
      toast.error("Thêm chương mới thất bại!");
    }
  };
  useEffect(() => {
    if (lessonState.activeTab === "content") {
      lessonState.setContentMarkDown(lessonState.contentMarkDown);
    } else {
      lessonState.setExerciseMarkDown(lessonState.exerciseMarkDown);
    }
  }, [lessonState.activeTab]);
  useEffect(() => {
    if (courseId) {
      fetchDetailCourse();
    }
  }, [courseId, fetchDetailCourse]);
  function handleEditorChange({ html, text }) {
    if (lessonState.activeTab === "content") {
      lessonState.setContentHtml(html);
      lessonState.setContentMarkDown(text);
    } else {
      lessonState.setExerciseHtml(html);
      lessonState.setExerciseMarkDown(text);
    }
  }
  const handleEditLesson = (lesson) => {
    lessonState.setHidden(false);
    lessonState.setLessonTitle(lesson.name);
    lessonState.setLessonDuration(lesson.studyTime);
    lessonState.setContentMarkDown(lesson.contentMarkDown);
    lessonState.setExerciseMarkDown(lesson.exerciseMarkDown);
  };
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
    courseState.setChapters(
      courseState.chapters.map((chapter, i) => ({
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
        courseState.setChapters(
          courseState.chapters.filter((chapter) => chapter.id !== id)
        );
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
    chapterState.setEditingChapterId(id);
    chapterState.setEditingChapterName(name);
    chapterState.setIsEditing(true);
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
  const handleHiddenBtn = () => {
    setHidden(!hidden);
    setHiddenBtn(!hiddenBtn);
    setLessonTitle("");
    setLessonDuration("");
  };
  const handleAddLesson = async (chapterId) => {
    if (!lessonTitle.trim() || !lessonDuration.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await postALesson({
        courseId: courseId,
        chapter: chapterId,
        name: lessonTitle,
        studyTime: parseInt(lessonDuration),
        video: "data.video",
        contentHtml: contentHtml,
        contentMarkDown: contentMarkDown,
        exerciseHtml: exerciseHtml,
        exerciseMarkDown: exerciseMarkDown,
      });
      console.log("Course ID:", courseId);
      console.log("Chapter ID:", chapterId);
      console.log("Lesson Title:", lessonTitle);
      console.log("Lesson Duration:", lessonDuration);
      console.log("Content HTML:", contentHtml);
      console.log("Content Markdown:", contentMarkDown);
      console.log("Exercise HTML:", exerciseHtml);
      console.log("Exercise Markdown:", exerciseMarkDown);

      if (response && response.data) {
        setHidden(true);
        const newLesson = {
          id: response.data.lessonId,
          name: lessonTitle,
          studyTime: lessonDuration,
          video: "data.video",
          contentHtml: contentHtml,
          contentMarkDown: contentMarkDown,
          exerciseHtml: exerciseHtml,
          exerciseMarkDown: exerciseMarkDown,
        };

        setChapters(
          chapters.map((chapter) =>
            chapter.id === chapterId
              ? {
                  ...chapter,
                  lessons: [...chapter.lessons, newLesson],
                }
              : chapter
          )
        );
        console.log("Chapters:", chapters);
        setLessonTitle("");
        setLessonDuration("");

        toast.success("Thêm bài học mới thành công!");
      }
    } catch (error) {
      console.log("Error:", error);
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

          {!lessonState.hidden && (
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
            {lessonState.hidden ? (
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
                {courseState.isLoading ? (
                  <span className="p-3"> Đang tải dữ liệu ....</span>
                ) : (
                  <div className="border border-gray rounded-md p-5">
                    {/* Hiển thị các chương hiện có */}
                    {courseState.chapters.map((chapter, index) => (
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
                            {chapter.lessons &&
                              chapter.lessons.length > 0 &&
                              chapter.lessons.map((lesson) => (
                                <div
                                  onClick={() => handleEditLesson(lesson)}
                                  key={lesson.id}
                                  className="flex justify-between items-center p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                                >
                                  <span className="text-sm">{lesson.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {lesson.studyTime} phút
                                  </span>
                                </div>
                              ))}

                            {/* Nút thêm lesson mới */}
                            <div className="flex justify-between items-center p-2 mt-2 cursor-pointer hover:bg-gray-100 border-t">
                              <span className="text-sm text-gray-500">
                                Thêm bài học mới
                              </span>
                              {lessonState.hiddenBtn ? (
                                <button
                                  onClick={() => handleHiddenBtn()}
                                  className="text-gray-500 bg-stroke1 rounded-sm "
                                >
                                  <AddIcon sx={{ color: "white" }} />
                                </button>
                              ) : (
                                <div className="flex space-x-4">
                                  <button
                                    onClick={() => handleAddLesson(chapter.id)}
                                    className="text-gray-500 bg-stroke1 rounded-sm "
                                  >
                                    <CheckIcon sx={{ color: "white" }} />
                                  </button>

                                  <button
                                    onClick={() => handleHiddenBtn()}
                                    className="text-gray-500 bg-red-600 rounded-sm "
                                  >
                                    <RemoveIcon sx={{ color: "white" }} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {chapterState.isEditing && (
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
                    {chapterState.showNewChapterForm && (
                      <div className="mt-4 p-4 border rounded-md">
                        <input
                          type="text"
                          value={chapterState.newChapterName}
                          onChange={(e) =>
                            chapterState.setNewChapterName(e.target.value)
                          }
                          placeholder="Nhập tên chương mới"
                          className="w-full p-2 border rounded-md mb-2"
                        />
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={xuLyLuuChuong}
                            className="px-4 py-2 bg-stroke1 text-white rounded-md"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() =>
                              chapterState.setShowNewChapterForm(false)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                          >
                            Hủy
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
              {useLessonState.activeTab === "content" && (
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
              {useLessonState.activeTab === "exercise" && (
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
              value={
                useLessonState.activeTab === "content"
                  ? contentMarkDown
                  : useLessonState.exerciseMarkDown
              }
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
