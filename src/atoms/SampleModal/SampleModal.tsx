import React, { FC, useState } from 'react'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

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

export default SampleModal
