import axios from "axios";

const axiosJudge0 = axios.create({
    baseURL: "https://judge0-ce.p.rapidapi.com",
    headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
        'Content-Type': 'application/json'
    },
});

export default axiosJudge0;