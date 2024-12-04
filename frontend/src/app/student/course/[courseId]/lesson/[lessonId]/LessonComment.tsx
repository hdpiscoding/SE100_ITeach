'use client';
import React, {useEffect, useState} from 'react';
import NestedCommentItem from "@/app/student/course/[courseId]/lesson/[lessonId]/NestedCommentItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Send} from 'lucide-react'
import {TooltipContent, Tooltip, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

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

function buildCommentTree(comments: LessonComment[]) {
    const commentMap = new Map();

    // Tạo bản đồ để tra cứu nhanh các comment theo ID
    comments.forEach(comment => {
        comment.children = []; // Khởi tạo mảng children cho mỗi comment
        commentMap.set(comment.id, comment);
    });

    const tree: LessonComment[] = [];

    comments.forEach(comment => {
        if (comment.parentCommentId) {
            // Nếu có parentCommentId, thêm vào mảng children của parent
            const parent = commentMap.get(comment.parentCommentId);
            if (parent) {
                parent.children.push(comment);
            }
        } else {
            // Nếu không có parentCommentId, đây là root
            tree.push(comment);
        }
    });

    return tree;
}

const rawComments: LessonComment[] = [
    {
        id: "c1a2b3d4e5f6g7h8i9j0",
        user: {
            id: "u1a2b3c4d5e6f7g8h9i0",
            email: "lm10@gmail.com",
            avatar: "",
            role: "student"
        },
        lessonId: "l1a2b3c4d5e6f7g8h9i0",
        content: "This is a great lesson!",
        parentCommentId: null
    },
    {
        id: "c2b3d4e5f6g7h8i9j0a1",
        user: {
            id: "u2b3c4d5e6f7g8h9i0a1",
            email: "cr7@gmail.com",
            avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
            role: "student"
        },
        lessonId: "l1a2b3c4d5e6f7g8h9i0",
        content: "I have a question about this topic.",
        parentCommentId: "c1a2b3d4e5f6g7h8i9j0"
    },
    {
        id: "c3c4d5e6f7g8h9i0j1a2",
        user: {
            id: "u3c4d5e6f7g8h9i0j1a2",
            email: "njr10@gmail.com",
            avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
            role: "student"
        },
        lessonId: "l2b3c4d5e6f7g8h9i0a1",
        content: "Can you explain this part further? mlkgvfjgkljsdfjsdlkfjsdlkfjlskjflksdjfkljksdfmm nskjdnfsdhfkjdshfkjhsdkjfhsdkjfhsdkf",
        parentCommentId: null
    },
    {
        id: "c4d5e6f7g8h9i0j1a2b3",
        user: {
            id: "u4d5e6f7g8h9i0j1a2b3",
            email: "r9@gmail.com",
            avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
            role: "teacher"
        },
        lessonId: "l2b3c4d5e6f7g8h9i0a1",
        content: "Sure, here's my understanding...",
        parentCommentId: "c3c4d5e6f7g8h9i0j1a2"
    },
    {
        id: "c5e6f7g8h9i0j1a2b3c4",
        user: {
            id: "u5e6f7g8h9i0j1a2b3c4",
            email: "kdb17@gmail.com",
            avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
            role: "student"
        },
        lessonId: "l3c4d5e6f7g8h9i0a1b2",
        content: "Thanks for the explanation!",
        parentCommentId: "c4d5e6f7g8h9i0j1a2b3"
    },
    {
        id: "c6f7g8h9i0j1a2b3c4d5",
        user: {
            id: "u6f7g8h9i0j1a2b3c4d5",
            email: "m3@gmail.com",
            avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
            role: "student"
        },
        lessonId: "l3c4d5e6f7g8h9i0a1b2",
        content: "I found another resource that might help.",
        parentCommentId: null
    }
];

export default function LessonComment(props: any) {
    const [userComment, setUserComment] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value);
    }

    const [comments, setComments] = useState<LessonComment[]>([]);

    useEffect(() => {
        setComments(buildCommentTree(rawComments));
    }, []);

    const addComment = (newComment: LessonComment) => {
        setComments((prevComments) => {
            // Nếu comment là root, thêm trực tiếp
            if (!newComment.parentCommentId) {
                return [...prevComments, newComment];
            }

            // Tìm comment cha và thêm bình luận con vào
            const addToParent = (comments: LessonComment[]): LessonComment[] => {
                return comments.map((comment: LessonComment) => {
                    if (comment.id === newComment.parentCommentId) {
                        return {
                            ...comment,
                            children: comment.children ? [...comment.children, newComment] : [newComment],
                        };
                    }
                    if (comment.children) {
                        return {
                            ...comment,
                            children: addToParent(comment.children),
                        };
                    }
                    return comment;
                });
            };

            return addToParent(prevComments);
        });
    };

    const handleUploadComment = () => {
        let newComment: LessonComment = {
            id: String(count),
            user: {
                id: props.user?.id,
                email: props.user?.email,
                avatar: props.user?.avatar,
                role: props.user.role
            },
            lessonId: props.lessonId,
            content: userComment,
            parentCommentId: null
        }
        addComment(newComment);
        setUserComment("");
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            setUserComment((prev) => prev + "\n");
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            handleUploadComment();
        }
    }

    const handleUploadReply = (content: string, parentId: string, currentUser: any) => {
        let newComment: LessonComment = {
            id: String(count),
            user: {
                id: currentUser.id,
                email: currentUser.email,
                avatar: currentUser.avatar,
                role: currentUser.role
            },
            lessonId: props.lessonId,
            content: content,
            parentCommentId: parentId
        }
        addComment(newComment);
        setUserComment("");
    }

    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
            <span className="text-xl font-bold lg:mb-6">
                Bình luận
            </span>

            <ScrollArea className="lg:col-start-1 w-full max-h-[500px]">
                <div className="mr-4">
                    {comments.map((comment) => (
                        <NestedCommentItem comment={comment}
                                           currentUser={props.user}
                                           lessonId={props.lessonId}
                                           addComment={addComment}/>
                    ))}
                </div>
            </ScrollArea>

            <div className="lg:col-start-1 flex flex-col gap-6 w-full">
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        {props.user?.avatar ?
                            <div
                                className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px]">
                                <Image
                                    src={props.user?.avatar}
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
                        <Textarea className="rounded-lg resize-none"
                                  placeholder="Viết bình luận..."
                                  value={userComment}
                                  onChange={handleCommentChange}
                                  onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e)}/>

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
                </div>
            </div>
        </div>
    );
};