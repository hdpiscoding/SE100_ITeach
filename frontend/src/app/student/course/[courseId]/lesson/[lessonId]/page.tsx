'use client';
import React, {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Users, Star, Loader2 } from "lucide-react"
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ChapterListItem from "@/app/student/course/[courseId]/ChapterListItem";
import LessonListItem from "@/app/student/course/[courseId]/LessonListItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import LessonContent from "@/app/student/course/[courseId]/lesson/[lessonId]/LessonContent";
import {Button} from "@/components/ui/button";
import {useParams, useRouter} from "next/navigation";
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false, // Tắt server-side rendering cho ReactPlayer
});

interface Lesson {
    id: string;
    name: string;
    duration: number;
    video: string;
}

interface Chapter {
    id: string;
    name: string;
    duration: number;
    lessons: Lesson[];
}

interface Course {
    id: number;
    name: string;
    studentCount: number;
    averageRating: number;
    studyTime: number;
    chapterCount: number;
    lessonCount: number;
}

interface Teacher {
    id: number;
    name: string;
    avatar: string;
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

const teacher: Teacher = {
    id: 1,
    name: "Cristiano Ronaldo",
    avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp"
}

const chapters: Chapter[] = [
    {
        id: "1",
        name: "Giới thiệu về JavaScript",
        duration: 90,
        lessons: [
            {
                id: "a",
                name: "JavaScript là gì?",
                duration: 30,
                video: "https://youtu.be/0SJE9dYdpps"
            },
            {
                id: "b",
                name: "JavaScript hoạt động như thế nào trong trình duyệt?",
                duration: 30,
                video: "https://youtu.be/W0vEUmyvthQ"
            },
            {
                id: "c",
                name: "Cài đặt môi trường phát triển",
                duration: 30,
                video: "https://youtu.be/efI98nT8Ffo"
            }
        ]
    },
    {
        id: "2",
        name: "Cú pháp và các khái niệm cơ bản",
        duration: 120,
        lessons: [
            {
                id: "d",
                name: "Biến và kiểu dữ liệu",
                duration: 40,
                video: "https://youtu.be/CLbx37dqYEI"
            },
            {
                id: "e",
                name: "Các toán tử trong JavaScript",
                duration: 40,
                video: "https://youtu.be/SZb-N7TfPlw"
            },
            {
                id: "f",
                name: "Câu lệnh điều kiện và vòng lặp",
                duration: 40,
                video: "https://youtu.be/9MpHrdWBdxg"
            }
        ]
    },
    {
        id: "3",
        name: "Hàm và cách sử dụng",
        duration: 90,
        lessons: [
            {
                id: "g",
                name: "Định nghĩa và gọi hàm",
                duration: 30,
                video: "https://youtu.be/4g9ENVc2KLA"
            },
            {
                id: "h",
                name: "Tham số và giá trị trả về",
                duration: 30,
                video: "https://youtu.be/jE6UPl17Nvo"
            },
            {
                id: "i",
                name: "Biến cục bộ và toàn cục",
                duration: 30,
                video: "https://youtu.be/orIXdOPFWeM"
            }
        ]
    },
    {
        id: "4",
        name: "Mảng và đối tượng",
        duration: 120,
        lessons: [
            {
                id: "j",
                name: "Mảng và cách sử dụng",
                duration: 40,
                video: "https://youtu.be/YzO65uOJNMg"
            },
            {
                id: "k",
                name: "Đối tượng và thuộc tính",
                duration: 40,
                video: "https://youtu.be/orIXdOPFWeM"
            },
            {
                id: "l",
                name: "Thao tác với mảng và đối tượng",
                duration: 40,
                video: "https://youtu.be/KrYacXScNQk"
            }
        ]
    },
    {
        id: "5",
        name: "DOM và thao tác trên giao diện",
        duration: 150,
        lessons: [
            {
                id: "m",
                name: "DOM là gì?",
                duration: 30,
                video: "https://youtu.be/TsTr-tKCREc"
            },
            {
                id: "n",
                name: "Truy xuất và thao tác DOM",
                duration: 40,
                video: "https://youtu.be/gETNXKi3l_U"
            },
            {
                id: "o",
                name: "Sự kiện và xử lý sự kiện",
                duration: 40,
                video: "https://youtu.be/AA3WWZAMv_0"
            },
            {
                id: "p",
                name: "Tạo và xóa phần tử DOM",
                duration: 40,
                video: "https://youtu.be/SXW4QSjk4Js"
            }
        ]
    },
    {
        id: "6",
        name: "Làm việc với JSON và API",
        duration: 120,
        lessons: [
            {
                id: "q",
                name: "JSON là gì?",
                duration: 30,
                video: "https://youtu.be/Uph14HYkgEQ"
            },
            {
                id: "r",
                name: "Xử lý dữ liệu JSON",
                duration: 40,
                video: "https://youtu.be/Uph14HYkgEQ"
            },
            {
                id: "s",
                name: "Gửi và nhận dữ liệu từ API",
                duration: 50,
                video: "https://youtu.be/Uph14HYkgEQ"
            }
        ]
    },
    {
        id: "7",
        name: "Xử lý lỗi và debug",
        duration: 90,
        lessons: [
            {
                id: "t",
                name: "Các loại lỗi trong JavaScript",
                duration: 30,
                video: "https://youtu.be/Uph14HYkgEQ"
            },
            {
                id: "u",
                name: "Sử dụng console và debugger",
                duration: 30,
                video: "https://youtu.be/Uph14HYkgEQ"
            },
            {
                id: "v",
                name: "Try-catch và xử lý ngoại lệ",
                duration: 30,
                video: "https://youtu.be/Uph14HYkgEQ"
            }
        ]
    },
    {
        id: "8",
        name: "ES6+ và các tính năng nâng cao",
        duration: 150,
        lessons: [
            {
                id: "w",
                name: "Let, Const và Arrow Function",
                duration: 30,
                video: "https://youtu.be/tCPTBPua1Xo"
            },
            {
                id: "x",
                name: "Template Literals và Destructuring",
                duration: 40,
                video: "https://youtu.be/7Ls-fa8iVXA"
            },
            {
                id: "y",
                name: "Modules và Import/Export",
                duration: 40,
                video: "https://youtu.be/08lWi4T2Bfg"
            },
            {
                id: "z",
                name: "Promises và Async/Await",
                duration: 40,
                video: "https://youtu.be/XN2mt1i1kjk"
            }
        ]
    }
];

function findChapterByLessonId(chapters: Chapter[], lessonId: string | undefined) {
    return chapters.find((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === lessonId)
    )?.id;
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

export default function LessonPage() {
    const { courseId, lessonId } = useParams();
    const [currentLesson, setCurrentLesson] = React.useState<Lesson | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const foundLesson = chapters.flatMap(chapter => chapter.lessons).find(lesson => lesson.id === lessonId);
        setCurrentLesson(foundLesson);
    }, [lessonId]);


