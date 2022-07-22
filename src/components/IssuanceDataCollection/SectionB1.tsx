import {
  Box,
  Grid,
  TextareaAutosize,
  Typography,
  TextField,
  Stack,
} from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

const SectionB1 = () => {
  return (
    <Box sx={{ mt: 4, mb: 3 }}>
      <Grid container spacing={1}>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
            Brief on purpose and general description of project activity *
          </Typography>
          <TextareaAutosize
            placeholder="(Description of implemented registered project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '100px',
              minHeight: '100px',
              borderRadius: 4,
              border: '2px solid red',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
            Technical Description
          </Typography>
          <TextareaAutosize
            placeholder="(Technical description of the equipment, its specification, supplier name, installed by the project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '1px solid red',
            }}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            columnSpacing={2}
            lg={12}
          >
            <Grid item lg={12}>
              <Stack
                direction="row"
                //justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ fontSize: 14, width: '100%' }}>
                  Attach Data Tables for Major shut down details
                </Typography>
                <Typography
                  textAlign="end"
                  sx={{
                    fontSize: 14,
                    width: '100%',
                    textDecoration: 'underline',
                  }}
                >
                  View Sample Data
                </Typography>
              </Stack>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
                uploaded Images
              </Box>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Stack
                alignItems="center"
                spacing={4}
                sx={{
                  border: '1px solid black',
                  borderStyle: 'dashed',
                  height: 100,
                }}
              >
                <AddIcon />
                <Typography>Attach More</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
            Operational Description
          </Typography>
          <TextareaAutosize
            placeholder="(Events during the monitoring period,logs, Major shut down details, Timings, reasons)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
            }}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            columnSpacing={2}
            lg={12}
          >
            <Grid item lg={12}>
              <Stack
                direction="row"
                //justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ fontSize: 14, width: '100%' }}>
                  Attach Data Tables for Major shut down details
                </Typography>
                <Typography
                  textAlign="end"
                  sx={{
                    fontSize: 14,
                    width: '100%',
                    textDecoration: 'underline',
                  }}
                >
                  View Sample Data
                </Typography>
              </Stack>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
                uploaded Images
              </Box>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  border: '1px solid black',
                  borderStyle: 'dashed',
                  height: 100,
                }}
              >
                <AddIcon />
                <Typography>Attach More</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            columnSpacing={2}
            lg={12}
          >
            <Grid item lg={12}>
              <Stack
                direction="row"
                //justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ fontSize: 14, width: '100%' }}>
                  Attach Data Tables for Major shut down details
                </Typography>
                <Typography
                  textAlign="end"
                  sx={{
                    fontSize: 14,
                    width: '100%',
                    textDecoration: 'underline',
                  }}
                >
                  View Sample Data
                </Typography>
              </Stack>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
                uploaded Images
              </Box>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Stack
                alignItems="center"
                spacing={4}
                sx={{
                  border: '1px solid black',
                  borderStyle: 'dashed',
                  height: 100,
                }}
              >
                <AddIcon />
                <Typography>Attach More</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            columnSpacing={2}
            lg={12}
          >
            <Grid item lg={12}>
              <Stack
                direction="row"
                //justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ fontSize: 14, width: '100%' }}>
                  Attach Data Tables for Major shut down details
                </Typography>
                <Typography
                  textAlign="end"
                  sx={{
                    fontSize: 14,
                    width: '100%',
                    textDecoration: 'underline',
                  }}
                >
                  View Sample Data
                </Typography>
              </Stack>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
                uploaded Images
              </Box>
            </Grid>
            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
              <Stack
                alignItems="center"
                spacing={4}
                sx={{
                  border: '1px solid black',
                  borderStyle: 'dashed',
                  height: 100,
                }}
              >
                <AddIcon />
                <Typography>Attach More</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB1

{
  /*<Grid item xl={8} lg={8} sx={{ background: 'aqua' }}>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <Grid item lg={12}>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                  Attach Data Tables for Major shut down details
                </Typography>
              </Grid>
              <Box sx={{ border: '2px solid black', height: '100px' }}>
                uploaded Images
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <Typography
                textAlign="end"
                sx={{ fontSize: 14, textDecoration: 'underline' }}
              >
                View Sample Data
              </Typography>
              <Stack
                direction="column"
                alignItems="center"
                sx={{
                  border: '1px solid black',
                  borderStyle: 'dashed',
                  height: '100px',
                }}
              >
                <AddIcon />
                Attach more
              </Stack>
            </Grid>
          </Grid>
        </Grid>*/
}
