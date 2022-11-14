// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import CCButton from '../../atoms/CCButton'
// Local Imports
import { limitTitle } from '../../utils/commonFunctions'
import moment from 'moment'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import VerifierDetails from './VerifierDetails'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import MessageModal from '../../atoms/MessageModal/MessageModal'

interface VerifierReportListItemListItemProps {
  data: any
  updateVerifierAPI: any
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const accountAddress = useAppSelector((state) => state.wallet.accountAddress)
  const accountBalance = useAppSelector((state) => state.wallet.accountBalance)

  const [showModal, setShowModal] = useState(false)
  const [showVerifierDetails, setShowVerifierDetails] = useState<boolean>(false)

  const daysLeft = (date?: any) => {
    //function for couting days for verifier to accept
    const result: any = moment(date).format('DD')
    const currentDay: any = moment().format('DD')
    //const currentDay: any = moment().subtract(result, 'days')
    return 7 - (currentDay - result)
  }

  return (
    <>
      <Box sx={{ background: '#E8F3EF', py: 3, pl: 1, borderRadius: 2 }}>
        <Grid
          container
          alignItems={'center'}
          columns={15}
          sx={{ flex: 'wrap' }}
        >
          <Grid item xs={6}>
            <Typography
              sx={{
                cursor: 'pointer',
                width: 'fit-content',
                fontSize: 16,
                fontWeight: 500,
              }}
              onMouseEnter={() => setShowVerifierDetails(true)}
              onMouseLeave={() => setShowVerifierDetails(false)}
            >
              {props?.data?.verifier_name}
            </Typography>
            {/*show when hovered on verifier_name*/}
            {showVerifierDetails && (
              <VerifierDetails verifierId={props?.data?.verifier_id} />
            )}
          </Grid>
          {/* verifier contact number shown when issuer confirmed final verifier */}
          {(props?.data?.project_status === 3 ||
            props?.data?.project_status === 4) && (
            <Grid item xs={3}>
              <Stack direction={'row'} alignItems="center">
                <PhoneInTalkOutlinedIcon
                  fontSize="small"
                  sx={{ color: '#006B5E', mr: 1 }}
                />
                <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                  {props?.data?.verifier_number}
                </Typography>
              </Stack>
            </Grid>
          )}
          {/* verifier_address */}
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {limitTitle(props?.data?.verifier_address, 15)}
            </Typography>
          </Grid>
          {/* verifier status before issuer confirmed */}
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <CircleIcon
              sx={{
                color:
                  props?.data?.project_status === 2 ||
                  props?.data?.project_status === 3 ||
                  props?.data?.project_status === 4
                    ? '#7ACB9F'
                    : props?.data?.project_status === 1
                    ? '#F7CA56'
                    : props?.data?.project_status === 5 ||
                      props?.data?.project_status === 6
                    ? 'rgba(250,0,0,0.2)'
                    : 'transparent',
                mr: 1,
              }}
            />
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {props?.data?.project_status === 2 ||
              props?.data?.project_status === 3 ||
              props?.data?.project_status === 4
                ? 'Verifier Confirmed'
                : props?.data?.project_status === 1
                ? 'Waiting for Verifier’s Confirmation'
                : props?.data?.project_status === 5
                ? 'Rejected'
                : props?.data?.project_status === 6 && 'Verifier Rejected'}
            </Typography>
          </Grid>
          {(props?.data?.project_status !== 3 ||
            props?.data?.project_status !== 4) && (
            <Grid
              item
              xs={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {props?.data?.project_status === 1 ? (
                <Typography
                  textAlign="center"
                  sx={{
                    pr: 5,
                    color: '#667080',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {`${daysLeft(props?.data?.createdAt)} Day(s) Left`}
                </Typography>
              ) : (
                props?.data?.project_status === 2 && (
                  <CCButton
                    onClick={() => {
                      setShowModal(true)
                    }}
                    sx={{
                      backgroundColor: '#006B5E',
                      color: '#fff',
                      padding: '5px 10px',
                      borderRadius: 10,
                      fontSize: 14,
                      '&:hover': { background: '#006B5E' },
                    }}
                  >
                    Finalise Verifier
                  </CCButton>
                )
              )}
            </Grid>
          )}
        </Grid>
      </Box>
      {/* modal when user clicks on finalise verifier */}
      <MessageModal
        message={
          <>
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
              Next step involves making calls with Blockchain. Do you want to
              continue with{' '}
              <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
                {accountAddress}
              </span>{' '}
              wallet address?
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 18, fontWeight: 500 }}>
              Wallet Balance :{' '}
              <span
                style={{
                  color: Number(accountBalance)
                    ? Colors.lightPrimary1
                    : Colors.tertiary,
                  fontSize: 18,
                }}
              >
                {accountBalance}
              </span>{' '}
            </Typography>
            {!Number(accountBalance) && (
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: Colors.tertiary }}
              >
                ! Insufficient balance to perform blockchain call
              </Typography>
            )}
          </>
        }
        btn1Text="Continue"
        disableBtn1={!accountBalance ? true : false}
        btn1OnClick={() => {
          setShowModal(false)
          props?.updateVerifierAPI(props?.data)
        }}
        btn2OnClick={() => setShowModal(false)}
        btn2Text="Cancel"
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  )
}

export default VerifierReportListItemListItem
