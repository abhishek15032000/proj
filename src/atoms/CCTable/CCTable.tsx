import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { CCTableProps } from './CCTable.interface'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#BCE2D2',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E1EEE8',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CCTable = (props: CCTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 1, minWidth: 700, maxWidth: props.maxWidth }}
    >
      <Table
        sx={{ minWidth: 700, maxWidth: props.maxWidth }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {props?.headings &&
              props?.headings?.length > 0 &&
              props?.headings?.map((heading, index) => (
                <StyledTableCell key={index} align="center">
                  {heading}
                </StyledTableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.rows &&
            props?.rows?.length > 0 &&
            props?.rows?.map((row, index) => (
              <StyledTableRow key={index}>
                {row?.length > 0 &&
                  row.map((tdValue: any, tdIndex: number) => (
                    <StyledTableCell key={tdIndex} align="center">
                      {tdValue}
                    </StyledTableCell>
                  ))}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CCTable