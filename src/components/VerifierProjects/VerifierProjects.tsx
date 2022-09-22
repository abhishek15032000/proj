// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import ListOfProjects from './ListOfProjects'
import { verifierCalls } from '../../api/verifierCalls.api'
import { getLocalItem } from '../../utils/Storage'
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { useAppDispatch } from '../../hooks/reduxHooks'
import {
  setProfileCompletionPercent,
  setProfileUpdated,
} from '../../redux/Slices/verifierSlice'
import ProjectsStats from '../ProjectStats/ProjectsStats'

const VerifierProjects = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [tableData, setTableData] = useState([])

  const [loadingTable, setLoadingTable] = useState(false)

  useEffect(() => {
    loadTableData()
    checkForUserDetailsAndWalletAdded()
    // checkForUserDetails()
  }, [])

  const loadTableData = () => {
    setLoadingTable(true)

    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        setTableData(response.data.data)
        setLoadingTable(false)
      })
      .catch((e) => {
        setLoadingTable(false)
      })
  }

  const checkForUserDetailsAndWalletAdded = async () => {
    const { wallet_added = false, uuid = '' } = getLocalItem('userDetails2')

    // Wallet added and Profile completed considered as 2 step
    const totalSteps = 2
    let stepsCompleted = 0

    let allFieldsUpdatedInUserProfile = true

    if (uuid) {
      try {
        const userRes = await USER.getUserInfo(uuid)
        if (userRes) {
          const fieldsToCheck = [
            'fullName',
            'email',
            'designation',
            'phone',
            'address',
            'organisationName',
          ]
          const userObject = userRes?.data?.data
          for (let i = 0; i < fieldsToCheck.length; i++) {
            if (!userObject[fieldsToCheck[i]]) {
              allFieldsUpdatedInUserProfile = false
              break
            }
          }
          if (allFieldsUpdatedInUserProfile) stepsCompleted += 1
          dispatch(setProfileUpdated(allFieldsUpdatedInUserProfile))
          if (wallet_added) stepsCompleted += 1
          const completionPercent = (stepsCompleted / totalSteps) * 100
          dispatch(setProfileCompletionPercent(completionPercent))
        }
      } catch (err) {
        console.log('Error in USER.getUserInfo api :', err)
        alert('Error in USER.getUserInfo api')
      }
    }
    if (stepsCompleted < 2) {
      navigate(pathNames.VERIFIER_DASHBOARD, { replace: true })
    }
  }

  const updateVerifierStatus = (status: any, data: any) => {
    setLoadingTable(true)

    const payload = {
      _id: data._id,
      project_id: data.project_id._id,
      project_status: status,
      verifier_id: data.verifier_id,
      verifier_name: data.verifier_name,
      verifier_number: data.verifier_number,
      verifier_address: data.verifier_address,
    }

    verifierCalls.updateVerifier(payload).then((response) => {
      loadTableData()
    })
  }

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Dashboard" iconDisable />
        </Grid>

        <Grid item sm={12} sx={{ pr: 2 }}>
          <ProjectsStats />
        </Grid>

        <Grid item xs={12}>
          {tableData.length === 0 && loadingTable === false && (
            <EmptyComponent
              title="No project verification request yet!"
              photoType={1}
            />
          )}

          {tableData.length > 0 && loadingTable === false && (
            <ListOfProjects
              data={tableData}
              loading={loadingTable}
              updateStatus={updateVerifierStatus}
            />
          )}

          {loadingTable === true && (
            <ListOfProjects
              data={tableData}
              loading={loadingTable}
              updateStatus={updateVerifierStatus}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjects
