import { Grid, Typography, Box, Radio, Paper } from '@mui/material'
import { borderColor } from '@mui/system'

import React, { useEffect, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { ROLES } from '../../../config/constants.config'
import { Colors, Images } from '../../../theme'
import { getLocalItem } from '../../../utils/Storage'
import TraceDetails from './TraceDetails'
import './TraceHistory.css'
const TraceHistory = () => {
  const data = [
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectRole: 'Project Developer, Allenghey Trust',
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectRole: 'Project Developer, Allenghey Trust',
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectRole: 'Project Developer, Allenghey Trust',
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectRole: 'Project Developer, Allenghey Trust',
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectRole: 'Project Developer, Allenghey Trust',
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectRole: 'Project Developer, Allenghey Trust',
    },
  ]

  const [traceOption, setTraceOption] = useState(0)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const role = getLocalItem('loggedIn')?.roles
    role && role[0] === ROLES.REGISTRY && setTheme('')
  }, [])

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection="row"
      sx={{
        p: 10,
        background:
          theme === 'dark'
            ? 'linear-gradient(180deg, #111E17 9.55%, rgba(7, 19, 13, 0.79) 100%)'
            : '#FFFFFF',
      }}
      height={'30%'}
    >
      <Typography
        sx={{
          color: theme === 'dark' ? '#55DBC8' : '#1D4B44',
          fontSize: '32px',
          fontWeight: 500,
          mt: -4,
        }}
      >
        Trace History
      </Typography>
      <Paper
        sx={{
          mt: 4,
          height: '30%',
          widht: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          p: 4,

          background:
            theme === 'dark'
              ? 'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)'
              : '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Grid
          item
          display={'flex'}
          justifyContent={'start'}
          alignItems={'center'}
          flexDirection="column"
          mt={3}
          px={'20px'}
          height={'520px'}
          py={5}
          overflow="auto"
          className="scroll-container"
        >
          {data &&
            data.length > 0 &&
            data.map((item: any, index: any) => (
              <Grid
                container
                display={'flex'}
                justifyContent={'start'}
                alignItems={'center'}
                flexDirection="row"
                sx={{ mx: 2 }}
                key={index}
              >
                <Grid
                  item
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection="column"
                  display={'flex'}
                  width={'10%'}
                  // height={'50px'}
                >
                  <Box
                    sx={{
                      height: '20px',
                      width: '20px',
                      borderRadius: '20px',
                      border:
                        traceOption === index
                          ? '1px solid #CCE8E1'
                          : '1px solid #006B5E',
                      backgroundColor: '#006B5E',
                    }}
                  ></Box>
                  <Box
                    sx={{
                      height: '70px',
                      width: '4px',
                      background:
                        theme === 'dark'
                          ? 'linear-gradient(179.98deg, #B1CCC6 -46.26%, #2ECBB2 154.81%)'
                          : '#CCE8E1',
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection="row"
                  width={'90%'}
                  sx={{
                    py: 2,
                    px: 4,
                    background:
                      theme === 'dark'
                        ? '#006B5E'
                        : traceOption === index
                        ? ' #CCE8E1'
                        : '#FAFDFA',
                    borderRadius: '8px',
                    heigth: '100px',
                    mt: -8,
                    borderLeft:
                      theme === 'dark'
                        ? traceOption === index
                          ? '10px solid #CCE8E1'
                          : '10px solid #006B5E'
                        : traceOption === index
                        ? '10px solid #55DBC8'
                        : '10px solid transparent',
                  }}
                  onClick={() => setTraceOption(index)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      data-testid="logo-img"
                      className="logoImage"
                      src={Images.user}
                      color={theme === 'dark' ? 'White' : '#3F4946'}
                      style={{ width: '30px' }}
                    />
                    <Typography
                      sx={{
                        color:
                          theme === 'dark'
                            ? 'white'
                            : traceOption === index
                            ? '#3F4946'
                            : '#191C1B',
                        fontSize: 14,
                        fontWeight: 400,
                        ml: 1,
                      }}
                    >
                      {item?.projectRole}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
        </Grid>
        <TraceDetails
          traceOption={traceOption}
          setTraceOption={(item: any) => setTraceOption(item)}
          theme={theme}
        />
      </Paper>
    </Grid>
  )
}
export default TraceHistory
