'use client';
import dynamic from "next/dynamic";
const LessonDetail = dynamic(() => import('@/components/Lesson/LessonDetail'), {
    ssr: false,
});

export default function LessonPage() {
    return (
        <LessonDetail role="student"/>
    );
};