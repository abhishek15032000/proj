import React, { FC, useEffect, useState } from 'react'
//MUI imports
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box } from '@mui/system'
import TodayIcon from '@mui/icons-material/Today'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import moment from 'moment'
import CCMultilineTextArea from '../CCMultilineTextArea'

const data = {
  company_name:
    '3.66 MW poultry litter based power generation project by Raus Power in India',
  start_date: '2022-08-08T08:04:33.441Z',
  type: [
    'Reduced Emissions from Deforestation and Degradation (REDD)',
    'Agricultural Land Management (ALM)',
  ],
  location: '6430 Hixson Pike, Hixson, TN 37343, USA',
}

interface ReportsViewCommentsProps {
  projectDetails?: any
}

const ReportsViewComments: FC<ReportsViewCommentsProps> = (props) => {
  const [projectDetails, setProjectDetails] = useState<null | any>(null)

  useEffect(() => {
    if (props?.projectDetails) {
      setProjectDetails(props.projectDetails)
    } else {
      setProjectDetails(data)
    }
  }, [])
  return (
    <Grid container data-testid="reports-view-comments">
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <ChevronLeftIcon />
          <Typography sx={{ color: '#F15D5F', fontSize: 28, fontWeight: 400 }}>
            Comments
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ pt: 4 }}>
        <Paper elevation={4} sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: 24, fontWeight: 400 }}>
                {projectDetails?.company_name}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                {projectDetails?.type?.map((type: any, index: number) => (
                  <Box
                    data-testid="reports-view-comments-type"
                    sx={{
                      fontSize: 14,
                      color: '#191C1B',
                      backgroundColor: '#E8F3EF',
                      padding: '2px 4px',
                      mt: 1,
                      mr: 1,
                    }}
                    key={index}
                  >
                    {type}
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TodayIcon sx={{ color: '#006B5E', mr: 1, fontSize: 18 }} />
                <Box>
                  Started on {moment(projectDetails?.start_date).format('L')}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <PlaceOutlinedIcon
                  sx={{ color: '#006B5E', mr: 1, fontSize: 18 }}
                />
                <Typography sx={{ fontSize: 14 }}>
                  {projectDetails?.location}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ py: 3 }}>
              <Divider sx={{ color: '#CDCDCD' }} />
              {/*<hr style={{ color: '#CDCDCD' }}></hr>*/}
            </Grid>
            <Grid item xs={10}>
              {projectReviewDetials.map((i: any, index: number) => (
                <Grid container key={index} sx={{ pb: 2 }}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {i?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                      {i?.value}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: 16, color: '#1D4B44', pb: 2 }}
              >
                GHG reduction occuring from this project
              </Typography>
              <CCMultilineTextArea
                value={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas tempus adipiscing cursus aliquam. Suspendisse in velit volutpat a. Augue augue in sed ipsum placerat gravida nunc. Cursus at nisl arcu et proin adipiscing. Pellentesque tempor viverra vitae quam. A duis cursus aliquam integer. Non cursus congue amet eu aliquet sit eget est. Donec nunc lacus, euismod nulla. Sed congue nisl vitae varius. Dolor accumsan in arcu, ipsum, egestas mi donec gravida ipsum. Ultrices morbi morbi imperdiet aliquet vestibulum dolor. Egestas vel et vitae id odio viverra adipiscing. Magna maecenas non id mus eu eu turpis proin sem. Mauris nec ut. '
                }
                sx={{ background: '#FAFDFA' }}
              />
            </Grid>
            <Grid item xs={12} sx={{ pt: 2 }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: 16, color: '#1D4B44' }}
              >
                Relevant Docs
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ReportsViewComments
const projectReviewDetials = [
  {
    name: 'Date of Report Submission',
    value: '21/11/2022 - 26/12/2022',
  },
  {
    name: 'No of Co2cAuthorised',
    value: '420',
  },
  {
    name: 'Date of Verification',
    value: '31/12/2022',
  },
  {
    name: 'Next Date for monthly report submission',
    value: '25/01/2023',
  },
]
