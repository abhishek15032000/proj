import React from 'react'
import { TwoFaProps } from './TwoFa.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import AccountCreatedImage from '../../assets/Images/AccountCreatedImage.png'
import { Images } from '../../theme'
import CCButton from '../../atoms/CCButton'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

const StepTwoTwoFa = (props: TwoFaProps) => {
  const navigate = useNavigate()
  return (
    <Grid
      container
      sx={{ height: '100vh', p: 0, overflow: 'hidden' }}
      justifyContent="center"
      //   alignItems="center"
    >
      <Grid item xs={12}>
        <Box
          sx={{
            mt: 20,
            display: 'flex',
            flexDirection: 'column',
            // height: '60vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid sx={{ pt: 1 }}>
            <img src={Images.check1} />
          </Grid>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 40,
            }}
          >
            Congratulations
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Your account has been successfully created
          </Typography>

          <CCButton sx={{ mt: 2 }} onClick={() => navigate(pathNames.LOGIN)}>
            {' '}
            Proceed{' '}
          </CCButton>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          textAlign: 'center',
          width: '100%',
          justifyContent: 'center',
          //   alignContent: 'baseline',
          height: 'auto',
          position: 'relative',
        }}
      >
        <img
          src={Images.illustration3}
          style={{
            // position: 'absolute',
            display: 'flex',
            alignSelf: 'flex-end',
            height: 'auto',
            // right: '25%',

            maxWidth: '630px',
          }}
        />
      </Grid>
    </Grid>
  )
}

export default StepTwoTwoFa
