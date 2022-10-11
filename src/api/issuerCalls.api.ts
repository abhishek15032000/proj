import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const issuerCalls = {
  getIssuerTokenStats: () => {
    return AxiosHelper(URL_PATH.issuer.getIssuerTokenStats, 'GET').then(
      (res: any) => {
        return res.data
      }
    )
  },
}
