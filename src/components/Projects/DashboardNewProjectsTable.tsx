import {
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Typography,
  Grid,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import moment from 'moment'
import DataTablesBriefCase from '../../assets/Images/Icons/DataTablesBriefCase.png'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { limitTitle } from '../../utils/commonFunctions'
import { useAppDispatch } from '../../hooks/reduxHooks'
import {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
} from '../../redux/Slices/issuanceDataCollection'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import CircleIcon from '@mui/icons-material/Circle'
import { addSectionPercentages } from '../../utils/newProject.utils'
import DashboardPencil from '../../assets/Images/Icons/DashboardPencil.png'

const headingItems = [
  {
    index: 'referenceId',
    label: 'Reference ID',
    style: {
      minWidth: 150,
      position: 'sticky',
      zindex: 1999,
      top: 0,
      left: 0,
      background: '#CCE8E1',
      display: 'block',
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
      minWidth: 270,
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
      minWidth: 180,
    },
  },
  {
    index: 'action',
    label: 'Action',
    style: {
      minWidth: 130,
    },
  },
]
interface DashboardNewProjectsTableProps {
  tableRows: any
  loading: boolean
}

const DashboardNewProjectsTable = (props: DashboardNewProjectsTableProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [showBorder, setShowBorder] = useState<boolean>(false)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (
      event.currentTarget.scrollLeft < 474 &&
      event.currentTarget.scrollLeft >= 2
    ) {
      setShowBorder(true)
    } else if (event.currentTarget.scrollLeft < 2) {
      setShowBorder(false)
    }
  }

  const openProjectDetails = (projectDetails: any) => {
    if (projectDetails) {
      dispatch(setCurrentProjectDetailsUUID(projectDetails?.uuid))
      dispatch(setCurrentProjectDetails(projectDetails))
      navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
    }
  }

  return (
    <>
      {props?.loading ? (
        <CCTableSkeleton height={40} />
      ) : (
        <TableContainer
          onScroll={handleScroll}
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
              {props?.tableRows &&
                props?.tableRows?.length > 0 &&
                props?.tableRows.map((data: any, index: number) => (
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
                        sx={{
                          pl: 1,
                          backgroundColor:
                            data?.project_status === 3 ? '#75F8E4' : '#DAE5E1',
                        }}
                        key="1"
                        icon={
                          <CircleIcon
                            sx={{
                              fontSize: 10,
                              color:
                                data?.project_status === 3
                                  ? '#00A392'
                                  : '#96B1AB',
                            }}
                          />
                        }
                        label={
                          data?.project_status === 0
                            ? 'Yet to select'
                            : data?.project_status === 1 ||
                              data?.project_status === 2
                            ? 'Selected'
                            : data?.project_status === 3 && 'Finalised'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        key={index}
                        direction={'row'}
                        alignItems="center"
                        justifyContent={'flex-start'}
                      >
                        {data?.verifier_details_id && (
                          <img
                            src={DataTablesBriefCase}
                            width="35px"
                            height="35px"
                          />
                        )}
                        <Typography
                          textAlign={'start'}
                          sx={{ fontSize: 15, fontWeight: 500, pl: 1 }}
                        >
                          {data?.project_status === 3 &&
                          data?.verifier_details_id
                            ? data?.verifier_details_id?.verifier_name
                            : '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Grid container flexDirection="row" alignItems={'center'}>
                        <Grid item xs={9} sx={{ pl: 2 }}>
                          {!data?.verifier_details_id &&
                            data?.project_status !== 3 && (
                              <img src={DashboardPencil} />
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <Box key={index}>
                            <ArrowRightIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={() => openProjectDetails(data)}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default DashboardNewProjectsTable
