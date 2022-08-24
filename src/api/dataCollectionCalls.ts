import { ENDPOINTS, URL_PATH } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'

export const dataCollectionCalls = {
  createNewProject: (payload: any) => {
    return AxiosHelper(
      URL_PATH.project.projectCreate,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getAllProjects: (token: string) => {
    return AxiosHelper(
      URL_PATH.project.getAllProjects + `?user_id=${token}`,
      'GET'
    )
  },
  getProjectById: (projectID: string) => {
    return AxiosHelper(
      URL_PATH.project.getProjectById + `?id=${projectID}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionACall: (payload: any) => {

    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionA,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionBCall: (payload: any) => {

    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionB,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionCCall: (payload: any) => {

    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionC,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  updateProjectSectionDCall: (payload: any) => {

    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionD,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },

  updateProjectSectionECall: (payload: any) => {
    return AxiosHelper(
      URL_PATH.projectSections.updateProjectSectionE,
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
