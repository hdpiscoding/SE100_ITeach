/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */
'use client';
import React, {useEffect, useMemo, useState} from 'react';
import {ArrowLeft, Star, Users} from "lucide-react";
import Image from "next/image";
import {FaUser} from "react-icons/fa";
import {format, getDaysInMonth, parse, parseISO} from "date-fns";
import DatePicker from "@/components/ui/date-picker";
import {
    ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {CartesianGrid, Legend, Line, LineChart, XAxis, Label, Pie, PieChart} from "recharts";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/components/Course/Analysis/column";
import {useParams, useRouter} from "next/navigation";
import {getCourses} from "@/services/course";
import {Skeleton} from "@/components/ui/skeleton";
import {getIDEUsed, getStudentsOfCourse} from "@/services/courseAnalysis";

interface RawData {
    id: number;
    date: string;
    courseId: string;
    number: number;
}

interface MonthlyData {
    date: string;
    IDE_used_count: number;
}

interface PieChartData {
    status: string;
    amount: number;
    fill: string;
}

const transformPieData = (students: any[], totalLesson: number): PieChartData[] => {
    const result = [
        { status: "finished", amount: 0, fill: "#0B7077" },
        { status: "overhalf", amount: 0, fill: "#4db8b4" },
        { status: "other", amount: 0, fill: "#80c9c6" },
    ];

    students.forEach((student) => {
        const progress = student.numberOfProcess / totalLesson;
        console.log(student.id + ": " + progress);

        if (progress === 1.0) {
            result[0].amount += 1; // "finished"
        } else if (progress >= 0.5 && progress < 1.0) {
            result[1].amount += 1; // "overhalf"
        } else if (progress < 0.5) {
            result[2].amount += 1; // "other"
        }
    });

    return result;
}

function transformRawDataToCurrentMonthData(rawData: RawData[], year: number, month: number): MonthlyData[] {
    // Tính số ngày trong tháng
    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    // Khởi tạo currentMonthData với IDE_used_count = 0
    const currentMonthData: MonthlyData[] = Array.from({ length: daysInMonth }, (_, index) => ({
        date: String(index + 1).padStart(2, "0"),
        IDE_used_count: 0,
    }));

    // Chuyển đổi rawData thành map để dễ tra cứu
    const rawDataMap: { [key: string]: number } = {};
    rawData?.forEach((item) => {
        const itemDate = parseISO(item.date); // Chuyển đổi ISO date thành đối tượng Date
        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth() + 1;
        const itemDay = itemDate.getDate();

        if (itemYear === year && itemMonth === month) {
            const dayKey = String(itemDay).padStart(2, "0");
            if (!rawDataMap[dayKey]) {
                rawDataMap[dayKey] = 0;
            }
            rawDataMap[dayKey] += item.number;
        }
    });

    // Gán giá trị từ rawDataMap vào currentMonthData
    currentMonthData.forEach((item) => {
        if (rawDataMap[item.date]) {
            item.IDE_used_count = rawDataMap[item.date];
        }
    });

    return currentMonthData;
}

const pieChartConfig = {
    amount: {
        label: "Students",
    },
    finished: {
        label: "Đã hoàn thành",
    },
    overhalf: {
        label: "Hoàn thành trên 50%",
    },
    other: {
        label: "Khác",
    },
} satisfies ChartConfig

const updateDateWithMonthAndYear = (currentMonth: Date | undefined, data: Array<{ date: string, IDE_used_count: number }>) => {
    if (!currentMonth) return [];

    // Lấy tháng và năm từ currentMonth
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0

    // Duyệt qua dữ liệu và cập nhật lại date với định dạng "dd/MM/yyyy"
    return data.map(item => {
        const fullDate = `${item.date.padStart(2, '0')}/${month < 10 ? `0${month}` : month}/${year}`;
        return {
            ...item,
            date: fullDate, // Cập nhật trực tiếp vào key `date`
        };
    });
};

interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string
}

interface Lesson {
    id: string;
    name: string;
    studyTime: number;
}

interface Chapter {
    id: string;
    chapterName: string;
    courseId: string;
    lessons: Lesson[];
}

interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
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

interface Student {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    birthday: string //dd/MM/yyyy
    progress: number
}

export default function CourseAnalysis(props: any) {
    const { courseId } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User>();

    const [courseName, setCourseName] = useState<string>("");
    const [totalStudent, setTotalStudent] = useState<number>();
    const [averageRating, setAverageRating] = useState<number>();
    const [finishTime, setFinishTime] = useState<number>();
    const [chapterCount, setChapterCount] = useState<number>();
    const [lessonCount, setLessonCount] = useState<number>();
    const [teacher, setTeacher] = useState<Teacher>();
    const [students, setStudents] = useState<Student[]>([]);
    const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<Date | undefined>(new Date(Date.now()));
    const [currentMonthData, setCurrentMonthData] = useState<MonthlyData[]>([]);
    const [lineChartData, setLineChartData] = useState(updateDateWithMonthAndYear(currentMonth, currentMonthData));

    const handleShowDetail = () => {
        setIsShowDetail(!isShowDetail);
    }

    const totalStudents = useMemo(() => {
        return pieChartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [pieChartData])

    const chartConfig = {
        IDE_used_count: {
            label: `Lượt dùng`,
        },
    } satisfies ChartConfig

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await getIDEUsed(String(courseId), Number(currentMonth?.getMonth()) + 1, Number(currentMonth?.getFullYear() || 0));
            setCurrentMonthData(transformRawDataToCurrentMonthData(rawData, currentMonth?.getFullYear() || 0, (currentMonth?.getMonth() || 0) + 1));
        }

        fetchData();
    }, [currentMonth]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }, []);

    function mapStudents(data: any[], totalLesson: number): Student[] {
        return data.map(student => {
            const user = student.User;
            return {
                id: student.id,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phoneNumber || "",
                email: user.email,
                birthday: user.birthday
                    ? new Date(user.birthday).toLocaleDateString("vi-VN") // Format: dd/MM/yyyy
                    : "",
                progress: totalLesson > 0
                    ? Math.round((student.numberOfProcess / totalLesson) * 100)
                    : 0
            };
        });
    }
    useEffect(() => {
        const today = new Date(Date.now());
        const fetchData = async () => {
            const [rawData, courseData, studentData] = await Promise.all([
                getIDEUsed(String(courseId), Number(today.getMonth()) + 1, Number(today.getFullYear() || 0)),
                getCourses(String(courseId), String(user?.id)),
                getStudentsOfCourse(String(courseId))
            ]);

            //const courseData = await getCourses(String(courseId), String(user.id));
            setCurrentMonth(today);
            setCourseName(courseData.course.courseName);
            setTotalStudent(courseData.course.totalStudent);
            setAverageRating(courseData.course.totalStars);
            if(courseData.course.finishTime) {
                setFinishTime(courseData.course.finishTime);
            }
            else {
                setFinishTime(courseData.chapters?.reduce((acc: number, chapter: Chapter) => {
                    const duration = chapter.lessons?.reduce((acc: number, lesson: Lesson) => {
                        const duration = lesson.studyTime || 0;
                        return acc + duration;
                    }, 0) || 0;
                    return acc + duration;
                }, 0) || 0);
            }
            setChapterCount(courseData.chapters?.length);
            setLessonCount(courseData.course.totalLesson);
            setTeacher(courseData.course.teacher);
            setStudents(mapStudents(studentData, courseData.course.totalLesson));
            setPieChartData(transformPieData(studentData, courseData.course.totalLesson));

            setCurrentMonthData(transformRawDataToCurrentMonthData(rawData, today.getFullYear(), today.getMonth() + 1));
        }

        if (user) {
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        console.log(students);
    }, [students, lessonCount]);


    useEffect(() => {
        setLineChartData(updateDateWithMonthAndYear(currentMonth, currentMonthData));
    }, [currentMonthData, currentMonth]);

    return (
        <div className="grid grid-cols-[0.5fr_11fr_0.5fr] py-6">
            <div className="col-start-2 flex flex-col gap-12 text-center">
                <div className="grid lg:grid-cols-[68%_1%_31%] grid-cols-1 gap-4 lg:gap-0 text-left">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="h-7 w-7 cursor-pointer text-DarkGreen" onClick={() => {
                                router.push(`/${props.role}/course/${courseId}`)
                            }}/>

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

                <div>
                    <h1 className="font-bold text-3xl">
                        PHÂN TÍCH
                    </h1>
                </div>

                <div className="flex flex-col text-left items-center w-full gap-5">
                    <div className="flex items-center gap-10 w-full">
                        <span className="font-semibold text-lg">
                            Số lượt sử dụng IDE
                        </span>

                        <DatePicker className="" date={currentMonth} setDate={setCurrentMonth} type={"month"}/>
                    </div>

                    <ChartContainer config={chartConfig}
                                    className="min-h-[100px] h-[400px] w-[420px] md:w-full lg:w-full">
                        <LineChart
                            accessibilityLayer
                            data={lineChartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(date) => {
                                    const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
                                    const day = parsedDate.getDate();
                                    return day % 5 === 1 ? String(day) : '';
                                }}/>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                            <Line
                                dataKey="IDE_used_count"
                                type="monotone"
                                stroke="#FD661F"
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>

                <div className="flex flex-col text-left w-full gap-5">
                    <span className="font-semibold text-lg">
                        Tỉ lệ hoàn thành khóa học
                    </span>

                    <div className="flex flex-col items-center gap-8">
                        <ChartContainer
                            config={pieChartConfig}
                            className="mx-auto aspect-square max-h-[400px] w-[400px] h-[400px]">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel/>}
                                />
                                <Pie
                                    data={pieChartData}
                                    dataKey="amount"
                                    nameKey="status"
                                    innerRadius={100}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({viewBox}) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-5xl font-bold"
                                                        >
                                                            {totalStudents.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 34}
                                                            className="fill-muted-foreground text-xl"
                                                        >
                                                            Học viên
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>

                                <ChartLegend
                                    content={<ChartLegendContent nameKey="status" className="text-sm font-semibold"/>}
                                />
                            </PieChart>
                        </ChartContainer>

                        <Button className="bg-DarkGreen hover:bg-DarkGreen_Hover rounded-xl" onClick={handleShowDetail}>
                            {isShowDetail ? "Ẩn chi tiết" : "Xem chi tiết"}
                        </Button>

                        {isShowDetail
                            &&
                            <div className="w-full">
                                <DataTable columns={columns} data={students} itemsPerPage={5} callBy="analysis"/>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
