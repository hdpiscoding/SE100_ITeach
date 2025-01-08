import instance from "@/utils/AxiosCustomized";

const addToCart = async (courseId: string, userId: string) => {
    const response = await instance.post(`api/v1/add-to-cart`, {
        studentId: userId,
        courseId: courseId
    });
    return response.data;
}

const getCartByStudentId = async (studentId: string) => {
    const response = await instance.get(`api/v1/get-cart-items?id=${studentId}`);
    return response.data.data;
}

export {
    addToCart,
    getCartByStudentId
}