import {
  Box,
  Checkbox,
  Container,
  Drawer,
  Grid,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { filters, FILTER_ACTION } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'
import ProjectDetailsCardSkeleton from '../ProjectDetails/OtherProjects/ProjectDetailsCardSkeleton'
import CustomCheckbox from './CustomCheckbox'
import './index.css'
import MarketPlaceFiltersDrawer from './MarketPlaceFiltersDrawer'
import {
  setFilterApplicableProjects,
  setFiltersApplied,
  setMarketPlaceProjects,
} from '../../redux/Slices/marketPlaceFiltersDrawerSlice'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'
import CCButton from '../../atoms/CCButton'

const staticProjects = [
  '',
  '',
  // '', '', '', '', ''
]

const ProjectListsWithFilter = () => {
  console.log('Reloadeed ProjectListsWithFilter **')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const location = useLocation()

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [action, setAction] = useState<string>(FILTER_ACTION.APPLY)
  const [showDrawer, setShowDrawer] = useState<any>(false)
  //const [showDrawer, setShowDrawer] = useState<any>({ right: false })

  const marketPlaceProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.marketPlaceProjects
  )
  const filterApplicableProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.filterApplicableProjects
  )
  const filtersApplied = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.filtersApplied
  )
  const appliedFiltersCount = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.appliedFiltersCount
  )

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = async () => {
    try {
      setLoading(true)
      const projectRes = await dataCollectionCalls.getVerifiedProjects()
      if (projectRes.success) {
        //setProjects(projectRes.data)
        //setFilteredProjects(projectRes.data)
        dispatch(setMarketPlaceProjects(projectRes.data))
        dispatch(setFilterApplicableProjects(projectRes.data))
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getVerifiedProjects api ~ ', e)
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
      filterProjects()
    } else {
      resetFilters()
    }
  }
  const filterProjects = () => {
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

  const viewRenderer = useCallback(() => {
    console.log('viewRenderer')
    return (
      <>
        <Stack
          flexDirection={'row'}
          alignItems="flex-end"
          justifyContent={'space-between'}
          sx={{ mb: 4, mt: 2 }}
        >
          <Typography
            sx={{
              fontSize: '28px',
              color: onWebApp ? Colors.tertiary : '#55DBC8',
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{
              color: onWebApp ? Colors.textColorLightGreen : '#55DBC8',
              padding: '8px 10px',
              border: '1px solid #6E7976',
              borderRadius: '40px',
              cursor: 'pointer',
            }}
            onClick={() => setShowDrawer(true)}
          >
            {`filter(${appliedFiltersCount})`}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography sx={{ color: '#006B5E' }}>
              Showing results for:{' '}
            </Typography>
            {filtersApplied && <MarketPlaceFilterChip />}
          </Box>
          <CCButton
            sx={{
              textAlign: 'end',
              padding: '5px 18px',
              minWidth: 0,
              borderRadius: 30,
              background: '#006B5E',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
            }}
            onClick={() => {
              dispatch(setFilterApplicableProjects(marketPlaceProjects))
              dispatch(setFiltersApplied(false))
            }}
          >
            Clear All
          </CCButton>
        </Box>
        <Grid
          container
          spacing={{ sm: 1, md: 1, lg: 1, xl: 1 }}
          columns={{ sm: 10, md: 12, lg: 15, xl: 15 }}
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
          ) : filterApplicableProjects &&
            filterApplicableProjects.length !== 0 ? (
            filterApplicableProjects?.map((project: any, index: number) => (
              <ProjectDetailsCard
                key={index}
                project={project}
                navigationAction={(item: any) => navigate(item)}
              />
            ))
          ) : (
            <Grid
              item
              sm={12}
              display="flex"
              sx={{ height: '90%', width: '100%' }}
            >
              <EmptyComponent
                photoType={1}
                title=" No Projects matching the selected filter for now."
                // listNewProject
                // action={() => listNewProject()}
                sx={{ width: '100%', height: '100%' }}
              />
            </Grid>
          )}
        </Grid>
      </>
    )
  }, [filterApplicableProjects, loading])

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
      <Drawer
        anchor={'right'}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <MarketPlaceFiltersDrawer />
      </Drawer>
      {viewRenderer()}
    </Container>
  ) : (
    <Box
      sx={{
        background: onWebApp
          ? ''
          : 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: onWebApp ? 0 : '56px 6vw',
        height: '100vh',
      }}
    >
      {viewRenderer()}
    </Box>
  )
}

export default ProjectListsWithFilter
