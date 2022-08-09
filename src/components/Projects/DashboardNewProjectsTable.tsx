import {
  Grid,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

const headingItems = [
  'Reference ID',
  'Creation Dt',
  'Project Name',
  'Location',
  'Verifier Status',
  'Verifier',
  'Action',
]
const rows = [
  '4337',
  '12/04/21',
  'Trueno River Hydroelectric Power Plant',
  'Vilcum, Chile',
  'Finalised',
  'Climate Finance',
  <CreateOutlinedIcon key={1} />,

  //[
  //  '4337',
  //  '12/04/21',
  //  'Trueno River Hydroelectric Power Plant',
  //  'Vilcum, Chile',
  //  'Finalised',
  //  'Climate Finance',
  //  <CreateOutlinedIcon key={1} />,
  //],
]

const DashboardNewProjectsTable = () => {
  return (
    <>
      <TableContainer
        sx={{ minHeight: 140, width: '100%', overflow: 'hidden' }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headingItems.map((i, index) => (
                <TableCell key={index}>{i}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {rows.map((i, index) => (
                <TableCell key={index}>{i}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DashboardNewProjectsTable
