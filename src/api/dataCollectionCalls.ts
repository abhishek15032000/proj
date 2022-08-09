import { ENDPOINTS } from './configs/Endpoints'
import { AxiosHelper } from './configs/AxiosHelper'

export const dataCollectionCalls = {
  updateProjectSectionACall: (payload: any) => {
    //!!Example Code below

    return AxiosHelper(
      'https://carbon-dev-api.shinetrace.space/carbon/api/v1/projectSectionA/update',
      'POST',
      payload
    ).then((res: any) => {
      return res.data
    })
  },
}
