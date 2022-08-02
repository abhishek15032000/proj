import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box } from '@mui/system'
import { Checkbox, Grid, Stack, Typography, Modal, Paper } from '@mui/material'
import CCButton from '../../atoms/CCButton/CCButton'
import { CheckBox } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const selectVerifierOptions = [
  {
    verifier: 'ADVANCED WASTE MANAGEMENT SYSTEMS, INC.',
    address: '6430 Hixson Pike Hixson, TN 37343 USA www.awm.net',
    director:
      'Rob Ellis Director, Western Region 423-843-2206 robellis@awm.net',
  },
  {
    verifier: 'ASTER GLOBAL ENVIRONMENTAL SOLUTIONS, INC.',
    address:
      '3800 Clermont Street NW North Lawrence, Ohio 44666, USA www.asterglobal.com',

    director:
      'Rob Ellis Director, Western Region 423-843-2206 robellis@awm.net',
  },
  {
    verifier: 'CAMERON-COLE, LLC',
    address: '50 Hegenberger Loop Oakland, CA 94621 USA www.cameron-cole.com',
    director:
      'Chris Lawless Director, Greenhouse Gas Management Services 510-777-1858 clawless@cameron-cole.com',
  },
  {
    verifier: 'DILLON CONSULTING LIMITED',
    address:
      '235 Yorkland Boulevard, Suite 800 Toronto, Ontario M2J 4Y8 www.dillon.ca',
    director:
      'Zachary Zehr Project Manager & Lead Verifier 1-519-571-9833 ext. 3151 zzehr@dillon.ca',
  },
  {
    verifier: 'FIRST ENVIRONMENT, INC.',
    address: '91 Fulton St. Boonton, NJ 07005 USA www.first environment.com',
    director:
      'Michael Carim Environmental Specialist 973-334-0003 mic@firstenvironment .com',
  },
  {
    verifier: 'GHD LIMITED',
    address: '455 Phillip St Waterloo, Ontario N2L 3X2 CAN www.ghd.com',
    director:
      'Jason Clarke Program Manager +1 (519) 340-4270 jason.clarke@ghd.com',
  },
  {
    verifier: 'KPMG PERFORMANCE REGISTRAR INC.',
    address: '777 Dunsmuir Street Vancouver, BC V7Y 1K3 CAN www.kpmg.com',
    director:
      'Chris Ridley-Thomas Vice President 604-691-3088 cridleythomas@kpmg.ca',
  },
  {
    verifier: 'LRQA, INC.',
    address:
      '1330 Enclave Parkway, Suite 200 Houston, TX 77077 USA www.lrqausa.com',
    director:
      'Dave Hadlet Business Development Advisor 866-971-LRQA (5772) Sales-USA@lrqa.com',
  },
  {
    verifier: 'RUBY CANYON ENVIRONMENTAL',
    address:
      '743 Horizon Court, Ste. 385 Grand Junction, CO 81506 USA www.rubycany onenv.com',
    director:
      'Michael Coté Vice President 970-241-9298 mcote@rubycanyonenv .com',
  },
  {
    verifier: 'SCS GLOBAL SERVICES',
    address:
      '2000 Powell Street, Ste 600 Emeryville, CA 94608 USA www.scsglobal services.com',
    director:
      'Karen Righthand Director of Sales and Marketing 1.510.452.6817 krighthand@scsglobal services.com',
  },
  {
    verifier: 'STANTEC CONSULTING LTD.',
    address: '130 Somerset Street Saint John NB E2K 2X4 Canada www.stantec.com',
    director:
      'Vicki Corning, P.Eng. Senior Associate, Environmental Services 506-457-3216 vcorning@stantec.com',
  },
]

const SelectVerifier = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const handleClick = () => {
    setOpen(true)
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
          <Grid container>
            <Grid item>
              <ArrowBackIcon />
            </Grid>
            <Grid item sx={{ ml: 1 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                Select Verifier
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                Select potential verifiers for your project issuance
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CCButton
            variant="contained"
            sx={{ padding: '10px 80px', fontSize: 16 }}
            onClick={handleClick}
            disabled={false}
          >
            Done
          </CCButton>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={2}>
          {selectVerifierOptions.map((i, index) => (
            <Grid item xs={12} lg={5} key={index}>
              <Grid
                container
                //elevation={2}
                sx={{ background: '#fff', height: 210 }}
                //alignItems="flex-start"
                //justifyContent={'space-between'}
              >
                <Grid item xs={1}>
                  <Checkbox />
                </Grid>
                <Grid item xs={11} sx={{ mt: 1 }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    {i?.verifier}
                  </Typography>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                        {i?.address}
                      </Typography>
                    </Grid>
                    <Grid container item xs={8} columnSpacing={3}>
                      <Grid item xs={2}>
                        <Box
                          sx={{ borderRight: '2px solid black', height: 100 }}
                        ></Box>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                          {i?.director}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            py: 2,
            width: 608,
            height: 198,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid container justifyContent={'center'}>
            <Grid item lg={8}>
              <Typography
                textAlign="center"
                sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}
              >
                Confirm selected Verifiers?
              </Typography>
            </Grid>
            <Grid item xl={6} lg={6} md={7} sm={7} xs={7}>
              <Stack direction="row" justifyContent={'space-between'}>
                <CCButton sx={{ minWidth: 0, padding: '6px 34px' }}>
                  Cancel
                </CCButton>
                <CCButton sx={{ minWidth: 0, padding: '6px 50px' }}>
                  Yes
                </CCButton>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}

export default SelectVerifier
