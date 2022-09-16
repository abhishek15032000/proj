// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { VerifierDashboardProps } from './VerifierDashboard.interface'
import { Colors } from '../../theme'
import WelcomeIllustration from './WelcomeIllustration'
import ProfileCompletion from './ProfileCompletion'
import { USER } from '../../api/user.api'
import { getLocalItem } from '../../utils/Storage'

const VerifierDashboard = (props: VerifierDashboardProps) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails')?.uuid).then((response) => {
      let count = 0

      if (response?.data?.data?.fullName !== '') {
        count++
      } 
      
      if (response?.data?.data?.email !== '') {
        count++
      } 
      
      if (response?.data?.data?.designation !== '') {
        count++
      } 

      if (response?.data?.data?.phone !== '') {
        count++
      } 
      
      if (response?.data?.data?.address !== '') {
        count++
      } 
      
      if (response?.data?.data?.organisationName !== '') {
        count++
      } 
      
      if (response?.data?.data?.website !== '') {
        count++
      }

      setValue(Math.round(count/7 * 100))
    })
  }, [])

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader sx={{ mb: 2 }} title="Dashboard" iconDisable />
        </Grid>

        <WelcomeIllustration />

        <Grid item xs={3} sx={{ pl: 1 }}>
          <ProfileCompletion value={value} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierDashboard
