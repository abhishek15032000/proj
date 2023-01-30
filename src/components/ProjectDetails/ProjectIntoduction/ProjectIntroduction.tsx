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
import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import BuyToken from './BuyToken'

interface ProjectIntroductionProps {
  projectDetailsData?: any
}
const ProjectIntroduction = (props: ProjectIntroductionProps) => {
  const navigate = useNavigate()
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  //  const onWebApp = 1
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
                  alignItems: 'baseline',
                  justifyContent: 'flex-start',
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
          <BuyToken goingUp={goingUp} projectDetailsData={projectDetailsData} />
        </Grid>
      </>
    )
  }
}
export default ProjectIntroduction
