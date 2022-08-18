import { jsonSchema } from 'uuidv4'
import { dataCollectionCalls } from '../api/dataCollectionCalls'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../redux/Slices/issuanceDataCollection'
import { setNewProjectUUID } from '../redux/Slices/newProjectSlice'
import { store } from '../redux/store'
import { stringExtractor } from './commonFunctions'

const dispatch = store.dispatch

export const moveToNextSection = async (
  sectionIndex: number,
  subSectionIndex: number
) => {
  if (sectionIndex === 0) {
    const newProjectData = store.getState()?.newProject

    const projectName = newProjectData?.projectName
    const projectType = newProjectData?.projectType
    const projectLocation = newProjectData?.projectLocation
    const startDate = newProjectData?.startDate
    const projectDuration = newProjectData?.projectDuration
    const projectArea = newProjectData?.projectArea

    const payload = {
      company_name: projectName,
      type: projectType[0],
      location: projectLocation,
      start_date: startDate,
      duration: Number(projectDuration),
      area: projectArea,
    }
    try {
      const res = await dataCollectionCalls.createNewProject(payload)
      if (res?.success && res?.data?.uuid) {
        dispatch(setNewProjectUUID(res?.data?.uuid))
        dispatch(setSectionIndex(sectionIndex + 1))
        dispatch(setSubSectionIndex(0))
      }
      if (!res?.success && res?.error) {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
    }
  }

  if (sectionIndex === 3) {
    const sectionC: any = store.getState()?.sectionC
    const newProjectData = store.getState()?.newProject

    // Change 'String' to actual values
    const payload = {
      _id: 'string',
      uuid: newProjectData.newProjectUUID,
      project_id: 'string',
      step1: {
        description: sectionC.monitoringSystem,
        monitoring_plan: sectionC.monitoringPlan,
        attach_org_structure_and_responsibilities_chart: stringExtractor(
          sectionC.organizationalChartImage,
          'fileName'
        ),
        specific_data_monitored: sectionC.datasMonitored,
      },
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionCCall(payload)
      if (res?.success && res?.data?.uuid) {
        dispatch(setNewProjectUUID(res?.data?.uuid))
        dispatch(setSectionIndex(sectionIndex + 1))
        dispatch(setSubSectionIndex(0))
      }
      if (!res?.success && res?.error) {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
    }
  }
}
