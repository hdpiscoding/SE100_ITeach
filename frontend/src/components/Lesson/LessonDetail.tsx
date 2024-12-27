/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Users, Star, Loader2 } from "lucide-react"
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ChapterListItem from "@/components/Course/ChapterListItem";
import LessonListItem from "@/components/Course/LessonListItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import LessonContent from "@/components/Lesson/LessonContent";
import {Button} from "@/components/ui/button";
import {useParams, useRouter} from "next/navigation";
import LessonComment from "@/components/Lesson/LessonComment";
import LessonAssignments from "@/components/Lesson/LessonAssignments";
import {Skeleton} from "@/components/ui/skeleton";
import {getCourses, getLessonDetail} from "@/services/course";
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false, // Tắt server-side rendering cho ReactPlayer
});

interface LessonContent {
    lessonId: string;
    video: string;
    contentHtml: string;
    contentMarkDown: string;
    exerciseHtml: string;
    exerciseMarkDown: string;
}

interface Chapter {
    id: string;
    chapterName: string;
    courseId: string;
    lessons:[{
        id: string;
        name: string;
        studyTime: number;
    }];
}

interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

interface User {
    id: number,
    email: string,
    avatar: string,
    role: string
}

function findChapterByLessonId(chapters: Chapter[] | undefined, lessonId: string | undefined) {
    if (chapters) {
        return chapters.find((chapter) =>
            chapter.lessons.some((lesson) => String(lesson.id) === lessonId)
        )?.id;
    }
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

const convertMinutesVN = (minutes: number): string => {
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

export default function LessonDetail(props: any) {
    const { courseId, lessonId } = useParams();
    const [currentLesson, setCurrentLesson] = React.useState<LessonContent | undefined>(undefined);
    const [currentLessonId, setCurrentLessonId] = React.useState<string | undefined>();
    const router = useRouter();

    const [chapters, setChapters] = useState<Chapter[]>();
    const [courseName, setCourseName] = useState<string>("");
    const [totalStudent, setTotalStudent] = useState<number>();
    const [averageRating, setAverageRating] = useState<number>();
    const [finishTime, setFinishTime] = useState<number>();
    const [chapterCount, setChapterCount] = useState<number>();
    const [lessonCount, setLessonCount] = useState<number>();
    const [teacher, setTeacher] = useState<Teacher>();

    useEffect(() => {
        const foundLesson = chapters?.flatMap(chapter => chapter.lessons).find(lesson => lesson.id === lessonId);
        setCurrentLessonId(foundLesson?.id);
    }, [lessonId, chapters]);

    useEffect(() => {
        const fetchData = async () => {
            const lessonData = await getLessonDetail(String(lessonId));
            setCurrentLesson(lessonData.content);
        }

        fetchData();
    }, [currentLessonId]);

    // Replace this with data from localStorage when finished login
    const user: User = {
        id: 7,
        email: "hdp@gmail.com",
        avatar: "https://img.allfootballapp.com/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp",
        role: props.role
    }

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

    // State for accordion
    const [openItems, setOpenItems] = useState<string[]>([]);
    const openAccordion = (chapterId: string | undefined) => {
        if (!openItems.includes(String(chapterId))) {
            setOpenItems([String(...openItems), String(chapterId)]);
        }
    };
    useEffect(() => {
        console.log(currentLesson);
        openAccordion(String(findChapterByLessonId(chapters, String(lessonId))));
    }, [currentLesson]);

    const [tab, setTab] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const [courseData, lessonData] = await Promise.all([
                getCourses(String(courseId), String(user.id)),
                getLessonDetail(String(lessonId))
            ]);
            setChapters(courseData.chapters);
            setCourseName(courseData.course.courseName);
            setTotalStudent(courseData.course.totalStudent);
            setAverageRating(courseData.course.totalStars);
            setFinishTime(courseData.course.finishTime);
            setChapterCount(courseData.chapters?.length);
            setLessonCount(courseData.course.totalLesson);
            setCurrentLesson(lessonData.content);
            setTeacher(courseData.course.teacher);
        }

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
            <div className="col-start-2 flex flex-col">
                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="h-7 w-7 cursor-pointer text-DarkGreen" onClick={() => {router.push(`/${props.role}/course/${courseId}`)}}/>

                            {courseName
                                ?
                                <span className="font-bold text-DarkGreen text-3xl">
                                    {courseName}
                                </span>
                                :
                                <Skeleton className="bg-gray w-full h-[36px]"/>
                            }

                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {teacher?.avatar ?
                                    <div
                                        className="relative rounded-[50%] overflow-hidden h-[60px] w-[60px]">
                                        <Image
                                            src={String(teacher?.avatar)}
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

                                <div className="flex flex-col gap-1">
                                    {teacher
                                        ?
                                        (teacher?.firstName && teacher?.lastName
                                            &&
                                            <span className="font-semibold">
                                                {teacher?.firstName + " " + teacher?.lastName}
                                            </span>)
                                        :
                                        <Skeleton className="bg-gray w-[200px] h-[24px]"/>
                                    }

                                    {teacher
                                        ?
                                        <span className="text-Lime font-semibold text-sm">
                                            {teacher?.email}
                                        </span>
                                        :
                                        <Skeleton className="bg-gray w-[200px] h-[20px]"/>
                                    }
                                </div>
                            </div>

                            {(totalStudent != null && averageRating != null)
                                ?
                                <div className="flex items-center gap-4 mr-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-orange"/>

                                        <span className="font-semibold">
                                            {totalStudent}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-orange"/>

                                        <span className="font-semibold">
                                            {averageRating}
                                        </span>
                                    </div>
                                </div>
                                :
                                <Skeleton className="bg-gray lg:w-[200px] w-[100px] h-[24px]"/>
                            }
                        </div>

                        {!isBuy && props.role === "student"
                            &&
                            <div className="flex items-center justify-end">
                                <Button className="bg-DarkGreen hover:bg-DarkGreen_Hover font-semibold">
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>}

                    </div>

                    {(chapterCount != null && lessonCount != null && finishTime != null)
                        ?
                        <div className="lg:col-start-3 bg-LighterGray rounded-2xl p-4 flex flex-col gap-6">
                            <span className="text-xl font-semibold">
                                Tổng quan
                            </span>

                            <div className="grid grid-cols-1 gap-3">
                                <span>
                                    Số chương:
                                    <span className="font-semibold text-DarkGreen">
                                        &nbsp; {chapterCount}
                                    </span>
                                </span>

                                <span>
                                Số bài học:
                                    <span className="font-semibold text-DarkGreen">
                                        &nbsp; {lessonCount}
                                    </span>
                                </span>

                                <span>
                                    Thời lượng học:
                                    <span className="font-semibold text-DarkGreen">
                                        &nbsp; {convertMinutesVN(Number(finishTime))}
                                    </span>
                                </span>
                            </div>
                        </div>
                        :
                        <Skeleton className="bg-gray rounded-2xl w-full h-[180px] lg:col-start-3"/>
                    }
                </div>

                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 mt-6">
                    <div className="relative bg-black h-[500px] w-full flex items-center justify-center">
                        {(!isPlayerReady || !currentLesson) &&
                            <Loader2 className="absolute h-14 w-14 animate-spin text-white"/>}

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
                        {chapters
                            ?
                            <ScrollArea className="w-full h-[500px] rounded-2xl">
                            <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full bg-LighterGray px-4 py-1 rounded-2xl">
                                    {chapters?.map((chapter, index) => (
                                        <AccordionItem value={String(chapter.id)} key={String(chapter.id)}>
                                            <AccordionTrigger>
                                                <ChapterListItem type="lesson" index={index + 1}
                                                                 name={chapter.chapterName}
                                                                 duration={chapter.lessons?.reduce((acc, lesson) => {
                                                                     const duration = lesson.studyTime || 0;
                                                                     return acc + duration;
                                                                 }, 0)}
                                                                 videos={chapter.lessons.length}/>
                                            </AccordionTrigger>

                                            {chapter.lessons?.map((lesson, index) => (
                                                <AccordionContent key={String(lesson.id)} id={String(lesson.id)} onClick={() => {
                                                    router.push(`/${props.role}/course/${courseId}/lesson/${lesson.id}`);
                                                }}>
                                                    <LessonListItem type="lesson" index={index + 1} name={lesson.name} duration={lesson.studyTime} isStarted={isStarted} isPlaying={!isPause} isChosen={currentLesson?.lessonId === lesson.id} isFinished={false}/>
                                                </AccordionContent>
                                            ))}
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </ScrollArea>
                            :
                            <Skeleton className="bg-gray h-[500px] w-full rounded-2xl"/>
                        }
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
                    {currentLesson != null
                        ?
                        <LessonContent content={currentLesson?.contentHtml}/>
                        :
                        <div className="flex flex-col gap-4 ml-3 mt-4">
                            <Skeleton className="bg-gray lg:w-[800px] w-full h-[24px]"/>
                            <Skeleton className="bg-gray lg:w-[800px] w-full h-[24px]"/>
                            <Skeleton className="bg-gray lg:w-[800px] w-full h-[24px]"/>
                        </div>
                    }

                </div>

                <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
                    <LessonAssignments exercise={currentLesson?.exerciseHtml} courseId={courseId} role="student"/>
                </div>

                <div className={`${tab === 2 ? 'block' : 'hidden'}`}>
                    <LessonComment user={user} lessonId={currentLesson?.lessonId}/>
                </div>
            </div>
        </div>
    );
};