import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import LinearProgressBar from '../../atoms/LinearProgressBar'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { IssuerProjectWelcomePageProps } from './IssuerProjectWelcomePage.interface'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const IssuerProjectWelcomePage = (props: IssuerProjectWelcomePageProps) => {
  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        md={12}
        lg={9}
        component={Paper}
        square
        sx={{ background: 'primary.background', border: '1px solid' }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'row',

            justifyContent: 'space-between',
          }}
        >
          <Grid item sm={12} md={5} sx={{ marginRight: 10 }}>
            <Typography component="div" variant="h5">
              Welcome!
            </Typography>
            <Typography component="div" variant="body1">
              Please complete your profile setup
            </Typography>
          </Grid>

          <Grid item sm={12} md={2} sx={{ marginRight: 10 }}>
            <LinearProgressBar />
          </Grid>
        </Box>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <PaperLabelAndButton
            label="Please complete wallet creation/ linking process"
            endIcon={<ArrowForwardIcon />}
            onClick={() => alert('HI')}
            buttonLabel={'Create/link Wallet'}
          />
          <PaperLabelAndButton
            label="Please complete KYB/KYC process"
            endIcon={<ArrowForwardIcon />}
            onClick={() => alert('HI')}
            buttonLabel={'Do KYB / KYC'}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
export default IssuerProjectWelcomePage

interface PaperLabelAndButtonProps {
  label?: string
  endIcon?: any
  onClick?: () => void
  buttonLabel: string
}
const PaperLabelAndButton = (props: PaperLabelAndButtonProps) => {
  return (
    <Grid item sm={12} md={4}>
      <Paper
        sx={{
          py: 3,
          px: 2,
          background: '#f3f3f3',
          mr: 3,
          minHeight: 150,
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={0}
      >
        <Typography component="div" variant="body1">
          {props.label}
        </Typography>

        <CCButton
          onClick={props.onClick}
          variant="contained"
          text={props.buttonLabel}
          sx={{
            color: 'white',
            // background: 'grey',
            marginTop: 2,
            width: '100%',
          }}
          endIcon={props.endIcon}
        />
      </Paper>
    </Grid>
  )
}
