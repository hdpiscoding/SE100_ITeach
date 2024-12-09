'use client';
import dynamic from 'next/dynamic';
const CourseDetail = dynamic(() => import('@/components/Course/CourseDetail'), {
    ssr: false,
});

export default function CourseDetailPage() {
    return (
        <CourseDetail role="teacher"/>
    );
};