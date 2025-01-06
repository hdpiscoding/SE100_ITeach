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
import { Skeleton } from "@/components/ui/skeleton"
import {
    checkIsEnrolled,
    createCourseReview,
    deleteCourse,
    getCourses,
    getMyCourseChapters,
    stopCourse
} from "@/services/course";
import Loading from "@/app/loading";
import {addToCart, getCartByStudentId} from "@/services/cart";
import {toast} from "react-toastify";
import AlertModal from "@/components/AlertDialog2/AlertModal";
import InfoModal from "@/components/AlertDialog2/InfoModal";


interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
}

interface Lesson {
    id: string;
    name: string;
    studyTime: number;
    lessonOrder: number;
    isFinished?: boolean;
}
interface Chapter {
    id: number;
    chapterName: string;
    courseId: string;
    lessons: Lesson[];
}

interface User {
    id: string;
    firstname: string | null;
    lastname: string | null;
    email: string;
    phoneNumber: string | null;
    role: string;
    avatar: string | null;
    birthday: string | null;
    totalCourseNumber: number | null;
    totalStudentNumber: number | null;
}

interface Review {
    star: number;
    content: string;
    user: User;
}

interface MyCourse {
    id: string;
    userId: string;
    courseId: string;
    currentLessonId: string;
    numberOfProcess: number;
    createdAt: string;
    updatedAt: string;
}

