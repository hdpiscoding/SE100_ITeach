'use client';
import React, {useEffect, useRef, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasswordInput} from "@/components/ui/input-password";
import AlertModal from "../AlertDialog2/AlertModal";
import { changePassword } from "@/services/student";
import { toast } from "react-toastify";

const formSchema = z
    .object({
        currentPassword: z.string().min(1, "Mật khẩu hiện tại không được để trống!"),
        newPassword: z
            .string()
            .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự!")
            .regex(
                /^(?=.*[a-zA-Z])(?=.*\d)/,
                "Mật khẩu mới phải bao gồm cả chữ và số!"
            ),
        confirmPassword: z.string().min(1, "Mật khẩu xác nhận không được để trống!"),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword, // Kiểm tra khớp mật khẩu xác nhận
        {
            path: ["confirmPassword"],
            message: "Mật khẩu xác nhận không chính xác!",
        }
    );

export default function Password(props: any) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
               triggerRef.current?.click();

    }
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const handleConfirm = async () => {
        try {
            const data = {
                id: 2,
                oldPassword: form.getValues("currentPassword"),
                newPassword: form.getValues("newPassword"),
            }
            const res=await changePassword(data);
            form.reset();
            if (res.errCode === 0) {
                toast.success(res.errMessage);
            }
            else {
                toast.error(res.errMessage);
            }
        } catch (e) {
            toast.error("Đổi mật khẩu thất bại!");
        }
        
    };
    return (
        <div className="border rounded-md bg-white flex flex-col mx-4">
              <span className="font-bold text-2xl px-6 py-3">
                  Đổi mật khẩu
              </span>

            <div className="border-t"/>

            <div className="px-6 mb-6">
                <div className="flex flex-col-reverse justify-center">
                    <div className="flex flex-col">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-8 mt-2">
                                    <FormField
                                        control={form.control}
                                        name="currentPassword"
                                        render={({field}) => (
                                            <FormItem className="relative">
                                                <FormLabel>Mật khẩu hiện tại</FormLabel>
                                                <FormControl>
                                                    <PasswordInput {...field}/>
                                                </FormControl>
                                                <FormMessage className="absolute left-0 mt-1"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({field}) => (
                                            <FormItem className="relative">
                                                <FormLabel>Mật khẩu mới</FormLabel>
                                                <FormControl>
                                                    <PasswordInput {...field}/>
                                                </FormControl>
                                                <FormMessage className="absolute left-0 mt-1"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem className="relative">
                                                <FormLabel>Xác nhận mật khẩu</FormLabel>
                                                <FormControl>
                                                    <PasswordInput {...field}/>
                                                </FormControl>
                                                <FormMessage className="absolute left-0 mt-1"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-10">
                                    <Button type="submit"
                                            className="bg-DarkGreen hover:bg-DarkGreen_Hover rounded-xl">Đổi mật khẩu</Button>
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
                </div>
            </div>
        </div>
    );
};