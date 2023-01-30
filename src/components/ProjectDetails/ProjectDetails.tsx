import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import AdditionalDetails from './AdditionalDetails/AdditionalDetails'
import OtherProjects from './OtherProjects/OtherProjects'
import ProjectIntroduction from './ProjectIntoduction/ProjectIntroduction'
import Reports from './Reports/Reports'
import SliderComponent from './SliderComponent/SliderComponent'
import TokensTxHistory from './TokensTxHistory/TokensTxHistory'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/system'
import WebAppTraceHistory from './TraceHistory/WebappTraceHistory'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TabSelectorWithCount from '../../atoms/TabSelectorWithCount/TabSelectorWithCount'

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    lightPrimary?: string
  }
  interface Palette {
    headingColor?: Palette['primary']
    textColor?: Palette['primary']
    textColor2?: Palette['primary']
    bgColor?: Palette['primary']
    bgColor2?: Palette['primary']
    bgColor3?: Palette['primary']
    bgColor4?: Palette['primary']
    gradientColor1?: Palette['primary']
    gradientColor2?: Palette['primary']
    gradientColor3?: Palette['primary']
    iconColor?: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    headingColor?: PaletteOptions['primary']
    textColor?: PaletteOptions['primary']
    textColor2?: PaletteOptions['primary']
    bgColor?: PaletteOptions['primary']
    bgColor2?: PaletteOptions['primary']
    bgColor3?: PaletteOptions['primary']
    bgColor4?: PaletteOptions['primary']
    gradientColor1?: PaletteOptions['primary']
    gradientColor2?: PaletteOptions['primary']
    gradientColor3?: PaletteOptions['primary']
    iconColor?: PaletteOptions['primary']
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
    bgColor: { main: '#000000', secondary: '#ffffff' },
    bgColor2: { main: '#000000' },
    iconColor: { main: '#000000' },
    gradientColor1: {
      main: 'radial-gradient(230.87% 7320.24% at -130.87% 216.67%, gradientColor1.main 0%, gradientColor2.main 56.94%, gradientColor3.main 100%)',
    },
    gradientColor2: { main: '#349386' },
    gradientColor3: { main: '#01443C' },
  },
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
    textColor: { main: '#1D4B44' },
    textColor2: { main: '#000000' },
    bgColor: { main: 'transparent', secondary: 'transparent' },
    bgColor2: { main: '#E1EEE8' },
    bgColor3: { main: '#CCE8E1' },
    iconColor: { main: '#388E81' },
    gradientColor1: { main: '#fff' },
    gradientColor2: { main: '#fff' },
    gradientColor3: { main: '#fff' },
  },
}

const ProjectDetails = () => {
  const projectDetailsData: any = useLocation()
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  // const onWebApp = 1
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

  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <ThemeProvider
          theme={
            onWebApp ? createTheme(lightModeTheme) : createTheme(darkModeTheme)
          }
        >
          <Grid item xs={12} sx={onWebApp ? lightTheme : darkTheme}>
            <ProjectIntroduction
              projectDetailsData={projectDetailsData?.state}
            />
            <Box sx={{ mt: 14 }}>
              <TabSelectorWithCount
                tabArray={[
                  { name: 'About', count: 0 },
                  { name: 'Reports', count: 0 },
                  { name: 'History', count: 0 },
                ]}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                sx={{ mt: 3 , px:10}}
                // tabWidth="fit-content"
              />
              {tabIndex === 1 && (
                <>
                  {' '}
                  <ProjectIntroDescription />{' '}
                  <AdditionalDetails
                    projectDetailsData={projectDetailsData?.state}
                  />{' '}
                  <SliderComponent /> <OtherProjects />
                </>
              )}
              {tabIndex === 2 && <Reports />}
              {tabIndex === 3 && (
                <>
                  <TokensTxHistory />
                  <Box
                    sx={{
                      pt: 5,
                      padding: '2vw 6vw',
                      // background:
                      //   'linear-gradient(180deg, #111E17 9.55%, rgba(7, 19, 13, 0.79) 100%)',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'headingColor.main',
                        fontSize: '32px',
                        fontWeight: 500,
                      }}
                    >
                      Trace History
                    </Typography>
                    <Box
                      sx={{
                        background: !onWebApp
                          ? 'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)'
                          : 'transparent',
                        pt: 5,
                        pl: 5,
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
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>
    </>
  )
}
export default ProjectDetails

const ProjectIntroDescription = () => {
  return (
    <Grid
      item
      sx={{
        // background:'linear-gradient(360deg, #111E17 54.15%, rgba(7, 19, 13, 0.79) 100.62%)',
        px: 10,
        pt: 4,
        color: 'textColor2.main',
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 10 }}>
        Project Intro Outside Pittsburgh, Allegheny Land Trust protected 124
        acres of woodlands from rapid encroaching residential development in
        southeastern Allegheny County. The 40 year old maple, cherry and
        oak-hickory forest provides habitat for deer, turkey, and many species
        of birds. Hikers, birders, and mountain bikers will be able to explore
        the area, and possibly catch a glimpse of a majestic 200 year old oak
        tree.
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 2 }}>
        Protection of this forest also contributes to maintaining clean drinking
        water for Pittsburgh region’s residents. Located within the lower
        Youghiogheny River Watershed, the property is five miles upstream from
        the confluence with the Monongahela River.
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          mt: 2,

          mb: 10,
        }}
      >
        Revenue generated from the sale of carbon credits will be put towards
        acquisition costs, land stewardship, and future expansion of this and
        other conservation lands.
      </Typography>
    </Grid>
  )
}
