'use client';
import React, {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasswordInput} from "@/components/ui/input-password";

const formSchema = z
    .object({
        currentPassword: z.string().min(1, "Mật khẩu hiện tại không được để trống!"),
        newPassword: z
            .string()
            .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự!")
            .regex(
                /^(?=.*[a-zA-Z])(?=.*\d)/,
                "Mật khẩu mới phải bao gồm cả chữ và số!"
            ),
        confirmPassword: z.string().min(1, "Mật khẩu xác nhận không được để trống!"),
    })
    .refine(
        (data) => data.currentPassword === "password123", // Kiểm tra mật khẩu hiện tại
        {
            path: ["currentPassword"],
            message: "Mật khẩu hiện tại không chính xác!",
        }
    )
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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

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
                    </div>
                </div>
            </div>
        </div>
    );
};