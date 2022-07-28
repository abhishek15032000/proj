import { ENDPOINTS } from "./configs/Endpoints";
import { AxiosHelper } from "./configs/AxiosHelper";


export const authCalls = {
    loginCall: () => {
        //!!Example Code below

        return AxiosHelper("https://jsonplaceholder.typicode.com/posts", "GET").then((res: any) => {
            return res.data
        })
    }
}