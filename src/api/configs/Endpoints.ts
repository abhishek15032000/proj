export const BASE_URL = process.env.REACT_APP_BASE_URL
console.log('🚀 ~ file: Endpoints.ts ~ line 2 ~ BASE_URL', BASE_URL)
export const ENDPOINTS = {
  authServiceURL: BASE_URL + 'auth/api/v1',
  carbonServiceURL: BASE_URL + 'carbon/api/v1',
  userServiceURL: BASE_URL + 'user/api/v1',
  orderServiceURL: BASE_URL + 'order/api/v1',
  notificationServiceURL: BASE_URL + 'notification/api/v1',
}

export const URL_PATH = {
  userRoutes: {
    onboardingUser: ENDPOINTS.userServiceURL + '/users/onboarding-user',
    updateUserInfo: ENDPOINTS.userServiceURL + '/users/updateUserInfo',
    getUsersById: ENDPOINTS.userServiceURL + '/users/getUsersById',
    userInfo: ENDPOINTS.userServiceURL + '/users/user/',
    forgotPassword: ENDPOINTS.userServiceURL + '/users/forgotPassword',
    resetPassword: ENDPOINTS.userServiceURL + '/users/resetPassword',
    changePassword: ENDPOINTS.userServiceURL + '/users/changePassword',
  },
  authRoutes: {
    login: ENDPOINTS.authServiceURL + '/auth/login',
    getCaptcha: ENDPOINTS.authServiceURL + '/auth/getCaptcha',
    verifyNewUser: ENDPOINTS.authServiceURL + '/auth/verifyNewUser',
    resendOTP: ENDPOINTS.authServiceURL + '/auth/resend-otp',
    verifyToken: ENDPOINTS.authServiceURL + '/auth/verifyToken',
  },
  project: {
    projectCreate: ENDPOINTS.carbonServiceURL + '/project/create',
    getAllProjects: ENDPOINTS.carbonServiceURL + '/project/getAllProjects',
    getProjectById: ENDPOINTS.carbonServiceURL + '/project/getProjectById',
    updateTx: ENDPOINTS.carbonServiceURL + '/project/updateTx',
    getIssuerProjectDashboardStats:
      ENDPOINTS.carbonServiceURL + '/project/getIssuerProjectDashboardStats',
    getReportByProjectId:
      ENDPOINTS.carbonServiceURL + '/project/getReportByProjectId',
    getTokenAndContractStats:
      ENDPOINTS.carbonServiceURL + '/issuer/token/stats',
  },
  projectSections: {
    updateProjectSectionA:
      ENDPOINTS.carbonServiceURL + '/projectSectionA/update',
    updateProjectSectionB:
      ENDPOINTS.carbonServiceURL + '/projectSectionB/update',
    updateProjectSectionC:
      ENDPOINTS.carbonServiceURL + '/projectSectionC/update',
    updateProjectSectionD:
      ENDPOINTS.carbonServiceURL + '/projectSectionD/update',
    updateProjectSectionE:
      ENDPOINTS.carbonServiceURL + '/projectSectionE/update',
  },
  verifier: {
    create: ENDPOINTS.carbonServiceURL + '/verifier/create',
    update: ENDPOINTS.carbonServiceURL + '/verifier/update',
    getVerifierByProjectId:
      ENDPOINTS.carbonServiceURL + '/verifier/getVerifierByProjectId',
    getVerifierProjectDashboardStats:
      ENDPOINTS.carbonServiceURL + '/verifier/getVerifierProjectDashboardStats',
    getAllVerifier: ENDPOINTS.carbonServiceURL + '/verifier/getAllVerifiers',
    submitVerifier: ENDPOINTS.carbonServiceURL + '/verifier/update',
    getPDFHash: ENDPOINTS.carbonServiceURL + '/verifier/utils/getHash',
    verifyPDFAndMintToken:
      ENDPOINTS.carbonServiceURL + '/verifier/report/submit',
    verifierAllReport: ENDPOINTS.carbonServiceURL + '/verifier/report/all',
  },
  registry: {
    getRegistryReports: ENDPOINTS.carbonServiceURL + '/registry/report/submit',
    registryUpdate: ENDPOINTS.carbonServiceURL + '/registry/update',
    getRegistryDashboardStats:
      ENDPOINTS.carbonServiceURL + '/registry/getRegistryProjectDashboardStats',
  },
  department: {
    getDepartment: ENDPOINTS.userServiceURL + '/department/getAllDepartment',
    getUsersByOrgType:
      ENDPOINTS.userServiceURL + '/department/getUsersByOrgType?type=',
  },
  reports: {
    getReportByProjectId:
      ENDPOINTS.carbonServiceURL + '/project/getReportByProjectId',
  },
  fileupload: {
    getFile: ENDPOINTS.carbonServiceURL + '/fileupload/getFile',
  },
  transaction: {
    getTransactionByUser:
      ENDPOINTS.carbonServiceURL + '/transaction/getTransactionByUser',
    getTransactionById:
      ENDPOINTS.carbonServiceURL + '/transaction/getTransactionById',
  },
  issuer: {
    getIssuerTokenStats: ENDPOINTS.carbonServiceURL + '/issuer/token/stats',
    addBankDetails: ENDPOINTS.carbonServiceURL + '/bank/add',
    withdrawAmount: ENDPOINTS.carbonServiceURL + '/bank/withdraw',
    getAllBankAccount: ENDPOINTS.carbonServiceURL + '/bank/get',
    updateBankAccountDetails: ENDPOINTS.carbonServiceURL + '/bank/update',
    removeBankAccount: ENDPOINTS.carbonServiceURL + '/bank/delete',
  },
  marketplace: {
    depositERC20: ENDPOINTS.orderServiceURL + '/marketplace/depositERC20',
    createOrder: ENDPOINTS.orderServiceURL + '/marketplace/createOrder',
    withdraw: ENDPOINTS.orderServiceURL + '/marketplace/withdraw',
    fillOrder: ENDPOINTS.orderServiceURL + '/marketplace/fillOrder',
    getSellOrder: ENDPOINTS.orderServiceURL + '/marketplace/getSellOrder',
    getBuyOrder: ENDPOINTS.orderServiceURL + '/marketplace/getBuyOrder',
    checkForFullFillOrder:
      ENDPOINTS.orderServiceURL + '/marketplace/checkForFullFillOrder',
    cancelOrder: ENDPOINTS.orderServiceURL + '/marketplace/cancelOrder',
  },
  buyers: {
    saveRetireToken: ENDPOINTS.carbonServiceURL + '/buyer/retire-token',
    getAllRetireToken: ENDPOINTS.carbonServiceURL + '/buyer/getRetirements',
    getTokenAndRetirementStats: ENDPOINTS.carbonServiceURL + '/buyer/getStats',
  },
  notification: {
    getNotification:
      ENDPOINTS.notificationServiceURL + '/notification/getNotifications',
    updateRead:
      ENDPOINTS.notificationServiceURL +
      '/notification/updateInAppNotification',
  },
  projectDetails: {
    getAllTransactionHistory:
      ENDPOINTS.carbonServiceURL + '/transaction/getTransactionByUser',
  },
  comments: {
    getComments: ENDPOINTS.carbonServiceURL + '/comment/getCommentByProjectId',
    createComment: ENDPOINTS.carbonServiceURL + '/comment/create',
    updateComment: ENDPOINTS.carbonServiceURL + '/comment/update',
  },
}
