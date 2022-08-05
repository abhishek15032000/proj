
import axios from "axios";
import { getLocalItem } from "../../utils/Storage";
import { BASE_URL } from "./Endpoints"

export const AxiosHelper = async (url: string, method: string, payload?: any) => {
    axios.interceptors.request.use((req: any) => {
        req.baseURL = BASE_URL
        req.headers.authorization = getLocalItem("loggedIn")?.data;
        return req;
    });

    const call = () => {
        switch (method) {
            case "GET":
                return axios.get(url);
            case "GET_IMAGE":
                return axios.get(url, { responseType: 'blob' });
            case "POST":
                return axios.post(url, payload);
            default:
                return axios.get(url);
        }
    }

    return await call()

}