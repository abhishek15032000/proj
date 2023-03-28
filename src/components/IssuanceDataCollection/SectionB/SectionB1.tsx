// React Imports
import React, { useState, useEffect } from 'react'

// MUI Imports
import {
  Button,
  Grid,
  TextareaAutosize,
  Stack,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'

// Local Imports
import SectionB1UploadImages from '../SectionB1Upload/SectionB1Upload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import Spinner from '../../../atoms/Spinner'

// Asset Imports
import SectionB1TechnicalDescription from '../../../assets/Images/SampleData/SectionB1TechnicalDescription.png'
import SectionB1ShutDownDetails from '../../../assets/Images/SampleData/SectionB1ShutDownDetails.png'
import SectionB1ImplementationOfMilestones from '../../../assets/Images/SampleData/SectionB1ImplementationOfMilestones.png'
import SectionB1EventDescription from '../../../assets/Images/SampleData/SectionB1EventDescription.png'

// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setB1 } from '../../../redux/Slices/sectionBSlice'

// Functional Imports
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'

const SectionB1 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }

  const B1 = useAppSelector(({ sectionB }) => sectionB.B1, shallowEqual)

  const {
    general_description,
    data_tables_technical_description_attach,
    shut_down_details_attach,
    implementation_milestones_attach,
    project_timeline_attach,
    technical_description,
    operational_description,
  } = B1

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_b.step1.completed
    ) {
      const {
        general_description,
        technical_description,
        data_tables_technical_description_attach,
        operational_description,
        shut_down_details_attach,
        implementation_milestones_attach,
        project_timeline_attach,
      } = currentProjectDetails.section_b.step1

      dispatch(
        setB1({ name: 'general_description', value: general_description })
      )
      dispatch(
        setB1({ name: 'technical_description', value: technical_description })
      )
      dispatch(
        setB1({
          name: 'data_tables_technical_description_attach',
          value: data_tables_technical_description_attach,
        })
      )
      dispatch(
        setB1({
          name: 'operational_description',
          value: operational_description,
        })
      )
      dispatch(
        setB1({
          name: 'shut_down_details_attach',
          value: shut_down_details_attach,
        })
      )
      dispatch(
        setB1({
          name: 'implementation_milestones_attach',
          value: implementation_milestones_attach,
        })
      )
      dispatch(
        setB1({
          name: 'project_timeline_attach',
          value: project_timeline_attach,
        })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box className="issuance_data_section_scroll">
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Brief on purpose and general description of project activity"
            placeholder="Write a brief of the implemented registered project activity"
            value={general_description}
            name={'general_description'}
            onChange={({ target: { value, name } }) =>
              dispatch(setB1({ name, value }))
            }
          />
        </Grid>

        <Typography sx={{ fontSize: 16, fontWeight: 500, mt: 3, ml: 1 }}>
          Technical Details
        </Typography>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Technical Description"
            placeholder="List the facilities, systems, and equipment installed and/or modified. The types and levels of services provided by the facilities, if any, to other facilities, outside the project boundary. Arrangement of facilities, systems, and equipment. Age and the average lifetime of equipment utilized based on the manufacturer specifications and industry standards. Installed capacities, load factors, and efficiencies. Energy and mass flows and balances of the facilities, systems, and equipment, if necessary. Monitoring equipment and their location in the systems. Technologies/measures existing prior to implementing the project at the same site, as applicable, including the equivalent information listed above on the facilities, systems, and equipment."
            value={technical_description}
            name={'technical_description'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB1({ value, name }))
            }
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Technical Details']}
            mediaItem={[SectionB1TechnicalDescription]}
            title="Attach Data Tables for Technical Description"
            imageArray={data_tables_technical_description_attach}
            onImageUpload={(item: any) => {
              dispatch(
                setB1({
                  name: 'data_tables_technical_description_attach',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setB1({
                  name: 'data_tables_technical_description_attach',
                  value: deleteIndexInArray(
                    data_tables_technical_description_attach,
                    index
                  ),
                })
              )
            }}
            required={true}
          />
        </Grid>

        <Typography sx={{ fontSize: 16, fontWeight: 500, mt: 3, ml: 1 }}>
          Operational Details
        </Typography>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Operational Details"
            placeholder="Write a brief about the events during the monitoring period,logs, major shut down details, timings, reasons"
            value={operational_description}
            name={'operational_description'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB1({ value, name }))
            }
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Shut Down Details']}
            title="Attach Data Tables for  Major shut down details"
            mediaItem={[SectionB1ShutDownDetails]}
            imageArray={shut_down_details_attach}
            onImageUpload={(item: any) => {
              dispatch(
                setB1({
                  name: 'shut_down_details_attach',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setB1({
                  name: 'shut_down_details_attach',
                  value: deleteIndexInArray(shut_down_details_attach, index),
                })
              )
            }}
            required
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Implementation of Milestones']}
            title="Attach Data Tables for  implementation of milestones"
            mediaItem={[SectionB1ImplementationOfMilestones]}
            imageArray={implementation_milestones_attach}
            onImageUpload={(item: any) => {
              dispatch(
                setB1({
                  name: 'implementation_milestones_attach',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setB1({
                  name: 'implementation_milestones_attach',
                  value: deleteIndexInArray(
                    implementation_milestones_attach,
                    index
                  ),
                })
              )
            }}
            required
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Project Timeline Event Description']}
            title="Attach Data Tables for  Project timeline event description"
            mediaItem={[SectionB1EventDescription]}
            imageArray={project_timeline_attach}
            onImageUpload={(item: any) => {
              dispatch(
                setB1({
                  name: 'project_timeline_attach',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setB1({
                  name: 'project_timeline_attach',
                  value: deleteIndexInArray(project_timeline_attach, index),
                })
              )
            }}
            required
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.B1}
        issuanceVisible={true}
      />
    </Box>
  )
}

export default SectionB1
