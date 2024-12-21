import instance from "@/utils/AxiosCustomized";

const getCourses = async (courseId: string, userId: string) => {
    const response = await instance(`api/v1/get-detail-course-info?id=${courseId}&userId=${userId}`);
    return response.data.data;
}

export {
    getCourses
}
