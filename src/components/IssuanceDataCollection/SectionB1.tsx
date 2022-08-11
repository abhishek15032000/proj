import { Button, Grid, TextareaAutosize, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import SectionB1TechnicalDescription from '../../assets/Images/SampleData/SectionB1TechnicalDescription.png'
import SectionB1ShutDownDetails from '../../assets/Images/SampleData/SectionB1ShutDownDetails.png'
import SectionB1ImplementationOfMilestones from '../../assets/Images/SampleData/SectionB1ImplementationOfMilestones.png'
import SectionB1EventDescription from '../../assets/Images/SampleData/SectionB1EventDescription.png'
import SectionB1UploadImages from './SectionB1Upload/SectionB1Upload'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setBriefOnPurpuse } from '../../redux/Slices/sectionBSlice'

const SectionB1 = () => {
  // const [briefOnPurpuse, setBriefOnPurpuse] = useState('')
  const dispatch = useAppDispatch()

  const [technicalDescription, setTechnicalDescription] = useState('')

  const [technicalDescriptionImage, setTechnicalDescriptionImage] = useState([])

  const [operationalDetails, setOperationalDetails] = useState('')

  const [majorShutDownImage, setMajorShutDownImage] = useState([])

  const [implementationMilestoneImage, setImplementationMilestoneImage] =
    useState([])

  const [projectTimelineImage, setProjectTimelineImage] = useState([])

  const briefOnPurpuse = useAppSelector(
    ({ sectionB }) => sectionB.briefOnPurpuse,
    shallowEqual
  )

  return (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Brief on purpose and general description of project activity "
            placeholder="Write a brief of the implemented registered project activity"
            value={briefOnPurpuse}
            onChange={(event) =>  dispatch(setBriefOnPurpuse(event.target.value))}
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
            onChange={(event) => setTechnicalDescription(event.target.value)}
          />

          <CCDropAndUpload
            mediaTitle="Sample Report - Technical Details"
            mediaItem={SectionB1TechnicalDescription}
            title="Attach Data Tables for Technical Description"
            imageArray={technicalDescriptionImage}
            setImageArray={setTechnicalDescriptionImage}
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
            onChange={(event) => setOperationalDetails(event.target.value)}
          />

          <CCDropAndUpload
            mediaTitle="Sample Report - Shut Down Details"
            title="Attach Data Tables for  Major shut down details"
            mediaItem={SectionB1ShutDownDetails}
            imageArray={majorShutDownImage}
            setImageArray={setMajorShutDownImage}
          />

          <CCDropAndUpload
            mediaTitle="Sample Report - Implementation of Milestones"
            title="Attach Data Tables for  implementation of milestones"
            mediaItem={SectionB1ImplementationOfMilestones}
            imageArray={implementationMilestoneImage}
            setImageArray={setImplementationMilestoneImage}
          />

          <CCDropAndUpload
            mediaTitle="Sample Report - Project Timeline Event Description"
            title="Attach Data Tables for  Project timeline event description"
            mediaItem={SectionB1EventDescription}
            imageArray={projectTimelineImage}
            setImageArray={setProjectTimelineImage}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB1
