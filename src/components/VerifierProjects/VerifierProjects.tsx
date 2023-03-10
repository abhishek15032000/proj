// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, Grid, Paper, Skeleton, Typography } from '@mui/material'

// Functional Imports
import { useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import ListOfProjects from './ListOfProjects'
import { verifierCalls } from '../../api/verifierCalls.api'
import { getLocalItem } from '../../utils/Storage'
import { USER } from '../../api/user.api'
import { pathNames } from '../../routes/pathNames'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setProfileCompletionPercent,
  setProfileUpdated,
  setVerifierStatsReload,
} from '../../redux/Slices/verifierSlice'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import BlockchainCalls from '../../blockchain/Blockchain'
import {
  setCachedVerificationTabAllProjects,
} from '../../redux/Slices/cachingSlice'
import { isEqual } from 'lodash'

const VerifierProjects = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)

  const isConnected = useAppSelector(
    ({ wallet }) => wallet.isConnected,
    shallowEqual
  )

  const cachedVerificationTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedVerificationTabAllProjects,
    shallowEqual
  )
 



  useEffect(() => {
    dispatch(setCachedVerificationTabAllProjects(cachedVerificationTabAllProjects))
    loadTableData()
    // checkForUserDetails()
    checkForUserDetailsAndWalletAdded()
  }, [])

  const loadTableData = () => {
    if (
      cachedVerificationTabAllProjects.length === 0
    ) {
      setLoadingTable(true)
    }
    // setLoadingTable(true)

    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        const projectListRes = response.data
        // setTableData(response.data)
        // dispatch(setCachedVerificationTabAllProjects(response.data))

      if (response) {
        if (
          !isEqual(
            cachedVerificationTabAllProjects,
            projectListRes
          )
        ) {
          dispatch(setCachedVerificationTabAllProjects(projectListRes))
        }
      }

        setLoadingTable(false)
      })
      .catch((e) => {
        setLoadingTable(false)
      })
      .finally(() => {
        dispatch(setVerifierStatsReload(true))
      })
  }

  const checkForUserDetailsAndWalletAdded = async () => {
    const { wallet_added = false, uuid = '' } = getLocalItem('userDetails2')

    // Wallet added and Profile completed considered as 2 step
    // const totalSteps = 2
    //Not considering wallet
    const totalSteps = 1
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
    // if (stepsCompleted < 2) {
    if (stepsCompleted < 1) {
      navigate(pathNames.VERIFIER_DASHBOARD, { replace: true })
    }
  }

  const updateVerifierStatus = (status: any, data: any) => {
    setLoadingTable(true)

    const payload = {
      _id: data._id,
      project_id: data.project_id?._id,
      project_status: status,
      verifier_id: data.verifier_id,
      verifier_name: data.verifier_name,
      verifier_number: data.verifier_number,
      verifier_address: data.verifier_address,
    }

    verifierCalls.updateVerifier(payload).then((response) => {
      //setVerifierStatsReload action making false to make the project stats to run again when it is becoming true in loadTableData() so that when verifier make the action in verifier dahsboard the stats will be updated
      dispatch(setVerifierStatsReload(false))
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
          <BackHeader title="Dashboard" iconDisable sx={{mb:3}}/>
        </Grid>

        <Grid item sm={12} sx={{ pr: 2 }}>
          <ProjectsStats />
        </Grid>

        <Grid item xs={12}>
          {cachedVerificationTabAllProjects.length === 0 && loadingTable === false && (
            <EmptyComponent
              title="No project verification request yet!"
              photoType={1}
            />
          )}

          {((cachedVerificationTabAllProjects.length > 0 && !loadingTable) || loadingTable) && (
            <ListOfProjects
              data={cachedVerificationTabAllProjects}
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
