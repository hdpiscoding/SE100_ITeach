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
import ChapterListItem from "@/app/student/course/[id]/ChapterListItem";
import LessonListItem from "@/app/student/course/[id]/LessonListItem";
import {Progress} from "@/components/ui/progress";
import RatingListItem from "@/app/student/course/[id]/RatingListItem";
import {Pagination, Stack} from "@mui/material";
import {FaUser} from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea"


interface Teacher {
    id: string;
    name: string;
    avatar: string;
}

interface Chapter {
    id: number;
    name: string;
    duration: number;
    lessons: {
        id: number;
        name: string;
        duration: number;
    }[];
}

interface Review {
    id: number;
    email: string;
    avatar: string;
    rating: number;
    comment: string;
}

interface User {
    id: number;
    email: string;
    avatar: string;
}

export default function CourseDetailPage() {
    // Refs for scrolling
    const introRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);
    const certificateRef = useRef<HTMLDivElement>(null);
    const [tab, setTab] = useState<number>(0);


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

    // State for rating
    const [user, setUser] = useState<User>({
        id: 1,
        email: "hdp@gmail.com",
        avatar: ""
    });
    const [averageRating, setAverageRating] = useState<number>(4.2);
    const [rating, setRating] = useState<number | null>(5);
    const [comment, setComment] = useState<string>("");
    const [ratingCount, setRatingCount] = useState<number>(100);
    const [ratingValueList, setRatingValueList] = useState<number[]>([48, 30, 17, 4, 1]);
    const [reviews, setReviews] = useState<Array<Review>>(
        [
            {
                id: 1,
                email: "user1@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 5,
                comment: "Khóa học tuyệt vời, giảng viên rất nhiệt tình và dễ hiểu. Tôi đã học được rất nhiều kiến thức mới!"
            },
            {
                id: 2,
                email: "user2@example.com",
                avatar: "",
                rating: 4,
                comment: "Khóa học cung cấp rất nhiều thông tin hữu ích, nhưng tôi hy vọng có thêm ví dụ thực tế để áp dụng ngay vào công việc."
            },
            {
                id: 3,
                email: "user3@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 5,
                comment: "Tuyệt vời! Nội dung chi tiết, dễ theo dõi, và hỗ trợ rất tốt. Tôi cảm thấy tự tin hơn khi viết mã."
            },
            {
                id: 4,
                email: "user4@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 3,
                comment: "Khóa học khá ổn, nhưng một số phần hơi dài dòng và khó hiểu. Cần cải thiện về phần giải thích."
            },
            {
                id: 5,
                email: "user5@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 2,
                comment: "Tôi cảm thấy khóa học thiếu sự tương tác. Nhiều khái niệm chưa rõ ràng và ví dụ còn thiếu thực tế."
            },
            {
                id: 6,
                email: "user6@example.com",
                avatar: "",
                rating: 4,
                comment: "Khóa học rất chất lượng, giảng viên giải thích rõ ràng, nhưng một số bài tập thực hành vẫn chưa đủ để người học nắm vững kiến thức."
            },
            {
                id: 7,
                email: "user7@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 1,
                comment: "Rất thất vọng! Nội dung quá sơ sài, không đủ để giúp tôi hiểu được các khái niệm cơ bản. Tôi không học được gì từ khóa học này."
            },
            {
                id: 8,
                email: "user8@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 5,
                comment: "Khóa học cực kỳ bổ ích! Các bài giảng rất dễ hiểu và thực hành cũng rất thực tế, giúp tôi áp dụng được ngay vào dự án của mình."
            },
            {
                id: 9,
                email: "user9@example.com",
                avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
                rating: 3,
                comment: "Khóa học ổn, nhưng vẫn thiếu một số phần nâng cao. Tôi mong muốn có thêm các chủ đề về tối ưu hóa mã và làm việc với dự án thực tế."
            },
            {
                id: 10,
                email: "user10@example.com",
                avatar: "",
                rating: 2,
                comment: "Khóa học chưa đáp ứng được kỳ vọng. Các bài giảng chưa được cập nhật, có nhiều lỗi trong các bài tập thực hành."
            }
        ]
    );

    // set up pagination
    const [page, setPage] = React.useState<number>(1);

    const [itemsPerPage, setItemsPerPage] = useState<number>(3);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(reviews.length / itemsPerPage));
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }
    // end of set up pagination

    // State for course information
    const [name, setName] = useState<string>("Khóa học JavaScript cơ bản cho người mới bắt đầu");
    const [description, setDescription] = useState<String>("Đây là khóa học JavaScript cơ bản dành cho người mới bắt đầu. Trong khóa học này, bạn sẽ học cách sử dụng JavaScript để xây dựng các ứng dụng web cơ bản.");
    const [price, setPrice] = useState<number>(400000);
    const [image, setImage] = useState<string>("https://f.howkteam.vn/Upload/cke/images/1_LOGO%20SHOW%20WEB/7_JavaScript/Javascript%20c%C6%A1%20ba%CC%89n/00_%20Javascript%20basic_Kteam.png");
    const [totalTime, setTotalTime] = useState<number>(30);
    const [totalChapter, setTotalChapter] = useState<number>(12);
    const [totalLecture, setTotalLecture] = useState<number>(108);
    const [discount, setDiscount] = useState<number>(0.3);
    const [students, setStudents] = useState<number>(1000);
    const [teacher, setTeacher] = useState<Teacher>({
        id: "1",
        name: "Cristiano Ronaldo",
        avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp"
    });
    
    const [chapters, setChapters] = useState<Array<Chapter>>(
        [
            {
                id: 1,
                name: "Giới thiệu về JavaScript",
                duration: 90,
                lessons: [
                    {
                        id: 1,
                        name: "JavaScript là gì?",
                        duration: 30
                    },
                    {
                        id: 2,
                        name: "JavaScript hoạt động như thế nào trong trình duyệt?",
                        duration: 30
                    },
                    {
                        id: 3,
                        name: "Cài đặt môi trường phát triển",
                        duration: 30
                    }
                ]
            },
            {
                id: 2,
                name: "Cú pháp và các khái niệm cơ bản",
                duration: 120,
                lessons: [
                    {
                        id: 1,
                        name: "Biến và kiểu dữ liệu",
                        duration: 40
                    },
                    {
                        id: 2,
                        name: "Các toán tử trong JavaScript",
                        duration: 40
                    },
                    {
                        id: 3,
                        name: "Câu lệnh điều kiện và vòng lặp",
                        duration: 40
                    }
                ]
            },
            {
                id: 3,
                name: "Hàm và cách sử dụng",
                duration: 90,
                lessons: [
                    {
                        id: 1,
                        name: "Định nghĩa và gọi hàm",
                        duration: 30
                    },
                    {
                        id: 2,
                        name: "Tham số và giá trị trả về",
                        duration: 30
                    },
                    {
                        id: 3,
                        name: "Biến cục bộ và toàn cục",
                        duration: 30
                    }
                ]
            },
            {
                id: 4,
                name: "Mảng và đối tượng",
                duration: 120,
                lessons: [
                    {
                        id: 1,
                        name: "Mảng và cách sử dụng",
                        duration: 40
                    },
                    {
                        id: 2,
                        name: "Đối tượng và thuộc tính",
                        duration: 40
                    },
                    {
                        id: 3,
                        name: "Thao tác với mảng và đối tượng",
                        duration: 40
                    }
                ]
            },
            {
                id: 5,
                name: "DOM và thao tác trên giao diện",
                duration: 150,
                lessons: [
                    {
                        id: 1,
                        name: "DOM là gì?",
                        duration: 30
                    },
                    {
                        id: 2,
                        name: "Truy xuất và thao tác DOM",
                        duration: 40
                    },
                    {
                        id: 3,
                        name: "Sự kiện và xử lý sự kiện",
                        duration: 40
                    },
                    {
                        id: 4,
                        name: "Tạo và xóa phần tử DOM",
                        duration: 40
                    }
                ]
            },
            {
                id: 6,
                name: "Làm việc với JSON và API",
                duration: 120,
                lessons: [
                    {
                        id: 1,
                        name: "JSON là gì?",
                        duration: 30
                    },
                    {
                        id: 2,
                        name: "Xử lý dữ liệu JSON",
                        duration: 40
                    },
                    {
                        id: 3,
                        name: "Gửi và nhận dữ liệu từ API",
                        duration: 50
                    }
                ]
            },
            {
                id: 7,
                name: "Xử lý lỗi và debug",
                duration: 90,
                lessons: [
                    {
                        id: 1,
                        name: "Các loại lỗi trong JavaScript",
                        duration: 30
                    },
                    {
                        id: 2,
                        name: "Sử dụng console và debugger",
                        duration: 30
                    },
                    {
                        id: 3,
                        name: "Try-catch và xử lý ngoại lệ",
                        duration: 30
                    }
                ]
            },
            {
                id: 8,
                name: "ES6+ và các tính năng nâng cao",
                duration: 150,
                lessons: [
                    {
                        id: 1,
                        name: "Let, Const và Arrow Function",
                        duration: 30
                    },
                    {
                        id: 2,
                        name: "Template Literals và Destructuring",
                        duration: 40
                    },
                    {
                        id: 3,
                        name: "Modules và Import/Export",
                        duration: 40
                    },
                    {
                        id: 4,
                        name: "Promises và Async/Await",
                        duration: 40
                    }
                ]
            }
    ]);

    const [intro, setIntro] = useState<React.ReactNode>(<div
        style={{lineHeight: '1.6'}}>
        <h1 style={{color: '#2c3e50'}}>Khóa học JavaScript cơ bản</h1>
        <p>
            Chào mừng bạn đến với khóa học <strong>JavaScript cơ bản</strong>! Đây là khóa học lý tưởng
            dành cho những ai mới bắt đầu học lập trình hoặc muốn tìm hiểu về ngôn ngữ lập trình phổ
            biến nhất trong việc phát triển web.
        </p>
        <h2 style={{color: '#16a085'}}>Bạn sẽ học được gì?</h2>
        <ul>
            <li>Hiểu rõ các khái niệm cơ bản của JavaScript như biến, kiểu dữ liệu, và hàm.</li>
            <li>Khám phá cách làm việc với DOM để xây dựng giao diện web động.</li>
            <li>Tìm hiểu về vòng lặp, điều kiện, và các cấu trúc dữ liệu quan trọng.</li>
            <li>Học cách sử dụng JavaScript để tương tác với người dùng và tạo các hiệu ứng web thú vị.</li>
        </ul>
        <h2 style={{color: '#e67e22'}}>Dành cho ai?</h2>
        <p>
            Khóa học này dành cho bất kỳ ai muốn học lập trình từ đầu, hoặc những lập trình viên ở mức
            độ cơ bản muốn củng cố kiến thức JavaScript trước khi tiến xa hơn với các công nghệ hiện đại
            như React, Angular, hoặc Node.js.
        </p>
        <p>
            Hãy tham gia ngay hôm nay và bắt đầu hành trình chinh phục JavaScript của bạn!
        </p>
    </div>);

    return (
        <div>
            <div className="bg-bg grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
                <Button
                    className="col-start-2 bg-bg border border-orange text-orange rounded-xl w-fit hover:bg-orange hover:text-white mb-4">
                    <div className="flex items-center gap-2">
                        <ArrowLeft height={18} width={18}/>

                        <span className="font-semibold">
                                Khám phá thêm
                            </span>
                    </div>
                </Button>

                <div className="col-start-2 grid lg:grid-cols-[68%_1%_31%] grid-cols-1">
                    <div className="col-start-1 order-2 lg:order-none flex flex-col gap-5">
                        <div>
                        <span className="font-bold text-DarkGreen text-2xl">
                            {name}
                        </span>
                        </div>

                        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between mr-6">
                            <div className="flex items-center gap-4">
                                {teacher.avatar ?
                                    <div
                                        className="relative rounded-[50%] overflow-hidden h-[60px] w-[60px]">
                                        <Image
                                            src={teacher.avatar}
                                            alt="user avatar"
                                            className="object-cover"
                                            fill
                                        />
                                    </div>
                                    :
                                    <div className="bg-DarkGray h-[60px] w-[60px] rounded-[50%] flex items-center justify-center">
                                        <FaUser className="text-3xl text-LightGray"/>
                                    </div>}

                                <span className="text-Lime font-semibold">
                                    {teacher.name}
                                </span>
                            </div>

                            <div className="bg-white rounded-3xl py-2 px-4 w-fit">
                                <span className="font-semibold text-DarkGreen">
                                    {students} học viên
                                </span>
                            </div>
                        </div>

                        <div className="mr-6">
                            <p>
                                {description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8 w-fit">
                            <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                <Clock className="h-5 w-5 text-DarkGreen"/>
                                <span className="text-DarkGreen font-semibold">
                                {String(totalTime)} giờ
                            </span>
                            </div>

                            <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                <Folders className="h-5 w-5 text-DarkGreen"/>
                                <span className="text-DarkGreen font-semibold">
                                {String(totalChapter)} chương
                            </span>
                            </div>

                            <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                <FileText className="h-5 w-5 text-DarkGreen"/>
                                <span className="text-DarkGreen font-semibold">
                                {String(totalLecture)} bài giảng
                            </span>
                            </div>

                            <div className="bg-white px-2 py-1 flex items-center w-fit gap-2 rounded-lg">
                                <Star className="h-5 w-5 text-DarkGreen"/>
                                <span className="text-DarkGreen font-semibold">
                                {String(averageRating.toFixed(1))} ({String(ratingCount)} đánh giá)
                            </span>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse lg:flex-row lg:items-center mt-5">
                        <span className="text-orange font-bold text-4xl">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(Number((price * (1 - discount)).toFixed(0)))}
                        </span>

                            <div className="flex items-center gap-2">
                                &nbsp;&nbsp;&nbsp;
                                <span className="text-DarkGray line-through font-semibold text-xl">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(price)}
                            </span>

                                <span className="text-sm bg-orange text-white px-2 py-1 rounded-lg mb-6">
                                -{String(discount * 100)}%
                            </span>
                            </div>
                        </div>

                        <div>
                            {!isBuy
                                ?
                                <Button className="bg-DarkGreen text-white hover:bg-DarkGreen_Hover rounded-2xl">
                                    <span className="font-semibold">
                                        Thêm vào giỏ hàng
                                    </span>
                                </Button>
                                :
                                <Button className="bg-orange text-white hover:bg-Orange_Hover rounded-2xl">
                                    <span className="font-semibold">
                                        Học ngay
                                    </span>
                                </Button>}
                        </div>
                    </div>

                    <div
                        className="lg:col-start-3 order-1 lg:order-none flex flex-col items-center justify-center mb-2 lg:mb-0">
                        <div className="relative rounded-lg overflow-hidden h-[260px] w-full">
                            <Image
                                src={image}
                                alt="course_image"
                                className="object-cover"
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[0.5fr_11fr_0.5fr] my-4">
                <div className="col-start-2 grid lg:grid-cols-[68%_2%_30%] grid-cols-1 gap-10 bg-white">
                    <ul className="flex items-center gap-8 sticky z-10 top-0 bg-white p-4">
                        {["Giới thiệu", "Nội dung", "Đánh giá", "Chứng chỉ"].map((label, index) => (
                            <li key={index} className="relative">
                                <span
                                    className={`cursor-pointer font-semibold font-lg ${
                                        tab === index ? "text-orange" : "text-black"
                                    } transition-colors duration-300 ease-in-out`}
                                    onClick={() => {
                                        setTab(index);
                                    }}
                                >
                                  {label}
                                </span>

                                <div
                                    className={`absolute left-0 top-full mt-1 w-full h-[2px] bg-orange rounded transition-all duration-300 ${
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

                            {intro}
                        </section>

                        <section ref={contentRef} className="flex flex-col gap-5">
                            <span className="font-bold text-DarkGreen text-2xl">
                                NỘI DUNG KHÓA HỌC
                            </span>

                            <div>
                                <Accordion type="multiple" className="w-full bg-LighterGray px-4 py-1 rounded-2xl">
                                    {chapters.map((chapter, index) => (
                                        <AccordionItem value={String(index)}>
                                            <AccordionTrigger>
                                                <ChapterListItem index={index + 1} name={chapter.name} duration={chapter.duration} videos={chapter.lessons.length}/>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {chapter.lessons.map((lesson, index) => (
                                                    <LessonListItem index={index + 1} name={lesson.name} duration={lesson.duration}/>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </section>

                        <section ref={reviewRef} className="flex flex-col gap-5">
                            <span className="font-bold text-DarkGreen text-2xl">
                                ĐÁNH GIÁ
                            </span>

                            <div className="w-full bg-LighterGray p-4 rounded-2xl grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-[34%_1%_65%]">
                                <div className="flex flex-col gap-2 lg:col-start-1 justify-center items-center">
                                    <span className="text-Yellow font-semibold text-3xl">
                                        {String(averageRating.toFixed(1))}/5.0
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
                                    {ratingValueList.map((rating, index) => (
                                        <div className="grid grid-cols-[12%_78%_10%] items-center gap-2">
                                            <span>
                                                {5 - index} sao
                                            </span>

                                            <Progress value={rating}/>

                                            <span className="font-semibold">
                                                {rating}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div key={page} className="fade-in">
                                {currentReviews.map((review) => (
                                    <RatingListItem
                                        key={review.id}
                                        avatar={review.avatar}
                                        name={review.email}
                                        rating={review.rating}
                                        comment={review.comment}/>
                                ))}
                            </div>

                            {isBuy
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
                                            {user.email}
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