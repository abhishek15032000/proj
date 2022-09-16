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
import {
  setBriefOnPurpuse,
  setImplementationMilestoneImage,
  setMajorShutDownImage,
  setOperationalDetails,
  setProjectTimelineImage,
  setTechnicalDescription,
  setTechnicalDescriptionImage,
} from '../../../redux/Slices/sectionBSlice'

// Functional Imports
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'

const SectionB1 = () => {
  // const [briefOnPurpuse, setBriefOnPurpuse] = useState('')
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

      dispatch(setBriefOnPurpuse(general_description))
      dispatch(
        setImplementationMilestoneImage(implementation_milestones_attach)
      )
      dispatch(setMajorShutDownImage(shut_down_details_attach))
      dispatch(setOperationalDetails(operational_description))
      dispatch(setProjectTimelineImage(project_timeline_attach))
      dispatch(setTechnicalDescription(technical_description))
      dispatch(
        setTechnicalDescriptionImage(data_tables_technical_description_attach)
      )
    }
  }, [currentProjectDetails])

  const briefOnPurpuse = useAppSelector(
    ({ sectionB }) => sectionB.briefOnPurpuse,
    shallowEqual
  )

  const technicalDescription = useAppSelector(
    ({ sectionB }) => sectionB.technicalDescription,
    shallowEqual
  )

  const technicalDescriptionImage = useAppSelector(
    ({ sectionB }) => sectionB.technicalDescriptionImage,
    shallowEqual
  )

  const operationalDetails = useAppSelector(
    ({ sectionB }) => sectionB.operationalDetails,
    shallowEqual
  )

  const majorShutDownImage = useAppSelector(
    ({ sectionB }) => sectionB.majorShutDownImage,
    shallowEqual
  )

  const implementationMilestoneImage = useAppSelector(
    ({ sectionB }) => sectionB.implementationMilestoneImage,
    shallowEqual
  )

  const projectTimelineImage = useAppSelector(
    ({ sectionB }) => sectionB.projectTimelineImage,
    shallowEqual
  )

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Brief on purpose and general description of project activity "
            placeholder="Write a brief of the implemented registered project activity"
            value={briefOnPurpuse}
            onChange={(event) =>
              dispatch(setBriefOnPurpuse(event.target.value))
            }
          />
        </Grid>

        <Typography sx={{ fontSize: 16, fontWeight: 500, mt: 3, ml: 1 }}>
          Technical Details
        </Typography>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Technical Description"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={technicalDescription}
            onChange={(event) =>
              dispatch(setTechnicalDescription(event.target.value))
            }
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Technical Details']}
            mediaItem={[SectionB1TechnicalDescription]}
            title="Attach Data Tables for Technical Description"
            imageArray={technicalDescriptionImage}
            onImageUpload={(item: any) => {
              dispatch(
                setTechnicalDescriptionImage([
                  item,
                  ...technicalDescriptionImage,
                ])
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setTechnicalDescriptionImage(
                  deleteIndexInArray(technicalDescriptionImage, index)
                )
              )
            }}
          />
        </Grid>

        <Typography sx={{ fontSize: 16, fontWeight: 500, mt: 3, ml: 1 }}>
          Operational Details
        </Typography>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Operational Details"
            placeholder="Write a brief about the events during the monitoring period,logs, major shut down details, timings, reasons"
            value={operationalDetails}
            onChange={(event) =>
              dispatch(setOperationalDetails(event.target.value))
            }
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Shut Down Details']}
            title="Attach Data Tables for  Major shut down details"
            mediaItem={[SectionB1ShutDownDetails]}
            imageArray={majorShutDownImage}
            onImageUpload={(item: any) => {
              dispatch(setMajorShutDownImage([item, ...majorShutDownImage]))
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setMajorShutDownImage(
                  deleteIndexInArray(majorShutDownImage, index)
                )
              )
            }}
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Implementation of Milestones']}
            title="Attach Data Tables for  implementation of milestones"
            mediaItem={[SectionB1ImplementationOfMilestones]}
            imageArray={implementationMilestoneImage}
            onImageUpload={(item: any) => {
              dispatch(
                setImplementationMilestoneImage([
                  item,
                  ...implementationMilestoneImage,
                ])
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setImplementationMilestoneImage(
                  deleteIndexInArray(implementationMilestoneImage, index)
                )
              )
            }}
          />

          <CCDropAndUpload
            mediaTitle={['Sample Report - Project Timeline Event Description']}
            title="Attach Data Tables for  Project timeline event description"
            mediaItem={[SectionB1EventDescription]}
            imageArray={projectTimelineImage}
            onImageUpload={(item: any) => {
              dispatch(setProjectTimelineImage([item, ...projectTimelineImage]))
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setProjectTimelineImage(
                  deleteIndexInArray(projectTimelineImage, index)
                )
              )
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB1
