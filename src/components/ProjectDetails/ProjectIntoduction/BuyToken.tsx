import { Grid, Typography, Box, Paper } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors, Images } from '../../../theme'
import TitleValue from '../../Profile/TitleValue'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { projectDetailsCalls } from '../../../api/projectDetailsCalls.api'
import BlockchainCalls from '../../../blockchain/Blockchain'
import LoderOverlay from '../../LoderOverlay'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { pathNames } from '../../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

interface BuyTokenProps {
  goingUp?: any
  projectDetailsData?:any
}
const BuyToken = (props: BuyTokenProps) => {
  const navigate = useNavigate()
  
  const { goingUp, projectDetailsData } = props
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  return (
    <Paper
    sx={{
      background:
      onWebApp ? "#fff":`radial-gradient(230.87% 7320.24% at -130.87% 216.67%, #75F8E4 0%, #349386 56.94%, #01443C 100%)`,
      borderRadius: '5px',
      display: 'flex',
      flexDirection:  goingUp ?'row':'column',
      justifyContent: goingUp ? 'space-around' : 'space-between',
      alignItems: goingUp ? 'center':'flex-start',
      pt: 2,
      px: goingUp ? 38 : 2,
      pb: 3,
      height: goingUp ? '20%' :'auto',
      width: goingUp ? '100%' : '50%',

      mx: goingUp ? 0 : 45,
      position: goingUp ? 'fixed' : 'absolute',

      top: goingUp ? '10px' : '90%',
      zIndex: 1000,
      transition:"width 0.3s ease",
      left: 5,
      right: 0,
    }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
          p:5,
          width: '100%',
        }}
      >
        <TitleValue
          title={'Tokens Available for Purchase :'}
          value={'04'}
          valueStyle={{
            fontWeight: 500,
            color: 'textColor2.main',
            textAlign: 'right',
            mb: 2,
          }}
          titleStyle={{ fontWeight: 500, color: 'textColor2.main', mb: 2 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Typography
              sx={{ fontWeight: 500, fontSize: 14, color: 'textColor2.main' }}
            >
              {'Unit Price :'}
            </Typography>
            <InfoOutlinedIcon
              sx={{ fontSize: 20, ml: 1 }}
              htmlColor={'textColor2.main'}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              ml: 1,
              color: 'textColor2.main',
              textAlign: 'right',
            }}
          >
            {/* {props.value === undefined || props.value === '' ? '-' : props.value} */}
            {'144'}
          </Typography>
        </Box>
      </Box>
       <Grid container xs={12} sx={{justifyContent:'flex-end'}}> 
      <CCButton
      variant='contained'
        sx={{
          width:goingUp? '250px': '100%',
          height: '40px',
          backgroundColor: onWebApp ? Colors.accent:'#75F8E4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '100px',
          mt: 2,
          boxShadow:'0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
          mx:5
        }}
        onClick={() =>
          navigate(pathNames.MARKETPLACE, {
            state: {
              projectID: projectDetailsData?._id,
              projectUUID: projectDetailsData?.uuid,
            },
          })
        }
      >
        <Typography   sx={{ color:'primary.main', fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
          {'Buy Tokens'}
        </Typography>
      </CCButton>
      </Grid>
    
    </Paper>
  )
}
export default BuyToken
