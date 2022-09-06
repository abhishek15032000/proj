import { AxiosHelper } from "./configs/AxiosHelper"
import { URL_PATH } from "./configs/Endpoints"

export const verifierCalls = {
  createVerifier: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.create, "POST", payload).then(
      (res) => {
        return res
      }
    )
  },
  updateVerifier: (payload: any) => {
    return AxiosHelper(URL_PATH.verifier.update, "POST", payload).then(
      (res) => {
        return res?.data
      }
    )
  },
  getVerifierByProjectId: (token: any) => {
    return AxiosHelper(
      URL_PATH.verifier.getVerifierByProjectId + `?id=${token}`,
      "GET"
    ).then((res) => {
      return res?.data
    })
  },
}
