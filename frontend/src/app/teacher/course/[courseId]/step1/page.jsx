 "use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useParams, useRouter } from "next/navigation";
import{getDetailCourse, putACourse,deleteACourse} from "@/services/teacher";
import { getAllCoursesCategories,getAllCourse } from "@/services/student";
import { useState,useEffect,useRef,useCallback} from "react";
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { v4 } from "uuid";

const Step1 = () => {
    const [allCourse, setAllCourse] = useState([]);
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
   const [price, setPrice] = useState("");
   const [intro, setIntro] = useState("");
   const editorContent = useRef("");
   const [markdown, setMarkdown] = useState("");
   const [courseCategoryId, setCourseCategoryId] = useState("");
   const [courseInfo, setCourseInfo] = useState({});
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [fileImage, setFileImage] = useState(null);
     const [discount, setDiscount] = useState("");
     const handleDeleteClick = () => {
      setIsModalOpen(true);
    };
  
    const handleConfirmDelete = () => {
    
      setIsModalOpen(false);
      handleDeleteCourse();
    };
  
    const handleCancelDelete = () => {
      setIsModalOpen(false);
    };
  const fetchCourseCategory = async () => {
    try {
      const response = await getAllCoursesCategories();
      const data = response.data.data;
      
      if (data && data.length > 0) {
        setCourseCategory(data);
        setCourseCategoryId(data[0]?.id || "");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
    useEffect(() => {
       
       fetchCourseCategory();
     }, []);
     const fetchAllCourse = async () => {
              const response = await getAllCourse();
             
              setAllCourse(response.data);
            };
            console.log("allCourse",allCourse);
            useEffect(() => {
             
              fetchAllCourse();
            }, []);
  function handleEditorChange({ html, text }) {
    editorContent.current = html;
    setMarkdown(text);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
      
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
    const isDuplicate = allCourse.some((course) => {
      if (course.id !== courseId &&course.courseName.trim() === courseName.trim()) {
        console.log("Tên khóa học đã tồn tại");
        return true;
      }
      return false;
    });
  
    if (isDuplicate) {
      toast.error("Tên khóa học đã tồn tại");
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
      setImagePreview(response.data.data.course.anhBia);
      setCourseInfo(response.data.data);
      setCourseName(newCourseName);
      setCourseCategoryId(response.data.data.course.courseCategoryId);
      setLevel(response.data.data.course.level);
      setPrice(response.data.data.course.cost);
      setIntro(response.data.data.course.intro);
      setMarkdown(response.data.data.course.markDown);
      setDiscount(response.data.data.course.discount);
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
  if(fileImage!==null)
  {
    const imageRef = ref(storage, `images/${fileImage.name + v4()}`);
    uploadBytes(imageRef, fileImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const data = {
          id: courseId,
           courseName: courseName,
           courseCategoryId: courseCategoryId,
           cost: price,
           level: level,
           intro: intro,
           markDown: markdown,
           teacherId: teacherId,
           anhBia: url,
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
      });
    });
  }
  else
  {
    const data = {
      id: courseId,
       courseName: courseName,
       courseCategoryId: courseCategoryId,
       cost: price,
       level: level,
       intro: intro,
       markDown: markdown,
       teacherId: teacherId,
       anhBia: imagePreview,
       gioiThieu:editorContent.current,
        discount:discount
   
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

}
const handleDeleteCourse = async () => {
  try {
    const response = await deleteACourse(courseId);
    if (response?.data) {
      toast.success("Xóa khóa học thành công!");
      router.push("/teacher/course");
    } else {
      toast.error("Lỗi khi xóa khóa học!");
    }
  } catch (error) {
    console.error("Lỗi khi xóa khóa học:", error);
    toast.error("Lỗi khi xóa khóa học!");
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

          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-x-3 md:space-x-5 lg:space-x-7 ">
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

          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 space-x-3 md:space-x-5 lg:space-x-7">
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
                  onChange={(e) => {
                   
                    const value = e.target.value;
                    const formattedValue = value ? parseInt(value, 10).toString() : '';
                    setPrice(formattedValue);
                  }}
                  value={price}
                  type="number"
                  id="name"
                  min="0"
                  className="w-full h-[40px] border border-gray rounded-md p-2"
                  onKeyDown={(e) => {
                   
                    if (e.key === '-' || e.key === '+' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="name">Giảm Giá</label>
                <input
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  type="number"
                  id="name"
                  min="0"
                  max="100"
                  className="w-full h-[40px] border border-gray rounded-md p-2"
                  onKeyDown={(e) => {
                   
                    if (e.key === '-' || e.key === '+' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
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
              <button onClick={handleImageClick} className="bg-orange text-white px-5 py-2 rounded-md mt-2">
                <label htmlFor="name">Thay đổi ảnh</label>
              </button>
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
            <button onClick={handleDeleteClick} className="bg-white text-orange px-5 py-2 rounded-md border border-orange">
              Xóa khóa học
            </button>
            <button  onClick={handlePutCourse} className="bg-orange text-white px-10 py-2 rounded-md">
              Tiếp tục
            </button>
          </div>
          {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-bold mb-4">Bạn có chắc chắn muốn xóa không?</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray-300 rounded-md">Hủy</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Xóa</button>
            </div>
          </div>
        </div>
      )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Step1;
