/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedLocalSymbols

'use client';
import React, {useState, useRef, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/ui/button";
import { ArrowLeft, Clock, Folders, FileText, Star } from "lucide-react"
import Rating from "@mui/material/Rating";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ChapterListItem from "@/components/Course/ChapterListItem";
import LessonListItem from "@/components/Course/LessonListItem";
import {Progress} from "@/components/ui/progress";
import RatingListItem from "@/components/Course/RatingListItem";
import {Pagination, Stack} from "@mui/material";
import {FaUser} from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea"
import {useParams, useRouter} from "next/navigation";
import Markdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton"
import {getCourses} from "@/services/course";


interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
}

interface Chapter {
    id: number;
    chapterName: string;
    courseId: string;
    lessons: {
        id: string;
        name: string;
        studyTime: number;
    }[];
}

interface User {
    id: number;
    firstname: string | null;
    lastname: string | null;
    email: string;
    avatar: string | null;
}

interface Review {
    star: number;
    content: string;
    user: User;
}

const isUserInReviews = (userId: number, reviews: Review[]): boolean => {
    return reviews.some((review) => review.user.id === userId);
}

const convertMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
        return `${remainingMinutes} phút`;
    }
    else if (remainingMinutes === 0) {
        return `${hours} giờ`;
    }
    return `${hours} giờ ${remainingMinutes} phút`;
}

