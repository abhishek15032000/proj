import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TablePagination, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface CWTableProps {
  headings: string[]
  rows?: any[]
  maxWidth?: any
  pagination?: boolean
  tableSx?: any
  sx?: any
  loading?: boolean
  data?: boolean
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    background: 'linear-gradient(180deg, #111E17, #02362f)',
    padding: 0,
    color: '#E1E3E1',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: '#000',
    color: '#E1E3E1',
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#000',
  borderRadius: 8,
}))

const CWTable = (props: CWTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(3)
  const [page, setPage] = useState<number>(0)
  const [tableRowData, setTableRowData] = useState<any>()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    if (props?.rows && props?.rows?.length) {
      if (!props?.pagination) {
        setTableRowData(props?.rows)
      } else if (props?.pagination) {
        setTableRowData(
          props?.rows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        )
      }
    }
  }, [props?.rows, page, rowsPerPage])

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 1, minWidth: 700, maxWidth: props.maxWidth, ...props.sx }}
      >
        <Table
          sx={{ minWidth: 700, maxWidth: props.maxWidth, ...props.tableSx }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow data-testid={'cc-table-heading'}>
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
            {tableRowData &&
              tableRowData?.length > 0 &&
              tableRowData.map((row: any, index: number) => (
                <StyledTableRow key={index} data-testid={'cc-table-row'}>
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
        <Box sx={{ borderBottom: '1px solid rgba(0, 0, 2, 0.3)' }}></Box>
        {props?.pagination && props?.rows && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={props?.rows.length}
            rowsPerPage={3}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: '#000',
              color: '#E1E3E1',
              border: 'none',
            }}
          />
        )}
      </TableContainer>
    </>
  )
}
export default CWTable