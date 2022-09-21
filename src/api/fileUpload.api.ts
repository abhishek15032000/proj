import { URL_PATH } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'

export const fileUploadCalls = {
  getFile: (filename: string, token: string) => {
    return AxiosHelper(
      URL_PATH.fileupload.getFile + '?filename=' + filename + '&token=' + token,
      'GET_IMAGE'
    ).then((response: any) => {
      return response.data
    })
  },
}
