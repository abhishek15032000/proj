import { ENDPOINTS } from "./configs/Endpoints";
import { AxiosHelper } from "./configs/AxiosHelper";


export const authCalls = {
	loginCall: (payload: any) => {
		//!!Example Code below

		return AxiosHelper("https://carbon-dev-api.shinetrace.space/auth/api/v1/auth/login", "POST", payload).then((res: any) => {
			return res.data
		})
	},
	getCaptcha: (token: string) => {
		return AxiosHelper(`https://carbon-dev-api.shinetrace.space/auth/api/v1/auth/getCaptcha?id=${token}`, "GET_IMAGE").then((res: any) => {
			return res.data
		})
	}
}