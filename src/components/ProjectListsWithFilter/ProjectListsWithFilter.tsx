import { Box, Checkbox, Grid } from '@mui/material'
import { height } from '@mui/system'
import React, { FC } from 'react'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'

const filters = [
  {
    filterType: 'Project Type',
    filters: [
      'Registered or Active Project',
      'Provisional Project or Future Project',
    ],
  },
  {
    filterType: 'Credit Type',
    filters: ['Carbon Credit', 'Biodiversity Credit', 'Plastics Credit'],
  },
  {
    filterType: 'Project Categories',
    filters: [
      'Agriculture',
      'Afforestation and reforestation',
      'Bio mass energy',
      'Cement',
      'CO2 Usage',
      'Chemical industries',
      'Construction',
      'Mining/mineral production/ bed CH4',
      'Energy distribution',
      'Energy efficiency: households',
      'Energy efficiency: industry',
      'Energy efficiency: own generation',
      'Energy efficiency: service',
      'Energy efficiency: supply side',
      'Energy demand',
      'Forestry and Other Land Use',
      'Forest conservation (REDD+)',
      'Fossil fuel switch',
      'Fugitive emissions from fuels (solid, oil and gas)',
      'Fugitive emissions from production and consumption of halocarbons and sulphur hexafluoride',
      'Geothermal',
      'HFCs',
      'Hydro',
      'Livestock, enteric fermentation, and manure management',
      'Manufacturing industries',
      'Metal production',
      'Waste handling and disposal',
      'Methane avoidance',
      'N2O',
      'Solar',
      'Solvent use',
      'Blue carbon',
      'Transport',
      'Wind',
      'Other Energy industries (renewable - / non-renewable sources)',
      'Other, please specify',
    ],
  },
  {
    filterType: 'Verification Standard',
    filters: ['Verra Registry', 'Gold Registry', 'BioCarbon Registry'],
  },
]

const projects = ['', '', '', '', '', '', '', '']

const ProjectListsWithFilter = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: '56px 6vw',
      }}
    >
      <Box sx={{ fontSize: '32px', color: '#55DBC8' }}>Projects</Box>
      <Grid container columnSpacing={2} sx={{ mt: 3 }}>
        <Grid item xs={2}>
          <Box
            sx={{
              color: '#DAE5E1',
              background:
                'linear-gradient(180deg, rgba(7, 19, 13, 0.79) 0%, #222926 100%)',
            }}
          >
            <Box
              sx={{
                background: '#005046',
                px: 2,
                py: 1,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Filters
            </Box>
            <Box sx={{ px: 2, py: 1, maxHeight: '70vh', overflow: 'auto' }}>
              {filters &&
                filters.length &&
                filters.map((filter, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Box sx={{ mb: 1 }}>{filter?.filterType}</Box>
                    {filter?.filters &&
                      filter?.filters.length &&
                      filter?.filters.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            mt: 1,
                            fontSize: 12,
                            borderBottom: '1px solid #6E7976',
                            display: 'flex',
                            // justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Box>
                            <CustomCheckbox />
                          </Box>
                          {item}
                        </Box>
                      ))}
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {projects &&
              projects.length &&
              projects.map((project, index) => (
                <ProjectDetailsCard key={index} project={project} />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectListsWithFilter

interface CustomCheckboxProps {}

const CustomCheckbox: FC<CustomCheckboxProps> = () => {
  return (
    <Checkbox
      // {...label}
      // defaultChecked
      sx={{
        // color: '#55DBC8',
        color: '#DAE5E1',
        '&.Mui-checked': {
          // color: '#55DBC8',
          color: '#DAE5E1',
        },
        '.MuiSvgIcon-root': {
          width: '16px',
          height: '16px',
        },
        width: '26px',
        height: '26px',
      }}
    />
  )
}
