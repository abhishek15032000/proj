
import axios from "axios";
import { getLocalItem } from "../../utils/Storage";
import { BASE_URL } from "./Endpoints"

export const AxiosHelper = async (url: string, method: string) => {
    axios.interceptors.request.use((req: any) => {
        req.baseURL = BASE_URL
        req.headers.authorization = getLocalItem("loggedIn")?.data;
        return req;
    });

    let call = () => {
        switch (method) {
            case "GET":
                return axios.get(url);
            case "POST":
                return axios.post(url);
            default:
                return axios.get(url);
        }
    }

    return await call()

}