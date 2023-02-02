import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdditionalDetails from './AdditionalDetails/AdditionalDetails'
import OtherProjects from './OtherProjects/OtherProjects'
import ProjectIntroduction from './ProjectIntoduction/ProjectIntroduction'
import Reports from './Reports/Reports'
import SliderComponent from './SliderComponent/SliderComponent'
import TokensTxHistory from './TokensTxHistory/TokensTxHistory'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/system'
import WebAppTraceHistory from './TraceHistory/WebappTraceHistory'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TabSelectorWithCount from '../../atoms/TabSelectorWithCount/TabSelectorWithCount'
import { initialState } from '../../redux/Slices/themeSlice'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import {pathNames} from '../../routes/pathNames'
import { projectDetailsCalls } from '../../api/projectDetailsCalls.api'
declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    lightPrimary?: string
  }
  interface Palette {
    headingColor?: Palette['primary']
    textColor?: Palette['primary']
    textColor2?: Palette['primary']
    textColor3?: Palette['primary']
    bgColor?: Palette['primary']
    bgColor2?: Palette['primary']
    bgColor3?: Palette['primary']
    bgColor4?: Palette['primary']
    gradientColor1?: Palette['primary']
    gradientColor2?: Palette['primary']
    gradientColor3?: Palette['primary']
    iconColor?: Palette['primary']
    chipBgColor?: Palette['primary']
    chipTextColor?: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    headingColor?: PaletteOptions['primary']
    textColor?: PaletteOptions['primary']
    textColor2?: PaletteOptions['primary']
    textColor3?: PaletteOptions['primary']
    bgColor?: PaletteOptions['primary']
    bgColor2?: PaletteOptions['primary']
    bgColor3?: PaletteOptions['primary']
    bgColor4?: PaletteOptions['primary']
    gradientColor1?: PaletteOptions['primary']
    gradientColor2?: PaletteOptions['primary']
    gradientColor3?: PaletteOptions['primary']
    iconColor?: PaletteOptions['primary']
    chipBgColor?: PaletteOptions['primary']
    chipTextColor?: PaletteOptions['primary']
  }
}

const { palette } = createTheme()

const darkModeTheme = {
  palette: {
    background: {
      default:
        'linear-gradient(#fff 0%,rgba(7, 19, 13, 0.79) 15%,  #111E17 20%,  #111E17 72%, rgba(7, 19, 13, 0.79) 85%, #222926 95%)',
    },
    primary: {
      main: '#1d4b44',
    },
    headingColor: { main: '#55DBC8' },
    textColor: { main: '#cce8e1' },
    textColor2: { main: '#ffffff' },
    textColor3: { main: '#ffffff' },
    bgColor: { main: '#000000', secondary: '#ffffff' },
    bgColor2: { main: '#000000' },
    iconColor: { main: '#000000' },
    gradientColor1: {
      main: 'radial-gradient(230.87% 7320.24% at -130.87% 216.67%, gradientColor1.main 0%, gradientColor2.main 56.94%, gradientColor3.main 100%)',
    },
    gradientColor2: { main: '#349386' },
    gradientColor3: { main: '#01443C' },
    chipBgColor: { main: '#006B5E' },
    chipTextColor: { main: '#fff' },
  },
  typography: initialState.typography,
}

const lightModeTheme = {
  palette: {
    background: {
      default: 'transparent',
    },
    primary: {
      main: '#1d4b44',
    },
    headingColor: { main: '#1D4B44' },
    textColor: { main: '#141D1B' },
    textColor2: { main: '#000000' },
    textColor3: { main: '#55DBC8' },
    bgColor: { main: 'transparent', secondary: 'transparent' },
    bgColor2: { main: '#E1EEE8' },
    bgColor3: { main: '#CCE8E1' },
    iconColor: { main: '#388E81' },
    gradientColor1: { main: '#fff' },
    gradientColor2: { main: '#fff' },
    gradientColor3: { main: '#fff' },
    chipBgColor: { main: '#B0FFF2' },
    chipTextColor: { main: '#191C1B' },
    ...initialState.palette,
  },
  typography: initialState.typography,
}

