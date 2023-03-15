import React, { FC, useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import CCTable from '../../atoms/CCTable'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import NoData from '../../atoms/NoData/NoData'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import LimitedText from '../../atoms/LimitedText/LimitedText'
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
    text="Next Date"
    tooltipText="Next Report Submission Dt"
  />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const dispatch = useAppDispatch()
  const [tabIndex, setTabIndex] = useState(1)

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

  console.log({
    verifierNewProjects,
    verifierAcceptedProjects,
    verifierRegisteredProjects,
    verifierRejectedProjects,
  })

  const { verifierTabWiseData } = useVerifierDashboardTable()

  useEffect(() => {
    if (
      cachedVerifierDashboardProjects &&
      cachedVerifierDashboardProjects.length
    ) {
      const { newData, acceptedData, registeredData, rejectedData } =
        verifierTabWiseData()

      console.log({ newData, acceptedData, registeredData, rejectedData })

      if (newData.length) {
        dispatch(setVerifierNewProjects(newData))
      } else {
        dispatch(setVerifierNewProjects([]))
      }

      if (registeredData.length) {
        dispatch(setVerifierRegisteredProjects(registeredData))
      } else {
        dispatch(setVerifierRegisteredProjects([]))
      }

      if (acceptedData.length) {
        dispatch(setVerifierAcceptedProjects(acceptedData))
      } else {
        dispatch(setVerifierAcceptedProjects([]))
      }
      if (rejectedData.length) {
        dispatch(setVerifierRejectedProjects(rejectedData))
      } else {
        dispatch(setVerifierRejectedProjects([]))
      }
    }
  }, [cachedVerifierDashboardProjects])

  const renderDashboardTableTabData = (selectedTab: any) => {
    let heading, row, projectType

    switch (selectedTab) {
      case 1: {
        heading = headingsNew
        row = verifierNewProjects
        projectType = 'New'
        break
      }
      case 2: {
        heading = headingsRegistered
        row = verifierAcceptedProjects
        projectType = 'Accepted'
        break
      }
      case 3: {
        heading = headingsNew
        row = verifierRegisteredProjects
        projectType = 'Registered'
        break
      }
      case 4: {
        heading = headingsNew
        row = verifierRejectedProjects
        projectType = 'Rejected'
        break
      }
    }

    return row && row.length ? (
      <CCTable
        headings={heading}
        rows={row}
        hideScrollbar
        pagination={row.length > 4}
        rowsPerPageProp={5}
        stickyLastCol
        stickySecondLastCol
      />
    ) : (
      <NoData title={`No ${projectType} Projects Available`} />
    )
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
      </Box>

      <TabSelector
        sx={{ marginTop: 0 }}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        tabArray={['New', 'Accepted', 'Registered', 'Rejected']}
      />

      {verifierDashboardTableLoading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : (
        renderDashboardTableTabData(tabIndex)
      )}
    </Paper>
  )
}

export default ListOfProjects
