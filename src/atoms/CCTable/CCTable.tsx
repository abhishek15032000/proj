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
import { TablePagination, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { headings } from '../../components/IssuanceDataCollectionHelp/data'
import EmptyComponent from '../EmptyComponent/EmptyComponent'
import { Colors } from '../../theme'
import './index.css'

const StyledTableCell = styled(TableCell)((props) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#DAF7F0',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&:last-child': {
    paddingRight: '24px',
  },
  color: Colors.black,
  border: 'none',
  padding: '20px 0 20px 24px',
}))
const TrimmedStyledTableCell = styled(TableCell)((props) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#DAF7F0',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // maxWidth: '70px',
    // textAlign: 'left',
  },
}))

const StyledTableRow = styled(TableRow)((props) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: '#E1EEE8',
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
  },
  borderBottom: '0.4px solid #C4C7C5',
}))

const CCTable = (props: CCTableProps) => {
  const {
    rows,
    rowsPerPageProp = 10,
    hideScrollbar = false,
    lastTwoColsSticky = false,
  } = props

  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageProp)
  const [page, setPage] = useState<number>(0)
  const [tableRowData, setTableRowData] = useState<any>()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
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

  useEffect(() => {
    setPage(0)
  }, [rows])

  // const middleEllipsis = (text: string, split = 3, dotnumber = 3) => {
  //   if (!text || text.length <= 10) {
  //     return text
  //   }
  //   const sz = Math.floor(text.length / split)
  //   return text.slice(0, sz) + ''.padStart(dotnumber, '.') + text.slice(-sz)
  // }

  return (
    <>
      {rows?.length ? (
        <TableContainer
          className={`${hideScrollbar ? 'hide-scrollbar' : ''}`}
          component={Paper}
          sx={{
            mt: 1,
            // minWidth: 700,
            maxWidth: props.maxWidth,
            // width: '100%',
            ...props.sx,
          }}
        >
          <Table
            sx={{
              // minWidth: 700,
              // width: '100%',
              maxWidth: props.maxWidth,
              ...props.tableSx,
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow data-testid={'cc-table-heading'}>
                {props?.headings &&
                  props?.headings?.length > 0 &&
                  props?.headings?.map((heading: any, index: number) => (
                    <StyledTableCell
                      key={index}
                      className={`${
                        lastTwoColsSticky &&
                        index === props?.headings.length - 1
                          ? 'sticky-last-column'
                          : lastTwoColsSticky &&
                            index === props?.headings.length - 2
                          ? 'sticky-second-last-column'
                          : ''
                      }`}
                    >
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
                      row.map((tdValue: any, tdIndex: number) => {
                        // return
                        // typeof tdValue === 'string' &&
                        //   !tdValue.includes('/') ? (
                        //   <TrimmedStyledTableCell key={tdIndex} align="center">
                        //     {/* {
                        //         // middleEllipsis(
                        //           //   tdValue,
                        //           //   tdValue.length > 21 ? 7 : 1,
                        //           //   tdValue.length > 21 ? 7 : 1
                        //           // )}
                        //           tdValue
                        //         } */}
                        //     <Tooltip title={tdValue}>
                        //       <Box
                        //         sx={{
                        //           whiteSpace: 'nowrap',
                        //           overflow: 'hidden',
                        //           textOverflow: 'ellipsis',
                        //           maxWidth: '70px',
                        //         }}
                        //       >
                        //         {tdValue}
                        //       </Box>
                        //     </Tooltip>
                        //   </TrimmedStyledTableCell>
                        // ) : (
                        return (
                          <StyledTableCell
                            key={tdIndex}
                            align="left"
                            className={`${
                              lastTwoColsSticky && tdIndex === row.length - 1
                                ? 'sticky-last-column'
                                : lastTwoColsSticky &&
                                  tdIndex === row.length - 2
                                ? 'sticky-second-last-column'
                                : ''
                            }`}
                          >
                            {tdValue}
                          </StyledTableCell>
                        )
                        // )
                      })}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          {props?.pagination && props?.rows && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage={
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  Rows per page:
                </Typography>
              }
              component="div"
              count={props?.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                '.MuiTablePagination-actions': {
                  //next icons
                  color: '#000000',
                },
                '.MuiTablePagination-selectIcon': {
                  //rows per page arrows
                  color: '#000000',
                  //<check />
                },
                '.MuiTablePagination-select': {
                  //color of numbers in rows per page
                  color: '#000',
                },
                '.MuiTablePagination-displayedRows': {
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#000000',
                },
              }}
            />
          )}
        </TableContainer>
      ) : (
        <EmptyComponent elevation={0} />
      )}
    </>
  )
}
export default CCTable
