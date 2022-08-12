// React Imports
import React, { useState } from 'react'

// MUI Imports
import {
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
  Modal,
  Paper,
} from '@mui/material'
import { Box } from '@mui/system'

// Asset Imports
import DataIssuanceAdd from '../../../assets/Images/Icons/DataIssuanceAdd.png'
import SectionCOrganisationalStructure from '../../../assets/Images/SampleData/SectionCOrganisationalStructure.png'

// Local Components
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setDatasMonitored,
  setMonioringSystem,
  setMonitoringPlan,
  setOrganizationalChartImage,
} from '../../../redux/Slices/sectionCSlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'

const SectionC1 = () => {
  const dispatch = useAppDispatch()

  const monitoringSystem = useAppSelector(
    ({ sectionC }) => sectionC.monitoringSystem,
    shallowEqual
  )

  const monitoringPlan = useAppSelector(
    ({ sectionC }) => sectionC.monitoringPlan,
    shallowEqual
  )

  const organizationalChartImage = useAppSelector(
    ({ sectionC }) => sectionC.organizationalChartImage,
    shallowEqual
  )

  const datasMonitored = useAppSelector(
    ({ sectionC }) => sectionC.datasMonitored,
    shallowEqual
  )

  return (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Description of monitoring system *"
            placeholder="Description of the monitoring system,organisational structure of the team, their roles & responsibilities, training and maintenance"
            value={monitoringSystem}
            onChange={(event) =>
              dispatch(setMonioringSystem(event.target.value))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Monitoring Plan *"
            placeholder="According to registered and the applied methodology, describe plan of monitoring variables"
            value={monitoringPlan}
            onChange={(event) =>
              dispatch(setMonitoringPlan(event.target.value))
            }
          />

          <CCDropAndUpload
            mediaTitle={[
              'Sample Report - Organizational Structure & Responsibilities Chart',
            ]}
            mediaItem={[SectionCOrganisationalStructure]}
            title="Attach organizational structure & responsibilities chart"
            imageArray={organizationalChartImage}
            onImageUpload={(item: any) => {
              dispatch(
                setOrganizationalChartImage([...organizationalChartImage, item])
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setOrganizationalChartImage(
                  deleteIndexInArray(organizationalChartImage, index)
                )
              )
            }}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Specific Datas Monitored *"
            placeholder="According to registered and the applied methodology, specific datas monitored"
            value={datasMonitored}
            onChange={(event) =>
              dispatch(setDatasMonitored(event.target.value))
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default SectionC1
