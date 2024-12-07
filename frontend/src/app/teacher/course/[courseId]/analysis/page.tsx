'use client';
import React from 'react';
import {ArrowLeft, Star, Users} from "lucide-react";
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Button} from "@/components/ui/button";

interface Course {
    id: number;
    name: string;
    studentCount: number;
    averageRating: number;
    studyTime: number;
    chapterCount: number;
    lessonCount: number;
}

interface User {
    id: string,
    email: string,
    avatar: string,
    role: string
}

const user: User = {
    id: "u1a2b3c4d5e6f7g8h9i0",
    email: "hdp@gmail.com",
    avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
    role: "teacher"
}

const course: Course = {
    id: 1,
    name: "Khóa học JavaScript cơ bản cho người mới bắt đầu",
    studentCount: 100,
    averageRating: 4.5,
    studyTime: 930,
    chapterCount: 8,
    lessonCount: 26
}

const convertMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
        return `${remainingMinutes}m`;
    }
    else if (remainingMinutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}m`;
}

export default function AnalysisPage() {
    return (
        <div className="grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
            <div className="col-start-2 flex flex-col">
                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="h-7 w-7 cursor-pointer text-DarkGreen" onClick={() => {
                                // router.push(`/teacher/course/${course.id}`)
                            }}/>
                            <span className="font-bold text-DarkGreen text-3xl">
                                {course.name}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {user.avatar ?
                                    <div
                                        className="relative rounded-[50%] overflow-hidden h-[60px] w-[60px]">
                                        <Image
                                            src={user.avatar}
                                            alt="user avatar"
                                            className="object-cover"
                                            fill
                                        />
                                    </div>
                                    :
                                    <div
                                        className="bg-DarkGray h-[60px] w-[60px] rounded-[50%] flex items-center justify-center">
                                        <FaUser className="text-3xl text-LightGray"/>
                                    </div>}

                                <span className="text-Lime font-semibold">
                                    {user.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mr-4">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-orange"/>

                                    <span className="font-semibold">
                                        {course.studentCount}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-orange"/>

                                    <span className="font-semibold">
                                        {course.averageRating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-start-3 bg-LighterGray rounded-2xl p-4 flex flex-col gap-6">
                        <span className="text-xl font-semibold">
                            Tổng quan
                        </span>

                        <div className="grid grid-cols-1 gap-3">
                            <span>
                                Số chương:
                                <span className="font-semibold text-DarkGreen">
                                    &nbsp; {course.chapterCount}
                                </span>
                            </span>

                            <span>
                                Số bài học:
                                <span className="font-semibold text-DarkGreen">
                                    &nbsp; {course.lessonCount}
                                </span>
                            </span>

                            <span>
                                Thời lượng học:
                                <span className="font-semibold text-DarkGreen">
                                    &nbsp; {convertMinutes(course.studyTime)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
