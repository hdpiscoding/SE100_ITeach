import axiosJudge0 from "@/utils/AxiosConfig";

export const submitCode = async (payload: {
    source_code: string;
    language_id: number;
    stdin?: string;
}) => {
    const response = await axiosJudge0.post("/submissions", payload, {
        params: {
            base64_encoded: true,
        }
    });
    return response.data;
}

export const getSubmission = async (token: string) => {
    const response = await axiosJudge0.get(`/submissions/${token}`, {
        params: {
            base64_encoded: true,
        }
    });
    return response.data;
}