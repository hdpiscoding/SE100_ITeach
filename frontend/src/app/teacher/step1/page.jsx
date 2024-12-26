 "use client";
import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useRouter } from "next/navigation";
import{createNewCourse} from "@/services/teacher";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
const handleCreateCourse=()=>
{
  router.push("/teacher/step2")
}
const Step1 = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
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
                type="text"
                id="name"
                className="w-full h-[40px] border border-gray rounded-md p-2"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="type">Loại</label>
              <select
                id="type"
                className="w-full h-[40px] border border-gray rounded-md p-2 bg-white"
              >
                <option value="">Selects</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="type">Mức độ</label>
              <select
                id="type"
                className="w-full h-[40px] border border-gray rounded-md p-2 bg-white"
              >
                <option value="">Selects</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="name">Giá</label>
              <input
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
            <button onClick={()=>handleCreateCourse} className="bg-orange text-white px-10 py-2 rounded-md">
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
