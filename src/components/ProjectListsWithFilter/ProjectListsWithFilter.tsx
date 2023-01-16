import { Box, Checkbox, Grid } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
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

  const onWebApp = useAppSelector(({ app }) => app.throughIFrame, shallowEqual)

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

  return (
    <Box
      sx={{
        background: onWebApp
          ? ''
          : 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: onWebApp ? '' : '56px 6vw',
      }}
    >
      <Box
        sx={{ fontSize: '32px', color: onWebApp ? Colors.tertiary : '#55DBC8' }}
      >
        Projects
      </Box>
      <Grid container columnSpacing={2} sx={{ mt: 3 }}>
        <Grid item md={2}>
          <Box
            sx={{
              color: onWebApp ? '#006B5E' : '#DAE5E1',
              background: onWebApp
                ? '#fff'
                : 'linear-gradient(180deg, rgba(7, 19, 13, 0.79) 0%, #222926 100%)',
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
                maxHeight: onWebApp ? '65vh' : '70vh',
                overflow: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Box>
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
        <Grid item md={10}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {loading
              ? ['', '', '', '', '', ''].map((project, index) => (
                  <ProjectDetailsCardSkeleton key={index} />
                ))
              : filteredProjects &&
                filteredProjects.length &&
                filteredProjects.map((project: any, index: number) => (
                  <ProjectDetailsCard
                    key={index}
                    project={project}
                    navigationAction={(item: any) => navigate(item)}
                  />
                ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectListsWithFilter
