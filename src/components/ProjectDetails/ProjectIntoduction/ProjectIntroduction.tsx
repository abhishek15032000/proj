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
import { fileUploadCalls } from '../../../api/fileUpload.api'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
interface ProjectIntroductionProps {
  projectDetailsData?: any
  projectData?: any
  showBuyToken?: boolean
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
  const { projectDetailsData, showBuyToken, projectData } = props
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

  const [bannerImage, setBannerImage] = useState<any>(false)
  // console.log("🚀 ~ file: ProjectIntroduction.tsx ~ line 93 ~ ProjectIntroduction ~ bannerImage", bannerImage)

  useEffect(() => {
    const data = projectData ? projectData : projectDetailsData
    fileUploadCalls
      .getFile(data?.banner_image[0])
      .then((res) => setBannerImage(URL.createObjectURL(res)))
  }, [projectData, projectDetailsData])

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${
          !bannerImage ? Images.ProjectDetails : bannerImage
        })`,
        // pb: 8,
        // maxWidth: 'fit-content',

        borderRadius: '16px',
        minHeight: '372px',
        position: 'relative',
        maxWidth: '100%',
        justifyContent: 'center',
        // padding: !onWebApp ? '2vw 2vw' : 0,
        backgroundSize: 'cover',
      }}
      xs={12}
    >
      <Grid
        xs={12}
        container
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        flexDirection="row"
        sx={{
          backgroundColor: 'rgba(0, 107, 94, 0.72)',
          borderRadius: '16px',
          // m: 10,
          p: 3,
          pb: 2,
        }}
      >
        <Grid
          item
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          flexDirection="column"
          display={'flex'}
          flex={1}
          // width={'50%'}

          sx={{
            maxWidth: '80%',
            minWidth: '80%',

            minHeight: '330px',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: 12,
              fontWeight: 500,
              flex: 1,
              lineHeight: '16px',
              letterSpacing: '0.5px',
              fontStyle: 'normal',
            }}
          >
            {'Project ID:' + '5435678'}
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: 57,
              fontWeight: 500,

              wordWrap: 'break-word',
              flex: 6,
              textAlign: 'start',
              width: '90%',
              lineHeight: '80px',
              letterSpacing: '-0.25px',
              fontStyle: 'normal',
            }}
          >
            {projectDetailsData?.company_name || projectData?.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end',
              alignItems: 'center',
              mt: 1,
              flex: 1,
            }}
          >
            <LocationOnOutlinedIcon style={{ color: '#FFFFFF' }} />
            <Typography
              sx={{
                color: 'white',
                fontSize: 11,
                fontWeight: 500,
                lineHeight: '16px',
                letterSpacing: '0.5px',
                fontStyle: 'normal',
              }}
            >
              {projectDetailsData?.location ||
                projectData?.location + ' | ' + projectDetailsData?.area ||
                projectData?.area}
            </Typography>
          </Box>
        </Grid>
        {/* <Grid
              xs={6}
              item
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              flexDirection="row"
              // width={'50%'}
              sx={{ p: 2 }}
            >
           
             <Typography
                sx={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 500,
                  // ml: 3,
                
                  textAlign:'left'
                }}
              >
                SDGs Covered
              </Typography>
           
              <Grid
                columns={5}
                columnSpacing={4}
                rowSpacing={4}
                // columnSpacing={4}
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
                      // columns={1}
                      // columnSpacing={5}
                      item
                      key={index}
                      sx={{
                        mt: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // border: '1px solid #B1CCC6',
                        // borderRadius: '12px',

                        // minWidth: '80px',
                        height: '120px',
                        // m: 2,
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
                          mt:'5px',
                          lineHeight:"16px"
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Grid> */}
      </Grid>
      {showBuyToken && (
        <BuyToken
          goingUp={goingUp}
          projectData={projectData}
          projectDetailsData={projectDetailsData}
        />
      )}
    </Grid>
  )
}
export default ProjectIntroduction
