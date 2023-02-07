import { Box, Checkbox, Container, Grid, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { filters, FILTER_ACTION } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'
import ProjectDetailsCardSkeleton from '../ProjectDetails/OtherProjects/ProjectDetailsCardSkeleton'
import CustomCheckbox from './CustomCheckbox'
import './index.css'

const staticProjects = [
  '',
  '',
  // '', '', '', '', ''
]

const ProjectListsWithFilter = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [action, setAction] = useState<string>(FILTER_ACTION.APPLY)
  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = async () => {
    try {
      setLoading(true)
      const projectRes = await dataCollectionCalls.getAllProjects()
      if (projectRes.data.success) {
        setProjects(projectRes.data.data)
        setFilteredProjects(projectRes.data.data)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getAllProjects api ~ ', e)
    } finally {
      setLoading(false)
    }
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
    setAction(FILTER_ACTION.APPLY)
  }

  const handleClick = () => {
    if (action === FILTER_ACTION.APPLY) {
      filterProjcts()
    } else {
      resetFilters()
    }
  }
  const filterProjcts = () => {
    if (!selectedFilters.length) {
      setFilteredProjects(projects)
      return
    }
    if (projects && projects?.length) {
      const projectsMatchingFilter: any[] = []
      projects.forEach((project: any) => {
        const projectType = project?.type
        if (
          projectType.some((item: string) => selectedFilters.includes(item))
        ) {
          projectsMatchingFilter.push(project)
        }
      })
      setFilteredProjects(projectsMatchingFilter)
      setAction(FILTER_ACTION.RESET)
    }
  }

  const resetFilters = () => {
    setSelectedFilters([])
    setFilteredProjects(projects)
    setAction(FILTER_ACTION.APPLY)
  }

  const viewRenderer = () => {
    return (
      <>
        <Box
          sx={{
            fontSize: '28px',
            color: onWebApp ? Colors.tertiary : '#55DBC8',
            mb: 4,
          }}
        >
          Projects
        </Box>
        <Grid container sx={{ mt: 3 }} spacing={{ md: 0, lg: 0 }}>
          <Grid item md={4} lg={3} xl={2} pt={0}>
            <Box
              sx={{
                // width:264,
                color: onWebApp ? '#006B5E' : '#DAE5E1',
                background: onWebApp
                  ? '#fff'
                  : 'linear-gradient(180deg, rgba(7, 19, 13, 0.79) 0%, #222926 100%)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  background: onWebApp ? '#DAF7F0' : '#005046',
                  px: 2,
                  py: 1,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Filters
              </Box>
              <Box
                className={`filter-list-container${onWebApp ? '-light' : ''}`}
                sx={{
                  px: 2,
                  py: 1,
                  maxHeight: '72vh',
                  overflow: 'auto',
                  overflowX: onWebApp ? 'hidden' : 'auto',
                }}
              >
                <Box>
                  {filters &&
                    filters.length &&
                    filters.map((filter, index) => (
                      <Box key={index} sx={{ mt: 2 }}>
                        <Box
                          sx={{
                            mb: 1,
                            color: onWebApp ? '#00201B' : '#DAE5E1',
                          }}
                        >
                          {filter?.filterType}
                        </Box>
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
                                py: 1,
                                // color: onWebApp ? '#006B5E':"#fff"
                              }}
                            >
                              <Box>
                                <CustomCheckbox
                                  label={item}
                                  onChange={(e: any) => handleChange(e, item)}
                                  selectedFilters={selectedFilters}
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
                    background: onWebApp ? '#F0FFFB' : '#005046',
                    p: 1,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      background: onWebApp ? '#006B5E' : '#fff',
                      borderRadius: '16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: onWebApp ? '#fff' : '#000',
                      padding: onWebApp ? '4px 8px' : '0 8px',
                    }}
                    onClick={handleClick}
                  >
                    {action === FILTER_ACTION.APPLY
                      ? FILTER_ACTION.APPLY
                      : FILTER_ACTION.RESET}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            item
            pl={1}
            md={8}
            lg={9}
            xl={10}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Grid
              container
              spacing={{ sm: 1, md: 1, lg: 1, xl: 1 }}
              columns={{ sm: 12, md: 12, lg: 12, xl: 12 }}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                height: '75vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                pb: 1,
              }}
            >
              {loading ? (
                <ProjectDetailsCardSkeleton />
              ) : filteredProjects && filteredProjects.length ? (
                filteredProjects?.map((project: any, index: number) => (
                  <ProjectDetailsCard
                    key={index}
                    project={project}
                    navigationAction={(item: any) => navigate(item)}
                  />
                ))
              ) : (
                <Grid item sm={12} display="flex" sx={{ height: '90%',width:'100%'}}>
                  <EmptyComponent
        photoType={1}
        title=" No Projects matching the selected filter for now."
        // listNewProject
        // action={() => listNewProject()}
        sx={{width:'100%', height:'100%'}}
      />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
  return onWebApp ? (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        background: onWebApp
          ? ''
          : 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: onWebApp ? 0 : '56px 6vw',
        maxHeight: '85vh',
      }}
    >
      {viewRenderer()}
    </Container>
  ) : (
    <Box
      sx={{
        background: onWebApp
          ? ''
          : 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: onWebApp ? 0 : '56px 6vw',
        // maxHeight:'85vh'
      }}
    >
      {viewRenderer()}
    </Box>
  )
}

export default ProjectListsWithFilter
