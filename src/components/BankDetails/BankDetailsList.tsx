// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
interface BankDetailsListProps {
  allAccountList?: any
  updateBankDetails?: any
  openBankDetailsPopup?: any
  removeBankDetails?: any
}

const BankDetailsList: FC<BankDetailsListProps> = (props) => {
  const {
    allAccountList,
    openBankDetailsPopup,
    updateBankDetails,
    removeBankDetails,
  } = props
  const scrollRef = useHorizontalScroll()
  return (
    <Paper
      sx={{
        width: '100%',
        // height: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        minWidth: '520px',
        mt: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          // height: '100%',
          p: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: Colors.textColorDarkGreen,
            mt: 1,
            ml: 2,
          }}
        >
          My Bank Details
        </Typography>
        <Grid
          container
          // ref={scrollRef}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            // width: '100%',
            // justifyContent: 'space-between',
            // alignItems: 'start',
            mt: 1,
            // overflowY:"",
          }}
        >
          {allAccountList &&
            allAccountList.map((item: any, index: any) => (
              <Grid
                item
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FAFDFA',
                  border: '1px solid #B1CCC6',
                  borderRadius: '12px',
                  padding: '10px',

                  minWidth: '340px',
                  height: '220px',
                  marginLeft: '20px',
                  marginBottom: '10px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    {item?.bankName}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',

                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <Box onClick={() => openBankDetailsPopup(item)}>
                      <EditIcon color="primary" />
                    </Box>
                    <Box
                      style={{ marginLeft: '20px' }}
                      onClick={() => removeBankDetails(item?.uuid)}
                    >
                      <DeleteOutlineIcon color="primary" />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <THTile title="Bank Number:" value={item?.accountNumber} />
                  <THTile title="Account Owner Name:" value={item?.name} />
                  <THTile title="Branch:" value={item?.branch} />
                  <THTile title="IFSC Code:" value={item?.ifscCode} />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Paper>
  )
}

export default BankDetailsList
