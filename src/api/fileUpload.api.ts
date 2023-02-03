import { URL_PATH } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'
import { getLocalItem } from '../utils/Storage'

export const fileUploadCalls = {
  getFile: (filename: string, token?: string) => {
    return AxiosHelper(
      URL_PATH.fileupload.getFile + '?filename=' + filename + '&token=' + getLocalItem('userDetails')?.jwtToken,
      'GET_IMAGE'
    ).then((response: any) => {
      return response.data
    })
  },
}
