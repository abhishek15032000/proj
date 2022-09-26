import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTable from '../../atoms/CCTable'
import CCButton from '../../atoms/CCButton'

interface TokenRetirementProjectListProps {}

const TokenRetirementProjectList = (props: TokenRetirementProjectListProps) => {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ py: 2, px: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
              Retire Tokens
            </Typography>
            <CCButton
              rounded
              onClick={() => navigate(pathNames.RETIRE_TOKENS)}
              sx={{
                minWidth: 0,
                backgroundColor: '#F3BA4D',
                color: '#005046',
                padding: '8px 18px',
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              Proceed
            </CCButton>
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Go carbon neutral by retiring carbon tokens and claiming the
            underlying environmental benefit of the carbon offset.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ py: 2, px: 2 }}>
          <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
            Retirement Certificate
          </Typography>

          <CCTable headings={headings} rows={rows} maxWidth={'100%'} />
        </Paper>
      </Grid>
    </>
  )
}

export default TokenRetirementProjectList
const rowItem = [
  '30/08/2022',
  '  14:44:20',
  '7',
  '7',
  'India',
  'Bdce',
  'asdasddfas',
  'asdfalskhdflashldhjnasdsa',
]

const rows = [rowItem, rowItem, rowItem, rowItem]

const headings = [
  '  Date of retirement',
  '  Time',
  'Quantity',
  ' Footprint offset',
  'Country',
  '     Account holder',
  '   Beneficial owner',
  '  Retirement reason',
]
