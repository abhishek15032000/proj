import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const SectionD: FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Grid>
      <Typography sx={{ marginTop: '64px' }}>
        Data and parameters fixed ex ante or at renewal of crediting period
      </Typography>
      <TextareaAutosize
        // aria-label="minimum height"
        minRows={3}
        // placeholder="Minimum 3 rows"
        style={{
          width: '80%',
          height: '180px',
          borderRadius: '6px',
          marginBottom: '16px',
        }}
      />
      {/* <Typography>Sample data table for reference</Typography>
      <Box
        sx={{ height: '400px', marginTop: '4px', marginBottom: '16px' }}
        component={'img'}
        src={require('../../assets/Images/sample-d.png')}
      /> */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: '270px',
        }}
      >
        <Typography>Attach datas & parameters fixed ex-ante table</Typography>
        <Typography onClick={() => setShowModal(true)} sx={{ textDecoration: 'underline' }}>
          View Sample Data
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '4px' }}>
        <Box sx={{ height: '250px', width: '38%', border: '2px solid' }} />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '250px',
            width: '38%',
            border: '2px dashed',
            marginLeft: '10px',
          }}
        >
          <AddIcon />
          <Typography sx={{ fontSize: 20 }}>Attach More</Typography>
        </Box>
      </Box>

      <SampleModal
        mediaArray={[
          require('../../assets/Images/sample-d1.png'),
          require('../../assets/Images/sample-d2.png'),
          require('../../assets/Images/sample-d3.png'),
          require('../../assets/Images/sample-d4.png'),
        ]}
        stringArray={[
          'Sample Report - Baseline Emissions',
          'Sample Report - Monitored ex - post',
          'Sample Report - Project emissions',
          'Sample Report - Leakage emissions',
        ]}
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Grid>
  )
}

interface SampleModalProps {
  mediaArray: Array<any>
  stringArray: Array<string>
  modalVisibility: boolean
  setModalVisibility: any
}

const SampleModal: FC<SampleModalProps> = (props: SampleModalProps) => {
  const [index, setIndex] = useState(0)

  const counterUp = () => {
    if (index < props.mediaArray.length - 1) {
      setIndex(index + 1)
    }
  }

  const counterDown = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  return (
    <Dialog
      open={props.modalVisibility}
      onClose={() => props.setModalVisibility(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.stringArray[index]}
      </DialogTitle>
      <DialogContent sx={{ width: '600px' }}>
        <Box
          sx={{ height: '400px', marginTop: '4px', marginBottom: '16px' }}
          component={'img'}
          src={props.mediaArray[index]}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <ChevronLeftIcon onClick={counterDown} />
        <Typography
          sx={{
            display: 'flex',
            height: '30px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              height: '30px',
              width: '30px',
              backgroundColor: '#E8E8E8',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
            }}
          >
            {index + 1}
          </Typography>
          {' ' + '/ ' + props.mediaArray.length}
        </Typography>
        <ChevronRightIcon onClick={counterUp} />
      </DialogActions>
    </Dialog>
  )
}

export default SectionD
