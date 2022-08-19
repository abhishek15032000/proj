import { AxiosHelper } from './configs/AxiosHelper'

export const department = {
  getDepartment: () => {
    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/user/api/v1/department/getAllDepartment',
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  getUsersByOrgType: (userType: string) => {
    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/user/api/v1/department/getUsersByOrgType?type=' +
        userType,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
}
