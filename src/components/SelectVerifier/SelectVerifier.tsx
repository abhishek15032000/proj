// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import {
  Checkbox,
  Grid,
  Box,
  Stack,
  Typography,
  Modal,
  Paper,
  Divider,
  Skeleton,
} from '@mui/material'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { KeyboardArrowLeft } from '@mui/icons-material'

// Functional Imports
import { useLocation, useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

// Local Imports
import CCButton from '../../atoms/CCButton/CCButton'
import { department } from '../../api/department.api'
import { PROJECT_ALL_STATUS, ROLES } from '../../config/constants.config'
import { Colors, Images } from '../../theme'
import './index.css'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { verifierCalls } from '../../api/verifierCalls.api'
import { pathNames } from '../../routes/pathNames'
import { useAppSelector } from '../../hooks/reduxHooks'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { getProjectDetails } from '../../utils/issuanceDataCollection.utils'
import SelectVerifierSkeleton from './SelectVerifierSkeleton'

const SelectVerifier = () => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const currentProjectDetailsUUID = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetailsUUID,
    shallowEqual
  )

  const [open, setOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [verifiers, setVerifiers] = useState<any[]>([])
  const [selectedVerifiers, setSelectedVerifiers] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  const handleClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    getAllVerifiers()
  }, [])

  useEffect(() => {
    // functionality for save button enabling and disabling
    if (selectedVerifiers.length === 0) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [selectedVerifiers])

  const getAllVerifiers = async () => {
    setLoading(true)
    try {
      const res = await department.getUsersByOrgType(ROLES?.VERIFIER)
      if (res.data) {
        setVerifiers(res.data)
      }
    } catch (err) {
      console.log('Error in department.getUsersByOrgType ~ ', err)
    } finally {
      setLoading(false)
    }
  }

  const createVerifier = async () => {
    setLoading(true)
    setOpen(false)
    const payload: any = selectedVerifiers.map((verifierDetials: any) => {
      return {
        project_id: currentProjectDetails?._id,
        project_status: PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED,
        verifier_id: verifierDetials?._id,
        verifier_name: verifierDetials?.fullName,
        verifier_address: verifierDetials?.address,
        verifier_number: verifierDetials?.phone.toString(),
      }
    })

    try {
      const res = await verifierCalls.createVerifier(payload)
      if (res?.data?.success) {
        setModalData(true)
        setOpen(true)
        getProjectDetails(currentProjectDetailsUUID)
        navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const selectVerifiers = (verifier: any) => {
    const selectedVerifierIds = selectedVerifiers.map(
      (verifier: any) => verifier._id
    )
    if (
      selectedVerifiers.length &&
      selectedVerifierIds.includes(verifier?._id)
    ) {
      const newVerifierList = selectedVerifiers.filter(
        (v: any) => v?._id !== verifier?._id
      )
      setSelectedVerifiers(newVerifierList)
    } else {
      setSelectedVerifiers([...selectedVerifiers, verifier])
    }
  }

  const isThisVerifierSelected = (id: string) => {
    if (selectedVerifiers.length) {
      const selectedVerifierIds = selectedVerifiers.map(
        (verifier: any) => verifier._id
      )
      if (selectedVerifierIds.includes(id)) return true
      else return false
    }
    return false
  }

  const renderSkeleton = () => {
    return (
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
        <SelectVerifierSkeleton />
      </Grid>
    )
  }

  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems="center"
        spacing={3}
        sx={{ fontSize: 14 }}
      >
        <Grid item xs={6}>
          <BackHeader
            title="Select Verifier"
            onClick={() => {
              navigate(-1)
            }}
          />
          <Typography sx={{ mt: 2, fontSize: 16, fontWeight: 500 }}>
            Select potential verifiers for your project issuance
          </Typography>
        </Grid>
        <Grid item>
          <CCButton
            variant="contained"
            sx={{ padding: '10px 80px', fontSize: 16, borderRadius: 20 }}
            onClick={handleClick}
            disabled={buttonDisabled}
          >
            Save
          </CCButton>
        </Grid>
      </Grid>
      {loading === true ? (
        renderSkeleton()
      ) : (
        <Grid container sx={{ mt: 2 }} spacing={3} xs={12}>
          {verifiers?.map((verifier: any, index: number) => (
            <Grid key={index} item container xs={12} lg={6}>
              <Paper
                elevation={4}
                sx={{
                  width: '100%',
                  display: 'flex',
                  borderRadius: 2,
                  borderTop: isThisVerifierSelected(verifier?._id)
                    ? '6px solid #006B5E'
                    : '6px solid transparent',
                }}
              >
                <Grid
                  item
                  xs={9}
                  sx={{
                    p: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => selectVerifiers(verifier)}
                    >
                      <Checkbox
                        sx={{
                          p: 0,
                          mr: 1,
                          color: '#006B5E',
                          '&.Mui-checked': {
                            color: '#006B5E',
                          },
                        }}
                        checked={isThisVerifierSelected(verifier?._id)}
                      />
                      <Typography
                        sx={{ fontSize: 18, textTransform: 'uppercase' }}
                      >
                        {verifier?.fullName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <PlaceOutlinedIcon
                      sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      {verifier?.address || '-'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <LanguageIcon
                      sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      {/* <a
                        style={{
                          color: '#25BBD2',
                          textDecoration: 'underline',
                        }}
                        href={verifier?.website}
                      >
                        {verifier?.website || '-'}
                      </a> */}
                      <a
                        style={{
                          color: '#25BBD2',
                          textDecoration: 'underline',
                        }}
                        href={verifier?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {verifier?.website || '-'}
                      </a>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <PermIdentityOutlinedIcon
                      sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: 14 }}>
                        {verifier?.designation}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {verifier?.address}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <PhoneInTalkOutlinedIcon
                      sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      {verifier?.phone || '-'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <MailOutlineIcon
                      sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      {verifier?.email || '-'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} sx={{ my: 'auto' }} justifyContent="end">
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Box
                      sx={{
                        background: '#F0FFFB',
                        width: '100px',
                        height: '100px',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={Images.BriefcaseIcon}
                        className="briefcaseImg"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <Paper
          sx={{
            px: 10,
            py: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          {modalData ? (
            <Box display={'flex'} alignItems="center" flexDirection="column">
              <Typography sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}>
                Verifier selected successfully
              </Typography>
              <CCButton
                sx={{ minWidth: 0, padding: '6px 50px', borderRadius: 10 }}
                onClick={() => {
                  setModalData(false)
                  setOpen(false)
                  navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
                }}
              >
                Ok
              </CCButton>
            </Box>
          ) : (
            <Box>
              <Typography
                textAlign="center"
                sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}
              >
                Confirm selected Verifiers?
              </Typography>
              <Box>
                <Stack
                  sx={{ mt: 5 }}
                  direction="row"
                  justifyContent={'space-between'}
                >
                  <CCButtonOutlined
                    sx={{
                      minWidth: 0,
                      padding: '6px 34px',
                      borderRadius: 10,
                      mr: 3,
                    }}
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Cancel
                  </CCButtonOutlined>
                  <CCButton
                    sx={{ minWidth: 0, padding: '6px 50px', borderRadius: 10 }}
                    onClick={() => {
                      createVerifier()
                    }}
                  >
                    Yes
                  </CCButton>
                </Stack>
              </Box>
            </Box>
          )}
          {/**/}
        </Paper>
      </Modal>
    </>
  )
}

export default SelectVerifier
