/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, {useEffect, useState} from 'react';
import NestedCommentItem from "@/components/Lesson/NestedCommentItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Textarea} from "@/components/ui/textarea";
import {Send} from 'lucide-react'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Pagination, Stack} from "@mui/material";
import {createLessonComment} from "@/services/course";

interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string
}

interface LessonComment {
    id: string;
    userInfo: User;
    userId: string;
    content: string;
    createdAt: string;
    parrentCommentId?: string | null;
    children?: LessonComment[];
}

function buildCommentTree(comments: LessonComment[]) {
    const commentMap = new Map<string, LessonComment>();

    // Tạo bản đồ để tra cứu nhanh các comment theo ID
    comments.forEach(comment => {
        comment.children = []; // Khởi tạo mảng children cho mỗi comment
        commentMap.set(comment.id, comment);
    });

    const tree: LessonComment[] = [];

    comments.forEach(comment => {
        if (comment.parrentCommentId) {
            // Nếu có parentCommentId, thêm vào mảng children của parent
            const parent = commentMap.get(comment.parrentCommentId);
            if (parent) {
                parent.children?.push(comment);
            }
        } else {
            // Nếu không có parentCommentId, đây là root
            tree.push(comment);
        }
    });

    // Trả về cây bình luận (rỗng nếu không có bình luận nào)
    return tree;
}

export default function LessonComment(props: any) {
    const [userComment, setUserComment] = useState<string>("");

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserComment(e.target.value);
    }

    const [comments, setComments] = useState<LessonComment[]>([]);

    useEffect(() => {
        if (props?.rawComments) {
            setComments(buildCommentTree(props.rawComments));
        } else {
            setComments([]);
        }
    }, [props?.rawComments]);

    const addComment = (newComment: LessonComment) => {
        setComments((prevComments) => {
            // Nếu danh sách hiện tại rỗng, thêm bình luận mới (dù là root hay child)
            if (prevComments.length === 0) {
                return [newComment];
            }

            // Hàm đệ quy để thêm comment vào đúng vị trí
            const addToParent = (comments: LessonComment[]): LessonComment[] => {
                let foundParent = false; // Đánh dấu nếu tìm thấy parent

                // Nếu không tìm thấy parent ở cấp độ hiện tại, trả về mảng gốc
                return comments.map((comment: LessonComment) => {
                    if (comment.id === newComment.parrentCommentId) {
                        foundParent = true; // Đã tìm thấy parent
                        return {
                            ...comment,
                            children: [...(comment.children || []), newComment],
                        };
                    }
                    // Nếu comment có children, tiếp tục tìm trong children của comment này
                    if (comment.children) {
                        return {
                            ...comment,
                            children: addToParent(comment.children),
                        };
                    }
                    return comment;
                });
            };

            const updatedTree = addToParent(prevComments);

            // Nếu bình luận mới không có parent (root) hoặc không tìm thấy parent trong cây, thêm nó vào gốc
            if (!newComment.parrentCommentId || !updatedTree.some(c => c.id === newComment.parrentCommentId)) {
                return [...updatedTree, newComment];
            }

            return updatedTree;
        });
    };

    // set up pagination
    const [page, setPage] = React.useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(3);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(comments.length / itemsPerPage));
    const [currentComments, setCurrentComments] = useState<LessonComment[]>([]);

    useEffect(() => {
        setTotalPages(Math.ceil(comments.length / itemsPerPage));
    }, [comments, itemsPerPage]);

    useEffect(() => {
        const indexOfLastItem = page * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentComments(comments.slice(indexOfFirstItem, indexOfLastItem));
    }, [page, comments, itemsPerPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

// end of set up pagination



    const handleUploadComment = async () => {
        try {
            const newComment = await createLessonComment(props.lessonId, props.user.id, userComment, null);
            addComment(newComment);
            console.log(newComment);
            setUserComment("");
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            setUserComment((prev) => prev + "\n");
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            await handleUploadComment();
        }
    }

    return (
        <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
            <span className="text-xl font-bold lg:mb-6">
                Bình luận
            </span>

            {(props.rawComments?.length === 0 && comments.length === 0)
                ?
                <div className="lg:col-start-1 w-full text-center my-4">Hiện tại chưa có bình luận nào 🤐</div>
                :
                <div className="lg:col-start-1 flex flex-col gap-4">
                    <ScrollArea className="w-full max-h-[500px]">
                        <div className="mr-4">
                            {currentComments?.map((comment, index) => (
                                <NestedCommentItem key={index}
                                                   comment={comment}
                                                   currentUser={props.user}
                                                   lessonId={props.lessonId}
                                                   addComment={addComment}/>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="flex items-center justify-center my-4">
                        <Stack>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                variant="text"
                                shape="rounded"
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        color: "#AAAAAA",            // Màu văn bản mặc định
                                    },
                                    '& .MuiPaginationItem-root:hover': {
                                        // Màu khi hover
                                        backgroundColor: '#3DCBB1', // Màu nền khi hover
                                        color: 'white', // Màu chữ khi hover
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: "#3DCBB1 !important", // Màu nền cho item được chọn
                                        color: "white",              // Màu chữ cho item được chọn
                                    },
                                    "& .MuiPaginationItem-ellipsis": {
                                        color: "#AAAAAA"              // Màu sắc cho dấu ba chấm (ellipsis)
                                    }
                                }}/>
                        </Stack>
                    </div>
                </div>
            }


            {props.user?.role !== "R3"
                &&
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
                                        <Send
                                            className={`h-4 w-4 ${userComment ? "cursor-pointer text-DarkGreen hover:text-DarkGreen_Hover active:scale-90 transition-transform duration-150" : "text-DarkGray"}`}
                                            onClick={handleUploadComment}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Đăng tải</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>}
        </div>
    );
};