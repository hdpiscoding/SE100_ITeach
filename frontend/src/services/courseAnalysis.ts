import instance from "@/utils/AxiosCustomized";
import {format} from "date-fns";
import {toZonedTime} from 'date-fns-tz';


const getIDEUsed = async (courseId: string, month: number, year: number) => {
    const data = {
        courseId: courseId,
        month: month,
        year: year
    }
    try {
        const response = await instance.post(`api/v1/get-ide-use-by-month`, data);
        return response.data.IDEUseds;
    }
    catch (e) {
        console.log(e);
    }
}

const postIDEUsed = async (courseId: string) => {
    const now = new Date();
    const date = format(toZonedTime(now, 'UTC'), "yyyy-MM-dd HH:mm:ss.SSSxxx");
    console.log(date);
    const data = {
        courseId: courseId,
        date: date
    }
    try {
        await instance.post(`api/v1/post-ide-use`, data);
    }
    catch (e) {
        console.log(e);
    }
}

const getStudentsOfCourse = async (courseId: string) => {
    const data = {
        courseId: courseId
    }
    try {
        const response = await instance.post(`api/v1/get-all-student-of-course`, data);
        return response.data.students;
    }
    catch (e) {
        console.log(e);
    }
}

export {
    getIDEUsed,
    postIDEUsed,
    getStudentsOfCourse
}