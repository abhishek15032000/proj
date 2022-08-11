import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { CCTableProps } from './CCTable.interface'
import {
  PaginationItem,
  TableFooter,
  TablePagination,
  Typography,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
//import { Box } from '@mui/system'
//import ChevronDownIcon from '@mui/icons-material/ChevronDownIcon'

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
  const [rowsPerPage, setRowsPerPage] = useState<any>(10)
  const [page, setPage] = useState<any>(1)
  const [paginationData, setPaginationData] = useState<any>()

  useEffect(() => {
    //setLength(props?.rows?.length)
    console.log(typeof props?.rows)
  }, [props?.rows])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  //console.log('page:', props?.rows)
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    if (props?.rows && props?.rows?.length) {
      if (!props?.pagination) {
        setPaginationData(props?.rows)
      } else if (props?.pagination) {
        setPaginationData(
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
            {paginationData &&
              paginationData?.length > 0 &&
              paginationData.map((row: any, index: number) => (
                <StyledTableRow key={index}>
                  {row?.length > 0 &&
                    row.map((tdValue: any, tdIndex: number) => (
                      <StyledTableCell key={tdIndex} align="center">
                        {tdValue}
                      </StyledTableCell>
                    ))}
                </StyledTableRow>
              ))}
            {/*{props?.rows && props?.rows?.length > 0 && !props?.pagination
              ? props?.rows
              : paginationData.map((row: any, index: number) => (
                  <StyledTableRow key={index}>
                    {row?.length > 0 &&
                      row.map((tdValue: any, tdIndex: number) => (
                        <StyledTableCell key={tdIndex} align="center">
                          {tdValue}
                        </StyledTableCell>
                      ))}
                  </StyledTableRow>
                ))}*/}
          </TableBody>
        </Table>
        {props?.pagination && props?.rows && (
          <TablePagination
            rowsPerPageOptions={[10, 20]}
            labelRowsPerPage={
              <Typography
                sx={{ color: '#1D4B44', fontSize: 12, fontWeight: 400 }}
              >
                Rows per page:
              </Typography>
            }
            component="div"
            count={props?.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            //SelectProps={{
            //  IconComponent: () => (
            //    <span>
            //      <Box>
            //        <KeyboardArrowUpIcon />
            //      </Box>
            //      <Box>
            //        <KeyboardArrowDownIcon />
            //      </Box>
            //    </span>
            //  ),
            //}}
          />
        )}
      </TableContainer>
    </>
  )
}
export default CCTable
