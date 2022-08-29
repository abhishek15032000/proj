// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Menu, Modal, Paper, Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CCButton from '../../atoms/CCButton'
import FinaliseSelectedVerifiersModal from '../../atoms/FinaliseSelectedVerifiers/FinaliseSelectedVerifiersModal'
// Local Imports
import { verifiersList } from '../../utils/data'
import { limitTitle } from '../../utils/commonFunctions'
import moment from 'moment'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
interface VerifierReportListItemListItemProps {
  data: any
  updateVerifierAPI: any
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [verifierDetails, setVerifierDetails] = useState<any>([])
  const [showVerifierDetails, setShowVerifierDetails] = useState<boolean>(false)

  useEffect(() => {
    //filtering the verifier to show verifier details when hovered, will be later modified to api
    if (props?.data?.verifier_name) {
      const g = verifiersList.filter(
        (verifier: any) => verifier?._id === props?.data?.verifier_id
      )
      setVerifierDetails(g)
    }
  }, [verifiersList])

  const daysLeft = (date?: any) => {
    //function for couting days for verifier to accept
    const startdate = moment(date)
    const result: any = startdate.format('DD')
    const currentDay: any = moment().format('DD')
    return 8 - (currentDay - result)
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
          <Grid
            item
            xs={6}
            onMouseEnter={() => setShowVerifierDetails(true)}
            onMouseLeave={() => setShowVerifierDetails(false)}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {props?.data?.verifier_name}
            </Typography>
            {showVerifierDetails &&
              props?.data?.verifier_name &&
              verifierDetails.length &&
              verifierDetails.map((i: any, index: number) => (
                <Paper
                  key={index}
                  sx={{
                    width: '25vw',
                    ml: 3,
                    p: 1,
                    position: 'absolute',
                    zIndex: '1000',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {i.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <LanguageIcon
                      sx={{
                        color: '#006B5E',
                        mr: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#25BBD2',
                        textDecoration: 'underline',
                      }}
                    >
                      {i.website}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <PermIdentityOutlinedIcon
                      sx={{ color: '#006B5E', mr: 1 }}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {i.director}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {i.contact}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#25BBD2',
                        textDecoration: 'underline',
                      }}
                    >
                      {i.mail}
                    </Typography>
                  </Box>
                </Paper>
              ))}
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {limitTitle(props?.data?.verifier_address, 15)}
              {/*{verifierPlace}*/}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex' }}>
            {!props?.data?.accepted_by_issuer && (
              <>
                <CircleIcon
                  sx={{
                    color: props?.data?.accepted_by_verifier
                      ? '#7ACB9F'
                      : '#F7CA56',
                    mr: 1,
                  }}
                />
                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                  {props?.data?.accepted_by_verifier
                    ? 'Verifier Confirmed'
                    : 'Waiting for Verifier’s Confirmation'}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex' }}>
            {
              //props?.data?.accepted_by_verifier &&
              props?.data?.accepted_by_issuer ? (
                <>
                  <CircleIcon
                    sx={{
                      color: '#7ACB9F',
                      mr: 1,
                    }}
                  />
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Verifier Confirmed
                  </Typography>
                </>
              ) : props?.data?.accepted_by_verifier ? (
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
              ) : (
                <Typography
                  textAlign="center"
                  sx={{
                    pr: 5,
                    color: '#667080',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {`${daysLeft(props?.data?.createdAt)} days left`}
                </Typography>
              )
            }
          </Grid>
        </Grid>
      </Box>
      {/* modal when user clicks on finalise verifier */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
              Finalize selected Verifier?
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
                    setShowModal(false)
                  }}
                >
                  Cancel
                </CCButtonOutlined>
                <CCButton
                  sx={{ minWidth: 0, padding: '6px 50px', borderRadius: 10 }}
                  onClick={() => {
                    setShowModal(false)
                    props?.updateVerifierAPI(props?.data)
                  }}
                >
                  Yes
                </CCButton>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Modal>

      {/*<FinaliseSelectedVerifiersModal
        title="Finalise selected Verifiers?"
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
        updateVerifierAPI={props?.updateVerifierAPI}
      />*/}
    </>
  )
}

export default VerifierReportListItemListItem

{
  /*<Grid item xs={2} sx={{ pl: 5, display: 'contents' }}>
            {props?.data?.accepted_by_verifier ? (
              props?.selectedVerifier ? (
                <Stack flexDirection={'row'}>
                  <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Verifier confirmed
                  </Typography>
                </Stack>
              ) : (
                <CCButton
                  onClick={() => {
                    setShowModal(true)
                    props.setSelectedVerifier(props.data.title)
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
            ) : (
              //<>{daysLeft(props?.data?.createdAt)}</>

              <Typography
                textAlign="center"
                sx={{ pr: 5, color: '#667080', fontSize: 14, fontWeight: 500 }}
              >
                {`${daysLeft(props?.data?.createdAt)} days left`}
              </Typography>
            )}
          </Grid>*/
}
{
  /*<Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#E8F3EF',
          mt: 1,
          p: 2,
        }}
      >
        <Grid item xs={6} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{ fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
            onClick={handleClickListItem}
          >
            {props.data.title}
          </Typography>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            <Box sx={{ p: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.location || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <LanguageIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.website || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <PermIdentityOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.director || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.contact || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.mail || '-'}</Typography>
              </Box>
            </Box>
          </Menu>
        </Grid>
        <Grid item xs={2}>
          <Typography>{props?.data?.place}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {props?.data?.status ? (
              <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
            ) : (
              <CircleIcon sx={{ color: '#F7CA56', mr: 1 }} />
            )}
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {props?.data?.status
                ? 'Verifier Confirmed'
                : 'Waiting for Verifier’s Confirmation'}
            </Typography>
          </Box>
        </Grid>
        <Grid item container xs={2} justifyContent="center">
          <Box sx={{ marginRight: 5, display: 'flex', alignItems: 'end' }}>
            {props?.data?.status ? (
              <CCButton
                sx={{
                  backgroundColor: '#006B5E',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: 10,
                  fontSize: 14,
                }}
                onClick={() => setShowModal(true)}
              >
                Finalise Verifier
              </CCButton>
            ) : (
              <Typography>2 days left</Typography>
            )}
          </Box>
        </Grid>
      </Grid>*/
}
