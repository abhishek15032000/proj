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
import { useLocation } from 'react-router-dom'
import { verifierCalls } from '../../api/verifierCalls.api'

const selectVerifierOptions = [
  {
    _id: '2',
    fullName: 'ASTER GLOBAL ENVIRONMENTAL SOLUTIONS, INC.',
    contact: '423-843-2206',
    website: 'www.awm.net',
    mail: 'www.awm.net',
    location:
      '3800 Clermont Street NW North Lawrence, Ohio 44666, USA www.asterglobal.com',

    director:
      'Rob Ellis Director, Western Region 423-843-2206 robellis@awm.net',
  },
  {
    _id: '1',
    fullName: 'ADVANCED WASTE MANAGEMENT SYSTEMS, INC.',
    contact: '423-843-2206',
    website: 'www.awm.net',
    mail: 'www.awm.net',
    location: '6430 Hixson Pike Hixson, TN 37343 USA www.awm.net',
    director:
      'Rob Ellis Director, Western Region 423-843-2206 robellis@awm.net',
  },
  {
    _id: '3',
    fullName: 'CAMERON-COLE, LLC',
    contact: '423-843-2206',
    website: 'www.awm.net',
    mail: 'www.awm.net',
    location: '50 Hegenberger Loop Oakland, CA 94621 USA www.cameron-cole.com',
    director:
      'Chris Lawless Director, Greenhouse Gas Management Services 510-777-1858 clawless@cameron-cole.com',
  },
  {
    _id: '4',
    fullName: 'DILLON CONSULTING LIMITED',
    contact: '423-843-2206',
    website: 'www.awm.net',
    mail: 'www.awm.net',
    location:
      '235 Yorkland Boulevard, Suite 800 Toronto, Ontario M2J 4Y8 www.dillon.ca',
    director:
      'Zachary Zehr Project Manager & Lead Verifier 1-519-571-9833 ext. 3151 zzehr@dillon.ca',
  },
  {
    _id: '5',
    fullName: 'FIRST ENVIRONMENT, INC.',
    contact: '423-843-2206',
    website: 'www.awm.net',
    mail: 'www.awm.net',
    location: '91 Fulton St. Boonton, NJ 07005 USA www.first environment.com',
    director:
      'Michael Carim Environmental Specialist 973-334-0003 mic@firstenvironment .com',
  },
  {
    _id: '6',
    fullName: 'GHD LIMITED',
    contact: '423-843-2206',
    website: 'www.awm.net',
    mail: 'www.awm.net',
    location: '455 Phillip St Waterloo, Ontario N2L 3X2 CAN www.ghd.com',
    director:
      'Jason Clarke Program Manager +1 (519) 340-4270 jason.clarke@ghd.com',
  },
]

const SelectVerifier = () => {
  const location: any = useLocation()

  const [open, setOpen] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [verifiers, setVerifiers] = useState<any[]>([])
  const [selectedVerifiers, setSelectedVerifiers] = useState<any>([])

  const handleClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    getAllVerifiers()
  }, [])

  useEffect(() => {
    // functionality of save button enabled or disabled
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
    const payload = selectedVerifiers.map((verifierDetials: any) => {
      if (
        location.state.projectDetails &&
        selectedVerifiers &&
        selectedVerifiers?.length
      ) {
        return {
          project_id: location?.state?.projectDetails._id,
          project_status: 'awaiting verifier confirmation',
          accepted_by_verifier: false,
          accepted_by_issuer: false,
          verifier_id: verifierDetials._id,
          verifier_name: verifierDetials.fullName,
          verifier_address: verifierDetials.location,
          verifier_number: verifierDetials.contact,
        }
      }
    })
    try {
      const res = await verifierCalls.createVerifier(payload)
      if (res?.data?.success) {
        alert('verifier selected successfully')
      }
      setOpen(false)
    } catch (err) {
      console.log(err)
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

  return (
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
        {/*{verifiers?.map((verifier: any, index: number) => (*/}
        {selectVerifierOptions?.map((verifier, index) => (
          <Grid key={index} item container xs={12} lg={6}>
            <Paper
              elevation={4}
              sx={{
                width: '100%',
                display: 'flex',
                borderRadius: 2,
                borderTop: selectedVerifiers.includes(verifier?._id)
                  ? `6px solid #006B5E`
                  : '6px solid transparent',
              }}
            >
              <Grid item xs={9} sx={{ p: 2 }}>
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
