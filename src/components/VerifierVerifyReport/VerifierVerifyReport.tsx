// React Imports
import React from 'react'

// MUI Imports
import { Grid, Box, Typography, Divider, Paper } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

// Local Imports
import { VerifierVerifyReportProps } from './VerifierVerifyReport.interface'
import { Colors } from '../../theme'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TextButton from '../../atoms/TextButton/TextButton'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import { DatePicker } from '@mui/x-date-pickers'
import CCInputField from '../../atoms/CCInputField'
import PDFViewer from './PDFViewer'

const VerifierVerifyReport = (props: VerifierVerifyReportProps) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: Colors.background,
      }}
    >
      <Grid container>
        <Grid item xs={12} >
          <BackHeader
            title="Back"
            sx={{ ml: 4, mt: 3, mb: 2 }}
            titleSx={{ fontSize: 14 }}
          />
        </Grid>

        <Paper sx={{ border: '0px solid', flex: 1 }}>
          <Box
            sx={{
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: 400, color: Colors.tertiary }}
            >
              Verify & Submit Conclusive Report
            </Typography>

            <TextButton sx={{ ml: 4 }} title="Sign & Mark Verified" />
          </Box>

          <Divider />

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              mt: 4,
              ml: 4,
            }}
          >
            How much GHG reduction can occur from this project?
          </Typography>

          <CCMultilineTextArea
            sx={{ m: 3, ml: 4, width: '90%' }}
            label="Explain"
            placeholder="Explain it here"
          />

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              ml: 4,
            }}
          >
            How much quantity of CO2e can be authorised for the current month?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Box sx={{ width: '42%', ml: 4 }}>
              <DatePicker
                label="Select Month"
                views={['month']}
                inputFormat="MMMM"
                value={new Date()}
                components={{
                  OpenPickerIcon: CalendarMonthOutlinedIcon,
                }}
                // renderInput={(pa)}
                renderInput={(params) => (
                  <CCInputField
                    {...params}
                    style={{ backgroundColor: 'white' }}
                  />
                )}
                onChange={() => undefined}
              />
            </Box>

            <Box sx={{ width: '43%', ml: 4 }}>
              <CCInputField
                label="Enter Quantity of CO2e"
                variant="outlined"
                // sx={{ mt: 1 }}
                // value={captchaInput}
                // onChange={(e) => setCaptchaInput(e.target.value)}
              />
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              ml: 4,
              mt: 3,
              mb: 2,
            }}
          >
            Please enter next monthly report submission date for issuer
          </Typography>

          <Box sx={{ width: '90%', ml: 4 }}>
            <DatePicker
              label="Next submission date"
              // views={['month']}
              value={new Date()}
              components={{
                OpenPickerIcon: CalendarMonthOutlinedIcon,
              }}
              // renderInput={(pa)}
              renderInput={(params) => {
                return (
                  <CCInputField
                    {...params}
                    style={{ backgroundColor: 'white' }}
                  />
                )
              }}
              onChange={() => undefined}
            />
          </Box>

          <CCDropAndUpload
            mediaTitle={[]}
            title="Attach relevant docs"
            mediaItem={[]}
            imageArray={[]}
            sx={{ m: 4, mr: 5 }}
          />
        </Paper>

        <Box
          sx={{
            height: 'auto',
            border: '0px solid',
            backgroundColor: '#DAE5E1',
            width: '20px',
          }}
        />
        <Paper sx={{ height: '100vh', flex: 1 }}>
          <PDFViewer />
        </Paper>
      </Grid>
    </Box>
  )
}

export default VerifierVerifyReport
