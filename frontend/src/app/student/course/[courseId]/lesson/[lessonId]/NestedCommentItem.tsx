'use client';
import React, {useState} from 'react'
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Textarea} from "@/components/ui/textarea";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Send} from "lucide-react";

interface LessonComment {
    id: string;
    user: {
        id: string;
        email: string;
        avatar: string;
        role: string;
    };
    lessonId: string;
    content: string;
    parentCommentId?: string | null;
    children?: LessonComment[];
}

export default function NestedCommentItem({ comment, currentUser }: { comment: LessonComment; currentUser: any }) {
    const [userComment, setUserComment] = useState<string>("");

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value);
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-4">
                <div className="flex flex-col">
                    {comment.user.avatar ?
                        <div
                            className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px]">
                            <Image
                                src={comment.user.avatar}
                                alt="user avatar"
                                className="object-cover"
                                fill
                            />
                        </div>
                        :
                        <div
                            className="bg-DarkGray h-[40px] w-[40px] rounded-[50%] flex items-center justify-center text-center">
                            <FaUser className="text-[22px] text-LightGray"/>
                        </div>}

                    <div className="border-l"/>
                </div>


                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-Lime">
                        {comment.user.email}
                    </span>

                    <p className="text-DarkerGray">
                        {comment.content}
                    </p>
                </div>
            </div>

            <div className="ml-20">
                {comment.children?.map((child) => (
                    <NestedCommentItem comment={child} currentUser={currentUser}/>
                ))}
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col">
                    {currentUser?.avatar ?
                        <div
                            className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px]">
                            <Image
                                src={currentUser?.avatar}
                                alt="user avatar"
                                className="object-cover"
                                fill
                            />
                        </div>
                        :
                        <div
                            className="bg-DarkGray h-[40px] w-[40px] rounded-[50%] flex items-center justify-center text-center">
                            <FaUser className="text-[22px] text-LightGray"/>
                        </div>}

                    <div className="border-l"/>
                </div>


                <div className="flex flex-row gap-3 w-full items-center">
                    <Textarea className="rounded-lg resize-none" placeholder="Viết bình luận..." value={userComment}
                              onChange={handleCommentChange}/>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Send
                                    className={`h-4 w-4 ${userComment ? "cursor-pointer text-DarkGreen hover:text-DarkGreen_Hover active:scale-90 transition-transform duration-150" : "text-DarkGray"}`}/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Đăng tải</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};