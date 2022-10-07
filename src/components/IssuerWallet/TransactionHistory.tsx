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
import NoData from '../../atoms/NoData/NoData'

const headings = [
  'Transaction ID',
  'Buy/Sell',
  'Date',
  'Time',
  'Quantity(VCOs T)',
  'Unit Price(USD)',
  'Total Amount',
  'Details',
]

interface TransactionHistoryProps {}

const TransactionHistory = (props: TransactionHistoryProps) => {
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [dropdown, setDropdown] = useState('All')
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactions, setTransactions] = useState<any>(null)
  const [tableHeading, setTableHeading] = useState<any>(headings)
  const [tableRow, setTableRow] = useState<any>(null)

  useEffect(() => {
    getTransactions()
  }, [])

  const loadTableData = (transactionsData: any) => {
    const tableData: any = []

    transactionsData.map((item: any, index: number) => {
      const amountTaken =
        item.transaction_data?.values?.amountTaken !== undefined
          ? item.transaction_data?.values?.amountTaken
          : '-'

      const amountFilled =
        item.transaction_data?.values?.amountFilled !== undefined
          ? item.transaction_data?.values?.amountFilled
          : '-'

      const unitPrice =
        Number(item.transaction_data?.values?.amountFilled) /
        Number(item.transaction_data?.values?.amountTaken)

      tableData.push([
        <ShortenedIDComp
          key={index}
          referenceId={item.transaction_id}
          width="fit-content"
        />,
        item.transaction_data?.name === 'Make' ? 'Sell' : 'Buy',
        moment.unix(item.transaction_data?.timestamp).format('DD/MM/YYYY'),
        moment.unix(item.transaction_data?.timestamp).format('HH:mm:ss'),
        amountTaken,
        isNaN(unitPrice) ? '-' : unitPrice,
        amountFilled,
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
                transactionDetails: item,
              },
            })
          }
        >
          View
        </Typography>,
      ])
    })

    if (tableData.length > 0) {
      setTableRow(tableData)
    } else {
      setTableRow([{}])
    }
  }

  const filterTable = () => {
    const filteredData: any = []

    transactions.map((item: any, index: number) => {
      const dateFilter = moment(
        moment.unix(item.transaction_data.timestamp).toISOString()
      ).isBetween(startDate, endDate)

      let dropDownFilter

      if (dropdown === 'Sell') {
        dropDownFilter = item.transaction_data.name === 'Make'
      } else if (dropdown === 'Buy') {
        dropDownFilter = item.transaction_data.name === 'Fill'
      } else if (dropdown === 'All') {
        dropDownFilter = true
      }

      if (dropDownFilter && dateFilter) {
        filteredData.push(item)
      }
    })

    loadTableData(filteredData)
  }

  const getTransactions = async () => {
    try {
      setTransactionLoading(true)
      const res: any = await transactionCalls.getTransactionByUser(
        '0x5885A90Aa805548FcF1B1C2B164DB68fFf3db6Fd'
      )
      if (res?.success) {
        loadTableData(res?.data)
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
          onClick={filterTable}
        />
      </Box>

      {transactionLoading && <CCTableSkeleton sx={{ mt: 2 }} height={40} />}

      {!transactionLoading &&
        transactions?.length > 0 &&
        Object.keys(tableRow[0]).length > 0 && (
          <CCTable headings={tableHeading} rows={tableRow} maxWidth={'100%'} />
        )}

      {!transactionLoading &&
        transactions?.length > 0 &&
        Object.keys(tableRow[0]).length === 0 && (
          <NoData title="Try using different filters" />
        )}

      {!transactionLoading && transactions?.length === 0 && (
        <EmptyComponent
          photoType={3}
          title="No transaction history!"
          exploreMarketplace
        />
      )}
    </Paper>
  )
}

export default TransactionHistory
