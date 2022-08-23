import React, { FC, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'

const SectionD3: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [briefDescription, setbriefDescription] = React.useState<string>('')

  const onSubmitSectionA = async () => {
    const payload = {
      _id: '',
      uuid: '',
      project_id: '',
      step3: {
        implementation_of_sampling_plan: '',
      },
    }

    payload._id = 'step3'
    payload.uuid = 'b04782d3-2d4a-4f8d-9854-0deac633b1e4'
    payload.project_id = 'step32355'
    payload.step3 = {
      implementation_of_sampling_plan: briefDescription,
    }

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
    <Grid>
      <Typography sx={{ marginTop: '64px' }}></Typography>
      <CCMultilineTextArea
        label={'Implementation of sampling plan'}
        placeholder="Process of Implementation of sampling plan, if applicable"
        value={briefDescription}
        onChange={(e) => setbriefDescription(e?.target?.value)}
      />
    </Grid>
  )
}

export default SectionD3
