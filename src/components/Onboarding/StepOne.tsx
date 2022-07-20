import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import React from 'react'
import { Colors } from '../../theme'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButton from '../../atoms/CCButton'

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    darkPrimary1: true
  }
}

interface StepOneProps {
  step: number
  setStep: (arg: any) => void
}

const StepOne = ({ step, setStep }: StepOneProps) => {
  const navigate = useNavigate()
  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    navigate(pathNames.DASHBOARD, { replace: true })
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
      <Typography style={{ color: Colors.darkPrimary1 }}>
        Company Identification
      </Typography>
      <Grid
        container
        sx={{
          mt: '4px',
        }}
        xs={8}
        rowSpacing={1}
        columnSpacing={2}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Company Name"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Registration Number"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Registered Office"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Principal Place of Business"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Board of Directors"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Senior Management"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Law to which it is subject"
            sx={{
              background: '#DAE5E1',
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#006B5E' } }}
            color="darkPrimary1"
            variant="filled"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="end" sx={{ mt: 2 }} xs={8} spacing={2}>
        <Grid item>
          <CCButton
            sx={{
              // width: '100%',
              // height: '50px',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: 'darkPrimary1.main',
              border: '2px solid',
              borderColor: 'darkPrimary1.main',
            }}
            variant="outlined"
            onClick={handleBack}
          >
            Back
          </CCButton>
        </Grid>
        <Grid item>
          <CCButton
            sx={{ background: Colors.darkPrimary1, color: '#fff' }}
            variant="contained"
            onClick={handleNext}
          >
            Next
          </CCButton>
        </Grid>
      </Grid>
    </>
  )
}

export default StepOne
