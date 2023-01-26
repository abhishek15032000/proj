import { Grid, Typography, Box, Paper } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors, Images } from '../../../theme'
import TitleValue from '../../Profile/TitleValue'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { projectDetailsCalls } from '../../../api/projectDetailsCalls.api'
import BlockchainCalls from '../../../blockchain/Blockchain'
import LoderOverlay from '../../LoderOverlay'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../../routes/pathNames'

interface ProjectIntroductionProps {
  projectDetailsData?: any
}
const ProjectIntroduction = (props: ProjectIntroductionProps) => {
  const navigate = useNavigate()

  const data = [
    {
      image: Images.one,
      name: 'No Poverty',
    },
    {
      image: Images.three,
      name: 'Good Health & Well Being',
    },
    {
      image: Images.six,
      name: 'Clean Water & Sanitisation',
    },
    {
      image: Images.seven,
      name: 'Reduced Inequalities',
    },
    {
      image: Images.eight,
      name: 'Responsible Consumption & Production',
    },
    {
      image: Images.ten,
      name: 'Climate Action',
    },
    {
      image: Images.twelve,
      name: 'Life on Land',
    },
    {
      image: Images.thirteen,
      name: 'Decent Work & Economic Growth',
    },
    {
      image: Images.fifteen,
      name: 'Affordable & Clean Energy',
    },
  ]
  const { projectDetailsData } = props
  const prevScrollY = useRef(0)

  const [goingUp, setGoingUp] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 550) {
        setGoingUp(false)
      }
      if (currentScrollY > 600) {
        setGoingUp(true)
      }

      prevScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [goingUp])

  if (loading) {
    return <LoderOverlay />
  } else {
    return (
      <>
        <Grid
          container
          sx={{
            backgroundImage: `url(${Images.ProjectDetails})`,
            // pb: 8,
            maxWidth: 'fit-content',
            maxHeight: 'fit-content',
            borderRadius: '16px',
            minHeight: '600px',
            position: 'relative',
          }}
        >
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection="row"
            sx={{
              backgroundColor: 'rgba(0, 107, 94, 0.42)',
              borderRadius: '16px',
              // m: 10,
            }}
          >
            <Grid
              item
              justifyContent={'space-between'}
              alignItems={'center'}
              flexDirection="row"
              width={'50%'}
              sx={{ p: 2 }}
            >
              <Typography
                sx={{ color: 'white', fontSize: 40, fontWeight: 500, mt: -4 }}
              >
                {projectDetailsData?.name}
              </Typography>
              <Typography
                sx={{ color: 'white', fontSize: 16, fontWeight: 400, mt: 2 }}
              >
                {projectDetailsData?.location +
                  ' | ' +
                  projectDetailsData?.area}
              </Typography>
              <Grid
                item
                justifyContent={'space-between'}
                alignItems={'center'}
                display="flex"
                flexDirection="row"
                sx={{ p: 2, mt: 2, width: '50%' }}
              >
                <Box sx={{ flexDirection: 'column', width: '40%' }}>
                  <img
                    data-testid="logo-img"
                    className="logoImage"
                    src={Images.logo}
                    style={{ width: '150px' }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              justifyContent={'space-between'}
              alignItems={'center'}
              flexDirection="row"
              width={'50%'}
              sx={{ p: 2 }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 500,
                  ml: 3,
                  mt: 1,
                }}
              >
                SDGs Covered
              </Typography>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {data &&
                  data.length > 0 &&
                  data.map((item: any, index: any) => (
                    <Grid
                      item
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // border: '1px solid #B1CCC6',
                        // borderRadius: '12px',

                        minWidth: '120px',
                        height: '120px',
                        m: 2,
                      }}
                    >
                      <img
                        data-testid="logo-img"
                        className="logoImage"
                        src={item?.image}
                        style={{ width: '70px' }}
                      />
                      <Typography
                        sx={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: 400,
                          textAlign: 'center',
                          width: '70px',
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Paper
            sx={{
              background:
                'radial-gradient(230.87% 7320.24% at -130.87% 216.67%, #75F8E4 0%, #349386 56.94%, #01443C 100%)',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: goingUp ? 'space-around' : 'space-between',
              alignItems: 'center',
              pt: 2,
              px: goingUp ? 38 : 2,
              pb: 3,
              height: '20%',
              width: goingUp ? '100%' : '50%',

              mx: goingUp ? 0 : 45,
              position: goingUp ? 'fixed' : 'absolute',

              top: goingUp ? '0' : '90%',
              zIndex: 1000,
              transition:"width 0.3s ease"
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'start',
              }}
            >
              <TitleValue
                title={'Tokens Available for Purchase :'}
                value={'04'}
                valueStyle={{
                  fontWeight: 500,
                  color: Colors.white,
                  textAlign: 'right',
                  mb: 2,
                }}
                titleStyle={{ fontWeight: 500, color: Colors.white, mb: 2 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'start',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'start',
                  }}
                >
                  <Typography
                    sx={[
                      { fontWeight: 400, fontSize: 14, color: Colors.white },
                    ]}
                  >
                    {'Unit Price :'}
                  </Typography>
                  <InfoOutlinedIcon
                    sx={{ fontSize: 20, ml: 1 }}
                    htmlColor={Colors.white}
                  />
                </Box>

                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    ml: 1,
                    color: Colors.white,
                    textAlign: 'right',
                  }}
                >
                  {/* {props.value === undefined || props.value === '' ? '-' : props.value} */}
                  {'144'}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '150px',
                height: '40px',
                backgroundColor: '#75F8E4',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                mt: 2,
              }}
              onClick={() =>
                navigate(pathNames.MARKETPLACE, {
                  state: {
                    projectID: projectDetailsData?._id,
                    projectUUID: projectDetailsData?.uuid,
                  },
                })
              }
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}
              >
                {'Buy Tokens'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          sx={{
            // background:'linear-gradient(360deg, #111E17 54.15%, rgba(7, 19, 13, 0.79) 100.62%)',
            px: 10,
            pt: 4,
            color:"textColor2.main"
          }}
        >
          <Typography
            sx={{   fontSize: 14, fontWeight: 400, mt: 10 }}
          >
            Project Intro Outside Pittsburgh, Allegheny Land Trust protected 124
            acres of woodlands from rapid encroaching residential development in
            southeastern Allegheny County. The 40 year old maple, cherry and
            oak-hickory forest provides habitat for deer, turkey, and many
            species of birds. Hikers, birders, and mountain bikers will be able
            to explore the area, and possibly catch a glimpse of a majestic 200
            year old oak tree.
          </Typography>
          <Typography
            sx={{   fontSize: 14, fontWeight: 400, mt: 2 }}
          >
            Protection of this forest also contributes to maintaining clean
            drinking water for Pittsburgh region’s residents. Located within the
            lower Youghiogheny River Watershed, the property is five miles
            upstream from the confluence with the Monongahela River.
          </Typography>
          <Typography
            sx={{
               
              fontSize: 14,
              fontWeight: 400,
              mt: 2,

              mb: 10,
            }}
          >
            Revenue generated from the sale of carbon credits will be put
            towards acquisition costs, land stewardship, and future expansion of
            this and other conservation lands.
          </Typography>
        </Grid>
      </>
    )
  }
}
export default ProjectIntroduction
