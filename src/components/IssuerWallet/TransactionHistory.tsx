// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Select, MenuItem } from '@mui/material'
import { Colors } from '../../theme'
import CCTable from '../../atoms/CCTable'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { DatePicker } from '@mui/x-date-pickers'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'

// Local Imports

interface TransactionHistoryProps {}

const TransactionHistory: FC<TransactionHistoryProps> = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [dropdown, setDropdown] = useState('All')

  return (
    <Paper
      sx={{
        width: '100%',
        // height: '100px',
        borderRadius: '8px',
        mt: 5,
        p: 2,
      }}
    >
      <Typography
        sx={{ fontSize: 18, fontWeight: 400, color: Colors.textColorDarkGreen }}
      >
        Transaction History
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, pb: 2 }}>
        <Select
          sx={{ width: '180px', mr: 4 }}
          value={dropdown}
          label="Buy/Sell"
          onChange={(e) => setDropdown(e.target.value)}
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Buy'}>Buy</MenuItem>
          <MenuItem value={'Sell'}>Sell</MenuItem>
        </Select>

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
          sx={{ backgroundColor: Colors.darkOrangeBackground, boxShadow: 3 }}
          textStyle={{ color: Colors.textColorDarkGreen }}
        />
      </Box>

      <CCTable headings={headings} rows={rows} maxWidth={'100%'} />
    </Paper>
  )
}

export default TransactionHistory

const rowItem = [
  '200',
  'Sell',
  '11/07/2022',
  '11/07/2022',
  '17:41:20',
  '10',
  '3',
  '214',
  <Typography
    key={1}
    sx={{
      fontSize: 16,
      fontWeight: 600,
      textDecoration: 'underline',
      color: Colors.textColorLightGreen,
    }}
  >
    View
  </Typography>,
]

const rows = [rowItem, rowItem, rowItem, rowItem]

const headings = [
  'Order ID',
  'Buy/Sell',
  'Start Date',
  'End Date',
  'Time',
  'Quantity(VCOs T)',
  'Unit Price(USD)',
  'Total Amount',
  'Details',
]
