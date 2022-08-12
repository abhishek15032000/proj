import {
  Grid,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import { CircleNotifications } from '@mui/icons-material'

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
]

const DashboardNewProjectsTable = () => {
  //const uuid: string = getLocalItem('uuid')

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    //Api integrated but should make some more changes after api is modified
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
                    //background: `${i?.index === 'referenceId' && 'white'}`,
                    background: '#CCE8E1',
                    color: '#000000',
                  }}
                >
                  {i?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 4).map((i, index) => (
              <TableRow
                key={index}
                sx={{
                  background: `${index % 2 === 0 ? '#FFFFFF' : '#E1EEE8'}`,
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                <TableCell
                  sx={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    //background: 'white',
                    background: `${index % 2 === 0 ? '#FFFFFF' : '#E1EEE8'}`,
                    boxShadow: '0 0 0 15px rgba(0,0,0,19)',
                  }}
                >
                  {i?.ref}
                </TableCell>
                <TableCell>{i?.createdDt}</TableCell>
                <TableCell>{i?.projectName}</TableCell>
                <TableCell>{i?.location}</TableCell>
                <TableCell>
                  <Chip
                    sx={{ backgroundColor: '#75F8E4' }}
                    key="1"
                    icon={
                      <CircleNotifications
                        fontSize="small"
                        style={{ color: '#00A392' }}
                      />
                    }
                    label={'Finalised'}
                    //label={i?.verifierStatus}
                  />
                  {/*{i?.verifierStatus}*/}
                </TableCell>
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
