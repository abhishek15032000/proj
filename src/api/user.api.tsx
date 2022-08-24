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
}
