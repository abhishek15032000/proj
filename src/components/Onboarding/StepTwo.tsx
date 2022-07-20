import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Colors } from '../../theme'

interface StepTwoProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<any>>
}

const StepTwo: React.FC<StepTwoProps> = ({ step, setStep }) => {
  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{ color: Colors.secondary }}
        component={'div'}
      >
        KYC/KYB
      </Typography>
      <div>Upload Company Documents</div>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Articles of Association or other Governing Documents</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Proof of Legal Existence</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Documents Disclosing Beneficial Ownership Structure</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Proof of Registered & Physical Address</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid container justifyContent="end" sx={{ mt: 2 }} xs={8} spacing={2}>
        <Grid item>
          <Button
            sx={{ background: Colors.darkPrimary1, color: '#fff' }}
            variant="contained"
            onClick={handleBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{ background: Colors.darkPrimary1, color: '#fff' }}
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepTwo
