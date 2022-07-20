import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import CCButton from '../../atoms/CCButton'

declare module '@mui/material/FormLabel' {
  interface FormLabelPropsColorOverrides {
    darkPrimary1: true
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    darkPrimary1: true
  }
}

interface StepThreeProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<any>>
}

const StepThree: React.FC<StepThreeProps> = ({ step, setStep }) => {
  const [value, setValue] = React.useState<Date | null>(null)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  console.log('value', value)

  return (
    <>
      <Typography
        variant="h4"
        sx={{ color: Colors.secondary }}
        component={'div'}
      >
        KYC/KYB
      </Typography>
      <div>Verifying Beneficiaries Identities</div>
      <Grid container xs={8}>
        <Grid item>
          <FormControl>
            <FormLabel
              className="bold-label"
              sx={{ fontWeight: '500' }}
              color="darkPrimary1"
            >
              Choose the UBO’s position within the company
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    sx={{
                      color: Colors.lightPrimary1,
                      '&.Mui-checked': {
                        color: Colors.lightPrimary1,
                      },
                    }}
                  />
                }
                label="Shareholder"
              />
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    sx={{
                      color: Colors.lightPrimary1,
                      '&.Mui-checked': {
                        color: Colors.lightPrimary1,
                      },
                    }}
                  />
                }
                label="Director/Board Member"
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    sx={{
                      color: Colors.lightPrimary1,
                      '&.Mui-checked': {
                        color: Colors.lightPrimary1,
                      },
                    }}
                  />
                }
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
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
            label="First Name"
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
            label="Last Name"
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
            label="Middle Name"
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
          <DatePicker
            label="Basic example"
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                InputLabelProps={{ style: { color: '#006B5E' } }}
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                {...params}
                variant="filled"
                color="darkPrimary1"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Contact Number"
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
            label="Email"
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
      <Box sx={{ marginTop: 2 }}>Identity Verification</Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, py: 5, border: '1px dashed black', borderRadius: 2 }}
        xs={8}
      >
        <Grid item>
          <Box
            sx={{
              padding: '8px 12px',
              backgroundColor: Colors.darkPrimary1,
              color: '#FFF',
              borderRadius: 24,
            }}
          >
            Start Verification Now
          </Box>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              <EmailOutlinedIcon sx={{ cursor: 'pointer' }} />
              <span>Send link via email</span>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" alignItems="center">
              <ContentCopyOutlinedIcon sx={{ cursor: 'pointer' }} />
              <span>Copy link</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="end" sx={{ mt: 2 }} xs={8} spacing={2}>
        <Grid item>
          <CCButton
            sx={{ background: Colors.darkPrimary1, color: '#fff' }}
            variant="contained"
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

export default StepThree
