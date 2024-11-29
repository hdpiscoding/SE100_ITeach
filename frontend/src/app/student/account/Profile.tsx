'use client';
import React, {useEffect} from "react";
import { FaUser } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import Image from "next/image";

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
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("abc@gmail.com");
    const [dob, setDob] = React.useState<Date | undefined>(undefined);
    const [avatar, setAvatar] = React.useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

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

                                      <div
                                          className="flex flex-col gap-4 md:flex-col lg:flex lg:flex-row lg:items-center lg:justify-between">
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
                                                  <FormItem className="flex flex-col space-y-3">
                                                      <FormLabel>Ngày sinh</FormLabel>
                                                      <Popover>
                                                          <PopoverTrigger asChild>
                                                              <FormControl>
                                                                  <Button
                                                                      variant={"outline"}
                                                                      className={cn(
                                                                          "w-[253px] pl-3 mt-3 text-left font-normal",
                                                                          !field.value && "text-muted-foreground"
                                                                      )}
                                                                  >
                                                                      {field.value ? (
                                                                          format(field.value, "dd/MM/yyyy")
                                                                      ) : (
                                                                          <span>DD/MM/YYYY</span>
                                                                      )}
                                                                      <CalendarIcon
                                                                          className="ml-auto h-4 w-4 opacity-50"/>
                                                                  </Button>
                                                              </FormControl>
                                                          </PopoverTrigger>
                                                          <PopoverContent className="w-auto p-0" align="start">
                                                              <Calendar
                                                                  mode="single"
                                                                  selected={dob}
                                                                  onSelect={(date) => {
                                                                      setDob(date);
                                                                      field.onChange(date);
                                                                  }}
                                                                  disabled={(date) =>
                                                                      date > new Date() || date < new Date("1900-01-01")
                                                                  }
                                                                  initialFocus
                                                              />
                                                          </PopoverContent>
                                                      </Popover>
                                                      <FormMessage/>
                                                  </FormItem>
                                              )}
                                          />
                                      </div>
                                  </div>

                                  <div className="mt-10">
                                      <Button type="submit"
                                              className="bg-DarkGreen hover:bg-DarkGreen_Hover rounded-xl">Lưu thay
                                          đổi</Button>
                                  </div>

                              </form>
                          </Form>
                      </div>

                      <div className="lg:col-start-2 lg:mt-0 mt-4 flex items-center justify-center">
                          <div className="flex flex-col gap-6 justify-center items-center">
                              <div className={`bg-DarkGray ${avatar ? "" : "p-12"} rounded-[50%] h-fit w-fit`}>
                                  {avatar
                                      ?
                                      <div className="relative rounded-[50%] overflow-hidden h-[192px] w-[192px]">
                                          <Image
                                              src={URL.createObjectURL(avatar)}
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