import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const USER = {
  onBoardingUser: (payload: any) => {
    return AxiosHelper(
      URL_PATH.userRoutes.onboardingUser,
      'POST',
      payload
    ).then((response: any) => {
      return response
    })
  },
  updateUserInfo: (payload: any) => {
    return AxiosHelper(
      URL_PATH.userRoutes.updateUserInfo,
      'POST',
      payload
    ).then((response: any) => {
      return response
    })
  },
  getUsersById: (id: string) => {
    return AxiosHelper(
      URL_PATH.userRoutes.getUsersById + `?id=${id}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })},
  getUserInfo: (payload: any) => {
    return AxiosHelper(
      URL_PATH.userRoutes.userInfo + '/' + payload,
      'GET'
    ).then((response: any) => {
      return response
    })
  },
}