const isUserInReviews = (userId: string | undefined, reviews: Review[]): boolean => {
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

const findLessonByOrder = (data: Chapter[], lessonOrder: number): Lesson | undefined => {
    return data
        .flatMap((chapter: Chapter) => chapter.lessons) // Gộp tất cả các lessons từ các chapter vào một mảng
        .find((lesson: Lesson) => lesson.lessonOrder === lessonOrder); // Tìm lesson có lessonOrder cụ thể
};

export default function CourseDetail(props: any) {
    const {courseId} = useParams();
    const [user, setUser] = useState<User>();
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

    const [isBuy, setIsBuy] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [myCourse, setMyCourse] = useState<MyCourse>();

    // State for rating
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
    const [chapters, setChapters] = useState<Array<Chapter>>();
    const [certificate, setCertificate] = useState<string | null>(null);

    const [intro, setIntro] = useState<string>();

    // State for loading
    const [isPending, setIsPending] = useState(false);

    // State for info modal
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const lessonTriggerRef = useRef<HTMLButtonElement | null>(null);
    const checkRoleRef = useRef<HTMLButtonElement | null>(null);

    // State for admin confirm modal
    const deleteRef = useRef<HTMLButtonElement | null>(null);
    const suspendRef = useRef<HTMLButtonElement | null>(null);

    const handleDeleteCourse = async () => {
        try {
            setIsPending(true);
            const response = await deleteCourse(String(courseId));
            if (response?.data.errMessage === "OK") {
                toast.success("Xóa khóa học thành công");
                router.push("/admin/course");
            }
            else {
                toast.error("Đã có lỗi xảy ra");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSuspendCourse = async () => {
        try {
            setIsPending(true);
            const response = await stopCourse(String(courseId));
            if (response?.data.errMessage === "OK") {
                toast.success("Tạm ngưng khóa học thành công");
                router.push("/admin/course");
            }
            else {
                toast.error("Đã có lỗi xảy ra");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : { id: null });
    }, []);

    useEffect(() => {
        console.log(user);
        const fetchData = async () => {
            let isEnrolled = false;
            let courseData;
            let chapterData;
            if (user?.id !== null && user?.id !== "null") {
                console.log("User is not null");
                if (props.role === "student") {
                    const [data, enroll, chapters] = await Promise.all([
                        getCourses(String(courseId), String(user?.id)),
                        checkIsEnrolled(String(user?.id), String(courseId)),
                        getMyCourseChapters(String(courseId), String(user?.id))
                    ]);
                    courseData = data;
                    isEnrolled = enroll;
                    chapterData = chapters;
                    setIsBuy(isEnrolled);
                }
                else {
                    console.log("User is not student");
                    courseData = await getCourses(String(courseId), String(user?.id));
                    chapterData = courseData.chapters;
                }
            }
            else {
                console.log("User is null");
                courseData = await getCourses(String(courseId));
                chapterData = courseData.chapters;
            }

            setName(courseData.course.courseName);
            setDescription(courseData.course.intro);
            setIntro(courseData.course.gioiThieu);
            setPrice(courseData.course.cost);
            setImage(courseData.course.anhBia);
            if (courseData.course.finishTime) {
                setTotalTime(courseData.course.finishTime);
            }
            else {
                const totalDuration = courseData.chapters?.reduce((total: number, chapter: Chapter) => {
                    const chapterDuration = chapter.lessons?.reduce((lessonTotal: number, lesson: Lesson) => {
                        return lessonTotal + lesson.studyTime;
                    }, 0);

                    return total + chapterDuration;
                }, 0);
                setTotalTime(totalDuration);
            }
            setTotalChapter(courseData.chapters?.length);
            setTotalLecture(courseData.course.totalLesson);
            if (courseData.course.discount) {
                setDiscount(courseData.course.discount);
            }
            else {
                setDiscount(0);
            }
            setStudents(courseData.course.totalStudent);
            setTeacher(courseData.course.teacher);
            setChapters(chapterData);
            setAverageRating(courseData.course.totalStars);
            setRatingCount(courseData.reviews?.length);
            if (courseData.reviews?.length > 0) {
                setRatingValueList(courseData.reviews.reduce((counts: number[], review: Review) => {
                    const index = 5 - review.star; // Tính index tương ứng (5 sao = index 0)
                    counts[index] += 1;
                    return counts;
                }, [0, 0, 0, 0, 0]))
            }
            else{
                setRatingValueList([0, 0, 0, 0, 0]);
            }
            setReviews(courseData.reviews);
            setIsReviewed(isUserInReviews(user?.id, courseData.reviews));
            setCertificate(courseData.certificateId);
            setMyCourse(courseData.mycourse);
        }

        if (user) {
            console.log("Fetching data");
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        setItemsPerPage(3);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setTotalPages(Math.ceil(reviews?.length / itemsPerPage));
        const indexOfLastItem = page * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentReviews(reviews?.slice(indexOfFirstItem, indexOfLastItem));
    }, [reviews, page]);

    const handleReview = async () => {
        try {
            const response = await createCourseReview(String(courseId), String(user?.id), rating ?? 5, comment);
            if (response.errMessage === "OK") {
                toast.success("Đánh giá thành công");
                setIsReviewed(true);
                setComment("");
                const data = await getCourses(String(courseId), String(user?.id));
                setAverageRating(data.course.totalStars);
                setRatingCount(data.reviews?.length);
                setReviews(data.reviews);
                setIsReviewed(isUserInReviews(user?.id, data.reviews));
            }
            else {
                toast.error("Đã có lỗi xảy ra");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (user?.id !== null && user?.id !== "null") {
                    data = await getCourses(String(courseId), String(user?.id));
                }
                else{
                    data = await getCourses(String(courseId));
                }
                setAverageRating(data.course.totalStars);
                setRatingCount(data.reviews?.length);
                if (data.reviews?.length > 0) {
                    setRatingValueList(data.reviews.reduce((counts: number[], review: Review) => {
                        const index = 5 - review.star; // Tính index tương ứng (5 sao = index 0)
                        counts[index] += 1;
                        return counts;
                    }, [0, 0, 0, 0, 0]))
                }
                else{
                    setRatingValueList([0, 0, 0, 0, 0]);
                }
                setReviews(data.reviews);
            }
            catch (error) {
                console.error(error);
            }
        }
        if (user) {
            fetchData();
        }
    }, [isReviewed, user]);

    const handleAddToCart = async () => {
        try {
            const cartItems = await getCartByStudentId(String(user?.id));
            if (cartItems && cartItems.some((item: any) => item.courseId === courseId)) {
                console.log("Course is already in cart");
                toast.error("Khóa học đã có trong giỏ hàng");
            }
            else {
                console.log("Adding course to cart");
                const response = await addToCart(String(courseId), String(user?.id));
                if (response.errMessage === "OK") {
                    toast.success("Thêm vào giỏ hàng thành công");
                }
                else {
                    toast.error("Đã có lỗi xảy ra");
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleCertificate = () => {
        if (props.role === "student" && certificate) {
            console.log("Redirect to certificate");
            setIsPending(true);
            console.log(certificate);
            router.push(`/student/certificates?id=${certificate}`);
        }
    }

    return (
        <div>
            <div className="bg-bg grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
                <Button
                    className="col-start-2 bg-bg border border-orange text-orange rounded-xl w-fit hover:bg-orange hover:text-white mb-4">
                    <div className="flex items-center gap-2" onClick={() => {
                        if (props.role !== "user") {
                            setIsPending(true);
                            router.push(`/${props.role}/course`);
                        }
                        else {
                            setIsPending(true);
                            router.push(`/course`);
                        }
                    }}>
                        <ArrowLeft height={18} width={18}/>

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

                            {students != null
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

                            {ratingCount != null
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

                        {(price && discount != null)
                            ?
                            <div className="flex flex-col-reverse lg:flex-row lg:items-center mt-5">
                                <span className="text-orange font-bold text-4xl">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(Number(((price ?? 0) * (1 - (discount ?? 0) / 100)).toFixed(0)))}
                                </span>

                                {discount !== 0
                                    &&
                                    <div className="flex items-center gap-2">
                                        &nbsp;&nbsp;&nbsp;
                                        <span className="text-DarkGray line-through font-semibold text-xl">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(price ?? 0)}
                                        </span>

                                        <span className="text-sm bg-orange text-white px-2 py-1 rounded-lg mb-6">
                                            -{String((discount ?? 0))}%
                                        </span>
                                    </div>
                                }
                            </div>
                            :
                            <Skeleton className="bg-MediumGray h-[52px] w-[300px]"/>
                        }

                        <div>
                            {props.role === "student" && (!isBuy
                                ?
                                <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl" onClick={handleAddToCart}>
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
                                    <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl" onClick={() => {
                                        setIsPending(true);
                                        router.push(`/teacher/course/${courseId}/step1`);
                                    }}>
                                        <span className="font-semibold">
                                            Chỉnh sửa
                                        </span>
                                    </Button>

                                    <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl"
                                            onClick={() => {
                                                setIsPending(true);
                                                router.push(`/teacher/course/${courseId}/analysis`);
                                            }}>
                                        <span className="font-semibold">
                                            Xem phân tích
                                        </span>
                                    </Button>
                                </div>}

                            {props.role === "admin" &&
                                <div className="flex items-center gap-4">
                                    <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl" onClick={() => {
                                        deleteRef.current?.click();
                                    }}>
                                        <span className="font-semibold">
                                            Xóa
                                        </span>
                                    </Button>

                                    <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl" onClick={() => {
                                        suspendRef.current?.click();
                                    }}>
                                        <span className="font-semibold">
                                            Tạm ngưng
                                        </span>
                                    </Button>

                                    <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl"
                                            onClick={() => {
                                                setIsPending(true);
                                                router.push(`/admin/course/${courseId}/analysis`);
                                            }}>
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
                                <div dangerouslySetInnerHTML={{ __html: intro }}>

                                </div>
                                :
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
                                {chapters
                                    ?
                                    <Accordion type="multiple" className="w-full bg-LighterGray px-4 py-1 rounded-2xl">
                                        {chapters?.map((chapter, index) => (
                                            <AccordionItem value={String(index)} key={String(index)}>
                                                <AccordionTrigger>
                                                    <ChapterListItem type="course" index={index + 1}
                                                                     name={chapter.chapterName}
                                                                     duration={chapter.lessons?.reduce((acc, lesson) => {
                                                                         const duration = lesson.studyTime || 0;
                                                                         return acc + duration;
                                                                     }, 0)}
                                                                     videos={chapter.lessons.length}/>
                                                </AccordionTrigger>

                                                {chapter.lessons?.map((lesson, index) => (
                                                    <AccordionContent key={String(lesson.id)} id={String(lesson.id)} onClick={() => {
                                                        if (props.role === "student" && !isBuy) {
                                                            triggerRef.current?.click();
                                                        }
                                                        else {
                                                            if (props.role === "student" && lesson.lessonOrder !== 0 && (findLessonByOrder(chapters, lesson.lessonOrder - 1)?.isFinished === false)) {
                                                                lessonTriggerRef.current?.click();
                                                            }
                                                            else if (props.role === 'user'){
                                                                checkRoleRef.current?.click();
                                                            }
                                                            else {
                                                                setIsPending(true);
                                                                router.push(`/${props.role}/course/${courseId}/lesson/${lesson.id}`);
                                                            }
                                                        }

                                                    }}>
                                                        <LessonListItem type="course" index={index + 1} name={lesson.name} duration={lesson.studyTime}/>
                                                    </AccordionContent>
                                                ))}
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    :
                                    <Skeleton className="bg-gray h-[300px] w-full rounded-2xl"/>
                                }
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

                                                <Progress value={Number((rating / (ratingCount ?? 1) * 100).toFixed(0))}
                                                          indicatorColor="bg-Yellow"/>

                                                <span className="font-semibold">
                                                    {ratingCount === 0 ? 0 : (rating / (ratingCount ?? 1) * 100).toFixed(0)}%
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
                                            className={`bg-DarkGray ${user?.avatar ? "" : "p-[10px]"} rounded-[50%] h-fit w-fit`}>
                                        {user?.avatar ?
                                                <div
                                                    className="relative rounded-[50%] overflow-hidden h-[40px] w-[40px] flex items-center">
                                                    <Image
                                                        src={user?.avatar}
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
                                            {user?.email}
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
                                            className="resize-none lg:w-[550px] w-[450px]"/>
                                        <Button className={`bg-DarkGreen hover:bg-DarkGreen_Hover w-fit`}
                                                disabled={comment === ""}
                                                onClick={handleReview}
                                        >
                                            Đăng tải
                                        </Button>
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

                            {myCourse && props.role === "student"
                                &&
                                <div className="grid grid-cols-1 lg:grid-cols-[15%_2%_83%] items-center gap-4">
                                    <span className="lg:col-start-1 font-semibold">
                                        Tiến độ khóa học
                                    </span>

                                    <div className="lg:col-start-3 grid grid-cols-[85%_2%_13%] items-center">
                                        <div className="col-start-1">
                                            <Progress indicatorColor={"bg-DarkGreen"} value={Number((myCourse?.numberOfProcess / (totalLecture ?? 1)).toFixed(2)) * 100}/>
                                        </div>

                                        <span className="col-start-3">
                                            {Number((myCourse?.numberOfProcess / (totalLecture ?? 1)).toFixed(2)) * 100}%
                                        </span>
                                    </div>

                                </div>
                            }


                            <div
                                className="bg-LighterGray rounded-2xl p-4 flex flex-col justify-center lg:flex-row items-center">
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

                                        <Button className={`${certificate ? "bg-DarkGreen text-White hover:bg-DarkGreen_Hover" : "bg-gray text-black"}`} disabled={!(certificate)} onClick={handleCertificate}>
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
            <InfoModal
                title="Thông báo"
                description="Bạn phải đăng ký khóa học để có thể xem bài giảng!"
                trigger={
                    <button
                        ref={triggerRef}
                        style={{ display: "none" }} // Ẩn trigger button
                    />
                }
            />

            <InfoModal
                title="Thông báo"
                description="Bài giảng đang bị khóa. Vui lòng hoàn thành bài giảng trước!"
                trigger={
                    <button
                        ref={lessonTriggerRef}
                        style={{ display: "none" }} // Ẩn trigger button
                    />
                }
            />
            {isPending && <Loading/>}

            <InfoModal
                title="Thông báo"
                description="Vui lòng đăng nhập để xem bài giảng!"
                trigger={
                    <button
                        ref={checkRoleRef}
                        style={{ display: "none" }} // Ẩn trigger button
                    />
                }
            />
            {isPending && <Loading/>}

            <AlertModal
                title="Xác nhận xóa khóa học"
                description="Bạn có chắc chắn muốn xóa khóa học này?"
                trigger={
                    <button
                        ref={deleteRef}
                        style={{ display: "none" }} // Ẩn trigger button
                    />
                }
                onConfirm={handleDeleteCourse}
            />

            <AlertModal
                title="Xác nhận dừng khóa học"
                description="Bạn có chắc chắn muốn dừng khóa học này?"
                trigger={
                    <button
                        ref={suspendRef}
                        style={{ display: "none" }} // Ẩn trigger button
                    />
                }
                onConfirm={handleSuspendCourse}
            />
        </div>
    );
};