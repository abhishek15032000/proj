import { Grid, Typography, Box, Radio, Paper } from '@mui/material'
import { borderColor } from '@mui/system'

import React, { useState } from 'react'
import CCButton from '../../atoms/CCButton'
import { Colors, Images } from '../../theme'
import TraceDetails from './TraceDetails'

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
  ]

  const [traceOption, setTraceOption] = useState(0)
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection="row"
      sx={{
        my: 10,
        mx: 5,
      }}
      height={'30%'}
    >
      <Typography
        sx={{ color: '#55DBC8', fontSize: 40, fontWeight: 500, mt: -4 }}
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
            'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)',
        }}
      >
        <Grid
          item
          display={'flex'}
          justifyContent={'start'}
          alignItems={'center'}
          flexDirection="column"
          mt={3}
          mr={'20px'}
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
                        'linear-gradient(179.98deg, #B1CCC6 -46.26%, #2ECBB2 154.81%)',
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
                    background: '#006B5E',
                    borderRadius: '8px',
                    heigth: '100px',
                    mt: -8,
                    borderLeft:
                      traceOption === index
                        ? '10px solid #CCE8E1'
                        : '1px solid #006B5E',
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
                      color="White"
                      style={{ width: '30px' }}
                    />
                    <Typography
                      sx={{
                        color: 'white',
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
        />
      </Paper>
    </Grid>
  )
}
export default TraceHistory
