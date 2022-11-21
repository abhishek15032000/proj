import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { RetireTokensProps } from './RetireTokens.interface'
import tokenRetirement from '../../assets/Images/illustrations/tokenRetirement.png'
import CCInputField from '../../atoms/CCInputField'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import Spinner from '../../atoms/Spinner'
import CCButton from '../../atoms/CCButton'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import BlockchainCalls from '../../blockchain/Blockchain'
import { useAppSelector } from '../../hooks/reduxHooks'
import { TOKEN_CONTRACT_ADDRESS } from '../../config/token.config'
import Web3 from 'web3'
import { shallowEqual } from 'react-redux'
import { ethers } from 'ethers'
import { getApprovedTokensBalance } from '../../utils/tokenRetire.utils'
import PreBlockchainCallModal from '../../atoms/PreBlockchainCallModal/PreBlockchainCallModal'
import BalanceCheckModal from '../../atoms/BalanceCheckModal/BalanceCheckModal'
import { buyerCalls } from '../../api/buyerCalls.api'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

const RetireTokens = (props: RetireTokensProps) => {
  const navigate = useNavigate()

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const tokensApprovedForRetiring = useAppSelector(
    ({ tokenRetire }) => tokenRetire.tokensApprovedForRetiring,
    shallowEqual
  )

  const [retiring, setRetiring] = useState('')
  const [explain, setExplain] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showSecondModal, setShowSecondModal] = useState(false)

  useEffect(() => {
    if (accountAddress) {
      getApprovedTokensBalance()
    }
  }, [accountAddress])

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
  const retireTokens = async () => {
    if (Number(retiring) > Number(tokensApprovedForRetiring)) {
      setShowSecondModal(true)
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
          getApprovedTokensBalance()
          navigate(pathNames.TOKENS_RETIREMENT, { replace: true })
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
        })
    }
  }

  const isDisabled = () => {
    let shouldDisable = true
    if (retiring && explain) {
      shouldDisable = false
    }
    return shouldDisable
  }

  return loading ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
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
              width: '100%',
              borderRadius: '8px',
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
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
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
                  onClick={() => {
                    console.log({ retiring, explain })
                    if (!retiring || !explain) {
                      alert('Fill all the Fields!')
                      return
                    }
                    setShowModal(true)
                  }}
                  disabled={isDisabled()}
                  variant="contained"
                >
                  Retire
                </CCButton>
              </Grid>
            </Box>
            <Box sx={{ mt: 1, color: Colors.darkPrimary1, fontWeight: 500 }}>
              No. of Tokens that can be retired :{' '}
              {tokensApprovedForRetiring
                ? tokensApprovedForRetiring
                : tokensApprovedForRetiring === 0
                ? 0
                : '-'}
            </Box>
            <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 1, mb: 2 }}>
              Go carbon neutral by retiring carbon tokens and claiming the
              underlying environmental benefit of the carbon offset.
            </Typography>
            <CCInputField
              label="Retiring"
              placeholder="Enter Retiring"
              sx={{ mb: 1.5 }}
              value={retiring}
              onChange={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  setRetiring(e?.target?.value)
                }
              }}
            />
            <CCInputField
              disabled
              label="Tonnes of Carbon to Offset"
              placeholder="Enter Tonnes of Carbon to Offset"
              sx={{ mb: 1.5, mr: 2 }}
              value={retiring}
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
              sx={{
                mt: 2,
              }}
            >
              <img src={tokenRetirement} width="100%" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <PreBlockchainCallModal
        btn1OnClick={() => {
          setShowModal(false)
          retireTokens()
        }}
        btn2OnClick={() => setShowModal(false)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <BalanceCheckModal
        msg1="Retiring more tokens than Approved. Please lessen the retiring token quantity."
        msg2="Approved Tokens for Retiring"
        tokenBal={tokensApprovedForRetiring}
        btn1OnClick={() => {
          setRetiring('')
          setShowSecondModal(false)
        }}
        showModal={showSecondModal}
        setShowModal={setShowSecondModal}
      />
    </Box>
  )
}

export default RetireTokens
