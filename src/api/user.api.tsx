import { AxiosHelper } from './configs/AxiosHelper'

export const USER = {
  onBoardingUser: (payload: any) => {
    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/user/api/v1/users/onboarding-user',
      'POST',
      payload
    ).then((response: any) => {
      return response
    })
  },
}
