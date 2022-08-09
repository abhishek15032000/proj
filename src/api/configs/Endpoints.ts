export const BASE_URL = process.env.REACT_APP_BASE_URL
console.log('🚀 ~ file: Endpoints.ts ~ line 2 ~ BASE_URL', BASE_URL)
export const ENDPOINTS = {
  authServiceURL: BASE_URL + '/auth/v1/auth',
  updateProjectSectionA: BASE_URL + '/projectSectionA/update',
}
