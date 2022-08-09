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
  { name: 'referenceId', label: 'Reference ID', minWidth: 150 },
  { name: 'createdDt', label: 'Creation Dt', minWidth: 150 },
  { name: 'projectName', label: 'Project Name', minWidth: 150 },
  { name: 'location', label: 'Location', minWidth: 150 },
  { name: 'VerifierStatus', label: 'Verifier Status', minWidth: 150 },
  { name: 'verifier', label: 'Verifier', minWidth: 150 },
  { name: 'action', label: 'Action', minWidth: 150 },
]
const rows = [
  '4337',
  '12/04/21',
  'Trueno River Hydroelectric Power Plant',
  'Vilcum, Chile',
  'Finalised',
  'Climate Finance',
  <CreateOutlinedIcon key={1} />,
]

const DashboardNewProjectsTable = () => {
  return (
    <>
      <TableContainer
        sx={{ minHeight: 140, maxWidth: '100%', overflowX: 'scroll' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headingItems.map((i, index) => (
                <TableCell
                  key={index}
                  sx={{
                    minWidth: i?.minWidth,
                  }}
                >
                  {i?.label}
                </TableCell>
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