    const [isBuy, setIsBuy] = useState<boolean>(true);

    // State cho player
    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
    const [isPause, setIsPause] = useState<boolean>(true);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isProgressSaved, setIsProgressSaved] = useState<boolean>(false);
    const playerRef = useRef(null);

    const handleProgress = (state: any) => {
        setProgress(state.playedSeconds);
    }

    // const saveProgress = () => {
    //     // Lưu tiến trình video vào localStorage hoặc gọi API để lưu
    //     localStorage.setItem('videoProgress', JSON.stringify(progress));
    //     setIsProgressSaved(true);
    //     console.log('Tiến trình video đã được lưu');
    // };
    //
    // useEffect(() => {
    //     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //         if (!isProgressSaved) {
    //             saveProgress(); // Gọi hàm lưu tiến trình trước khi hiển thị cảnh báo
    //             event.preventDefault();
    //             event.returnValue = ''; // Trình duyệt sẽ hiển thị hộp thoại mặc định
    //         }
    //     };
    //
    //     // Gắn sự kiện beforeunload
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //
    //     return () => {
    //         // Xóa sự kiện khi component bị unmount
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [isProgressSaved, progress]);

    const handlePause = (value: boolean) => {
        setIsPause(value);
    }

    const handleStart = () => {
        setIsStarted(true);
    }

    const handleFinish = () => {
        setIsFinished(true);
    }

    const handlePlayerReady = () => {
        setIsPlayerReady(true); // Tắt loading khi player đã sẵn sàng
    };

    const [openItems, setOpenItems] = useState<string[]>([]);
    const openAccordion = (chapterId: string | undefined) => {
        if (!openItems.includes(String(chapterId))) {
            setOpenItems([String(...openItems), String(chapterId)]);
        }
    };
    useEffect(() => {
        openAccordion(findChapterByLessonId(chapters, String(lessonId)));
    }, [currentLesson]);

    const [tab, setTab] = useState<number>(0);

    return (
        <div className="grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
            <div className="col-start-2 flex flex-col">
                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="h-7 w-7 cursor-pointer text-DarkGreen" onClick={() => {router.back();}}/>
                            <span className="font-bold text-DarkGreen text-3xl">
                                {course.name}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
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
                                    <div
                                        className="bg-DarkGray h-[60px] w-[60px] rounded-[50%] flex items-center justify-center">
                                        <FaUser className="text-3xl text-LightGray"/>
                                    </div>}

                                <span className="text-Lime font-semibold">
                                    {teacher.name}
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

                        {!isBuy
                            &&
                            <div className="flex items-center justify-end">
                                <Button className="bg-DarkGreen hover:bg-DarkGreen_Hover font-semibold">
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>}

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

                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
                    <div className="relative bg-black h-[500px] w-full flex items-center justify-center">
                        {(!isPlayerReady || !currentLesson) && <Loader2 className="absolute h-14 w-14 animate-spin text-white"/>}

                        <ReactPlayer
                            ref={playerRef}
                            url={currentLesson?.video}
                            controls={true}
                            width="100%"
                            height="100%"
                            onReady={handlePlayerReady}
                            onPause={() => handlePause(true)}
                            onPlay={() => handlePause(false)}
                            onStart={handleStart}
                            onEnded={handleFinish}
                            onProgress={handleProgress}
                            progressInterval={1000}/>
                    </div>


                    <div className="lg:col-start-3">
                        <ScrollArea className="w-full h-[500px] rounded-2xl">
                            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full bg-LighterGray px-4 py-1 rounded-2xl">
                                {chapters.map((chapter, index) => (
                                    <AccordionItem value={chapter.id}>
                                        <AccordionTrigger>
                                            <ChapterListItem type={"lesson"} index={index + 1} name={chapter.name}
                                                             duration={chapter.duration}
                                                             videos={chapter.lessons.length}/>
                                        </AccordionTrigger>
                                        {chapter.lessons.map((lesson, index) => (
                                            <AccordionContent id={lesson.id} onClick={() => {
                                                router.push(`/student/course/${courseId}/lesson/${lesson.id}`);
                                            }}>
                                                <LessonListItem type="lesson" index={index + 1} name={lesson.name} duration={lesson.duration} isStarted={isStarted} isPlaying={!isPause} isChosen={currentLesson?.id === lesson.id} isFinished={false}/>
                                            </AccordionContent>
                                        ))}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
                    <ul className="flex items-center gap-8 sticky z-10 top-0 bg-white p-4">
                        {["Nội dung", "Bài tập", "Bình luận"].map((label, index) => (
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
                </div>

                <div className={`${tab === 0 ? 'block' : 'hidden'}`}>
                    <LessonContent/>
                </div>

                <div className={`${tab === 1 ? 'block' : 'hidden'}`}>

                </div>

                <div className={`${tab === 2 ? 'block' : 'hidden'}`}>

                </div>
            </div>
        </div>
    );
};