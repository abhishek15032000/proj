import React, { FC, useState } from 'react'
import {
  Box,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
  Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCButton from '../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setAttachExAnteTable,
  setDataAndParameterFixedExAnte,
} from '../../redux/Slices/sectionDSlice'
import { deleteIndexInArray } from '../../utils/commonFunctions'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import sampleAnteTable from '../../assets/Images/sample-d1.png'

const SectionD1: FC = () => {
  const dispatch = useAppDispatch()
  const data_and_parameter_fixed_ExAnte = useAppSelector(
    ({ sectionD }) => sectionD.data_and_parameter_fixed_ExAnte,
    shallowEqual
  )
  const attach_ex_ante_table = useAppSelector(
    ({ sectionD }) => sectionD.attach_ex_ante_table,
    shallowEqual
  )

  const onSubmitSectionA = async () => {
    const payload = {
      _id: '',
      uuid: '',
      project_id: '',
      step1: {},
    }

    payload._id = 'step1'
    payload.uuid = 'b04782d3-2d4a-4f8d-9854-0deac633b1e4'
    payload.project_id = 'step12355'
    payload.step1 = {}

    try {
      const res = await dataCollectionCalls.updateProjectSectionDCall(payload)
      if (res?.success && res?.data) {
        console.log('res', res)
      } else if (res?.error) {
        alert(res?.error)
      }
    } catch (e: any) {
      console.log('Error in authCalls.loginCall api', e)
    }
  }

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
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          // aria-label="minimum height"
          label=" Data and parameters fixed ex ante or at renewal of crediting period"
          placeholder="If data for this project is monitored and calculated based on an ex-ante method, please explain."
          value={data_and_parameter_fixed_ExAnte}
          onChange={(e) =>
            dispatch(setDataAndParameterFixedExAnte(e?.target?.value))
          }
        />
      </Grid>

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
          mediaTitle={['Check Sample Data']}
          mediaItem={[sampleAnteTable]}
          title="Attach datas & parameters fixed ex-ante table"
          imageArray={attach_ex_ante_table}
          onImageUpload={(item: any) => {
            dispatch(setAttachExAnteTable([item, ...attach_ex_ante_table]))
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setAttachExAnteTable(
                deleteIndexInArray(attach_ex_ante_table, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionD1
