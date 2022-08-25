import { AxiosHelper } from './configs/AxiosHelper'
import { URL_PATH } from './configs/Endpoints'

export const verifierCalls = {
  createVerifier: (payload: any) => {
    return AxiosHelper(
      URL_PATH.verifier.create,
      'POST',
      payload
    ).then((res) => {
      return res
    })
  },
}
