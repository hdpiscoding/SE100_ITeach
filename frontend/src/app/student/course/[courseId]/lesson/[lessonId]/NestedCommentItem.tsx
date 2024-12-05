'use client';
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Textarea} from "@/components/ui/textarea";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Send, MessageCircle, CirclePlus, CircleMinus, Crown} from "lucide-react";
import { motion, AnimatePresence  } from 'framer-motion';


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

export default function NestedCommentItem({comment, lessonId, currentUser, addComment}: {
    comment: LessonComment;
    lessonId: string;
    currentUser: any;
    addComment: (newComment: LessonComment) => void;
}) {
    const [userComment, setUserComment] = useState<string>("");
    const [showReply, setShowReply] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [commentId, setCommentId] = useState<string | null>(null);

    useEffect(() => {
        const randomId = Math.random().toString(36).substring(7);
        setCommentId(randomId); // Chỉ set sau khi client render
    }, []);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value);
    }

    const handleUploadComment = () => {
        let newComment: LessonComment = {
            id: String(commentId),
            user: {
                id: currentUser.id,
                email: currentUser.email,
                avatar: currentUser.avatar,
                role: currentUser.role
            },
            lessonId: lessonId,
            content: userComment,
            parentCommentId: comment.id
        }
        addComment(newComment);
        console.log(newComment);
        setUserComment("");
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (userComment) {
            if (e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                setUserComment((prev) => prev + "\n");
            }
            else if (e.key === "Enter") {
                e.preventDefault();
                handleUploadComment();
            }
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full mb-2">
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
                </div>


                <div className="flex flex-col gap-1">
                    <span className={`font-semibold flex items-center ${comment.user.role === "teacher" ? "text-orange" : "text-Lime"}`}>
                        {comment.user.email}
                        &nbsp;&nbsp;&nbsp;
                        {comment.user.role === "teacher"
                            &&
                            <div className="py-1 px-2 bg-orange rounded-xl">
                                <Crown className="h-4 w-4 text-white"/>
                            </div>}
                    </span>

                    <p className="text-DarkerGray whitespace-pre-line">
                        {comment.content}
                    </p>

                    <div className="flex items-center gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="flex items-center gap-1 cursor-pointer p-2 rounded-3xl w-fit hover:bg-LighterGray group"
                                        onClick={() => setShowReply(!showReply)}>
                                        <MessageCircle className="h-4 w-4 text-DarkGray group-hover:text-DarkGreen"/>

                                        <span className="text-[0.8rem] text-DarkerGray group-hover:text-DarkGreen">
                                            Phản hồi
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Phản hồi</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {(comment?.children !== undefined && comment.children?.length > 0)
                            &&
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            className="flex items-center gap-1 cursor-pointer p-2 rounded-3xl w-fit hover:bg-LighterGray group"
                                            onClick={() => setShowMore(!showMore)}>
                                            {showMore
                                                ?
                                                <CircleMinus className="h-4 w-4 text-DarkGray group-hover:text-orange"/>
                                                :
                                                <CirclePlus className="h-4 w-4 text-DarkGray group-hover:text-DarkGreen"/>}

                                            <span className={`text-[0.8rem] text-DarkerGray ${showMore ? "group-hover:text-orange" : "group-hover:text-DarkGreen"}`}>
                                                {showMore ? "Thu gọn" : "Xem thêm"}
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{showMore ? "Thu gọn" : "Xem thêm"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showMore && (
                    <motion.div
                        className="ml-20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {comment.children?.map((child) => (
                            <NestedCommentItem comment={child} lessonId={lessonId} currentUser={currentUser} addComment={addComment}/>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {showReply
                    &&
                    <motion.div className="flex gap-4 mb-4"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}>
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
                        </div>


                        <div className="flex flex-row gap-3 w-full items-center">
                            <Textarea className="rounded-lg resize-none"
                                      placeholder="Viết bình luận..."
                                      value={userComment}
                                      onChange={handleCommentChange}
                                      onKeyDown={(e: React.KeyboardEvent) => {handleKeyDown(e)}}/>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Send className={`h-4 w-4 ${userComment ? "cursor-pointer text-DarkGreen hover:text-DarkGreen_Hover active:scale-90 transition-transform duration-150" : "text-DarkGray"}`}
                                              onClick={handleUploadComment}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Đăng tải</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
};