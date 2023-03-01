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
import { PROJECT_ALL_STATUS } from '../../config/constants.config'

interface VerifierReportListItemListItemProps {
  data: any
  updateVerifierAPI: any
  index: any
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const accountAddress = useAppSelector((state) => state.wallet.accountAddress)
  const accountBalance = useAppSelector((state) => state.wallet.accountBalance)

  const [showModal, setShowModal] = useState(false)
  const [showVerifierDetails, setShowVerifierDetails] = useState<boolean>(false)

  return (
    <>
      <Grid
        // rowSpacing={3}
        // columnSpacing={2}
        columns={3}
        sx={{
          // pt: index !== 0 ? 2 : 0,
          // mt: 1,

          display: 'flex',
          flexDirection: 'row',
          py: 3,

          borderTop: props.index !== 0 ? '1px solid #E1E3E1' : 'none',

          mx: 3,
        }}
      >
        <Grid
          item
          xs={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Verifier'}
            </Typography>
            <Typography
              sx={{
                cursor: 'pointer',
                width: 'fit-content',
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                color: '#141D1B',
                fontStyle: 'normal',
                mt: 1,
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
          </Box>

          {/* {(props?.data?.project_status ===
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
          props?.data?.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY) && ( */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              mt: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Contact '}
            </Typography>
            <Stack direction={'row'} alignItems="center" mt={1}>
              <PhoneInTalkOutlinedIcon
                fontSize="small"
                sx={{ color: '#006B5E', mr: 1 }}
              />
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  color: '#141D1B',
                  fontStyle: 'normal',
                }}
              >
                {props?.data?.verifier_number}
              </Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Location  '}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                color: '#141D1B',
                fontStyle: 'normal',
                mt: 1,
              }}
            >
              {limitTitle(props?.data?.verifier_address, 25)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              mt: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 0.5,
                fontStyle: 'normal',
                color: '#006B5E',
              }}
            >
              {'Status   '}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor:
                  props?.data?.project_status ===
                    PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ||
                  props?.data?.project_status ===
                    PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ||
                  props?.data?.project_status ===
                    PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                    ? '#B2F3E9'
                    : props?.data?.project_status ===
                      PROJECT_ALL_STATUS?.POTENTIAL_VERIFIER_SELECTED
                    ? '#FFF5E3 '
                    : props?.data?.project_status ===
                        PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER ||
                      props?.data?.project_status ===
                        PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
                    ? 'rgba(250,0,0,0.2)'
                    : 'transparent',
                borderRadius: '16px',
                py: 0.5,
                px: 2,
                mt: 1,
              }}
            >
              <CircleIcon
                sx={{
                  color:
                    props?.data?.project_status ===
                      PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ||
                    props?.data?.project_status ===
                      PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ||
                    props?.data?.project_status ===
                      PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                      ? '#17917E '
                      : props?.data?.project_status ===
                        PROJECT_ALL_STATUS?.POTENTIAL_VERIFIER_SELECTED
                      ? '#E6A603'
                      : props?.data?.project_status ===
                          PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER ||
                        props?.data?.project_status ===
                          PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
                      ? 'red'
                      : 'transparent',
                  mr: 1,
                  height: '10px',
                }}
                fontSize="small"
              />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  color: '#141D1B',
                  fontStyle: 'normal',
                }}
              >
                {props?.data?.project_status ===
                  PROJECT_ALL_STATUS?.VERIFIER_APPROVED_THE_PROJECT ||
                props?.data?.project_status ===
                  PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ||
                props?.data?.project_status ===
                  PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                  ? 'Verifier Confirmed'
                  : props?.data?.project_status ===
                    PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED
                  ? 'Waiting for Verifier’s Confirmation'
                  : props?.data?.project_status ===
                    PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER
                  ? 'Rejected'
                  : props?.data?.project_status ===
                      PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER &&
                    'Verifier Rejected'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container xs={1}>
          {(props?.data?.project_status !==
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
            props?.data?.project_status !==
              PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY) && (
            <Grid
              item
              xs={3}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'start',
              }}
            >
              {props?.data?.project_status ===
              PROJECT_ALL_STATUS?.POTENTIAL_VERIFIER_SELECTED ? (
                <CCButton
                  disabled
                  sx={{
                    backgroundColor: 'rgba(31, 31, 31, 0.2)',
                    color: '#191C1B',
                    padding: '5px 10px',
                    opacity: 0.7,
                    borderRadius: 10,
                    fontSize: 14,

                    width: '35%',
                    height: '50px',
                  }}
                >
                  Finalise Verifier
                </CCButton>
              ) : (
                props?.data?.project_status ===
                  PROJECT_ALL_STATUS?.VERIFIER_APPROVED_THE_PROJECT && (
                  <CCButton
                    onClick={() => {
                      // setShowModal(true)
                      props?.updateVerifierAPI(props?.data)
                    }}
                    sx={{
                      backgroundColor: '#006B5E',
                      color: '#fff',
                      padding: '5px 10px',
                      borderRadius: 10,
                      fontSize: 14,
                      '&:hover': { background: '#006B5E' },
                      width: '35%',
                      height: '50px',
                    }}
                  >
                    Finalise Verifier
                  </CCButton>
                )
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default VerifierReportListItemListItem
