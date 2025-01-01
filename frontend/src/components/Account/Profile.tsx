'use client';
import React, {useEffect, useRef, useState} from "react";
import { FaUser } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import DatePicker from "@/components/ui/date-picker";
import AlertModal from "@/components/AlertDialog2/AlertModal";
import {editUserProfile} from "@/services/student";
import { toast } from "react-toastify";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";


const formSchema = z.object({
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    email: z.string().email("Email không hợp lệ!"),
    phone: z.string().optional().refine((val) => {
        return val === "" || /^[0-9]{10}$/.test(String(val));
    }, "Số điện thoại không hợp lệ"),
    dob: z.optional(z.date()),
})

export default function Profile(props: any) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState( user.lastName);
    const [phone, setPhone] = React.useState( user.phoneNumber);
    const [email, setEmail] = React.useState( user.email);
    const [dob, setDob] = React.useState<Date | undefined>(new Date( user.birthday));
    const [avatar, setAvatar] = useState<File | string>(user.avatar || null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleImageUpload = (e:any) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
            setAvatarFile(e.target.files[0]);
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            dob: dob,
        },
    });

    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        triggerRef.current?.click();
    }

    const handleConfirm = async () => {
         const user = JSON.parse(localStorage.getItem("user") || "{}");

        
        if (avatarFile != null) 
        {
             const imageRef = ref(storage, `images/${avatarFile.name + v4()}`);
            uploadBytes(imageRef, avatarFile).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    const data = {
            id: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").id : 0,
            firstName: form.getValues("firstName"),
            lastName: form.getValues("lastName"),
            email: form.getValues("email"),
            phoneNumber: form.getValues("phone"),
            birthday: form.getValues("dob")?.toLocaleDateString("en-GB").replace(/\//g, "-") || "",
            avatar: url,
                    }
            const response = await editUserProfile(data);
            if (response.errCode === 0) {
                toast.success("Cập nhật thông tin thành công");
                user.avatar = url;
                user.firstName = form.getValues("firstName");
                user.lastName = form.getValues("lastName");
                user.email = form.getValues("email");
                user.phoneNumber = form.getValues("phone");
                user.birthday = form.getValues("dob")?.toLocaleDateString("en-GB").replace(/\//g, "-") || "";
                console.log("user", user);
                localStorage.setItem("user", JSON.stringify(user));

            }
            else {
                toast.error("Cập nhật thông tin thất bại");
            }
                    
                     
                });
             });
        }
        else {
            const data = {
            id: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").id : 0,
            firstName: form.getValues("firstName"),
            lastName: form.getValues("lastName"),
            email: form.getValues("email"),
            phoneNumber: form.getValues("phone"),
            birthday: form.getValues("dob")?.toLocaleDateString("en-GB").replace(/\//g, "-") || "",
             }
            const response = await editUserProfile(data);
            if (response.errCode === 0) {
                toast.success("Cập nhật thông tin thành công");
                user.firstName = form.getValues("firstName");
                user.lastName = form.getValues("lastName");
                user.email = form.getValues("email");
                user.phoneNumber = form.getValues("phone");
                user.birthday = form.getValues("dob")?.toLocaleDateString("en-GB").replace(/\//g, "-") || "";
                console.log("user", user);
                localStorage.setItem("user", JSON.stringify(user));
            }
            else {
                toast.error("Cập nhật thông tin thất bại");
            }
        }
         
        
    };

  return (
      <>
          <div className="border rounded-md bg-white flex flex-col mx-4">
              <span className="font-bold text-2xl px-6 py-3">
                  Thông tin cá nhân
              </span>

              <div className="border-t"/>

              <div className="px-6 mb-6">
                  <div className="lg:grid lg:grid-cols-[70%_30%] flex flex-col-reverse justify-center">
                      <div className="lg:col-start-1 flex flex-col">
                          <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)}>
                                  <div className="space-y-4 mt-2">
                                      <FormField
                                          control={form.control}
                                          name="firstName"
                                          render={({field}) => (
                                              <FormItem>
                                                  <FormLabel>Họ</FormLabel>
                                                  <FormControl>
                                                      <Input {...field}/>
                                                  </FormControl>
                                                  <FormMessage/>
                                              </FormItem>
                                          )}
                                      />

                                      <FormField
                                          control={form.control}
                                          name="lastName"
                                          render={({field}) => (
                                              <FormItem>
                                                  <FormLabel>Tên</FormLabel>
                                                  <FormControl>
                                                      <Input {...field}/>
                                                  </FormControl>
                                                  <FormMessage/>
                                              </FormItem>
                                          )}
                                      />

                                      <FormField
                                          control={form.control}
                                          name="email"
                                          render={({field}) => (
                                              <FormItem>
                                                  <FormLabel>Email</FormLabel>
                                                  <FormControl>
                                                      <Input {...field}/>
                                                  </FormControl>
                                                  <FormMessage/>
                                              </FormItem>
                                          )}
                                      />

                                      <div className="flex flex-col-reverse gap-4 md:flex-col lg:flex lg:flex-row lg:items-center lg:justify-between">
                                          <FormField
                                              control={form.control}
                                              name="phone"
                                              render={({field}) => (
                                                  <FormItem className="relative">
                                                      <FormLabel>Số điện thoại</FormLabel>
                                                      <FormControl>
                                                          <Input {...field} className="lg:w-[35rem]"/>
                                                      </FormControl>
                                                      <FormMessage className="absolute left-0 mt-1"/>
                                                  </FormItem>
                                              )}
                                          />

                                          <FormField
                                              control={form.control}
                                              name="dob"
                                              render={({field}) => (
                                                  <FormItem className="flex flex-col space-y-4">
                                                      <FormLabel>Ngày sinh</FormLabel>
                                                      <DatePicker
                                                          className="w-full lg:w-[300px] flex items-center justify-start"
                                                          date={dob}
                                                          setDate={setDob}
                                                          type={"date"}
                                                      />
                                                      <FormMessage/>
                                                  </FormItem>
                                              )}
                                          />
                                      </div>
                                  </div>

                                  <div className="mt-10">
                                      <Button type="submit"
                                              className="bg-DarkGreen hover:bg-DarkGreen_Hover rounded-xl">
                                          Lưu thay đổi
                                      </Button>
                                  </div>

                              </form>
                          </Form>

                          <AlertModal
                              title="Xác nhận lưu thay đổi"
                              description="Bạn có chắc chắn muốn thay đổi thông tin trên?"
                              trigger={
                                  <button
                                      ref={triggerRef}
                                      style={{ display: "none" }} // Ẩn trigger button
                                  />
                              }
                              onConfirm={handleConfirm}
                          />
                      </div>

                      <div className="lg:col-start-2 lg:mt-0 mt-4 flex items-center justify-center">
                          <div className="flex flex-col gap-6 justify-center items-center">
                              <div className={`bg-DarkGray ${avatar ? "" : "p-12"} rounded-[50%] h-fit w-fit`}>
                                  {avatar
                                      ?
                                      <div className="relative rounded-[50%] overflow-hidden h-[192px] w-[192px]">
                                          <Image
                                              src={typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)}
                                              alt="user avatar"
                                              className="object-cover"
                                              fill
                                          />
                                      </div>
                                      :
                                      <FaUser className="text-8xl text-LightGray"/>}
                              </div>

                              <div>
                                  <label htmlFor="image-upload"
                                         className="mt-4 select-none cursor-pointer bg-White border-2 border-DarkGreen rounded-xl text-DarkGreen py-1 px-3 hover:bg-DarkGreen_Hover hover:text-white hover:border-DarkGreen_Hover">
                                      Chọn hình ảnh
                                  </label>
                                  <input
                                      id="image-upload"
                                      type="file"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={handleImageUpload}
                                      className="hidden"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>

  );
}