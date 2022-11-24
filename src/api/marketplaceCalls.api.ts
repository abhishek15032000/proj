import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const marketplaceCalls = {
  depositERC20: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.depositERC20, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  createOrder: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.createOrder, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  withdraw: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.withdraw, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  fillOrder: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.fillOrder, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
  getSellOrder: () => {
    return AxiosHelper(URL_PATH.marketplace.getSellOrder, 'POST').then(
      (res: any) => {
        return res.data
      }
    )
  },
  getBuyOrder: (buyer: any) => {
    return AxiosHelper(
      URL_PATH.marketplace.getBuyOrder + `?buyer=${buyer}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  checkForFullFillOrder: (asking: any) => {
    return AxiosHelper(
      URL_PATH.marketplace.checkForFullFillOrder + `?asking=${asking}`,
      'GET'
    ).then((res: any) => {
      return res.data
    })
  },
  cancelOrder: (payload: any) => {
    return AxiosHelper(URL_PATH.marketplace.cancelOrder, 'POST', payload).then(
      (res: any) => {
        return res.data
      }
    )
  },
}