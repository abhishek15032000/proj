import { Paper, Typography, Box, Grid } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import ProfileCompletion from '../Projects/ProfileCompletion'
import OnBoardingIllustration from '../../assets/Images/illustrations/OnBoardingIllustration.svg'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setLoadWallet } from '../../redux/Slices/walletSlice'

const OnBoardingIssuer = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <Paper elevation={2}>
        <Box sx={{ px: 2, pt: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Typography sx={{ fontSize: 28, fontWeight: 400, pb: 2 }}>
              Welcome!
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
              Ready to go? Start filling the following forms to complete the
              onboarding process
            </Typography>
          </Box>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  minHeight: 210,
                  background: 'rgba(0, 107, 94, 0.05)',
                  borderRadius: 3,
                  px: 2,
                  pt: 2,
                  pb: 3,
                }}
              >
                <Typography
                  sx={{ color: '#1D4B44', fontSize: 22, fontWeight: 400 }}
                >
                  Create/Link Wallet
                </Typography>
                <Typography
                  sx={{
                    color: '#1D4B44',
                    fontSize: 14,
                    fontWeight: 400,
                    py: 2,
                  }}
                >
                  Create a new wallet or link your already existing wallet to
                  our platform for a smooth transaction process
                </Typography>
                <CCButton
                  rounded
                  onClick={() => dispatch(setLoadWallet(true))}
                  sx={{
                    minWidth: 0,
                    padding: '7px 34px',
                    background: '#006B5E',
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Start
                </CCButton>
              </Box>
            </Grid>
            {/* <Grid item xs={6}>
              <Box
                sx={{
                  minHeight: 210,
                  background: 'rgba(0, 107, 94, 0.05)',
                  borderRadius: 3,
                  px: 2,
                  pt: 2,
                  pb: 3,
                }}
              >
                <Typography
                  sx={{ color: '#1D4B44', fontSize: 22, fontWeight: 400 }}
                >
                  KYB/KYC
                </Typography>
                <Typography
                  sx={{
                    color: '#1D4B44',
                    fontSize: 14,
                    fontWeight: 400,
                    py: 2,
                  }}
                >
                  Add your KYB/KYC info to complete the onboarding process
                </Typography>
                <CCButton
                  rounded
                  sx={{
                    minWidth: 0,
                    padding: '7px 34px',
                    background: '#006B5E',
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 500,
                    mt: 2,
                  }}
                >
                  Start
                </CCButton>
              </Box>
            </Grid> */}
          </Grid>
        </Box>
        <Box sx={{ background: '#FFFFFF', pt: 2 }}>
          <img src={OnBoardingIllustration} width="100%" height="100%" />
        </Box>
      </Paper>
    </>
  )
}

export default OnBoardingIssuer
//<Grid container direction="row" justifyContent={'space-between'}>
//  <Grid item xs={9}>

//</Grid>
{
  /*<Grid item xs={3} sx={{ pl: 4 }}>
        <ProfileCompletion />
      </Grid>*/
}
//</Grid>
