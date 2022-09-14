import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
  Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../../atoms/ImageComponent/ImageComponent'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import CCButton from '../../../atoms/CCButton'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setAttachExPostTable,
  setDataAndParameterFixedExAnte,
  setDataAndParameterMonitoredExPost,
} from '../../../redux/Slices/MonthlyReport/sectionDMonthly'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import sampleD2 from '../../../assets/Images/sample-d2.png'
import sampleD3 from '../../../assets/Images/sample-d3.png'
import sampleD4 from '../../../assets/Images/sample-d4.png'
const SectionD2: FC = () => {
  const dispatch = useAppDispatch()
  const data_and_parameter_monitored_ExPost = useAppSelector(
    ({ sectionDMonthly }) =>
      sectionDMonthly.data_and_parameter_monitored_ExPost,
    shallowEqual
  )
  const attach_ex_post_table = useAppSelector(
    ({ sectionDMonthly }) => sectionDMonthly.attach_ex_post_table,
    shallowEqual
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    if (currentProjectDetails.section_d.step2.completed) {
      const { data_and_parameter_monitored_ExPost, attach_ex_ante_table } =
        currentProjectDetails.section_d.step2

      dispatch(
        setDataAndParameterMonitoredExPost(data_and_parameter_monitored_ExPost)
      )
      dispatch(setAttachExPostTable(attach_ex_ante_table))
    }
  }, [])

  return (
    <Grid
      container
      sx={{ width: '100%', mt: 3 }}
      columnSpacing={{ xs: 0, md: 1 }}
      rowSpacing={1}
      xs={12}
      md={12}
      lg={12}
      xl={12}
    >
      <CCMultilineTextArea
        // aria-label="minimum height"
        label={'Data and parameters monitored ex-post (actuals)'}
        placeholder="If data for this project is monitored and calculated based on an ex-post method, please explain."
        value={data_and_parameter_monitored_ExPost}
        onChange={(e) =>
          dispatch(setDataAndParameterMonitoredExPost(e?.target?.value))
        }
      />

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={12}
        sx={{ mt: 1 }}
        justifyContent="center"
        alignItems={'center'}
        direction="column"
      >
        <CCDropAndUpload
          mediaTitle={[
            'Sample Report - Monitored ex - post',
            'Sample Report - Project emissions',
            'Sample Report - Leakage emissions',
          ]}
          mediaItem={[sampleD2, sampleD3, sampleD4]}
          title=" Attach datas & parameters fixed ex-ante table"
          imageArray={attach_ex_post_table}
          onImageUpload={(item: any) => {
            dispatch(setAttachExPostTable([item, ...attach_ex_post_table]))
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setAttachExPostTable(
                deleteIndexInArray(attach_ex_post_table, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionD2
