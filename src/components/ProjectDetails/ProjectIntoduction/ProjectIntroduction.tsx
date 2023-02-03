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

interface ProjectIntroductionProps {
  projectDetailsData?: any,
  projectData?: any,
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
  const { projectDetailsData ,showBuyToken, projectData} = props
  console.log("🚀 ~ file: ProjectIntroduction.tsx ~ line 63 ~ ProjectIntroduction ~ projectDetailsData", projectDetailsData)
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
    const data = projectData? projectData:projectDetailsData
   fileUploadCalls.getFile(data?.banner_image[0]).then(res => setBannerImage( URL.createObjectURL(res))) 
     
  },[projectData,projectDetailsData])
    return (
      <>
        <Grid
          container
          sx={{
            backgroundImage: `url(${ !bannerImage ? Images.ProjectDetails : bannerImage})`,
            // pb: 8,
            // maxWidth: 'fit-content',
            maxHeight: 'fit-content',
            borderRadius: '16px',
            minHeight: '600px',
            position: 'relative',
            maxWidth: '100%',
            justifyContent:'center'
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
                 p: 3
            }}
          >
            <Grid
              item
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              flexDirection="row"
              // width={'50%'}
              sx={{ p: 2 }}
              xs={6}
            >
              <Typography
                sx={{ color: 'white', fontSize: 40, fontWeight: 500,}}
              >
                {projectDetailsData?.company_name}
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
                sx={{  mt: 2, width: '50%' }}
              >
                <Box sx={{ flexDirection: 'column', width: '40%', pt:1 }}>
                  <img
                    data-testid="logo-img"
                    className="logoImage"
                    src={Images.ICRLogo}
                    // style={{ width: '150px' }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
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
            </Grid>
          </Grid>
         {showBuyToken && <BuyToken goingUp={goingUp} projectDetailsData={projectDetailsData} />}
        </Grid>
      </>
    )
   
}
export default ProjectIntroduction
