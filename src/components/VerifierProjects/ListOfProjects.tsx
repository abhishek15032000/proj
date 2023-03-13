// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

// Functional Imports
import moment from 'moment'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors, Images } from '../../theme'
import { VerifierProjectsProps } from './VerifierProjects.interface'
import TabSelectorVerifier from './TabSelectorVerifier'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import { verifierCalls } from '../../api/verifierCalls.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import NoData from '../../atoms/NoData/NoData'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { getLocalItem } from '../../utils/Storage'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { setTabIndex } from '../../redux/Slices/cachingSlice'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useVerifierDashboardTable } from '../../hooks/useVerifierDashboardTable'
import {
  setVerifierAcceptedProjects,
  setVerifierNewProjects,
  setVerifierRegisteredProjects,
  setVerifierRejectedProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'

interface ListOfProjectsProps {
  data?: any
  // loading?: any
  // updateStatus?: any
}

let index = 0
const headingsNew = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Issuer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const headingsRegistered = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Issuer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText
    key={index++}
    text="Next Datea"
    tooltipText="Next Report Submission Dt"
  />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const [tabIndex, setTabIndex] = useState(1)
  const [rowsRegistered, setRowsRegistered]: any = useState([{}])
  const [rowsNew, setRowsNew]: any = useState([{}])
  // const [newRequests, setNewRequests] = useState(0)

  const tabIndex = useAppSelector(
    ({ caching }) => caching.tabIndex,
    shallowEqual
  )
  const cachedVerifierDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedVerifierDashboardProjects,
    shallowEqual
  )
  const verifierDashboardTableLoading = useAppSelector(
    ({ verifier }) => verifier.verifierDashboardTableLoading,
    shallowEqual
  )

  const verifierNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierNewProjects,
    shallowEqual
  )
  const verifierAcceptedProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierAcceptedProjects,
    shallowEqual
  )

  const verifierRegisteredProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierRegisteredProjects,
    shallowEqual
  )

  const verifierRejectedProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierRejectedProjects,
    shallowEqual
  )

  const { verifierTabWiseData } = useVerifierDashboardTable()

  // useEffect(() => {
  //   verifierCalls
  //     .getVerifierProjectDashboardStats(getLocalItem('userDetails')?.user_id)
  //     .then((response) => {
  //       setNewRequests(response.data?.new_requests)
  //     })
  // }, [])

  useEffect(() => {
    console.log('props changed')
    if (
      cachedVerifierDashboardProjects &&
      cachedVerifierDashboardProjects.length
    ) {
      const { newData, acceptedData, registeredData, rejectedData } =
        verifierTabWiseData()

      console.log({ newData, acceptedData, registeredData, rejectedData })

      if (newData.length !== 0) {
        dispatch(setVerifierNewProjects(newData))
      } else {
        dispatch(setVerifierNewProjects([{}]))
      }

      if (registeredData.length !== 0) {
        dispatch(setVerifierRegisteredProjects(registeredData))
      } else {
        dispatch(setVerifierRegisteredProjects([{}]))
      }

      if (acceptedData.length !== 0) {
        dispatch(setVerifierAcceptedProjects(acceptedData))
      } else {
        dispatch(setVerifierAcceptedProjects([{}]))
      }
      if (rejectedData.length !== 0) {
        dispatch(setVerifierRejectedProjects(rejectedData))
      } else {
        dispatch(setVerifierRejectedProjects([{}]))
      }
    }
  }, [cachedVerifierDashboardProjects])

  const renderDashboardTableTabData = (selectedTab: any) => {
    if (selectedTab === 1) {
      return verifierNewProjects && verifierNewProjects.length ? (
        <CCTable
          headings={headingsNew}
          rows={verifierNewProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination={verifierNewProjects.length > 4}
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No new projects available" />
      )
    }
    if (selectedTab === 2) {
      return verifierAcceptedProjects && verifierAcceptedProjects.length ? (
        <CCTable
          headings={headingsNew}
          rows={verifierAcceptedProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination={verifierAcceptedProjects.length > 4}
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No accepted projects available" />
      )
    }
    if (selectedTab === 3) {
      return verifierRegisteredProjects && verifierRegisteredProjects.length ? (
        <CCTable
          headings={headingsRegistered}
          rows={verifierRegisteredProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination={verifierRegisteredProjects.length > 4}
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No registered projects available" />
      )
    }
    if (selectedTab === 4) {
      return verifierRejectedProjects && verifierRejectedProjects.length ? (
        <CCTable
          headings={headingsNew}
          rows={verifierRejectedProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination={verifierRejectedProjects.length > 4}
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No rejected projects available" />
      )
    }
  }

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 4,
        p: 2,
        minHeight: location.pathname.includes(pathNames.PROJECTS)
          ? '80vh'
          : '55vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          pr: 1,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>
        {/* {location.pathname.includes(pathNames.PROJECTS) ? null : (
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
              color: 'darkPrimary1.main',
            }}
            onClick={() => navigate(pathNames.PROJECTS)}
          >
            See All
          </Typography>
        )} */}
      </Box>

      {/* {newRequests === 0 && ( */}
      <TabSelector
        sx={{ marginTop: 0 }}
        tabIndex={tabIndex}
        setTabIndex={(bool: number) => dispatch(setTabIndex(bool))}
        tabArray={['New', 'Accepted', 'Registered', 'Rejected']}
      />
      {/* )} */}

      {/* {newRequests > 0 && (
        <TabSelectorVerifier
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          newProjects={newRequests}
        />
      )} */}

      {/* {verifierDashboardTableLoading && (
        <CCTableSkeleton sx={{ mt: 2 }} height={16} />
      )}

      {!verifierDashboardTableLoading &&
        ((tabIndex === 2 && Object.keys(rowsRegistered[0]).length > 0) ||
          (tabIndex === 1 && Object.keys(rowsNew[0]).length > 0)) && (
          <CCTable
            headings={tabIndex === 1 ? headingsNew : headingsRegistered}
            rows={tabIndex === 1 ? rowsNew : rowsRegistered}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            pagination
            rowsPerPageProp={5}
            hideScrollbar
            stickyLastCol
            stickySecondLastCol
          />
        )}

      {!verifierDashboardTableLoading &&
        Object.keys(rowsNew[0]).length === 0 &&
        tabIndex === 1 && <NoData title="No new projects available" />}

      {!verifierDashboardTableLoading &&
        Object.keys(rowsRegistered[0]).length === 0 &&
        tabIndex === 2 && <NoData title="No registered projects available" />} */}

      {verifierDashboardTableLoading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : (
        renderDashboardTableTabData(tabIndex)
      )}
    </Paper>
  )
}

export default ListOfProjects
