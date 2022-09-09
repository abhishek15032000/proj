// React Imports
import React from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { TransactionHistoryProps } from './TransactionHistory.interface'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'

const TransactionHistory = (props: TransactionHistoryProps) => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Transaction History" />
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              width: '100%',
              height: '450px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '8px',
              mt: 2,
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: Colors.textColorDarkGreen,
                  }}
                >
                  Order Details
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '50%' }}>
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                    <CCTitleValue
                      title="Transaction ID :"
                      value="21220"
                      fontWeight={400}
                      fontSize={14}
                      sx={styles.TitleValue}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              component="img"
              sx={{ width: '50%' }}
              src={TransactionHistoryImg}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TransactionHistory

const styles = {
  TitleValue: {
    marginTop: 1,
    width: '250px',
  },
}
