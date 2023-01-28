import { Grid, Typography, Box, Paper } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors, Images } from '../../../theme'
import TitleValue from '../../Profile/TitleValue'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { projectDetailsCalls } from '../../../api/projectDetailsCalls.api'
import BlockchainCalls from '../../../blockchain/Blockchain'
import LoderOverlay from '../../LoderOverlay'

interface BuyTokenProps {
  goingUp?: any
}
const BuyToken = (props: BuyTokenProps) => {
  const { goingUp } = props

  return (
    <Paper
      sx={{
        background:
          'radial-gradient(230.87% 7320.24% at -130.87% 216.67%, #75F8E4 0%, #349386 56.94%, #01443C 100%)',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: goingUp ? 'space-around' : 'space-between',
        alignItems: 'center',
        pt: 2,
        px: goingUp ? 38 : 2,
        pb: 3,
        height: '20%',
        width: goingUp ? '100%' : '50%',

        mx: goingUp ? 0 : 45,
        position: goingUp ? 'fixed' : 'absolute',

        top: goingUp ? '0' : '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <TitleValue
          title={'Tokens Available for Purchase :'}
          value={'04'}
          valueStyle={{
            fontWeight: 500,
            color: Colors.white,
            textAlign: 'right',
            mb: 2,
          }}
          titleStyle={{ fontWeight: 500, color: Colors.white, mb: 2 }}
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
              sx={[{ fontWeight: 400, fontSize: 14, color: Colors.white }]}
            >
              {'Unit Price :'}
            </Typography>
            <InfoOutlinedIcon
              sx={{ fontSize: 20, ml: 1 }}
              htmlColor={Colors.white}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              ml: 1,
              color: Colors.white,
              textAlign: 'right',
            }}
          >
            {/* {props.value === undefined || props.value === '' ? '-' : props.value} */}
            {'144'}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '150px',
          height: '40px',
          backgroundColor: '#75F8E4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          mt: 2,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
          {'Buy Tokens'}
        </Typography>
      </Box>
    </Paper>
  )
}
export default BuyToken
