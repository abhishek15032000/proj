// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { RetireTokensProps } from './RetireTokens.interface'
import tokenRetirement from '../../assets/Images/illustrations/tokenRetirement.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem, setLocalItem } from '../../utils/Storage'
import Spinner from '../../atoms/Spinner'
import CCButton from '../../atoms/CCButton'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { buyerCalls } from '../../api/buyerCalls.api'
import BlockchainCalls from '../../blockchain/Blockchain'
import { EXCHANGE_CONTRACT_ADDRESS } from '../../config/exchange.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { TOKEN_CONTRACT_ADDRESS } from '../../config/token.config'
import Web3 from 'web3'
import { shallowEqual, useDispatch } from 'react-redux'
import { ethers } from 'ethers'
import { setOngoingApproveTokenRetirement } from '../../redux/Slices/tokenRetireSlice'
import OngoingApprove from './OngoingApprove'
declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

const RetireTokens = (props: RetireTokensProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const [tonnesOfCarbon, setTonnesOfCarbon] = useState('')
  const [beneficialOwner, setBeneficialOwner] = useState('')
  const [retiring, setRetiring] = useState('')
  const [explain, setExplain] = useState('')
  const [loading, setLoading] = useState(false)
  const [vrs, setVRS] = useState<any>({})

  async function getHashAndVRS() {
    try {
      // const sellUnitPriceCopy: any = Number(sellUnitPrice)
      const hash = new Web3().utils.soliditySha3(
        { type: 'string', value: 'burn' },
        { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
        { type: 'address', value: accountAddress },
        { type: 'uint256', value: retiring }
      )

      if (!hash) throw new Error('No hash generated')
      const toPassParam = [accountAddress, hash]
      const signature = await BlockchainCalls.requestMethodCalls(
        'personal_sign',
        toPassParam
      )
      const sig = signature.slice(2)
      const v = new Web3().utils.toDecimal(`0x${sig.slice(128, 130)}`)
      const r = `0x${sig.slice(0, 64)}`
      const s = `0x${sig.slice(64, 128)}`
      return { v, r, s, hash }
    } catch (e) {
      console.log(e)
    }
  }

  const onSave = async () => {
    // const tokenContractFunctions = await BlockchainCalls.temp_contract_caller()

    const tokenContractFunctions = await BlockchainCalls.token_caller()

    const approveFnRes = await tokenContractFunctions.approve(
      '0x92e8DA2ca27997e0FC6286e7B252cb9175d2BD37', // exchangeAddress
      Number(retiring)
    )

    if (approveFnRes) {
      setLocalItem('OngoingApproveTokenRetirement', approveFnRes)
      dispatch(setOngoingApproveTokenRetirement(approveFnRes))
    }

    return
  }

  const onSaveAfterApprove = async () => {
    if (!tonnesOfCarbon || !beneficialOwner || !retiring || !explain) {
      alert('Fill all the Fields!')
      return
    }

    setLoading(true)
    const hashAnd = await getHashAndVRS()

    if (hashAnd) {
      const { r = '', s = '', v = '' } = hashAnd
      const payload = {
        // uuid: getLocalItem('userDetails').uuid,
        token_quantity: Number(retiring),
        beneficialOwner: accountAddress,
        retiring: Number(retiring),
        reason: explain,
        user: accountAddress,
        asset: TOKEN_CONTRACT_ADDRESS,
        _r: r,
        _s: s,
        _v: v,
        signer: accountAddress,
      }

      buyerCalls
        .retireToken(payload)
        .then((response) => {
          navigate(pathNames.TOKENS_RETIREMENT, { replace: true })
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
        })
    }
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
                <BackHeader
                  title="Retire Tokens"
                  onClick={() => navigate(pathNames.TOKENS_RETIREMENT)}
                />
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
                    Approve
                  </CCButton>
                  {/* <CCButton
                    sx={{
                      backgroundColor: Colors.darkPrimary1,
                      padding: '8px 24px',
                      minWidth: '50px',
                      color: '#fff',
                      borderRadius: 10,
                      fontSize: 14,
                      mr: 1,
                    }}
                    onClick={onSaveAfterApprove}
                  >
                    Save
                  </CCButton> */}
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
              <OngoingApprove onSaveAfterApprove={() => onSaveAfterApprove()} />
              <Box
                component="img"
                sx={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
                src={tokenRetirement}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default RetireTokens
