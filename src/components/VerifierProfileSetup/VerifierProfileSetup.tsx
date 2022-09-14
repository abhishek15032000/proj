// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProfileSetupProps } from './VerifierProfileSetup.interface'
import VerifierProfileIllustration from '../../assets/Images/illustrations/VerifierProfile.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import Spinner from '../../atoms/Spinner'

const VerifierProfileSetup = (props: VerifierProfileSetupProps) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState(getLocalItem('userDetails').email)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [designation, setDesignation] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails').uuid).then((response) => {
      setFullName(response?.data?.data?.fullName)
      setPhone(response?.data?.data?.phone)
      setAddress(response?.data?.data?.address)
      setOrganisationName(response?.data?.data?.organisationName)
      setWebsite(response?.data?.data?.organisationName)
    })
  }, [])

  const onSave = () => {
    // return
    if (
      email === '' ||
      fullName === '' ||
      phone === '' ||
      organisationName === '' ||
      address === '' ||
      website === '' ||
      designation === ''
    ) {
      console.log('Code Reachable')
      return
    }
    setLoading(true)

    const payload = {
      uuid: getLocalItem('userDetails').uuid,
      email: email,
      fullName: fullName,
      phone: phone.toString(),
      organisationName: organisationName,
      address: address,
      website: website,
      designation: designation,
    }

    // console.log('payload')
    // console.log(JSON.stringify(payload, null, 4))

    USER.updateUserInfo(payload)
      .then((response) => {
        console.log('response')
        console.log(JSON.stringify(response.data, null, 4))
        navigate(pathNames.VERIFIER_PROJECTS)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 450 }}
      >
        <Spinner />
      </Stack>
    )
  } else {
    return (
      <Box sx={{ p: 0 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
          <Grid item xs={9} sx={{ pr: 1 }}>
            <Paper
              sx={{
                height: '750px',
                width: '100%',
                borderRadius: '8px',
                // border: '2px solid',
                backgroundColor: Colors.white,
                p: 2,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <BackHeader title="Profile" />
                <TextButton title="Save" onClick={onSave} />
              </Box>

              <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
                Complete your profile setup by filling this form
              </Typography>
              <CCInputField
                label="Participant Name"
                placeholder="Enter Participant Name"
                sx={{ mb: 1.5 }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <CCInputField
                label="Designation"
                placeholder="Enter Designation"
                sx={{ mb: 1.5 }}
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />

              <CCInputField
                label="Email ID"
                placeholder="Enter Email ID"
                sx={{ mb: 1.5 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                required={false}
              />

              <CCInputField
                label="Contact Number"
                placeholder="Enter Contact Number"
                sx={{ mb: 1.5 }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={false}
              />

              <CCInputField
                label="Organisation Name"
                placeholder="Enter Organisation Name"
                sx={{ mb: 1.5 }}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />

              <CCInputField
                label="Organisation Address"
                placeholder="Enter Organisation Address"
                sx={{ mb: 1.5 }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <CCInputField
                label="Official Website"
                placeholder="Enter Official Website"
                sx={{ mb: 1.5 }}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              <Box
                component="img"
                sx={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
                src={VerifierProfileIllustration}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default VerifierProfileSetup
