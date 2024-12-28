import instance from "@/utils/AxiosCustomized";

const getCourses = async (courseId: string, userId: string) => {
    const response = await instance(`api/v1/get-detail-course-info?id=${courseId}&userId=${userId}`);
    return response.data.data;
}

const getLessonDetail = async (lessonId: string) => {
    const response = await instance(`api/v1/get-lesson-content?lessonId=${lessonId}`);
    return response.data.data;
}

const checkIsEnrolled = async (studentId: string, courseId: string) => {
    const response = await instance(`api/v1/check-student-is-buy-course?studentId=${studentId}&courseId=${courseId}`);
    return response.data.check;
}

const createLessonComment = async (lessonId: string, userId: string, content: string, parentId: string | null) => {
    const response = await instance.post(`api/v1/post-lesson-comments`, {
        userId: userId,
        lessonId: lessonId,
        content: content,
        parentId: parentId
    });
    return response.data.data;
}

const completeLesson = async (lessonId: string, studentId: string, courseId: string) => {
    const response = await instance.post(`api/v1/complete-the-lesson`, {
        studentId: studentId,
        lessonId: lessonId,
        courseId: courseId
    });
    return response.data.data;
}

export {
    getCourses,
    getLessonDetail,
    checkIsEnrolled,
    createLessonComment,
    completeLesson
}
