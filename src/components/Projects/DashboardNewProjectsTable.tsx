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
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import { CircleNotifications } from '@mui/icons-material'
import moment from 'moment'
import DataTablesBriefCase from '../../assets/Images/Icons/DataTablesBriefCase.png'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { limitTitle } from '../../utils/commonFunctions'

const headingItems = [
  {
    index: 'referenceId',
    label: 'Reference ID',
    style: {
      minWidth: 150,
      position: 'sticky',
      top: 0,
      left: 0,
      background: '#CCE8E1',
    },
  },
  {
    index: 'createdDt',
    label: 'Creation Dt',
    style: {
      minWidth: 150,
    },
  },
  {
    index: 'projectName',
    label: 'Project Name',
    style: {
      minWidth: 150,
    },
  },
  {
    index: 'location',
    label: 'Location',
    style: {
      minWidth: 150,
    },
  },
  {
    index: 'VerifierStatus',
    label: 'Verifier Status',
    style: {
      minWidth: 150,
    },
  },
  {
    index: 'verifier',
    label: 'Verifier',
    style: {
      minWidth: 150,
    },
  },
  {
    index: 'action',
    label: 'Action',
    style: {
      minWidth: 150,
    },
  },
]

const DashboardNewProjectsTable = () => {
  const uuid: string = getLocalItem('uuid')

  const [tableRows, setTableRows] = useState<any>()

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    dataCollectionCalls
      .getAllProjects(uuid)
      .then((res: any) => {
        if (res?.data?.success) {
          setTableRows(res?.data?.data.slice(0, 7))
        }
      })
      .catch((e: any) => console.log(e))
  }
  return (
    <>
      <TableContainer
        sx={{
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
                    ...i?.style,
                    background: '#CCE8E1',
                  }}
                >
                  {i?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows &&
              tableRows?.length &&
              tableRows.map((data: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ background: index % 2 === 0 ? '#FFFFFF' : '#E1EEE8' }}
                >
                  <TableCell
                    sx={{
                      position: 'sticky',
                      top: 0,
                      left: 0,
                      background: index % 2 === 0 ? '#FFFFFF' : '#E1EEE8',
                    }}
                  >
                    <Typography
                      textAlign="start"
                      sx={{ fontSize: 15, fontWeight: 500 }}
                    >
                      {limitTitle(data?.uuid, 10)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                      {moment(data?.createdAt).format(`DD/MM/YY`)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                      {data?.company_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                      {data?.location}
                    </Typography>
                  </TableCell>
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
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      key={index}
                      direction={'row'}
                      alignItems="center"
                      justifyContent={'flex-end'}
                    >
                      <img
                        src={DataTablesBriefCase}
                        width="35px"
                        height="35px"
                      />
                      <Typography sx={{ fontSize: 15, fontWeight: 500, pl: 1 }}>
                        Climate Finance
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Box key={index} sx={{ cursor: 'pointer' }}>
                      <ArrowRightIcon />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DashboardNewProjectsTable
