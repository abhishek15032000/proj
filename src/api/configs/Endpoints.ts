export const BASE_URL = process.env.REACT_APP_BASE_URL
console.log('🚀 ~ file: Endpoints.ts ~ line 2 ~ BASE_URL', BASE_URL)
export const ENDPOINTS = {
  authServiceURL: BASE_URL + 'auth/api/v1/auth',
  carbonServiceURL: BASE_URL + 'carbon/api/v1',
}

export const URL_PATH = {
  authRoutes: {
    login: ENDPOINTS.authServiceURL + "/login",
    getCaptcha: ENDPOINTS.authServiceURL + "/getCaptcha",
    verifyNewUser: ENDPOINTS.authServiceURL + "/verifyNewUser"
  },
  project: {
    projectCreate: ENDPOINTS.carbonServiceURL + '/project/create',
    getAllProjects: ENDPOINTS.carbonServiceURL + '/project/getAllProjects',
    getProjectById: ENDPOINTS.carbonServiceURL + '/project/getProjectById',
  },
  projectSections: {
    updateProjectSectionA: ENDPOINTS.carbonServiceURL + '/projectSectionA/update',
    updateProjectSectionB: ENDPOINTS.carbonServiceURL + '/projectSectionB/update',
    updateProjectSectionC: ENDPOINTS.carbonServiceURL + '/projectSectionC/update',
    updateProjectSectionD: ENDPOINTS.carbonServiceURL + '/projectSectionD/update',
    updateProjectSectionE: ENDPOINTS.carbonServiceURL + '/projectSectionE/update',
  }
}