import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const transactionCalls = {
  getTransactionByUser: (payload: any) => {
    return AxiosHelper(
      URL_PATH.transaction.getTransactionByUser + '?user_address=' + payload,
      'GET',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
  getTransactionById: (txId: any) => {
    return AxiosHelper(
      URL_PATH.transaction.getTransactionById + '?txId=' + txId,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
}
