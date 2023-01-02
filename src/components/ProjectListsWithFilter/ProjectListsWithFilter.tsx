import { Box, Checkbox, Grid } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'
import './index.css'

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

const staticProjects = [
  '',
  '',
  // '', '', '', '', ''
]

const ProjectListsWithFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any>(null)

  useEffect(() => {
    getAllProjects()
  }, [])

  // useEffect(() => {
  //   if (!selectedFilters.length) {
  //     setFilteredProjects(projects)
  //     return
  //   }
  //   if (projects && projects?.length) {
  //     console.log('project', projects)
  //     const projectsMatchingFilter: any[] = []
  //     projects.foreach((project: any) => {
  //       console.log(project?.type)
  //       const projectType = project?.type
  //       if (projectType.some((item: string) => projectType.includes(item))) {
  //         projectsMatchingFilter.push(project)
  //       }
  //       // return project?.type
  //       setFilteredProjects(projectsMatchingFilter)
  //     })
  //   }
  // }, [projects])

  const getAllProjects = () => {
    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((response) => {
        // console.log('response.data.data', response.data.data)
        const types = response.data.data.map((project: any) => {
          console.log(project?.type)
          return project?.type
        })
        // console.log('types', types)
        // setLoading(false)
        setProjects(response.data.data)
      })
      .catch((e) => {
        // setLoading(false)
      })
  }

  const handleChange = (e: any, filter: string) => {
    let selectedFiltersCopy
    if (e.target.checked) {
      selectedFiltersCopy = [...selectedFilters]
      selectedFiltersCopy.push(filter)
    } else {
      selectedFiltersCopy = selectedFilters.filter(
        (selectedFilter: string) => selectedFilter !== filter
      )
    }
    setSelectedFilters(selectedFiltersCopy)
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: '56px 6vw',
      }}
    >
      <Box sx={{ fontSize: '32px', color: '#55DBC8' }}>Projects</Box>
      <Grid container columnSpacing={2} sx={{ mt: 3 }}>
        <Grid item md={2}>
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
            <Box
              className="filter-list-container"
              sx={{
                px: 2,
                py: 1,
                maxHeight: '70vh',
                overflow: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Box
              // className="filter-list-container"
              // sx={{ overflow: 'auto', maxHeight: '70vh' }}
              >
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
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <CustomCheckbox
                                onChange={(e: any) => handleChange(e, item)}
                              />
                            </Box>
                            {item}
                          </Box>
                        ))}
                    </Box>
                  ))}
              </Box>
            </Box>
            {selectedFilters.length > 0 && (
              <Box
                sx={{
                  background: '#005046',
                  // padding: '4px 8px'
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    // m: 1,
                    fontSize: 14,
                    fontWeight: 500,
                    background: '#fff',
                    borderRadius: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: '#000',
                    padding: '0 8px',
                  }}
                >
                  {/* <CCButton>Apply</CCButton> */}
                  Apply
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item md={10}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {filteredProjects &&
              filteredProjects.length &&
              filteredProjects.map((project: any, index: string) => (
                <ProjectDetailsCard key={index} project={project} />
              ))}
            {/* {staticProjects &&
              staticProjects.length &&
              staticProjects.map((project, index) => (
                <ProjectDetailsCard key={index} project={project} />
              ))} */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectListsWithFilter

interface CustomCheckboxProps {
  onChange: any
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ onChange }) => {
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
      onChange={onChange}
    />
  )
}
