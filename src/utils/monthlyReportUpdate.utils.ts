import { jsonSchema } from 'uuidv4'
import { dataCollectionCalls } from '../api/dataCollectionCalls'
import {
  setCurrentProjectDetails,
  setSectionIndex,
  setSubSectionIndex,
} from '../redux/Slices/issuanceDataCollection'
import { setLoading, setNewProjectUUID } from '../redux/Slices/newProjectSlice'
import { setEndDate } from '../redux/Slices/SelectDateSlice'
import { store } from '../redux/store'
import { stringExtractor } from './commonFunctions'

const dispatch = store.dispatch

export const moveToNextSection = async (
  sectionIndex: number,
  subSectionIndex: number
) => {
  //Since List New Project is at 0th index in IssuanceDataCollection
  if (sectionIndex === 0) {
    const selectDate = store.getState()?.selectDate
    const newProjectData = store.getState()?.newProject

    const projectName = newProjectData?.projectName
    const projectType = newProjectData?.projectType
    const projectLocation = newProjectData?.projectLocation
    const projectDuration = newProjectData?.projectDuration
    const projectArea = newProjectData?.projectArea
    const startDate = selectDate?.startDate
    const endDate = selectDate?.endDate

    if (
      startDate &&
      endDate &&
      projectName &&
      projectType &&
      projectLocation &&
      projectDuration &&
      projectArea
    ) {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        monthly_update: true,
        company_name: projectName,
        type: projectType,
        location: projectLocation,
        duration: Number(projectDuration),
        area: projectArea,
      }
      try {
        dispatch(setLoading(true))
        const res = await dataCollectionCalls.createNewProject(payload)
        if (res?.success && res?.data?.uuid) {
          getProjectDetails(res?.data?.uuid)
        }
        if (!res?.success && res?.error) {
          alert(res?.error)
        }
      } catch (e) {
        console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
      } finally {
        dispatch(setLoading(false))
      }
    } else {
      alert('Please fill all fields!')
    }
  }

  if (sectionIndex === 1) {
    const sectionA: any = store.getState()?.sectionAMonthly
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection

    console.log(
      'step3data',

      newProjectData,
      issuanceDataCollection
    )

    const { purpose_and_description } = sectionA
    console.log(Object.keys(sectionA).map((item) => item))
    let params = {}
    if (subSectionIndex === 0) {
      if (purpose_and_description === '') {
        console.log('Code Reachable')
        return
      }
      params = {
        step1: {
          purpose_and_description: sectionA.purpose_and_description,

          completed: true,
        },
      }
    }
    // Change 'String' to actual values
    const payload = {
      _id: issuanceDataCollection?.currentProjectDetails?.section_a?._id,
      uuid: issuanceDataCollection?.currentProjectDetails?.section_a?.uuid,
      project_id:
        issuanceDataCollection?.currentProjectDetails?.section_a?.project_id,
      monthly_update: true,
      ...params,
    }
    console.log('params<<<<', payload)
    try {
      const res = await dataCollectionCalls.updateProjectSectionACall(payload)
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

  if (sectionIndex === 2) {
    const sectionB: any = store.getState()?.sectionBMonthly
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection

    const {
      briefOnPurpuse,
      technicalDescription,
      technicalDescriptionImage,
      operationalDetails,
      majorShutDownImage,
      implementationMilestoneImage,
      projectTimelineImage,
      temporaryDeviations,
      corrections,
      permanentChanges,
      briefOnPurpuseB2,
      changesToProject,
      changesToStart,
    } = sectionB

    let params = {}
    if (subSectionIndex === 0) {
      if (
        briefOnPurpuse === '' ||
        technicalDescription === '' ||
        operationalDetails === '' ||
        technicalDescriptionImage.length === 0 ||
        majorShutDownImage === 0 ||
        implementationMilestoneImage === 0 ||
        projectTimelineImage === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step1: {
          general_description: briefOnPurpuse,
          technical_description: technicalDescription,
          data_tables_technical_description_attach: stringExtractor(
            technicalDescriptionImage,
            'fileName'
          ),
          operational_description: operationalDetails,
          shut_down_details_attach: stringExtractor(
            majorShutDownImage,
            'fileName'
          ),
          implementation_milestones_attach: stringExtractor(
            implementationMilestoneImage,
            'fileName'
          ),
          project_timeline_attach: stringExtractor(
            projectTimelineImage,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 1) {
      if (
        temporaryDeviations === '' ||
        corrections === '' ||
        permanentChanges === '' ||
        changesToProject === '' ||
        changesToStart === '' ||
        briefOnPurpuseB2 === ''
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step2: {
          temporary_deviation: temporaryDeviations,
          corrections: corrections,
          permanent_changes_from_registered_monitoring_plan: permanentChanges,
          change_project_design: changesToProject,
          change_startDate_creditPeriod: changesToStart,
          typeOf_changes_specific: briefOnPurpuseB2,
          completed: true,
        },
      }
    }

    // Change 'String' to actual values
    const payload = {
      _id: issuanceDataCollection?.currentProjectDetails?.section_b?._id,
      uuid: issuanceDataCollection?.currentProjectDetails?.section_b?.uuid,
      project_id:
        issuanceDataCollection?.currentProjectDetails?.section_b?.project_id,
      monthly_update: true,
      ...params,
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionBCall(payload)
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
    const sectionC: any = store.getState()?.sectionCMonthly
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection

    if (
      sectionC.monitoringSystem === '' ||
      sectionC.monitoringPlan === '' ||
      sectionC.organizationalChartImage.length === 0 ||
      sectionC.datasMonitored === ''
    ) {
      console.log('Code Reachable')
      return
    }
    // Change 'String' to actual values
    const payload = {
      _id: issuanceDataCollection?.currentProjectDetails?.section_c?._id,
      uuid: issuanceDataCollection?.currentProjectDetails?.section_c?.uuid,
      project_id:
        issuanceDataCollection?.currentProjectDetails?.section_c?.project_id,
      step1: {
        description: sectionC.monitoringSystem,
        monitoring_plan: sectionC.monitoringPlan,
        attach_org_structure_and_responsibilities_chart: stringExtractor(
          sectionC.organizationalChartImage,
          'fileName'
        ),
        specific_data_monitored: sectionC.datasMonitored,
        completed: true,
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

  if (sectionIndex === 4) {
    const sectionD: any = store.getState()?.sectionDMonthly
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection

    let params = {}
    if (subSectionIndex === 0) {
      if (
        sectionD.data_and_parameter_fixed_ExAnte === '' ||
        sectionD.attach_ex_ante_table.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step1: {
          data_and_parameter_fixed_ExAnte:
            sectionD.data_and_parameter_fixed_ExAnte,
          attach_ex_ante_table: stringExtractor(
            sectionD.attach_ex_ante_table,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 1) {
      if (
        sectionD.data_and_parameter_monitored_ExPost === '' ||
        sectionD.attach_ex_post_table.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step2: {
          data_and_parameter_monitored_ExPost:
            sectionD.data_and_parameter_monitored_ExPost,
          attach_ex_ante_table: stringExtractor(
            sectionD.attach_ex_post_table,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 2) {
      if (sectionD.briefDescription === '') {
        console.log('Code Reachable')
        return
      }
      params = {
        step3: {
          implementation_of_sampling_plan: sectionD.briefDescription,
          completed: true,
        },
      }
    }
    // Change 'String' to actual values
    const payload = {
      _id: issuanceDataCollection?.currentProjectDetails?.section_d?._id,
      uuid: issuanceDataCollection?.currentProjectDetails?.section_d?.uuid,
      project_id:
        issuanceDataCollection?.currentProjectDetails?.section_d?.project_id,
      monthly_update: true,
      ...params,
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionDCall(payload)
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

  if (sectionIndex === 5) {
    const sectionE: any = store.getState()?.sectionEMonthly
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection
    console.log(
      ' sectionE.calculationOfProjectEmissionsImages',
      sectionE.calculationOfProjectEmissionsImages
    )
    let params = {}
    if (subSectionIndex === 0) {
      if (
        sectionE.calculationOfBaselineEmissions === '' ||
        sectionE.calculationOfBaselineEmissionsImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step1: {
          calculation_of_baselineEmissions_or_net_GHG:
            sectionE.calculationOfBaselineEmissions,
          attach_relevant_docs: stringExtractor(
            sectionE.calculationOfBaselineEmissionsImages,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 1) {
      if (
        sectionE.calculationOfProjectEmissions === '' ||
        sectionE.calculationOfProjectEmissionsImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step2: {
          calculation_of_projectEmissions_or_net_GHG:
            sectionE.calculationOfProjectEmissions,
          attach_relevant_docs: stringExtractor(
            sectionE.calculationOfProjectEmissionsImages,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 2) {
      if (
        sectionE.calculationOfLeakage === '' ||
        sectionE.calculationOfLeakageImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step3: {
          calculation_of_leakage: sectionE.calculationOfLeakage,
          attach_relevant_docs: stringExtractor(
            sectionE.calculationOfLeakageImages,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 3) {
      if (
        sectionE.calculationSummaryOfEmission === '' ||
        sectionE.calculationSummaryOfEmissionImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step4: {
          calculation_of_emissions_reduction:
            sectionE.calculationSummaryOfEmission,
          attach_relevant_docs: stringExtractor(
            sectionE.calculationSummaryOfEmissionImages,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 4) {
      if (
        sectionE.comparisionOfActualEmissionReductions === '' ||
        sectionE.comparisionOfActualEmissionReductionsImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step5: {
          comparison_of_actual_emission_reduction:
            sectionE.comparisionOfActualEmissionReductions,
          attach_relevant_docs: stringExtractor(
            sectionE.comparisionOfActualEmissionReductionsImages,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 5) {
      if (
        sectionE.remarksOnDifferenceFromEstimatedValue === '' ||
        sectionE.remarksOnDifferenceFromEstimatedValueImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step6: {
          remark_on_difference_from_estimate_value:
            sectionE.remarksOnDifferenceFromEstimatedValue,
          attach_relevant_docs: stringExtractor(
            sectionE.remarksOnDifferenceFromEstimatedValueImages,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 6) {
      if (
        sectionE.actualEmissionReductions === '' ||
        sectionE.actualEmissionReductionsImages.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step7: {
          actual_emission_reductions: sectionE.actualEmissionReductions,
          attach_relevant_docs: stringExtractor(
            sectionE.actualEmissionReductionsImages,
            'fileName'
          ),
          completed: true,
        },
      }
    }
    // Change 'String' to actual values
    const payload = {
      _id: issuanceDataCollection?.currentProjectDetails?.section_e?._id,
      uuid: issuanceDataCollection?.currentProjectDetails?.section_e?.uuid,
      project_id:
        issuanceDataCollection?.currentProjectDetails?.section_e?.project_id,
      monthly_update: true,
      ...params,
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionECall(payload)
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

const getProjectDetails = async (projectID: string) => {
  try {
    const res = await dataCollectionCalls.getProjectById(projectID)
    if (res?.success && res?.data) {
      dispatch(setCurrentProjectDetails(res?.data))
    }
    if (!res?.success && res?.error) {
      alert(res?.error)
    }
  } catch (e) {
    console.log('Error in dataCollectionCalls.getProjectById api ~ ', e)
  }
}
