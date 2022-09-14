import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import OnBoardingIllustration from '../../assets/Images/illustrations/OnBoardingIllustration.svg'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setLoadWallet } from '../../redux/Slices/walletSlice'
import { Colors } from '../../theme'
import LoadWallet from '../LoadWallet'
import Card from './Card'

const BuyerOnboarding = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography sx={{ color: Colors.tertiary, fontSize: 28 }}>
        Dashboard
      </Typography>
      <Paper elevation={2} sx={{ mt: 2 }}>
        <Box sx={{ color: Colors.darkPrimary1, px: 2, pt: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Typography
              sx={{
                fontSize: 22,

                pb: 2,
              }}
            >
              Welcome!
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Ready to go? Start filling the following forms to complete the
              onboarding process
            </Typography>
          </Box>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Card
                title="Create/Link Wallet"
                content="Create a new wallet or link your already existing wallet to our platform for a smooth transaction process"
                onClickFn={() => dispatch(setLoadWallet(true))}
              />
            </Grid>
            <Grid item xs={6}>
              <Card
                title="Organisational Details"
                content="Complete filling your organisational details to complete the onboarding process"
                buttonText="Resume"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ background: Colors.white, pt: 2 }}>
          <img src={OnBoardingIllustration} width="100%" height="100%" />
        </Box>
      </Paper>
      <LoadWallet />
    </>
  )
}

export default BuyerOnboarding
