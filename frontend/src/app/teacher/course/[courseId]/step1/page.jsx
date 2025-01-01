 "use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useParams, useRouter } from "next/navigation";
import{getDetailCourse, putACourse} from "@/services/teacher";
import { getAllCourseCategories } from "@/services/student";
import { useState,useEffect,useRef,useCallback} from "react";
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);


const Step1 = () => {
  let user=localStorage.getItem("user");
  const teacherId=JSON.parse(user).id;
  const token=localStorage.getItem("access_token");
  const params = useParams();
  const courseId = params.courseId;
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [courseName, setCourseName] = useState("");
   const [courseCategory, setCourseCategory] = useState([]);
   const [level, setLevel] = useState("begin");
   const [price, setPrice] = useState();
   const [intro, setIntro] = useState();
   const editorContent = useRef("");
   const [markdown, setMarkdown] = useState("");
   const [courseCategoryId, setCourseCategoryId] = useState("");
   const [courseInfo, setCourseInfo] = useState({});
   const fetchCourseCategory = async () => {
    console.log(courseId);
    const response = await getAllCourseCategories();
    if (response.data.length > 0) {
     setCourseCategory(response.data);
   }
  };
    useEffect(() => {
       
       fetchCourseCategory();
     }, []);
  function handleEditorChange({ html, text }) {
    editorContent.current = html;
    setMarkdown(text);
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
 const validate =()=>
 {
    if(courseName===""||price===""||intro===""||markdown===""||courseCategoryId===""||level==="")
    {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    return true;
 }
 const fetchDetailCourse = useCallback(async () => {
  try {
    const response = await getDetailCourse(courseId);

    if (response?.data?.data) {
      console.log("Fetched course info:", response.data.data);
      const newCourseName = response.data.data.course.courseName;
      console.log("Fetched course name:", newCourseName);
      
      setCourseInfo(response.data.data);
      setCourseName(newCourseName);
      setCourseCategoryId(response.data.data.course.courseCategoryId);
      setLevel(response.data.data.course.level);
      setPrice(response.data.data.course.cost);
      setIntro(response.data.data.course.intro);
      setMarkdown(response.data.data.course.markDown);
    }
  } catch (error) {
    console.error("Lỗi khi tải thông tin khóa học:", error);
    toast.error("Lỗi khi tải thông tin khóa học!");
  } finally {
  }
}, [courseId]);
useEffect(() => {
  fetchDetailCourse();
}
, [courseId, fetchDetailCourse]);
const handlePutCourse = async () => {
  if (!validate()) {
    return;
  }
  const data = {
   id: courseId,
    courseName: courseName,
    courseCategoryId: courseCategoryId,
    cost: price,
    level: level,
    intro: intro,
    markDown: markdown,
    teacherId: teacherId,
    anhBia:"Sua anh bia",
    gioiThieu:editorContent.current

  };
  console.log("data",data);
  try {
    console.log("tokenteacher",token);
    const response = await putACourse(data);
   
    if (response?.data) {
      console.log("respone",response);
      toast.success("Cập nhật thông tin khóa học thành công!");
      router.push(`/teacher/course/${courseId}/step2`);
    } else {
      toast.error("Lỗi khi cập nhật thông tin khóa học!");
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin khóa học:", error);
    toast.error("Lỗi khi cập nhật thông tin khóa học!");
  }
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
              value={courseName}
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
              className="w-full h-[40px] border border-gray rounded-md p-2 bg-white cursor-pointer"
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
            <div className="col-span-1 ">
              <label htmlFor="type">Mức độ</label>
              <select 
                id="type"
                className="w-full h-[40px] border border-gray rounded-md p-2 bg-white cursor-pointer"
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
          <MdEditor style={{ height: '300px' }}
          value={markdown}
           renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
          </div>
          <div className="flex justify-end space-x-3">
            <button className="bg-white text-orange px-5 py-2 rounded-md border border-orange">
              Xóa khóa học
            </button>
            <button  onClick={handlePutCourse} className="bg-orange text-white px-10 py-2 rounded-md">
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
