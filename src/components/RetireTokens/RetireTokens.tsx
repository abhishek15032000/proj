// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { RetireTokensProps } from './RetireTokens.interface'
import VerifierProfileIllustration from '../../assets/Images/illustrations/VerifierProfile.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import Spinner from '../../atoms/Spinner'
import CCButton from '../../atoms/CCButton'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'

const RetireTokens = (props: RetireTokensProps) => {
  const navigate = useNavigate()

  const [tonnesOfCarbon, setTonnesOfCarbon] = useState('')
  const [beneficialOwner, setBeneficialOwner] = useState('')
  const [retiring, setRetiring] = useState('')
  const [explain, setExplain] = useState('')
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   USER.getUserInfo(getLocalItem('userDetails').uuid).then((response) => {
  //     setFullName(response?.data?.data?.fullName)
  //     setPhone(response?.data?.data?.phone)
  //     setAddress(response?.data?.data?.address)
  //     setDesignation(response?.data?.data?.designation)
  //     setOrganisationName(response?.data?.data?.organisationName)
  //     setWebsite(response?.data?.data?.organisationName)
  //   })
  // }, [])

  const onSave = () => {
    navigate(pathNames.TOKENS_RETIREMENT)
    // return
    // if (
    //   email === '' ||
    //   fullName === '' ||
    //   phone === '' ||
    //   organisationName === '' ||
    //   address === '' ||
    //   website === '' ||
    //   designation === ''
    // ) {
    //   console.log('Code Reachable')
    //   return
    // }
    // setLoading(true)
    // const payload = {
    //   uuid: getLocalItem('userDetails').uuid,
    //   email: email,
    //   fullName: fullName,
    //   phone: phone.toString(),
    //   organisationName: organisationName,
    //   address: address,
    //   website: website,
    //   designation: designation,
    // }
    // // console.log('payload')
    // // console.log(JSON.stringify(payload, null, 4))
    // USER.updateUserInfo(payload)
    //   .then((response) => {
    //     navigate(pathNames.VERIFIER_PROJECTS)
    //     setLoading(false)
    //   })
    //   .catch((e) => {
    //     setLoading(false)
    //   })
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
                <BackHeader title="Retire Tokens" onClick={onSave} />
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  <CCButton
                    sx={{
                      backgroundColor: Colors.darkPrimary1,
                      padding: '8px 24px',
                      minWidth: '50px',
                      color: '#fff',
                      borderRadius: 10,
                      fontSize: 14,
                      mr: 1,
                    }}
                    onClick={onSave}
                  >
                    Save
                  </CCButton>
                </Grid>
              </Box>

              <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
                Go carbon neutral by retiring carbon tokens and claiming the
                underlying environmental benefit of the carbon offset.
              </Typography>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  flexDirection: 'row',
                }}
              >
                <CCInputField
                  label="Tonnes of Carbon to Offset"
                  placeholder="Enter Tonnes of Carbon to Offset"
                  sx={{ mb: 1.5, mr: 2 }}
                  value={tonnesOfCarbon}
                  onChange={(e) => setTonnesOfCarbon(e.target.value)}
                />

                <CCInputField
                  label="Retiring"
                  placeholder="Enter Retiring"
                  sx={{ mb: 1.5 }}
                  value={retiring}
                  onChange={(e) => setRetiring(e.target.value)}
                />
              </Grid>

              <CCInputField
                label="Beneficial Owner"
                placeholder="Enter Beneficial Owner                "
                sx={{ mb: 1.5 }}
                value={beneficialOwner}
                onChange={(e) => setBeneficialOwner(e.target.value)}
              />
              <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
                What is your reason for retirement ?
              </Typography>
              <CCMultilineTextArea
                label="Explain"
                placeholder="Explain it here"
                value={explain}
                onChange={(event) => setExplain(event.target.value)}
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

export default RetireTokens
