// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import TitleValue from '../Profile/TitleValue'
import { getLocalItem } from '../../utils/Storage'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { limitTitle } from '../../utils/commonFunctions'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
interface TransactionListProps {
  tableData?: any
}
const headings = ['Company Name', 'Symbol', 'Token Balance', 'Address']
const TransactionList: FC<TransactionListProps> = (props) => {
  const { tableData } = props

  return (
    <Grid container xs={12} md={12} lg={12} xl={12}>
      <Paper
        sx={{
          width: '100%',

          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '8px',
          minWidth: '520px',
          mt: 2,
          boxShadow: ' 0px 5px 25px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box
          sx={{
            width: '100%',

            p: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 400,
              color: Colors.textColorDarkGreen,
              mt: 1,
              ml: 3,
            }}
          >
            Transaction Details
          </Typography>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',

              mt: 1,
            }}
          >
            <TableContainer sx={{ pl: 2, pb: 2, pt: 2, mr: 3, ml: 1 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#CCE8E1' }}>
                    {headings &&
                      headings.length &&
                      headings.map((tdCell: any, index: number) => (
                        <TableCell
                          key={index}
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            textAlign: 'center',
                          }}
                        >
                          {tdCell}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData &&
                    tableData.length &&
                    tableData.map((row: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          background:
                            index % 2 !== 0
                              ? 'linear-gradient(0deg, rgba(0, 107, 94, 0.05), rgba(0, 107, 94, 0.05)), #FAFDFA'
                              : '#FFFFFF',
                        }}
                      >
                        {row.map((tdValue: any, index: number) => (
                          <TableCell
                            key={index}
                            sx={{
                              border: 'none',
                              fontSize: 12,
                              fontWeight: 300,
                              textAlign: 'center',
                              color: '#2B2B2B',
                            }}
                          >
                            {tdValue}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  )
}

export default TransactionList
