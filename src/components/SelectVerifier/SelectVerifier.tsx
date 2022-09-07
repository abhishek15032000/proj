import React, { useEffect, useState } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Box } from '@mui/system'
import {
  Checkbox,
  Grid,
  Stack,
  Typography,
  Modal,
  Paper,
  Divider,
} from '@mui/material'
import CCButton from '../../atoms/CCButton/CCButton'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { department } from '../../api/department.api'
import { ROLES } from '../../config/roles.config'
import { Colors, Images } from '../../theme'
import './index.css'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifierCalls } from '../../api/verifierCalls.api'
import { pathNames } from '../../routes/pathNames'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import Spinner from '../../atoms/Spinner'

const SelectVerifier = () => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const [open, setOpen] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [verifiers, setVerifiers] = useState<any[]>([])
  const [selectedVerifiers, setSelectedVerifiers] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  console.log('selectedVerifiers: ', selectedVerifiers)
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
    try {
      const res = await department.getUsersByOrgType(ROLES?.VERIFIER)
      if (res.data) {
        setVerifiers(res.data)
      }
    } catch (err) {
      console.log('Error in department.getUsersByOrgType ~ ', err)
    }
  }

  const createVerifier = async () => {
    setLoading(true)
    const payload = selectedVerifiers.map((verifierDetials: any) => {
      if (
        currentProjectDetails &&
        selectedVerifiers &&
        selectedVerifiers?.length
      ) {
        return {
          project_id: currentProjectDetails?._id,
          project_status: 1,
          verifier_id: verifierDetials?._id,
          verifier_name: verifierDetials?.fullName,
          //keeping verifier address & number as static, once verifier detials are filled when creating verifier, will make it dynamic
          verifier_address: 'verifierDetials?.location',
          verifier_number: 'verifierDetials?.contact',
        }
      }
    })
    try {
      const res = await verifierCalls.createVerifier(payload)
      if (res?.data?.success) {
        setOpen(false)
        alert('verifier selected successfully')
        navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const selectVerifiers = (verifier: any) => {
    if (selectedVerifiers.length && selectedVerifiers.includes(verifier)) {
      const newVerifierList = selectedVerifiers.filter(
        (v: any) => v !== verifier
      )
      setSelectedVerifiers(newVerifierList)
    } else {
      setSelectedVerifiers([...selectedVerifiers, verifier])
    }
  }

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <KeyboardArrowLeft />
            <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
              List New Project
            </Typography>
          </Box>
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
      <Grid container sx={{ mt: 2 }} spacing={3} xs={12}>
        {verifiers?.map((verifier: any, index: number) => (
          <Grid key={index} item container xs={12} lg={6}>
            <Paper
              elevation={4}
              sx={{
                width: '100%',
                display: 'flex',
                borderRadius: 2,
                borderTop: selectedVerifiers.includes(verifier?._id)
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
                  <Checkbox
                    sx={{
                      p: 0,
                      mr: 1,
                      color: '#006B5E',
                      '&.Mui-checked': {
                        color: '#006B5E',
                      },
                    }}
                    onChange={() => selectVerifiers(verifier)}
                  />
                  <Typography sx={{ fontSize: 18, textTransform: 'uppercase' }}>
                    {verifier?.fullName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography>{verifier?.location || '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <LanguageIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography>{verifier?.website || '-'}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <PermIdentityOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography>{verifier?.director || '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography>{verifier?.contact || '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography>{verifier?.mail || '-'}</Typography>
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
                    <img src={Images.BriefcaseIcon} className="briefcaseImg" />
                  </Box>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
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
          }}
        >
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
        </Paper>
      </Modal>
    </>
  )
}

export default SelectVerifier
