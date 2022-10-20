import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const transactionCalls = {
  getTransactionByUser: (payload: any) => {
    return AxiosHelper(
      URL_PATH.transaction.getTransactionByUser + '?' + payload,
      'GET',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
