import { Container, Grid, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import AdditionalDetails from '../ProjectDetails/AdditionalDetails/AdditionalDetails'

import ProjectIntroduction from '../ProjectDetails/ProjectIntoduction/ProjectIntroduction'
import Reports from '../ProjectDetails/Reports/Reports'
import SliderComponent from '../ProjectDetails/SliderComponent/SliderComponent'

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/system'

import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TabSelectorWithCount from '../../atoms/TabSelectorWithCount/TabSelectorWithCount'
import { initialState } from '../../redux/Slices/themeSlice'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { pathNames } from '../../routes/pathNames'
import { projectDetailsCalls } from '../../api/projectDetailsCalls.api'

import { Colors, Images } from '../../theme'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Overview from '../ProjectDetails/Skeleton/Overview'
import ProjectIntro from '../ProjectDetails/Skeleton/ProjectIntro'
import SDGSComponent from '../ProjectDetails/Skeleton/SDGSComponent'
import AdditionalDetailsSkeleton from '../ProjectDetails/Skeleton/AdditionalDetailsSkeleton'
import { SDGSLIST } from '../../config/constants.config'
declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    lightPrimary?: string
  }
  interface Palette {
    headingColor?: Palette['primary']
    textColor?: Palette['primary']
    textColor2?: Palette['primary']
    textColor3?: Palette['primary']
    textColor4?: Palette['primary']
    textColor5?: Palette['primary']
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
    textColor4?: PaletteOptions['primary']
    textColor5?: PaletteOptions['primary']
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
    textColor4: { main: '#ffffff' },
    textColor5: { main: '#747876' },
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
    textColor4: { main: '#006B5E' },
    textColor5: { main: '#747876' },
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

const SGGSData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

interface AboutProps {
  projectId: any
}

const About: FC<AboutProps> = (props) => {
  const [searchParams] = useSearchParams()
  const [projectData, setProjectData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { projectId } = props

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  useEffect(() => {
    window.scrollTo(0, 0)

    getProjectDetails(projectId)
    return () => {
      setProjectData(null)
    }
  }, [searchParams])

  const getProjectDetails = (projectId: any) => {
    setLoading(true)
    projectDetailsCalls
      .getProjectDetailsById(projectId)
      .then((result: any) => setProjectData(result.data))
      .catch((e: any) => e)
      .finally(() => setLoading(false))
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

  const headerRenderer = () => {
    return (
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={'12px'}
        mb={5}
      >
        <Grid item>
          <BackHeader title="Project Details" onClick={() => navigate(-1)} />
        </Grid>
        <Grid item>
          <CCButton
            onClick={() => navigate(pathNames.RISK_DASHBOARD)}
            variant="contained"
            sx={{
              ml: 3,
              padding: '10px 25px',
              borderRadius: 10,
              fontSize: 14,
              '&:hover': {
                backgroundColor: 'accent.main',
                boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
                color: '#006B5E',
              },
            }}
            buttonBackgroundColor={'#006B5E'}
            buttonColor={'white'}
          >
            <ArrowOutwardIcon sx={{ fontSize: 16, fontWeight: '600', mr: 1 }} />
            Climate Risk Dashboard
          </CCButton>
        </Grid>
      </Grid>
    )
  }
  const viewRenderer = () => {
    return (
      <>
        {
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ pb: 15, mt: 2 }}
          >
            <ThemeProvider
              theme={
                onWebApp
                  ? createTheme(lightModeTheme)
                  : createTheme(darkModeTheme)
              }
            >
              <Grid item xs={12} sx={onWebApp ? lightTheme : darkTheme}>
                <Grid container xs={12}>
                  <Grid item xs={12} lg={7}>
                    {loading ? (
                      <Overview />
                    ) : (
                      <ProjectIntroDescription projectData={projectData} />
                    )}
                    {loading ? (
                      <AdditionalDetailsSkeleton />
                    ) : (
                      <AdditionalDetails
                        projectData={projectData}
                        projectDetailsData={projectDetailsData?.state}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    {loading ? (
                      <SDGSComponent />
                    ) : currentProjectDetails &&
                      currentProjectDetails?.project_status > 0 ? (
                      <Grid
                        container
                        sx={{
                          p: 2,
                          background: '#294A45',
                          borderRadius: '8px',
                          mt: 6,
                        }}
                      >
                        <Grid
                          xs={12}
                          item
                          justifyContent={'flex-start'}
                          alignItems={'flex-start'}
                          flexDirection="row"

                          // width={'50%'}
                        >
                          <Typography
                            sx={{
                              color: '#B0FFF2',
                              fontSize: 24,
                              fontWeight: 600,
                              ml: 2,

                              textAlign: 'left',
                              mt: 2,
                              lineHeight: '36px',

                              fontStyle: 'normal',
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
                              pr: 2,
                              pl: 3,
                              pb:
                                currentProjectDetails?.project_status >= 6
                                  ? 5
                                  : 0,
                            }}
                          >
                            {SGGSData &&
                              SGGSData.length > 0 &&
                              SGGSData.map((item: any, index: any) => (
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

                                    width: '85px',
                                    height: '120px',
                                    // m: 2,
                                    mx: 0.5,
                                  }}
                                >
                                  <img
                                    data-testid="logo-img"
                                    className="logoImage"
                                    src={SDGSLIST[item - 1].image}
                                    style={{ width: '70px' }}
                                  />
                                  <Typography
                                    sx={{
                                      color: 'white',
                                      fontSize: 12,
                                      fontWeight: 400,
                                      textAlign: 'center',
                                      width: '85px',
                                      mt: '5px',
                                      lineHeight: '16px',

                                      letterSpacing: '0.5px',
                                      fontStyle: 'normal',
                                    }}
                                  >
                                    {SDGSLIST[item - 1].name}
                                  </Typography>
                                </Grid>
                              ))}
                          </Grid>
                        </Grid>
                        {currentProjectDetails?.project_status >= 8 ? (
                          <Grid
                            item
                            justifyContent={'start'}
                            alignItems={'start'}
                            display="flex"
                            flexDirection="column"
                            sx={{ mt: 6, width: '50%', ml: 2 }}
                          >
                            <Typography
                              sx={{
                                color: '#B0FFF2',
                                fontSize: 24,
                                fontWeight: 500,

                                textAlign: 'left',
                                lineHeight: '24px',

                                fontStyle: 'normal',
                              }}
                            >
                              Registry
                            </Typography>
                            <Box
                              sx={{
                                flexDirection: 'column',
                                width: '40%',
                                pt: 1,
                              }}
                            >
                              <img
                                data-testid="logo-img"
                                className="logoImage"
                                src={Images.ICRLogo}
                                style={{ width: '200px', height: '70px' }}
                              />
                            </Box>
                          </Grid>
                        ) : null}
                      </Grid>
                    ) : null}
                  </Grid>

                  {projectData?.project_image?.length ? (
                    <SliderComponent projectData={projectData} />
                  ) : null}
                </Grid>
              </Grid>
            </ThemeProvider>
          </Grid>
        }
      </>
    )
  }

  return onWebApp ? (
    <Container maxWidth="xl">{viewRenderer()}</Container>
  ) : (
    viewRenderer()
  )
}
export default About

const ProjectIntroDescription = ({ projectData }: { projectData: any }) => {
  const [seeMore, setSeeMore] = useState(false)

  const dataForDisplay = seeMore
    ? projectData?.description?.general_description
    : projectData?.description?.general_description &&
      projectData?.description?.general_description.slice(0, 480)
  return (
    <>
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: '600',
          color: 'headingColor.main',
          lineHeight: '48px',

          fontStyle: 'normal',
          /* or 150% */
        }}
      >
        Overview
      </Typography>
      <Grid
        item
        sx={{
          color: 'textColor2.main',
          columnCount: 1,
          alignContent: 'flex-start',
          columnFill: 'balance',

          mt: 3,
          fontSize: 16,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            width: '520px',
            lineHeight: '24px',
            letterSpacing: '0.5px',
            fontStyle: 'normal',
          }}
        >
          {dataForDisplay}
        </Typography>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'start',
          mt: 4,
          cursor: 'pointer',
        }}
        onClick={() => setSeeMore(!seeMore)}
      >
        {!seeMore ? (
          <ArrowDownwardIcon style={{ color: '#006B5E' }} fontSize={'small'} />
        ) : (
          <ArrowUpwardIcon style={{ color: '#006B5E' }} fontSize={'small'} />
        )}
        <Typography
          sx={{
            color: '#006B5E',
            fontSize: 14,
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: '21px',
            letterSpacing: '0.02em',
            fontStyle: 'normal',
          }}
        >
          {!seeMore ? 'SEE MORE' : 'SEE LESS'}
        </Typography>
      </Box>
    </>
  )
}
