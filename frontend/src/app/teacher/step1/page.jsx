 "use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useRouter } from "next/navigation";
import{createNewCourse} from "@/services/teacher";
import { getAllCourseCategory } from "@/services/student";
import { useState,useEffect,useRef} from "react";
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
let courseId = -1;

const Step1 = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [courseName, setCourseName] = useState("");
   const [courseCategory, setCourseCategory] = useState([]);
   const [level, setLevel] = useState("begin");
   const [price, setPrice] = useState();
   const [intro, setIntro] = useState();
   const editorContent = useRef("");
   const [courseCategoryId, setCourseCategoryId] = useState("");
    useEffect(() => {
       const fetchCourseCategory = async () => {
         const response = await getAllCourseCategory();
         setCourseCategory(response.data);
         if (response.data.length > 0) {
          setCourseCategoryId(response.data[0].id);
        }
       };
       fetchCourseCategory();
     }, []);
  function handleEditorChange({ html, text }) {
    editorContent.current = html;
  }
  const handleCreateCourse = async () => {
    if(!validate())
    {
      return;
    }
    const courseData = {
      courseName: courseName,
      courseCategoryId: courseCategoryId,
      cost: price,
      level: level,
      intro: intro,
      gioiThieu: editorContent.current,
      anhBia: "anhBia",
      teacherId: "98e89016-b2d1-49a4-84b5-7d1e361a007c"
    };
    console.log(courseData);
  
    const response = await createNewCourse(courseData);
    
    if (response) {
      console.log(response);
      courseId = response.data.courseId;
      router.push(`/teacher/step2?courseId=${courseId}`);
   
    } else {
      console.error("Failed to create course");
    }
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
 const validate =()=>
 {
    if(courseName===""||price===""||intro===""||editorContent.current==="")
    {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    return true;
 }
  return (
    <div className="mb-20">
      <div className="space-y-3 md:space-y-5 lg:space-y-7 grid grid-cols-[0.5fr_11fr_0.5fr]">
        <div></div>
        <div className="space-y-3 md:space-y-5 lg:space-y-7">
          <div className="flex items-center ">
            <Image
              onClick={() => router.push("/teacher/course")}
              className="inline-block cursor-pointer"
              src="/assets/images/vector.png"
              alt="step1"
              width={20}
              height={15}
            />
            <span className="lg:text-2xl md:text-xl text-lg font-bold text-SignUp">
              Thông tin cơ bản
            </span>
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 space-x-3 md:space-x-5 lg:space-x-7 ">
            <div className="lg:col-span-2 md:col-span-2 col-span-2">
              <label htmlFor="name">Tên khóa học</label>
              <input
                onChange={(e) => setCourseName(e.target.value)}
                type="text"
                id="name"
                className="w-full h-[40px] border border-gray rounded-md p-2"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="type">Loại</label>
              <select
              id="courseCategory"
              className="w-full h-[40px] border border-gray rounded-md p-2 bg-white"
            value={courseCategoryId}
                onChange={(e) => setCourseCategoryId(e.target.value)} 
                  >
                          {courseCategory.map((category) => (
                          <option key={category.id} value={category.id}>
                              {category.categoryName}
                          </option>
                    ))}
            </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="type">Mức độ</label>
              <select
                id="type"
                className="w-full h-[40px] border border-gray rounded-md p-2 bg-white"
              >
                 value={level}
                 onChange={(e) => setLevel(e.target.value)}
                <option value="begin">Cơ bản</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="name">Giá</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
              value={price}
                type="text"
                id="name"
                className="w-full h-[40px] border border-gray rounded-md p-2"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-7 grid-cols-7 space-x-3 md:space-x-5 lg:space-x-7">
            <div className="lg:col-span-3 md:col-span-5 col-span-5">
              <label htmlFor="name">Mô tả</label>
              <textarea
                onChange={(e) => setIntro(e.target.value)}
                value={intro}
                id="name"
                className="w-full lg:h-[300px] md:h-[200px] h-[100px] border border-gray rounded-md p-2"
              ></textarea>
            </div>
            <div className="lg:col-span-2 md:col-span-4 col-span-4">
              <label htmlFor="name">Ảnh</label>
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
                    src="/assets/images/camera.png"
                    alt="image"
                    width={40}
                    height={30}
                    className="lg:w-[40px] lg:h-[35px] md:w-[30px] md:h-[20px] w-[20px] h-[18px]"
                  />
                )}
              </div>
            </div>
          </div>
          <h1 className="lg:text-2xl md:text-xl text-lg font-bold text-SignUp">
            Giới thiệu
          </h1>
          <div className=" border border-gray rounded-md p-5">
          <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
          </div>
          <div className="flex justify-end space-x-3">
            <button className="bg-white text-orange px-5 py-2 rounded-md border border-orange">
              Xóa khóa học
            </button>
            <button onClick={handleCreateCourse} className="bg-orange text-white px-10 py-2 rounded-md">
              Tiếp tục
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Step1;
