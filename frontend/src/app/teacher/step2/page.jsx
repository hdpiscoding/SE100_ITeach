"use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  postAChapter,
  postALesson,
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
  Edit as EditIcon,
} from "@mui/icons-material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { v4 } from "uuid";
const mdParser = new MarkdownIt();

const useCourseState = () => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [chapters, setChapters] = useState([]);
 
  

  return {
    courseInfo,
    setCourseInfo,
    chapters,
    setChapters,
   
  };
};
const useChapterState = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editingChapterName, setEditingChapterName] = useState("");
  const [showNewChapterForm, setShowNewChapterForm] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [isLoadingNewChap, setIsLoadingNewChap] = useState(false);
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
    isLoadingNewChap,
    setIsLoadingNewChap,
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
  const [videoPreview, setVideoPreview] = useState("");
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [lessonContent, setLessonContent] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
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
    videoPreview,
    setVideoPreview,
    isVideoEnabled,
    setIsVideoEnabled,
    videoUrl,
    setVideoUrl,
    lessonContent,
    setLessonContent,
    isEditing,
    setIsEditing,
    videoFile,
    setVideoFile,
  };
};

const Step2 = () => {
  const [nowChapterID, setNowChapterID] = useState(null);
  const [nowLessonID, setNowLessonID] = useState(null);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isShowExpand, setIsShowExpand] = useState(false);

  const courseState = useCourseState();
  const chapterState = useChapterState();
  const lessonState = useLessonState();
  // course API

  // const sendMail = async () => {
  //   try {
  //     const response = await postSendMail(courseId);
  //     console.log("courseId:", courseId);
  //     if (response) {
  //       // router.push("/teacher/course");
  //       console.log(response);
  //     }
  //   } catch (error) {
  //    console.log("Error:", error);
  //   }
  // };
  const handleComplete=()=>
  {
    toast.success("Tạo khóa học thành công!");
    router.push("/teacher/course");

  }
  //Chapter API
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
      
      const chapterToDelete = courseState.chapters.find(
        (chapter) => chapter.id === id
      );
  
      if (chapterToDelete && chapterToDelete.lessons) {
      
        for (const lesson of chapterToDelete.lessons) {
          try {
            await deleteALesson(lesson.id);
          } catch (error) {
            console.error(`Failed to delete lesson ${lesson.id}:`, error);
          }
        }
      }
  
     
      const response = await deleteAChapter(id);
      if (response.data) {
        toast.success("Xóa chương  thành công!");
        lessonState.setHidden(true);
        lessonState.setContentMarkDown("");
        lessonState.setExerciseMarkDown("");
        courseState.setChapters(
          courseState.chapters.filter((chapter) => chapter.id !== id)
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Xóa chương thất bại!");
      console.error("Delete chapter error:", error);
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
  const xuLyThemChuong = () => {
    chapterState.setShowNewChapterForm(true);
  };
  const xuLyLuuChuong = async () => {
    if (!chapterState.newChapterName.trim()) {
      toast.error("Vui lòng nhập tên chương!");
      return;
    }
    const isDuplicate = courseState.chapters.some(
      chapter => chapter.chapterName.toLowerCase() === chapterState.newChapterName.trim().toLowerCase()
    );
  
    if (isDuplicate) {
      toast.error("Tên chương đã tồn tại!");
      return;
    }
    try {
      const response = await postAChapter({
        chapterName: chapterState.newChapterName,
        courseId: courseId,
      });
  
      // Sửa điều kiện kiểm tra response
      if (response?.data?.errCode === 0) { // Thêm kiểm tra errCode
        courseState.setChapters([
          ...courseState.chapters, // Sửa từ chapters thành courseState.chapters
          {
            id: response.data.chapterId,
            chapterName: chapterState.newChapterName,
            lessons: [],
          },
        ]);
        chapterState.setIsLoadingNewChap(false);
        chapterState.setShowNewChapterForm(false);
        chapterState.setNewChapterName("");
       
        toast.success("Thêm chương mới thành công!");
      } else {
        toast.error(response?.data?.errMessage || "Thêm chương thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Thêm chương thất bại!");
    }
  };

  const handleSaveEdit = async () => {
    if (!chapterState.editingChapterName.trim()) {
      toast.error("Vui lòng nhập tên chương!");
      return;
    }

 
    const chapterExists = courseState.chapters.some(
      (chapter) =>
        chapter.chapterName.toLowerCase() ===
          chapterState.editingChapterName.toLowerCase() &&
        chapter.id !== chapterState.editingChapterId
    );

    if (chapterExists) {
      toast.error("Tên chương đã tồn tại!");
      return;
    }

    try {
      const response = await putAChapter({
        id: chapterState.editingChapterId,
        chapterName: chapterState.editingChapterName,
      });

      if (response.data.errCode === 0) {
        courseState.setChapters(
          courseState.chapters.map((chapter) =>
            chapter.id === chapterState.editingChapterId
              ? { ...chapter, chapterName: chapterState.editingChapterName }
              : chapter
          )
        );

        chapterState.setIsEditing(false);
        chapterState.setEditingChapterId(null);
        chapterState.setEditingChapterName("");

        toast.success("Cập nhật chương thành công!");
      } else {
        toast.error(response.errMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Cập nhật chương thất bại!");
    }
  };
 
 const handleEditLesson = (lesson,chapterId) => {
    setNowChapterID(chapterId);
    setNowLessonID(lesson.id);
    console.log("lesson",lesson);
    console.log("Chapter ID:", chapterId);
    console.log("Lesson ID:", lesson.id);
    lessonState.setIsEditing(true);
    lessonState.setHidden(false);
    lessonState.setLessonTitle(lesson.name);
    if (lesson.content) {
      console.log("Video URL from content:", lesson.content.video);
      if (lesson.content.video.includes('firebasestorage')) {
        lessonState.setVideoPreview(lesson.content.video);
        lessonState.setIsVideoEnabled(true);
        lessonState.setVideoUrl("");
      }
    else
    {
      lessonState.setVideoUrl(lesson.content.video);
      lessonState.setIsVideoEnabled(false);
      lessonState.setVideoPreview("");
    }
    
    } else {
    
      lessonState.setIsVideoEnabled(true);
      console.log("No URL") 
    }
    lessonState.setLessonDuration(lesson.studyTime);
    if (lesson.content) {
      lessonState.setContentMarkDown(lesson.content.contentMarkDown || "");
      lessonState.setExerciseMarkDown(lesson.content.exerciseMarkDown || "");
      lessonState.setContentHtml(mdParser.render(lesson.content.contentMarkDown || ""));
      lessonState.setExerciseHtml(mdParser.render(lesson.content.exerciseMarkDown || ""));
    }
    else {

      setTimeout(async () => {
        try {
          const response = await getLessonContent(lesson.id);
          if (response?.data?.data?.content) {
            lessonState.setContentMarkDown(response.data.data.content.contentMarkDown || "");
            lessonState.setExerciseMarkDown(response.data.data.content.exerciseMarkDown || "");
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("Lỗi khi tải nội dung bài học!");
        }
      }, 1000); 
    }
  };
  const validateAddLesson = () => {
      if(lessonState.videoFile===null&&lessonState.isVideoEnabled)
        {
          toast.error("Vui lòng chọn cách nhập video!");
      
          return false;
        }
    if(lessonState.videoFile===null&&lessonState.videoUrl==="")
      {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return false;
      }
   
    if (!lessonState.lessonTitle.trim() || !lessonState.lessonDuration.trim()
      || !lessonState.contentHtml.trim() || !lessonState.contentMarkDown.trim()
     || !lessonState.exerciseHtml.trim() || !lessonState.exerciseMarkDown.trim()
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
   
    const isDuplicate = courseState.chapters
    .filter((chapter) => chapter.id === nowChapterID) 
    .some((chapter) =>
      chapter.lessons.some((lesson) => lesson.name.trim() === lessonState.lessonTitle.trim())
    );
  
  if (isDuplicate) {
    toast.error("Tên bài học đã tồn tại!");
    return false;
  }
  return true;
    };
  const handleAddLesson = async () => {
   setIsShowExpand(false);
    
     if(!validateAddLesson())
     {
        return;
     }
      if(lessonState.isVideoEnabled)
      {
        console.log("videofile:",lessonState.videoFile);
        const videoRef = ref(storage, `videos/${lessonState.videoFile.name + v4()}`);
        uploadBytes(videoRef, lessonState.videoFile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async(url) => {
            console.log("URL:", url);
          lessonState.setVideoPreview(url);
          try {
            const response = await postALesson({
              courseId: courseId,
              chapter: nowChapterID,
              name: lessonState.lessonTitle,
              studyTime: parseInt(lessonState.lessonDuration),
              video: url,
              contentHtml: lessonState.contentHtml,
              contentMarkDown: lessonState.contentMarkDown,
              exerciseHtml: lessonState.exerciseHtml,
              exerciseMarkDown: lessonState.exerciseMarkDown,
            });
           
            if (response && response.data) {
              lessonState.setHidden(true);
              const newLesson = {
                id: response.data.lessonId,
                name: lessonState.lessonTitle,
                studyTime: lessonState.lessonDuration,
                content:
                {
                  lessonId: nowLessonID,
                video:url,
                contentHtml: lessonState.contentHtml,
                contentMarkDown: lessonState.contentMarkDown,
                exerciseHtml: lessonState.exerciseHtml,
                exerciseMarkDown: lessonState.exerciseMarkDown,
                },
              };
      
              courseState.setChapters(
                courseState.chapters.map((chapter) =>
                  chapter.id === nowChapterID
                    ? {
                        ...chapter,
                        lessons: [...chapter.lessons, newLesson],
                      }
                    : chapter
                )
              );
              console.log("Chapters:", courseState.chapters);
              toast.success("Thêm bài học mới thành công!");
            }
          } catch (error) {
            console.log("Error:", error);
            toast.error("Thêm bài học mới thất bại!");
          }
          });
        });
      
      }
      else{
      
      
        try {
          const response = await postALesson({
            courseId: courseId,
            chapter: nowChapterID,
            name: lessonState.lessonTitle,
            studyTime: parseInt(lessonState.lessonDuration),
            video: lessonState.videoUrl,
            contentHtml: lessonState.contentHtml,
            contentMarkDown: lessonState.contentMarkDown,
            exerciseHtml: lessonState.exerciseHtml,
            exerciseMarkDown: lessonState.exerciseMarkDown,
          });
         
          if (response && response.data) {
            lessonState.setHidden(true);
            const newLesson = {
              id: response.data.lessonId,
              name: lessonState.lessonTitle,
              studyTime: lessonState.lessonDuration,
              content:
              {
                lessonId: nowLessonID,
              video: lessonState.videoUrl,
              contentHtml: lessonState.contentHtml,
              contentMarkDown: lessonState.contentMarkDown,
              exerciseHtml: lessonState.exerciseHtml,
              exerciseMarkDown: lessonState.exerciseMarkDown,
              },
            };
    
            courseState.setChapters(
              courseState.chapters.map((chapter) =>
                chapter.id === nowChapterID
                  ? {
                      ...chapter,
                      lessons: [...chapter.lessons, newLesson],
                    }
                  : chapter
              )
            );
            console.log("Chapters:", courseState.chapters);
            toast.success("Thêm bài học mới thành công!");
          }
        } catch (error) {
          console.log("Error:", error);
          toast.error("Thêm bài học mới thất bại!");
        }
      }
     
    

  };
    const validateEditLesson = () => {
      if(lessonState.videoFile===null&&lessonState.isVideoEnabled)
        {
          toast.error("Vui lòng chọn cách nhập video!");
      
          return false;
        }
    if(lessonState.videoFile===null&&lessonState.videoUrl==="")
      {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return false;
      }
    if (!lessonState.lessonTitle.trim() || !String(lessonState.lessonDuration).trim()
      || !lessonState.contentHtml.trim() || !lessonState.contentMarkDown.trim()
     || !lessonState.exerciseHtml.trim() || !lessonState.exerciseMarkDown.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    
    const isDuplicate = courseState.chapters
    .filter((chapter) => chapter.id === nowChapterID) 
    .some((chapter) =>
      chapter.lessons.some((lesson) =>
        lesson.id !== nowLessonID && lesson.name.trim() === lessonState.lessonTitle.trim()
      )
    );
  
  if (isDuplicate) {
    toast.error("Tên bài học đã tồn tại!");
    return false;
  }
  return true;
    }
   const handleSaveEditLesson = async () => {
         if(!validateEditLesson())
         {
           console.log("validate false");
           return;
         }
         if(lessonState.isVideoEnabled)
         {
           console.log("chon video tu foler")
           if(lessonState.videoFile)
           {
             console.log("videofile:",lessonState.videoFile);
           }
           else{
             console.log(" no videofile:");
           }
           const videoRef = ref(storage, `videos/${lessonState.videoFile.name + v4()}`);
           uploadBytes(videoRef, lessonState.videoFile).then((snapshot) => {
             getDownloadURL(snapshot.ref).then(async(url) => {
               console.log("URL edit:", url);
             lessonState.setVideoPreview(url);
             try {
               const response = await putALesson({
                 id: nowLessonID,
                 courseId: courseId,
                 chapter: nowChapterID,
                 name: lessonState.lessonTitle,
                 studyTime: parseInt(lessonState.lessonDuration),
                 video: url,
                 contentHtml: lessonState.contentHtml,
                 contentMarkDown: lessonState.contentMarkDown,
                 exerciseHtml: lessonState.exerciseHtml,
                 exerciseMarkDown: lessonState.exerciseMarkDown,
               });
               if (response && response.data) {
                 const updatedLesson = {
                   id: nowLessonID,
                   name: lessonState.lessonTitle,
                   studyTime: lessonState.lessonDuration,
                   content:
                   {
                     lessonId: nowLessonID,
                   video: url,
                   contentHtml: lessonState.contentHtml,
                   contentMarkDown: lessonState.contentMarkDown,
                   exerciseHtml: lessonState.exerciseHtml,
                   exerciseMarkDown: lessonState.exerciseMarkDown,
                   },
                 };
                 courseState.setChapters(
                   courseState.chapters.map((chapter) => ({
                     ...chapter,
                     lessons: chapter.lessons.map((lesson) =>
                       lesson.id === nowLessonID
                         ? updatedLesson
                         : lesson
                     ),
                   }))
                 );
                 
                 toast.success("Cập nhật bài học thành công!");
               }
             } catch (error) {
               console.error("Error:", error);
               toast.error("Cập nhật bài học thất bại!");
             }
             });
           });
         }
         else{
           console.log("chon video tu link")
           try {
             const response = await putALesson({
               id: nowLessonID,
               courseId: courseId,
               chapter: nowChapterID,
               name: lessonState.lessonTitle,
               studyTime: parseInt(lessonState.lessonDuration),
               video: lessonState.videoUrl,
               contentHtml: lessonState.contentHtml,
               contentMarkDown: lessonState.contentMarkDown,
               exerciseHtml: lessonState.exerciseHtml,
               exerciseMarkDown: lessonState.exerciseMarkDown,
             });
             if (response && response.data) {
               const updatedLesson = {
                 id: nowLessonID,
                 name: lessonState.lessonTitle,
                 studyTime: lessonState.lessonDuration,
                 content:
                 {
                   lessonId: nowLessonID,
                 video: lessonState.videoUrl,
                 contentHtml: lessonState.contentHtml,
                 contentMarkDown: lessonState.contentMarkDown,
                 exerciseHtml: lessonState.exerciseHtml,
                 exerciseMarkDown: lessonState.exerciseMarkDown,
                 },
               };
               courseState.setChapters(
                 courseState.chapters.map((chapter) => ({
                   ...chapter,
                   lessons: chapter.lessons.map((lesson) =>
                     lesson.id === nowLessonID
                       ? updatedLesson
                       : lesson
                   ),
                 }))
               );
               
               toast.success("Cập nhật bài học thành công!");
             }
           } catch (error) {
             console.error("Error:", error);
             toast.error("Cập nhật bài học thất bại!");
           }
         }
         
    
   };
  const handleDeleteLesson = async ( e) => {
    let lessonId=nowLessonID;
    e.stopPropagation();
    if(!lessonId)
    {
      toast.error("Vui lòng chọn bài học cần xóa!");
      return;
    }
    try {
      const response = await deleteALesson(lessonId);
      if (response.data) {
        courseState.setChapters(
          courseState.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId),
          }))
        );
        toast.success("Xóa bài học thành công!");
        lessonState.setHidden(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Xóa bài học thất bại!");
    }
  };
  // Handle Video
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current.click();
  };
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
   
    if (file) {
      lessonState.setVideoFile(file);
      if (lessonState.videoPreview) {
        URL.revokeObjectURL(lessonState.videoPreview);
      }
      const videoUrl = URL.createObjectURL(file);
      lessonState.setVideoPreview(null); // Force re-render
      setTimeout(() => {
        lessonState.setVideoPreview(videoUrl);
      }, 0);
    }
  };
  
//////////////
  useEffect(() => {
    if (lessonState.activeTab === "content") {
      lessonState.setContentMarkDown(lessonState.contentMarkDown);
    } else {
      lessonState.setExerciseMarkDown(lessonState.exerciseMarkDown);
    }
  }, [lessonState.activeTab]);
  function handleEditorChange({ html, text }) {
    if (lessonState.activeTab === "content") {
      lessonState.setContentHtml(html);
      lessonState.setContentMarkDown(text);
    } else {
      lessonState.setExerciseHtml(html);
      lessonState.setExerciseMarkDown(text);
    }
  }

  const handleClickAddLesson = (chapterId) => {
    lessonState.setLessonTitle("");
    lessonState.setLessonDuration("");
    lessonState.setContentHtml("");
    lessonState.setContentMarkDown("");
    lessonState.setExerciseHtml("");
    lessonState.setExerciseMarkDown("");
    lessonState.setVideoUrl("");
    lessonState.setVideoPreview("");
    lessonState.setIsVideoEnabled(true);
  lessonState.setIsEditing(false);
  lessonState.setHidden(false);
  setNowChapterID(chapterId);
  console.log("Chapter ID:", chapterId);
  }
  return (
    <div className="mb-20">
      <div className="space-y-3 md:space-y-5 lg:space-y-7 grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-7">
          <div className="flex items-center space-x-5">
            <Image
              onClick={() => router.push("/teacher/step1")}
             className="inline-block cursor-pointer lg:w-[20px] lg:h-[15px] md:w-[15px] md:h-[10px] w-[10px] h-[8px]"
              src="/assets/images/vector.png"
              alt="step1"
              width={20}
              height={15}
            />
            <span className="lg:text-lg md:text-base sm:text-sm text-xs font-bold text-SignUp">
              Nội dung chi tiết
            </span>
          </div>

          {!lessonState.hidden && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 md:gap-5 lg:gap-7 ">
              <div className="lg:col-span-1 md:col-span-2 col-span-2">
                <label className="lg:text-lg md:text-base sm:text-sm text-xs" htmlFor="name">Tên bài giảng</label>
                <input
                  type="text"
                  id="name"
                  value={lessonState.lessonTitle}
                  onChange={(e) => lessonState.setLessonTitle(e.target.value)}
                  placeholder="Tên bài"
                  className="w-full h-[40px] border border-gray rounded-md p-2 lg:text-lg md:text-base sm:text-sm text-xs"
                />
              </div>

              <div className="col-span-1">
                <label className="lg:text-lg md:text-base sm:text-sm text-xs" htmlFor="name">Thời lượng</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="name"
                    value={lessonState.lessonDuration}
                    onChange={(e) => {
                      
                      const value = e.target.value;
                      const formattedValue = value ? parseInt(value, 10).toString() : '';
                     lessonState.setLessonDuration(formattedValue);
                    }}
                    className="w-full h-[40px] border border-gray rounded-md p-2"
                    onKeyDown={(e) => {
                     
                      if (e.key === '-' || e.key === '+' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="ml-2 lg:text-lg md:text-base sm:text-sm text-xs">phút</span>
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
                  className={`w-full lg:h-[300px] md:h-[200px] h-[100px] border border-gray rounded-md p-2 flex items-center justify-center relative ${
                    !lessonState.isVideoEnabled
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      lessonState.isVideoEnabled &&
                      !lessonState.videoPreview
                    ) {
                      handleImageClick();
                    }
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVideoChange}
                    accept="video/*"
                    className="hidden"
                    disabled={!lessonState.isVideoEnabled}
                  />

                  {lessonState.videoPreview ? (
                    <video
                      className="w-full h-full object-contain"
                      controls
                      key={lessonState.videoPreview}
                    >
                      <source src={lessonState.videoPreview} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src="/assets/images/video.png"
                      alt="Upload video"
                      width={40}
                      height={30}
                      className="lg:w-[40px] lg:h-[30px] md:w-[30px] md:h-[20px] w-[20px] h-[15px]"
                    />
                  )}
                </div>
                {lessonState.videoPreview && lessonState.isVideoEnabled && (
                   <div className="space-x-3">
                   <button
                     onClick={handleImageClick}
                     className="mt-2 px-4 py-2 bg-stroke1 text-white rounded-md hover:bg-opacity-90 lg:text-lg md:text-base sm:text-sm text-xs"
                   >
                     Thay đổi video
                   </button>
                   <button
                   onClick={()=>lessonState.setVideoPreview("")}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-90 lg:text-lg md:text-base sm:text-sm text-xs">
                     Xóa video
                   </button>
                </div>
                )}
                <div className="mt-4 flex items-end">
                  <input
                    type="checkbox"
                    id="enableVideo"
                    checked={!lessonState.isVideoEnabled}
                    onChange={(e) =>
                      lessonState.setIsVideoEnabled(!e.target.checked)
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Nhập đường dẫn video"
                    value={lessonState.videoUrl}
                    onChange={(e) => lessonState.setVideoUrl(e.target.value)}
                    disabled={lessonState.isVideoEnabled}
                    className="w-full h-[40px] border border-gray rounded-md p-2 lg:text-lg md:text-base sm:text-sm text-xs"
                  />
                </div>
              </div>
                
            )}
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
              <div className="w-full border rounded-md">
                {courseState.isLoading ? (
                  <span className="p-3 lg:text-lg md:text-base sm:text-sm text-xs"> Đang tải dữ liệu ....</span>
                ) : (
                  <div className="border border-gray rounded-md p-5">
                    
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
                            <h3 className="font-bold truncate lg:text-lg md:text-base sm:text-sm text-xs">
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
                                  onClick={() => handleEditLesson(lesson,chapter.id)}
                                  key={lesson.id}
                                  className="flex justify-between items-center p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                                >
                                  <span className="text-sm">{lesson.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {lesson.studyTime} phút
                                  </span>
                                </div>
                              ))}

                           
                            <div className="flex justify-between items-center p-2 mt-2 cursor-pointer hover:bg-gray-100 border-t">
                              <span className=" text-gray-500 lg:text-lg md:text-base sm:text-sm text-xs">
                                Thêm bài học mới
                              </span>
                             
                                <button
                                  onClick={()=>handleClickAddLesson(chapter.id)}
                                  className="text-gray-500 bg-stroke1 rounded-sm lg:text-lg md:text-base sm:text-sm text-xs"
                                >
                                <AddIcon sx={{ color: "white" }} onClick={
                                  () => {
                                    setIsShowExpand(true);
                                  }
                                 } />
                                </button>
                            
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {chapterState.isEditing && (
                      <div className="mt-4 space-y-2 p-4 border rounded-md">
                        <span className="lg:text-lg md:text-base sm:text-sm text-xs">Nhập tên chương mới</span>
                        <input
                          type="text"
                          placeholder="Nhập tên chương"
                          value={chapterState.editingChapterName}
                          onChange={(e) =>
                            chapterState.setEditingChapterName(e.target.value)
                          }
                          className="w-full p-2 border rounded-md lg:text-lg md:text-base sm:text-sm text-xs"
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => chapterState.setIsEditing(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-50 lg:text-lg md:text-base sm:text-sm text-xs"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-stroke1 text-white rounded hover:bg-orange-600 lg:text-lg md:text-base sm:text-sm text-xs"
                          >
                            Lưu
                          </button>
                        </div>
                      </div>
                    )}
                   
                    <div className="mt-4">
                      <button
                        onClick={xuLyThemChuong}
                        className="w-full py-2 bg-stroke1 text-white rounded-md lg:text-lg md:text-base sm:text-sm text-xs"
                      >
                        Thêm chương mới
                      </button>
                    </div>

                  
                    {chapterState.showNewChapterForm && (
                      <div className="mt-4 p-4 border rounded-md">
                        <input
                          type="text"
                          value={chapterState.newChapterName}
                          onChange={(e) =>
                            chapterState.setNewChapterName(e.target.value)
                          }
                          placeholder="Nhập tên chương mới"
                          className="w-full p-2 border rounded-md mb-2 lg:text-lg md:text-base sm:text-sm text-xs"
                        />
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={xuLyLuuChuong}
                            className="px-4 py-2 bg-stroke1 text-white rounded-md lg:text-lg md:text-base sm:text-sm text-xs"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() =>
                              chapterState.setShowNewChapterForm(false)
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-md lg:text-lg md:text-base sm:text-sm text-xs"
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
          {isShowExpand && (
            <>
              <div className="flex justify-start items-center space-x-10 my-10 lg:text-xl md:text-lg text-xs">
            <div
              className="inline-block cursor-pointer"
              onClick={() => lessonState.setActiveTab("content")}
            >
              <h1>Nội dung</h1>
              {lessonState.activeTab === "content" && (
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
              onClick={() => lessonState.setActiveTab("exercise")}
            >
              <h1>Bài tập</h1>
              {lessonState.activeTab === "exercise" && (
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
              lessonState.activeTab === "content"
                  ? lessonState.contentMarkDown
                  : lessonState.exerciseMarkDown
              }
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </div>
            </>
          )}
          <div className="flex justify-end space-x-3">
            { !lessonState.hidden &&(
              <div>
            {lessonState.isEditing ?(
               <div className="flex space-x-3">
               <button onClick={handleSaveEditLesson} className=" bg-orange py-2 px-10 rounded-md
                text-white hover:bg-orangeHover hover:border-orangeHover lg:text-lg md:text-base sm:text-sm text-xs
               " >
                 Lưu chỉnh sửa
               </button>
           
            <button onClick={handleDeleteLesson} className="bg-white text-orange px-5 py-2 rounded-md
             border border-orange hover:bg-lightOrangeHover lg:text-lg md:text-base sm:text-sm text-xs">
              Xóa bài học
            </button>
            </div>)
            :
            (
             <div className="flex space-x-3">
               <button  onClick={handleAddLesson} className="bg-orange text-white px-5 py-2 rounded-md border
                border-orange hover:bg-OrangeHover lg:text-lg md:text-base sm:text-sm text-xs">
              Thêm bài học 
             </button>
                      <button onClick={() => {
                        lessonState.setHidden(true);
                        setIsShowExpand(false);
                }} className="bg-white text-orange px-5
                 py-2 rounded-md border border-orange hover:bg-lightOrangeHover lg:text-lg md:text-base sm:text-sm text-xs">
                Hủy
              </button>
              
             </div>
            )
            }
            </div>
          )}
            <button
              onClick={handleComplete}
              className="bg-orange text-white px-10 py-2 rounded-md hover:bg-orangeHover
               hover:border-orangeHover lg:text-lg md:text-base sm:text-sm text-xs"
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