export default function CourseDetail(props: any) {
    const {courseId} = useParams();
    const userId = 1;
    const router = useRouter();

    // Refs for scrolling
    const introRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);
    const certificateRef = useRef<HTMLDivElement>(null);
    const [tab, setTab] = useState<number|undefined>(undefined);


    const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    useEffect(() => {
        switch (tab) {
            case 0:
                handleScrollTo(introRef);
                break;
            case 1:
                handleScrollTo(contentRef);
                break;
            case 2:
                handleScrollTo(reviewRef);
                break;
            case 3:
                handleScrollTo(certificateRef);
                break;
        }
    }, [tab]);

    const [isBuy, setIsBuy] = useState<boolean>(true);
    const [isFinish, setIsFinish] = useState<boolean>(false);

    // State for rating
    const [user, setUser] = useState<User>({
        id: 1,
        firstname: "Huy",
        lastname: "Nguyễn",
        email: "nghuy@gmail.com",
        avatar: ""
    });
    const [averageRating, setAverageRating] = useState<number>();
    const [rating, setRating] = useState<number | null>(5);
    const [comment, setComment] = useState<string>("");
    const [ratingCount, setRatingCount] = useState<number>();
    const [ratingValueList, setRatingValueList] = useState<number[]>();
    const [isReviewed, setIsReviewed] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Array<Review>>();

    // set up pagination
    const [page, setPage] = React.useState<number>(1);

    const [itemsPerPage, setItemsPerPage] = useState<number>(3);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(reviews?.length / itemsPerPage));
    const [currentReviews, setCurrentReviews] = useState<Review[] | undefined>();
    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }
    // end of set up pagination

    // State for course information
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [image, setImage] = useState<string | null>();
    const [totalTime, setTotalTime] = useState<number>();
    const [totalChapter, setTotalChapter] = useState<number>();
    const [totalLecture, setTotalLecture] = useState<number>();
    const [discount, setDiscount] = useState<number>();
    const [students, setStudents] = useState<number>();
    const [teacher, setTeacher] = useState<Teacher>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [chapters, setChapters] = useState<Array<Chapter>>(
    //     [
    //         {
    //             id: 1,
    //             name: "Giới thiệu về JavaScript",
    //             duration: 90,
    //             lessons: [
    //                 {
    //                     id: "a",
    //                     name: "JavaScript là gì?",
    //                     duration: 30,
    //                     video: "https://youtu.be/0SJE9dYdpps"
    //                 },
    //                 {
    //                     id: "b",
    //                     name: "JavaScript hoạt động như thế nào trong trình duyệt?",
    //                     duration: 30,
    //                     video: "https://youtu.be/W0vEUmyvthQ"
    //                 },
    //                 {
    //                     id: "c",
    //                     name: "Cài đặt môi trường phát triển",
    //                     duration: 30,
    //                     video: "https://youtu.be/efI98nT8Ffo"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "Cú pháp và các khái niệm cơ bản",
    //             duration: 120,
    //             lessons: [
    //                 {
    //                     id: "d",
    //                     name: "Biến và kiểu dữ liệu",
    //                     duration: 40,
    //                     video: "https://youtu.be/CLbx37dqYEI"
    //                 },
    //                 {
    //                     id: "e",
    //                     name: "Các toán tử trong JavaScript",
    //                     duration: 40,
    //                     video: "https://youtu.be/SZb-N7TfPlw"
    //                 },
    //                 {
    //                     id: "f",
    //                     name: "Câu lệnh điều kiện và vòng lặp",
    //                     duration: 40,
    //                     video: "https://youtu.be/9MpHrdWBdxg"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 3,
    //             name: "Hàm và cách sử dụng",
    //             duration: 90,
    //             lessons: [
    //                 {
    //                     id: "g",
    //                     name: "Định nghĩa và gọi hàm",
    //                     duration: 30,
    //                     video: "https://youtu.be/4g9ENVc2KLA"
    //                 },
    //                 {
    //                     id: "h",
    //                     name: "Tham số và giá trị trả về",
    //                     duration: 30,
    //                     video: "https://youtu.be/jE6UPl17Nvo"
    //                 },
    //                 {
    //                     id: "i",
    //                     name: "Biến cục bộ và toàn cục",
    //                     duration: 30,
    //                     video: "https://youtu.be/orIXdOPFWeM"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 4,
    //             name: "Mảng và đối tượng",
    //             duration: 120,
    //             lessons: [
    //                 {
    //                     id: "j",
    //                     name: "Mảng và cách sử dụng",
    //                     duration: 40,
    //                     video: "https://youtu.be/YzO65uOJNMg"
    //                 },
    //                 {
    //                     id: "k",
    //                     name: "Đối tượng và thuộc tính",
    //                     duration: 40,
    //                     video: "https://youtu.be/orIXdOPFWeM"
    //                 },
    //                 {
    //                     id: "l",
    //                     name: "Thao tác với mảng và đối tượng",
    //                     duration: 40,
    //                     video: "https://youtu.be/KrYacXScNQk"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 5,
    //             name: "DOM và thao tác trên giao diện",
    //             duration: 150,
    //             lessons: [
    //                 {
    //                     id: "m",
    //                     name: "DOM là gì?",
    //                     duration: 30,
    //                     video: "https://youtu.be/TsTr-tKCREc"
    //                 },
    //                 {
    //                     id: "n",
    //                     name: "Truy xuất và thao tác DOM",
    //                     duration: 40,
    //                     video: "https://youtu.be/gETNXKi3l_U"
    //                 },
    //                 {
    //                     id: "o",
    //                     name: "Sự kiện và xử lý sự kiện",
    //                     duration: 40,
    //                     video: "https://youtu.be/AA3WWZAMv_0"
    //                 },
    //                 {
    //                     id: "p",
    //                     name: "Tạo và xóa phần tử DOM",
    //                     duration: 40,
    //                     video: "https://youtu.be/SXW4QSjk4Js"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 6,
    //             name: "Làm việc với JSON và API",
    //             duration: 120,
    //             lessons: [
    //                 {
    //                     id: "q",
    //                     name: "JSON là gì?",
    //                     duration: 30,
    //                     video: "https://youtu.be/Uph14HYkgEQ"
    //                 },
    //                 {
    //                     id: "r",
    //                     name: "Xử lý dữ liệu JSON",
    //                     duration: 40,
    //                     video: "https://youtu.be/Uph14HYkgEQ"
    //                 },
    //                 {
    //                     id: "s",
    //                     name: "Gửi và nhận dữ liệu từ API",
    //                     duration: 50,
    //                     video: "https://youtu.be/Uph14HYkgEQ"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 7,
    //             name: "Xử lý lỗi và debug",
    //             duration: 90,
    //             lessons: [
    //                 {
    //                     id: "t",
    //                     name: "Các loại lỗi trong JavaScript",
    //                     duration: 30,
    //                     video: "https://youtu.be/Uph14HYkgEQ"
    //                 },
    //                 {
    //                     id: "u",
    //                     name: "Sử dụng console và debugger",
    //                     duration: 30,
    //                     video: "https://youtu.be/Uph14HYkgEQ"
    //                 },
    //                 {
    //                     id: "v",
    //                     name: "Try-catch và xử lý ngoại lệ",
    //                     duration: 30,
    //                     video: "https://youtu.be/Uph14HYkgEQ"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 8,
    //             name: "ES6+ và các tính năng nâng cao",
    //             duration: 150,
    //             lessons: [
    //                 {
    //                     id: "w",
    //                     name: "Let, Const và Arrow Function",
    //                     duration: 30,
    //                     video: "https://youtu.be/tCPTBPua1Xo"
    //                 },
    //                 {
    //                     id: "x",
    //                     name: "Template Literals và Destructuring",
    //                     duration: 40,
    //                     video: "https://youtu.be/7Ls-fa8iVXA"
    //                 },
    //                 {
    //                     id: "y",
    //                     name: "Modules và Import/Export",
    //                     duration: 40,
    //                     video: "https://youtu.be/08lWi4T2Bfg"
    //                 },
    //                 {
    //                     id: "z",
    //                     name: "Promises và Async/Await",
    //                     duration: 40,
    //                     video: "https://youtu.be/XN2mt1i1kjk"
    //                 }
    //             ]
    //         }
    //     ]);
    const [chapters, setChapters] = useState<Array<Chapter>>();

    const [intro, setIntro] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCourses(String(courseId), String(userId));
            setName(data.course.courseName);
            setDescription(data.course.intro);
            setIntro(data.course.gioiThieu);
            setPrice(data.course.cost);
            setImage(data.course.anhBia);
            setTotalTime(data.course.finishTime);
            setTotalChapter(data.chapters?.length);
            setTotalLecture(data.course.totalLesson);
            setDiscount(data.course.discount);
            setStudents(data.course.totalStudent);
            setTeacher(data.course.teacher);
            setChapters(data.chapters);
            setAverageRating(data.course.totalStars);
            setRatingCount(data.reviews?.length);
            if (data.reviews?.length > 0) {
                setRatingValueList(data.reviews.reduce((counts: number[], review: Review) => {
                    const index = 5 - review.star; // Tính index tương ứng (5 sao = index 0)
                    counts[index] += 1;
                    return counts;
                }, [0, 0, 0, 0, 0]))
            }
            setReviews(data.reviews);
            setIsReviewed(isUserInReviews(userId, data.reviews));
        }

        fetchData();
    }, []);

    useEffect(() => {
        setItemsPerPage(3);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setTotalPages(Math.ceil(reviews?.length / itemsPerPage));
        const indexOfLastItem = page * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentReviews(reviews?.slice(indexOfFirstItem, indexOfLastItem));
    }, [reviews, page]);

    return (
        <div>
            <div className="bg-bg grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
                <Button
                    className="col-start-2 bg-bg border border-orange text-orange rounded-xl w-fit hover:bg-orange hover:text-white mb-4">
                    <div className="flex items-center gap-2">
                        <ArrowLeft height={18} width={18} onClick={() => {router.back();}}/>

                        <span className="font-semibold">
                                Trở lại
                            </span>
                    </div>
                </Button>

                <div className="col-start-2 grid lg:grid-cols-[68%_1%_31%] grid-cols-1">
                    <div className="col-start-1 order-2 lg:order-none flex flex-col gap-5">
                        <div>
                            {name
                                ?
                                <span className="font-bold text-DarkGreen text-2xl">
                                    {name}
                                </span>
                                :
                                <Skeleton className="bg-MediumGray h-[32px] w-3/4"/>
                            }

                        </div>

                        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between mr-6">
                            <div className="flex items-center gap-4">
                                {teacher?.avatar ?
                                    <div
                                        className="relative rounded-[50%] overflow-hidden h-[60px] w-[60px]">
                                        <Image
                                            src={teacher?.avatar}
                                            alt="user avatar"
                                            className="object-cover"
                                            fill
                                        />
                                    </div>
                                    :
                                    <div className="bg-DarkGray h-[60px] w-[60px] rounded-[50%] flex items-center justify-center">
                                        <FaUser className="text-3xl text-LightGray"/>
                                    </div>}
                                <div className="flex flex-col gap-1">
                                    {teacher
                                        ?
                                        (teacher?.firstName && teacher?.lastName
                                            &&
                                            <span className="font-semibold">
                                                {teacher?.firstName + " " + teacher?.lastName}
                                            </span>)
                                        :
                                        <Skeleton className="bg-MediumGray w-[200px] h-[24px]"/>
                                    }

                                    {teacher
                                        ?
                                        <span className="text-Lime font-semibold text-sm">
                                            {teacher?.email}
                                        </span>
                                        :
                                        <Skeleton className="bg-MediumGray w-[200px] h-[20px]"/>
                                    }

                                </div>
                            </div>

                            {students
                                ?
                                <div className="bg-white rounded-3xl py-2 px-4 w-fit">
                                    <span className="font-semibold text-DarkGreen">
                                        {students} học viên
                                    </span>
                                </div>
                                :
                                <Skeleton className="bg-MediumGray rounded-3xl w-[100px] h-[40px]"/>
                            }

                        </div>

                        <div className="mr-6">
                            {description
                                ?
                                <p className="whitespace-pre-line">
                                    {description}
                                </p>
                                :
                                <Skeleton className="bg-MediumGray h-[24px] w-3/4"/>
                            }

                        </div>

                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8 w-fit">
                            {totalTime
                                ?
                                <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                    <Clock className="h-5 w-5 text-DarkGreen"/>
                                    <span className="text-DarkGreen font-semibold">
                                        {convertMinutes(totalTime ?? 0)}
                                    </span>
                                </div>
                                :
                                <Skeleton className="bg-MediumGray h-[32px] w-[100px]"/>
                            }

                            {totalChapter
                                ?
                                <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                    <Folders className="h-5 w-5 text-DarkGreen"/>
                                    <span className="text-DarkGreen font-semibold">
                                        {String(totalChapter)} chương
                                    </span>
                                </div>
                                :
                                <Skeleton className="bg-MediumGray h-[32px] w-[100px]"/>
                            }

                            {totalLecture
                                ?
                                <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                    <FileText className="h-5 w-5 text-DarkGreen"/>
                                    <span className="text-DarkGreen font-semibold">
                                        {String(totalLecture)} bài giảng
                                    </span>
                                </div>
                                :
                                <Skeleton className="bg-MediumGray h-[32px] w-[100px]"/>
                            }

                            {ratingCount
                                ?
                                <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                    <Star className="h-5 w-5 text-DarkGreen"/>
                                    <span className="text-DarkGreen font-semibold">
                                        {String((averageRating ?? 0).toFixed(1))} ({String(ratingCount)} đánh giá)
                                    </span>
                                </div>
                                :
                                <Skeleton className="bg-MediumGray h-[32px] w-[100px]"/>
                            }
                        </div>

                        {(price && discount)
                            ?
                            <div className="flex flex-col-reverse lg:flex-row lg:items-center mt-5">
                                <span className="text-orange font-bold text-4xl">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(Number(((price ?? 0) * (1 - (discount ?? 0))).toFixed(0)))}
                                </span>

                                <div className="flex items-center gap-2">
                                    &nbsp;&nbsp;&nbsp;
                                    <span className="text-DarkGray line-through font-semibold text-xl">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(price ?? 0)}
                                    </span>

                                    <span className="text-sm bg-orange text-white px-2 py-1 rounded-lg mb-6">
                                        -{String((discount ?? 0) * 100)}%
                                    </span>
                                </div>
                            </div>
                            :
                            <Skeleton className="bg-MediumGray h-[52px] w-[300px]"/>
                        }

                        <div>
                            {props.role === "student" && (!isBuy
                                ?
                                <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl">
                                    <span className="font-semibold">
                                        Thêm vào giỏ hàng
                                    </span>
                                </Button>
                                :
                                <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl"
                                        onClick={() => setTab(1)}>
                                    <span className="font-semibold">
                                        Học ngay
                                    </span>
                                </Button>)}

                            {props.role === "teacher" &&
                                <div className="flex items-center gap-4">
                                    <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl">
                                        <span className="font-semibold">
                                            Chỉnh sửa
                                        </span>
                                    </Button>

                                    <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl"
                                            onClick={() => router.push(`/teacher/course/${courseId}/analysis`)}>
                                        <span className="font-semibold">
                                            Xem phân tích
                                        </span>
                                    </Button>
                                </div>}

                            {props.role === "admin" &&
                                <div className="flex items-center gap-4">
                                    <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl">
                                        <span className="font-semibold">
                                            Xóa
                                        </span>
                                    </Button>

                                    <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl">
                                        <span className="font-semibold">
                                            Tạm ngưng
                                        </span>
                                    </Button>

                                    <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl"
                                            onClick={() => router.push(`/admin/course/${courseId}/analysis`)}>
                                        <span className="font-semibold">
                                            Xem phân tích
                                        </span>
                                    </Button>
                                </div>}
                        </div>
                    </div>

                    <div
                        className="lg:col-start-3 order-1 lg:order-none flex flex-col items-center justify-center mb-2 lg:mb-0">
                        {image
                            ?
                            <div className="relative rounded-lg overflow-hidden h-[260px] w-full">
                                <Image
                                    src={String(image)}
                                    alt="course_image"
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            :
                            <Skeleton className="rounded-lg h-[260px] w-full bg-MediumGray"/>
                        }
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[0.5fr_11fr_0.5fr] my-4">
            <div className="col-start-2 grid lg:grid-cols-[68%_2%_30%] grid-cols-1 gap-10 bg-white">
                    <ul className="flex items-center gap-8 sticky z-10 top-0 bg-white p-4">
                        {["Giới thiệu", "Nội dung", "Đánh giá", "Chứng chỉ"].map((label, index) => (
                            <li key={index} className="relative">
                                <span
                                    className={`cursor-pointer ${(index === 0 && tab === undefined) ? "text-orange" : ""} font-semibold font-lg ${
                                        tab === index ? "text-orange" : "text-black"
                                    } transition-colors duration-300 ease-in-out`}
                                    onClick={() => {
                                        setTab(index);
                                    }}
                                >
                                  {label}
                                </span>

                                <div
                                    className={`absolute ${(index === 0 && tab === undefined) ? "opacity-100 scale-x-100" : ""} left-0 top-full mt-1 w-full h-[2px] bg-orange rounded transition-all duration-300 ${
                                        tab === index ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                                    }`}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="col-start-1 flex flex-col gap-6">
                        <section ref={introRef} className="flex flex-col gap-5">
                            <span className="font-bold text-DarkGreen text-2xl">
                                GIỚI THIỆU
                            </span>

                            {intro
                                ?
                                // eslint-disable-next-line react/no-children-prop
                                <Markdown children={intro}
                                          className="space-y-4"
                                          components={{
                                               blockquote: ({node, ...props}) => (
                                                   <blockquote className="border-l-[3px] border-blue-500 pl-4 italic bg-LightGray p-2" {...props} />
                                               ),
                                               ul: ({node, ...props}) => (
                                                   <ul className="list-disc pl-6" {...props} />
                                               ),
                                               ol: ({node, ...props}) => (
                                                   <ol className="list-decimal pl-6" {...props} />
                                               ),
                                               h1: ({ children }) => (
                                                   <h1 className="text-4xl font-bold my-4">{children}</h1>
                                               ),
                                               h2: ({ children }) => (
                                                   <h2 className="text-3xl font-semibold my-3">{children}</h2>
                                               ),
                                               h3: ({ children }) => (
                                                   <h3 className="text-2xl font-medium my-2">{children}</h3>
                                               ),
                                               h4: ({ children }) => (
                                                   <h4 className="text-xl font-light text-red-400 my-1">{children}</h4>
                                               ),
                                          }}/> :
                                <div className="flex flex-col gap-4">
                                    <Skeleton className="bg-gray h-[24px] w-full"/>
                                    <Skeleton className="bg-gray h-[24px] w-full"/>
                                    <Skeleton className="bg-gray h-[24px] w-full"/>
                                    <Skeleton className="bg-gray h-[24px] w-full"/>
                                    <Skeleton className="bg-gray h-[24px] w-full"/>
                                </div>
                            }

                        </section>

                        <section ref={contentRef} className="flex flex-col gap-5">
                            <span className="font-bold text-DarkGreen text-2xl">
                                NỘI DUNG KHÓA HỌC
                            </span>

                            <div>
                                {/*<Accordion type="multiple" className="w-full bg-LighterGray px-4 py-1 rounded-2xl">*/}
                                {/*    {chapters?.map((chapter, index) => (*/}
                                {/*        <AccordionItem value={String(index)} key={String(index)}>*/}
                                {/*            <AccordionTrigger>*/}
                                {/*                <ChapterListItem type="course" index={index + 1}*/}
                                {/*                                 name={chapter.chapterName}*/}
                                {/*                                 duration={0}*/}
                                {/*                                //  duration={chapter.lessons?.reduce((acc, lesson) => {*/}
                                {/*                                //     const duration = lesson.studyTime || 0;*/}
                                {/*                                //     return acc + duration;*/}
                                {/*                                // }, 0)}*/}
                                {/*                                 videos={chapter.lessons.length}/>*/}
                                {/*            </AccordionTrigger>*/}

                                {/*            {chapter.lessons?.map((lesson, index) => (*/}
                                {/*                <AccordionContent key={String(lesson.id)} id={String(lesson.id)} onClick={() => {router.push(`/${props.role}/course/${courseId}/lesson/${lesson.id}`)}}>*/}
                                {/*                    <LessonListItem type="course" index={index + 1} name={lesson.name} duration={lesson.studyTime}/>*/}
                                {/*                </AccordionContent>*/}
                                {/*            ))}*/}
                                {/*        </AccordionItem>*/}
                                {/*    ))}*/}
                                {/*</Accordion>*/}
                            </div>
                        </section>

                        <section ref={reviewRef} className="flex flex-col gap-5">
                            <span className="font-bold text-DarkGreen text-2xl">
                                ĐÁNH GIÁ
                            </span>

                            {(averageRating != null && ratingCount != null && ratingValueList != null)
                                ?
                                <div className="w-full bg-LighterGray p-4 rounded-2xl grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-[34%_1%_65%]">
                                    <div className="flex flex-col gap-2 lg:col-start-1 justify-center items-center">
                                        <span className="text-Yellow font-semibold text-3xl">
                                            {String((averageRating ?? 0).toFixed(1))}/5.0
                                        </span>

                                        <Rating
                                            name="rating"
                                            value={averageRating}
                                            precision={0.1}
                                            readOnly
                                            size={"large"}
                                            sx={{
                                                '& .MuiRating-iconFilled': {
                                                    color: '#FFD700',
                                                }, '& .MuiRating-iconHover': {
                                                    color: '#FFD700',
                                                }
                                            }}
                                        />

                                        <span className="text-DarkGray">
                                            ({String(ratingCount)} đánh giá)
                                        </span>
                                    </div>

                                    <div className="lg:col-start-3 grid grid-cols-1 gap-4">
                                        {ratingValueList?.map((rating, index) => (
                                            <div key={index} className="grid grid-cols-[15%_75%_10%] items-center gap-2">
                                                <span>
                                                    {5 - index} sao ({rating})
                                                </span>

                                                <Progress value={Number((rating / (ratingCount ?? 0) * 100).toFixed(0))}
                                                          indicatorColor="bg-Yellow"/>

                                                <span className="font-semibold">
                                                    {(rating / (ratingCount ?? 0) * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <Skeleton className="bg-gray rounded-2xl h-[216px] w-full"/>
                            }

                            {reviews != null
                                ?
                                (reviews.length === 0
                                    ?
                                    <div className="text-center">Hiện tại chưa có đánh giá nào 😞</div>
                                    :
                                    <div key={page} className="fade-in">
                                        {currentReviews?.map((review, index) => (
                                            <RatingListItem
                                                key={index}
                                                avatar={review.user.avatar}
                                                name={review.user.email}
                                                rating={review.star}
                                                comment={review.content}/>
                                        ))}
                                    </div>
                                )
                                :
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-1">
                                        <Skeleton className="bg-gray rounded-[50%] h-[40px] w-[40px]"/>
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="bg-gray h-[20px] w-[200px]"/>
                                            <Skeleton className="bg-gray h-[20px] w-[100px]"/>
                                        </div>
                                    </div>

                                    <div className="flex gap-1">
                                        <Skeleton className="bg-gray rounded-[50%] h-[40px] w-[40px]"/>
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="bg-gray h-[20px] w-[200px]"/>
                                            <Skeleton className="bg-gray h-[20px] w-[100px]"/>
                                        </div>
                                    </div>

                                    <div className="flex gap-1">
                                        <Skeleton className="bg-gray rounded-[50%] h-[40px] w-[40px]"/>
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="bg-gray h-[20px] w-[200px]"/>
                                            <Skeleton className="bg-gray h-[20px] w-[100px]"/>
                                        </div>
                                    </div>
                                </div>
                            }

                            {(isBuy && props.role === "student" && !isReviewed && reviews != null)
                                &&
                                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`bg-DarkGray ${user.avatar ? "" : "p-[10px]"} rounded-[50%] h-fit w-fit`}>
                                        {user.avatar ?
                                                <div
                                                    className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px] flex items-center">
                                                    <Image
                                                        src={user.avatar}
                                                        alt="user avatar"
                                                        className="object-cover"
                                                        fill
                                                    />
                                                </div>
                                                :
                                                <FaUser className="text-xl text-LightGray"/>}
                                        </div>

                                        <div className="flex flex-col justify-center">
                                        <span className="font-semibold">
                                            {user.firstname + " " + user.lastname}
                                        </span>

                                            <Rating
                                                value={rating}
                                                onChange={(event, newValue: number | null) => {
                                                    setRating(newValue)
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="lg:max-w-[700px] max-w-[450px] lg:pl-16 flex flex-col gap-2">
                                        <Textarea
                                            placeholder="Nhập nội dung đánh giá tại đây..."
                                            value={comment}
                                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                setComment(event.target.value);
                                            }}
                                            className="resize-none lg:w-[700px] w-[450px]"/>
                                        <Button className={`bg-DarkGreen hover:bg-DarkGreen_Hover w-fit`}
                                                disabled={comment === ""}>Đăng tải</Button>
                                    </div>
                                </div>}

                            <div className="flex items-center justify-center mt-4">
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
                        </section>

                        <section ref={certificateRef} className="flex flex-col gap-5">
                            <span className="font-bold text-DarkGreen text-2xl">
                                CHỨNG CHỈ
                            </span>

                            <div className="bg-LighterGray rounded-2xl p-4 flex flex-col justify-center lg:flex-row items-center">
                                <div className="flex flex-col gap-6 lg:pr-10">
                                    <span className="text-xl font-semibold">
                                        Chứng nhận hoàn thành khóa học
                                    </span>

                                    <p>
                                        Bạn sẽ nhận được giấy chứng nhận hoàn thành khóa học điện tử sau khi hoàn thành
                                        toàn bộ nội dung khóa học
                                    </p>

                                    <div className="flex items-center gap-5">
                                        <span>
                                            Trạng thái
                                        </span>

                                        <Button className={`${isFinish && isBuy ? "bg-DarkGreen hover:bg-DarkGreen_Hover" : "bg-gray text-black"}`} disabled={!isFinish}>
                                            Xem chứng chỉ
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Image src="/assets/images/certificate.png" alt="certificate" width={300} height={200}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};