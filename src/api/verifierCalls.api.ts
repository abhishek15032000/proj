import { AxiosHelper } from './configs/AxiosHelper'

export const verifierCalls = {
  createVerifier: (payload: any) => {
    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/carbon/api/v1/verifier/create',
      'POST',
      payload
    ).then((res) => {
      return res
    })
  },
}
