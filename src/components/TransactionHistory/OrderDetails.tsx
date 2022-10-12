// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'

interface OrderDetailsProps {}

const OrderDetails: FC<OrderDetailsProps> = (props) => {
  return (
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
      <Grid container>
        <Grid item md={7}>
          <Box
            sx={{
              width: {
                xs: '95%',
              },
              height: '100%',
              p: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: Colors.textColorDarkGreen,
                  mt: 1,
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
                    title="Transaction ID:"
                    value="21220"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                  <CCTitleValue
                    title="Sell Order  ID:"
                    value="1234"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                  <CCTitleValue
                    title="Order Match Date:"
                    value="11/07/2022"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                  <CCTitleValue
                    title="Order Match Time:"
                    value="17:41:20"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                </Box>
                <Box sx={{ width: '50%' }}>
                  <CCTitleValue
                    title="Unit Price:"
                    value="214"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                  <CCTitleValue
                    title="Quantity:"
                    value="3"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                  <CCTitleValue
                    title="Total Amount:"
                    value="214"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mt: 3, mb: 2 }} />

            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: Colors.textColorDarkGreen,
                  mt: 1,
                }}
              >
                Purchase Details
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
                    title="Sold to:"
                    value="XYZ"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                  <CCTitleValue
                    title="Sold by:"
                    value="ABC"
                    fontWeight={400}
                    fontSize={14}
                    sx={styles.TitleValue}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={5}
          flexDirection="column"
          sx={{
            display: {
              lg: 'flex',
              xs: 'none',
            },
            minHeight: '100%',
            backgroundImage: `url(${TransactionHistoryImg})`,
            flex: 1,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Grid>
    </Paper>
  )
}

export default OrderDetails

const styles = {
  TitleValue: {
    marginTop: 2,
    maxWidth: '250px',
    pr: 2,
    // pl: 1,
  },
}
