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
import React, { useEffect } from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'

const Styles = {
  staticScroll: {
    position: 'sticky',
    top: 0,
    left: 0,
  },
}
const headingItems = [
  {
    index: 'referenceId',
    label: 'Reference ID',
    minWidth: 150,
    rowData: [4337, 4337, 4337],
    //Styles: { background: 'red', minWidth: 150 },
  },
  {
    index: 'createdDt',
    label: 'Creation Dt',
    minWidth: 150,
    rowData: ['12/04/21', '12/04/21'],
  },
  { index: 'projectName', label: 'Project Name', minWidth: 150 },
  { index: 'location', label: 'Location', minWidth: 150 },
  { index: 'VerifierStatus', label: 'Verifier Status', minWidth: 150 },
  { index: 'verifier', label: 'Verifier', minWidth: 150 },
  { index: 'action', label: 'Action', minWidth: 150 },
]
const rows = [
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  {
    ref: '4337',
    createdDt: '12/04/21',
    projectName: 'Trueno River Hydroelectric Power Plant',
    location: 'Vilcum, Chile',
    verifierStatus: 'Finalised',
    verifier: 'Climate Finance',
    action: <CreateOutlinedIcon key={1} />,
  },
  //'4337',
  //'12/04/21',
  //'Trueno River Hydroelectric Power Plant',
  //'Vilcum, Chile',
  //'Finalised',
  //'Climate Finance',
  //<CreateOutlinedIcon key={1} />
]

const DashboardNewProjectsTable = () => {
  const uuid: string = getLocalItem('uuid')

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    //dataCollectionCalls
    //  .getAllProjects(uuid)
    //  .then((res: any) => console.log('res:', res))
  }

  return (
    <>
      <TableContainer
        sx={{
          //minHeight: 140,
          maxWidth: '100%',
          overflowX: 'scroll',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headingItems.map((i) => (
                <TableCell
                  key={i?.index}
                  sx={{
                    minWidth: i?.minWidth,
                    position: `${i?.index === 'referenceId' && 'sticky'}`,
                    top: `${i?.index === 'referenceId' && '0'}`,
                    left: `${i?.index === 'referenceId' && '0'}`,
                    background: `${i?.index === 'referenceId' && 'white'}`,
                  }}
                >
                  {i?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((i, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    background: 'white',
                    boxShadow: '0 0 0 15px rgba(0,0,0,19)',
                  }}
                >
                  {i?.ref}
                </TableCell>
                <TableCell>{i?.createdDt}</TableCell>
                <TableCell>{i?.projectName}</TableCell>
                <TableCell>{i?.location}</TableCell>
                <TableCell>{i?.verifierStatus}</TableCell>
                <TableCell>{i?.verifier}</TableCell>
                <TableCell>{i?.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DashboardNewProjectsTable
