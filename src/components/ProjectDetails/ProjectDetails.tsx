import { Grid, Typography } from '@mui/material'
import React from 'react'
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
 

declare module '@mui/material/styles' {
	interface SimplePaletteColorOptions {
		lightPrimary?: string
	}
	interface Palette {
 
		headingColor?: Palette['primary'];
		textColor?: Palette['primary'];
		textColor2?: Palette['primary'];
		bgColor?: Palette['primary'];
		bgColor2?: Palette['primary'];
		bgColor3?: Palette['primary'];
		iconColor?: Palette['primary'];
 
	}

	// allow configuration using `createTheme`
	interface PaletteOptions {
	 
		headingColor?: PaletteOptions['primary'];
		textColor?: PaletteOptions['primary'];
		textColor2?: PaletteOptions['primary'];
		bgColor?: PaletteOptions['primary'];
		bgColor2?: PaletteOptions['primary'];
		bgColor3?: PaletteOptions['primary'];
		iconColor?: PaletteOptions['primary'];
	 
	}
}


const { palette } = createTheme();

const darkModeTheme = {
  palette: {
    background: {
      default:'linear-gradient(#fff 0%,rgba(7, 19, 13, 0.79) 15%,  #111E17 20%,  #111E17 72%, rgba(7, 19, 13, 0.79) 85%, #222926 95%)',
    },
    primary: {
      main: "#1d4b44",
    },
    headingColor: { main: "#55DBC8" },
    textColor: { main: "#cce8e1" },
    textColor2: { main: "#ffffff" },
    bgColor: { main: "#000000", secondary:'#ffffff' },
    bgColor2: { main: "#000000" },
    iconColor: { main: "#000000" },
     
  },
  
}

const lightModeTheme = {
  palette: {
    background: {
      default: "transparent",
    },
    primary: {
      main: "#1d4b44",
    },
    headingColor:{main:"#1D4B44"},
    textColor: { main: "#1D4B44" },
    textColor2: { main: "#000000" },
    bgColor: { main: "transparent", secondary:'transparent' },
    bgColor2: { main: "#E1EEE8" },
    bgColor3: { main: "#CCE8E1" },
    iconColor: { main: "#388E81" },
  },
 
}


const ProjectDetails = () => {
  const projectDetailsData: any = useLocation()
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  // const onWebApp = true
    const darkTheme =  {
      backgroundImage:  'linear-gradient(#fff 0%,rgba(7, 19, 13, 0.79) 15%,  #111E17 20%,  #111E17 72%, rgba(7, 19, 13, 0.79) 85%, #222926 95%)',
      // color:"#fff"
    }
    const lightTheme =  {
      backgroundImage:  'transparent',
      // color:"#006B5E"
    }
  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <ThemeProvider theme={onWebApp ? createTheme(lightModeTheme): createTheme(darkModeTheme)}>

       
        <Grid item xs={12} sx={onWebApp ? lightTheme : darkTheme}>
          <ProjectIntroduction projectDetailsData={projectDetailsData?.state} />
          <AdditionalDetails projectDetailsData={projectDetailsData?.state} />
          <SliderComponent />
          <TokensTxHistory />
          <Reports />
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
                background:
                !onWebApp ?'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)': 'transparent',
                pt: 5,
                pl: 5,
                borderRadius: '8px',
              }}
            >
              <WebAppTraceHistory
                projectId={projectDetailsData?.state?.uuid}
                theme={onWebApp ?"light":'dark'}
              />
            </Box>
          </Box>
          <OtherProjects />
        </Grid>
        </ThemeProvider>
      </Grid>
    </>
  )
}
export default ProjectDetails
