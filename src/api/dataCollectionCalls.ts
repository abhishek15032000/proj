import { ENDPOINTS } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'

export const dataCollectionCalls = {
  createNewProject: (payload: any) => {
    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/carbon/api/v1/project/create',
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getAllProjects: (token: string) => {
    return AxiosHelper(
      `https://carbon-dev-api.shinetrace.space/carbon/api/v1/project/getAllProjects?user_id=${token}`,
      'GET'
    )
  },
  getProjectById: (projectID: string) => {
    return AxiosHelper(
      `https://carbon-dev-api.shinetrace.space/carbon/api/v1/project/getProjectById?id=${projectID}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionACall: (payload: any) => {
    //!!Example Code below

    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/carbon/api/v1/projectSectionA/update',
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionBCall: (payload: any) => {
    //!!Example Code below

    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/carbon/api/v1/projectSectionB/update',
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },

  updateProjectSectionDCall: (payload: any) => {
    //!!Example Code below

    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/carbon/api/v1/projectSectionD/update',
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
