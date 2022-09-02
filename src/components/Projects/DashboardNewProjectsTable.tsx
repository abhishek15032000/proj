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
import { setCurrentProjectDetails } from '../../redux/Slices/issuanceDataCollection'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import CircleIcon from '@mui/icons-material/Circle'
import { addSectionPercentages } from '../../utils/newProject.utils'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userDetails = getLocalItem('userDetails')

  const [tableRows, setTableRows] = useState<any>(undefined)
  const [showBorder, setShowBorder] = useState<boolean>(false)

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    dataCollectionCalls
      .getAllProjects(userDetails?.email)
      .then((res: any) => {
        if (res?.data?.success) {
          const modifiedRows = res?.data?.data
            ?.slice(0, 7)
            .map((i: any) => addSectionPercentages(i))
          setTableRows(modifiedRows)
        }
      })
      .catch((e: any) => console.log(e))
  }

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
      dispatch(setCurrentProjectDetails(projectDetails))
      navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
    }
  }

  return (
    <>
      {!tableRows ? (
        <CCTableSkeleton height={78} />
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
              {tableRows &&
                tableRows?.length > 0 &&
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
                        sx={{
                          pl: 1,
                          backgroundColor:
                            data?.project_status === 3 ? '#75F8E4' : '#E1E3E1',
                        }}
                        key="1"
                        icon={
                          <CircleIcon
                            //fontSize="small"
                            sx={{
                              fontSize: 10,
                              //pl: 1,
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
                            : data?.project_status === 1
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
                        justifyContent={'flex-end'}
                      >
                        {data?.verifier_details_id && (
                          <img
                            src={DataTablesBriefCase}
                            width="35px"
                            height="35px"
                          />
                        )}
                        <Typography
                          sx={{ fontSize: 15, fontWeight: 500, pl: 1 }}
                        >
                          {data?.verifier_details_id
                            ? data?.verifier_details_id?.verifier_name
                            : '-'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {data?.project_status !== 3 && (
                        <Box key={index}>
                          <ArrowRightIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => openProjectDetails(data)}
                          />
                        </Box>
                      )}
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