const ProjectDetails = () => {
  
  const [searchParams] = useSearchParams()
  const[ projectData, setProjectData] = useState(null)
    

  useEffect(()=>{
  const projectId = searchParams.get('projectId')
    getProjectDetails(projectId)
  },[])
  const getProjectDetails = (projectId:any)=>{
    projectDetailsCalls.getProjectDetailsById(projectId).then(result => setProjectData(result.data))
  }
 
  const projectDetailsData: any = useLocation()
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const darkTheme = {
    backgroundImage:
      'linear-gradient(#fff 0%,rgba(7, 19, 13, 0.79) 15%,  #111E17 20%,  #111E17 72%, rgba(7, 19, 13, 0.79) 85%, #222926 95%)',
    // color:"#fff"
  }
  const lightTheme = {
    backgroundImage: 'transparent',
    // color:"#006B5E"
  }

  const [tabIndex, setTabIndex] = useState(1)
  const navigate = useNavigate()
  return (
    <Container maxWidth="xl">
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        // sx={{ px: 4 }}
      >
        <ThemeProvider
          theme={
            onWebApp ? createTheme(lightModeTheme) : createTheme(darkModeTheme)
          }
        >
        {onWebApp ?  <Grid item sx={{display:"inline-flex",}}>
            <Typography variant="body1" color="#4A635E">
            Projects
            </Typography>
            <Typography variant="body1" color="#000000" sx={{pl:1}}>
                {' > Project Details'}
              </Typography>
           </Grid> : null}
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={'12px'}
            mb={5}
          >
            <Grid item>
              <BackHeader
                title="Project Details"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid item>
              <CCButton
              onClick={()=> navigate(pathNames.RISK_DASHBOARD)}
                variant="contained"
                sx={{
                  ml: 3,
                  padding: '10px 25px',
                  borderRadius: 10,
                  fontSize:14,
                  '&:hover': {
                    backgroundColor: 'accent.main',
                    boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
                    color: "#006B5E"
                  }
                }}
                buttonBackgroundColor={'#006B5E'}
                buttonColor={'white'}
                // onClick={btn1OnClick}
                // disabled={disableBtn1}
              >
                 <ArrowOutwardIcon sx={{fontSize:16, fontWeight:'600', mr:1}} />
                Climate Risk Dashboard
              </CCButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={onWebApp ? lightTheme : darkTheme} >
            <ProjectIntroduction
              projectDetailsData={projectDetailsData?.state}
              showBuyToken
            />
            <Box sx={{ mt: 35 }}>
              <TabSelectorWithCount
                tabArray={[
                  { name: 'About', count: 0 },
                  { name: 'Reports', count: 0 },
                  { name: 'History', count: 0 },
                ]}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                sx={{}}
                // tabWidth="fit-content"
              />
              {tabIndex === 1 && (
                <>
                  {' '}
                  <ProjectIntroDescription  projectData={projectData}/>{' '}
                  <AdditionalDetails
                    projectData={projectData}
                    projectDetailsData={projectDetailsData?.state}
                  />{' '}
                  <SliderComponent />
                </>
              )}
              {tabIndex === 2 && <Reports />}
              {tabIndex === 3 && (
                <>
                  <TokensTxHistory />
                  <Box
                    sx={{
                      // pt: 5,
                      // padding: '2vw 6vw',
                      // background:
                      //   'linear-gradient(180deg, #111E17 9.55%, rgba(7, 19, 13, 0.79) 100%)',
                      pt: 5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: 'headingColor.main',
                      }}
                    >
                      Trace History
                    </Typography>
                    <Box
                      sx={{
                        background: !onWebApp
                          ? 'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)'
                          : 'transparent',
                        pt: 2,
                        // pl: 5,
                        borderRadius: '8px',
                      }}
                    >
                      <WebAppTraceHistory
                        projectId={projectDetailsData?.state?.uuid}
                        theme={onWebApp ? 'light' : 'dark'}
                      />
                    </Box>
                  </Box>
                </>
              )}
              <OtherProjects />
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>
    </Container>
  )
}
export default ProjectDetails

const ProjectIntroDescription = ({projectData}:{projectData:any}) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: '400',
          color: 'headingColor.main',
          mt: 5,
        }}
      >
        Overview
      </Typography>
      <Grid
        item
        sx={{
          // background:'linear-gradient(360deg, #111E17 54.15%, rgba(7, 19, 13, 0.79) 100.62%)',
          // px: 10,
          // pt:10,
          color: 'textColor2.main',
          columnCount: 2,
          alignContent: 'flex-start',
          columnFill: 'balance',
          breakInside: 'avoid',
          mt: 3,
          fontSize:16
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
         {projectData?.description?.general_description}
        </Typography>
      </Grid>
    </>
  )
}
