import React, { useEffect, useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { transactionCalls } from '../../api/transactionCalls.api'
import CCInputField from '../../atoms/CCInputField'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import Spinner from '../../atoms/Spinner'
import TextButton from '../../atoms/TextButton/TextButton'
import { pathNames } from '../../routes/pathNames'
import { Colors } from '../../theme'

const headings = [
  'Transaction ID',
  'Buy/Sell',
  'Start Date',
  'Time',
  'Quantity(VCOs T)',
  'Unit Price(USD)',
  'Total Amount',
  'Details',
]

const TransactionHistory = () => {
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [dropdown, setDropdown] = useState('All')
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactions, setTransactions] = useState<any>(null)
  const [tableHeading, setTableHeading] = useState<any>(headings)
  const [tableRow, setTableRow] = useState<any>(null)

  console.log('transactions', transactions)

  useEffect(() => {
    getTransactions()
  }, [])
  // useEffect(() => {
  //   if (accountAddress) {
  //     getTransactions()
  //   }
  // }, [accountAddress])

  useEffect(() => {
    if (transactions && transactions.length) {
      const rows = transactions.map((transaction: any, index: number) => {
        const {
          transaction_data: {
            name,
            timestamp,
            values: { amountFilled = '', amountTaken = '' },
          },
          transaction_id,
        } = transaction
        const action = name === 'Make' ? 'Sell' : 'Buy'
        const date = moment.unix(timestamp).format('L')
        const time = moment.unix(timestamp).format('HH:mm:ss')
        const quantity = amountTaken
        const total = amountFilled
        const unitPrice =
          amountFilled && amountTaken
            ? Number(amountFilled) / Number(amountTaken)
            : ''
        return [
          <ShortenedIDComp
            key={index}
            referenceId={transaction_id}
            width="fit-content"
          />,
          action,
          time,
          date,
          quantity,
          unitPrice,
          total,
          <Typography
            key={1}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'underline',
              color: Colors.textColorLightGreen,
              cursor: 'pointer',
            }}
            onClick={() =>
              navigate(pathNames.TRANSACTION_HISTORY, {
                state: {
                  transactionDetails: transaction,
                },
              })
            }
          >
            View
          </Typography>,
        ]
      })
      setTableRow(rows)
    }
  }, [transactions])

  const getTransactions = async () => {
    try {
      setTransactionLoading(true)
      const res: any = await transactionCalls.getTransactionByUser(
        '0x5885A90Aa805548FcF1B1C2B164DB68fFf3db6Fd'
      )
      if (res?.success) {
        setTransactions(res?.data)
      }
    } catch (error) {
      console.log(
        'Error in transactionCalls.getTransactionByUser api : ',
        error
      )
    } finally {
      setTransactionLoading(false)
    }
  }

  return (
    <>
      {transactionLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <Spinner />
        </Box>
      ) : tableRow && tableRow.length > 0 ? (
        <Paper
          sx={{
            width: '100%',
            borderRadius: '8px',
            mt: 5,
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              color: Colors.textColorDarkGreen,
            }}
          >
            Transaction History
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, pb: 2 }}>
            <FormControl>
              <InputLabel
                sx={{
                  color: '#006B5E',
                }}
              >
                Project Type
              </InputLabel>
              <Select
                sx={{
                  width: '180px',
                  mr: 4,
                  color: '#006B5E',
                }}
                value={dropdown}
                onChange={(e) => setDropdown(e.target.value)}
                input={
                  <OutlinedInput
                    sx={{
                      color: '#006B5E',
                    }}
                    label="Project Type"
                  />
                }
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'Buy'}>Buy</MenuItem>
                <MenuItem value={'Sell'}>Sell</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ width: '180px', mr: 4 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                components={{
                  OpenPickerIcon: CalendarMonthOutlinedIcon,
                }}
                renderInput={(params: any) => {
                  return (
                    <CCInputField
                      {...params}
                      style={{ backgroundColor: 'white' }}
                      required={false}
                    />
                  )
                }}
                onChange={(e) => {
                  if (e !== null) {
                    setStartDate(e)
                  }
                }}
              />
            </Box>

            <Box sx={{ width: '180px', mr: 4 }}>
              <DatePicker
                label="End Date"
                value={endDate}
                components={{
                  OpenPickerIcon: CalendarMonthOutlinedIcon,
                }}
                renderInput={(params: any) => {
                  return (
                    <CCInputField
                      {...params}
                      style={{ backgroundColor: 'white' }}
                      required={false}
                    />
                  )
                }}
                onChange={(e) => {
                  if (e !== null) {
                    setEndDate(e)
                  }
                }}
              />
            </Box>

            <TextButton
              title="Search"
              sx={{
                backgroundColor: Colors.darkOrangeBackground,
                boxShadow: 3,
              }}
              textStyle={{ color: Colors.textColorDarkGreen }}
            />
          </Box>

          {transactionLoading ? (
            <CCTableSkeleton sx={{ mt: 2 }} height={40} />
          ) : (
            tableRow &&
            (tableRow.length ? (
              <CCTable
                headings={tableHeading}
                rows={tableRow}
                maxWidth={'100%'}
              />
            ) : (
              <>No data</>
            ))
          )}
        </Paper>
      ) : (
        <EmptyComponent
          photoType={3}
          title="No transaction history!"
          exploreMarketplace
        />
      )}
    </>
  )
}

export default TransactionHistory
