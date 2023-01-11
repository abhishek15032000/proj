import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const projectDetailsCalls = {
  getAllTransactionHistory: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectDetails.getAllTransactionHistory +
        '?user_address=' +
        payload,
      'GET',
      payload
    ).then((res) => {
      return res
    })
  },

  getReportByProjectId: (project_uuid: any) => {
    return AxiosHelper(
      URL_PATH.project.getReportByProjectId + `?project_uuid=${project_uuid}`,
      'GET'
    ).then((res) => {
      return res?.data
    })
  },
}
