import { ethers } from 'ethers'
import { shallowEqual } from 'react-redux'
import { jsonSchema } from 'uuidv4'
import { dataCollectionCalls } from '../api/dataCollectionCalls'
import BlockchainCalls from '../blockchain/Blockchain'
import { useAppSelector } from '../hooks/reduxHooks'
import {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setSectionIndex,
  setSubSectionIndex,
  setIsApiCalled,
} from '../redux/Slices/issuanceDataCollection'
import { setLoading, setNewProjectUUID } from '../redux/Slices/newProjectSlice'
import { store } from '../redux/store'
import { stringExtractor } from './commonFunctions'
import { getLocalItem } from './Storage'
import { addSectionPercentages } from './newProject.utils'

const dispatch = store.dispatch

export const moveToNextSection = async (
  sectionIndex: number,
  subSectionIndex: number
) => {
  //Since List New Project is at 0th index in IssuanceDataCollection
  if (sectionIndex === 0) {
    const newProjectData = store.getState()?.newProject

    const projectName = newProjectData?.projectName
    const projectType = newProjectData?.projectType
    const projectLocation = newProjectData?.projectLocation
    const startDate = newProjectData?.startDate
    const projectDuration = newProjectData?.projectDuration
    const projectArea = newProjectData?.projectArea

    if (
      projectName &&
      projectType &&
      projectLocation &&
      startDate &&
      projectDuration &&
      projectArea
    ) {
      const payload = {
        company_name: projectName,
        type: projectType,
        location: projectLocation,
        start_date: startDate,
        duration: Number(projectDuration),
        area: projectArea,
      }
      try {
        dispatch(setLoading(true))

        const res = await dataCollectionCalls.createNewProject(payload)
        if (res?.success && res?.data?.uuid) {
          getProjectDetails(res?.data?.uuid)
          dispatch(setCurrentProjectDetailsUUID(res?.data?.uuid))
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
    const sectionA: any = store.getState()?.sectionA
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection
    const currentProjectUUID = issuanceDataCollection?.currentProjectDetailsUUID
    let step3data = [],
      step4data = []
    step3data = sectionA.party_and_project_participants.map((item: any) => {
      return {
        party_involved: item.party_involved,
        private_or_public_project_participant:
          item.private_or_public_project_participant,
        indicate_party_involved: item.indicate_party_involved,
      }
    })
    step4data = sectionA.methodologies.map((item: any) => {
      return {
        methodology: item.methodology,
        project_type: item.project_type,
        category: item.category,
        version: item.version,
        tools: item.tools,
      }
    })

    const {
      purpose_and_description,
      measure_taken_for_gas_emissions,
      brief_description_installed_tech,
      construction_date,
      operation_period,
      total_GHG_emission,
      project_comissioning_date,
    } = sectionA.A1
    const { country, state, city, pincode, landmark, file_attach } = sectionA.A2
    const { party_and_project_participants, methodologies } = sectionA
    const { credit_start_period, credit_period, credit_period_description } =
      sectionA.A5
    let params = {}
    if (subSectionIndex === 0) {
      if (
        purpose_and_description === '' ||
        measure_taken_for_gas_emissions === '' ||
        brief_description_installed_tech === '' ||
        construction_date === '' ||
        operation_period === '' ||
        total_GHG_emission === '' ||
        project_comissioning_date === ''
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step1: {
          purpose_and_description,
          measure_taken_for_gas_emissions,
          brief_description_installed_tech,
          project_comissioning_date,
          construction_date,
          operation_period,
          total_GHG_emission,
          completed: true,
        },
      }
    } else if (subSectionIndex === 1) {
      if (
        country === '' ||
        state === '' ||
        city === '' ||
        pincode === '' ||
        landmark === '' ||
        file_attach.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step2: {
          country,
          state,
          city,
          village: 'remove',
          pincode,
          landmark,
          file_attach,
          //file_attach: stringExtractor(file_attach, 'fileName'),
          completed: true,
        },
      }
    } else if (subSectionIndex === 2) {
      if (party_and_project_participants.length === 0) {
        console.log('Code Reachable')
        return
      }
      params = {
        step3: {
          party_and_project_participants: step3data,
          completed: true,
        },
      }
    } else if (subSectionIndex === 3) {
      if (methodologies.length === 0) {
        console.log('Code Reachable')
        return
      }
      params = {
        step4: {
          methodologies: step4data,
          completed: true,
        },
      }
    } else if (subSectionIndex === 4) {
      if (
        credit_start_period === '' ||
        credit_period.start_date === '' ||
        credit_period.end_date === '' ||
        credit_period_description === ''
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step5: {
          credit_start_period,
          credit_period: {
            start_date: credit_period.start_date,
            end_date: credit_period.start_date,
          },
          credit_period_description,
          completed: true,
        },
      }
    }
    dispatch(setLoading(true))
    // Change 'String' to actual values
    const payload = {
      _id: issuanceDataCollection?.currentProjectDetails?.section_a?._id,
      uuid: issuanceDataCollection?.currentProjectDetails?.section_a?.uuid,
      project_id:
        issuanceDataCollection?.currentProjectDetails?.section_a?.project_id,
      ...params,
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionACall(payload)
      if (res?.success) {
        getProjectDetails(currentProjectUUID)
      }
      if (!res?.success && res?.error) {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
    } finally {
      dispatch(setIsApiCalled(true))
    }
  }

  if (sectionIndex === 2) {
    const sectionB: any = store.getState()?.sectionB
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection
    const currentProjectUUID = issuanceDataCollection?.currentProjectDetailsUUID
    const {
      B1: {
        general_description,
        technical_description,
        data_tables_technical_description_attach,
        operational_description,
        shut_down_details_attach,
        implementation_milestones_attach,
        project_timeline_attach,
      },
      B2: {
        temporary_deviation,
        corrections,
        permanent_changes_from_registered_monitoring_plan,
        change_project_design,
        change_startDate_creditPeriod,
        typeOf_changes_specific,
      },
    } = sectionB

    let params = {}
    if (subSectionIndex === 0) {
      if (
        general_description === '' ||
        technical_description === '' ||
        operational_description === '' ||
        data_tables_technical_description_attach.length === 0 ||
        shut_down_details_attach.length === 0 ||
        implementation_milestones_attach.length === 0 ||
        project_timeline_attach.length === 0
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step1: {
          general_description,
          technical_description,
          data_tables_technical_description_attach: stringExtractor(
            data_tables_technical_description_attach,
            'fileName'
          ),
          operational_description,
          shut_down_details_attach: stringExtractor(
            shut_down_details_attach,
            'fileName'
          ),
          implementation_milestones_attach: stringExtractor(
            implementation_milestones_attach,
            'fileName'
          ),
          project_timeline_attach: stringExtractor(
            project_timeline_attach,
            'fileName'
          ),
          completed: true,
        },
      }
    } else if (subSectionIndex === 1) {
      if (
        temporary_deviation === '' ||
        corrections === '' ||
        permanent_changes_from_registered_monitoring_plan === '' ||
        change_project_design === '' ||
        change_startDate_creditPeriod === '' ||
        typeOf_changes_specific === ''
      ) {
        console.log('Code Reachable')
        return
      }
      params = {
        step2: {
          temporary_deviation,
          corrections,
          permanent_changes_from_registered_monitoring_plan,
          change_project_design,
          change_startDate_creditPeriod,
          typeOf_changes_specific,
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
      ...params,
    }
    dispatch(setLoading(true))
    try {
      const res = await dataCollectionCalls.updateProjectSectionBCall(payload)
      if (res?.success) {
        getProjectDetails(currentProjectUUID)
      }
      if (!res?.success && res?.error) {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
    } finally {
      dispatch(setIsApiCalled(true))
    }
  }

  if (sectionIndex === 3) {
    const sectionC: any = store.getState()?.sectionC
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection
    const currentProjectUUID = issuanceDataCollection?.currentProjectDetailsUUID

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
      dispatch(setLoading(true))
      const res = await dataCollectionCalls.updateProjectSectionCCall(payload)
      if (res?.success) {
        getProjectDetails(currentProjectUUID)
      }
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
    } finally {
      dispatch(setLoading(false))
      dispatch(setIsApiCalled(true))
    }
  }

  if (sectionIndex === 4) {
    const sectionD: any = store.getState()?.sectionD
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection
    const currentProjectUUID = issuanceDataCollection?.currentProjectDetailsUUID

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
      ...params,
    }

    try {
      dispatch(setLoading(true))
      const res = await dataCollectionCalls.updateProjectSectionDCall(payload)
      if (res?.success) {
        getProjectDetails(currentProjectUUID)
      }
      if (!res?.success && res?.error) {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
    } finally {
      dispatch(setIsApiCalled(true))
    }
  }

  if (sectionIndex === 5) {
    const sectionE: any = store.getState()?.sectionE
    const newProjectData = store.getState()?.newProject
    const issuanceDataCollection = store.getState()?.issuanceDataCollection
    const currentProjectUUID = issuanceDataCollection?.currentProjectDetailsUUID
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
      ...params,
    }

    try {
      dispatch(setLoading(true))
      const res = await dataCollectionCalls.updateProjectSectionECall(payload)
      if (res?.success) {
        getProjectDetails(currentProjectUUID)
      }
      if (!res?.success && res?.error) {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.createNewProject api ~ ', e)
    } finally {
      dispatch(setIsApiCalled(true))
    }
  }
}

const getProjectDetails = async (projectID: string) => {
  try {
    //dispatch(setLoading(true))
    const res = await dataCollectionCalls.getProjectById(projectID)
    if (res?.success && res?.data) {
      const modifiedRows = addSectionPercentages(res?.data)
      if (modifiedRows) dispatch(setCurrentProjectDetails(modifiedRows))
    }
    if (!res?.success && res?.error) {
      alert(res?.error)
    }
  } catch (e) {
    console.log('Error in dataCollectionCalls.getProjectById api ~ ', e)
  } finally {
    dispatch(setLoading(false))
  }
}
