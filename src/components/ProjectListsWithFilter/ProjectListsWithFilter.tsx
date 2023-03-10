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
  resetFilter,
  setSelectedFilters as redux_setSelectedFilters,
  setAppliedFiltersCount,
  setRemoveFilters,
} from '../../redux/Slices/marketPlaceFiltersDrawerSlice'
import { setCachedMarketplaceProject } from '../../redux/Slices/marketPlaceCachingSlice'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'
import CCButton from '../../atoms/CCButton'
import lodash from 'lodash'

const staticProjects = [
  {
    _id: '63f49a3f945552585d665a66',
    uuid: '030a685c-a24c-4d62-9e02-d8799c2bbc8c',
    company_name: 'Shaoguan City Shaoneng Biomass Power Generation Project',
    banner_image: ['boimass download.jpeg'],
    project_image: ['biomass imgres.html'],
    type: [' Energy industries (renewable - / non-renewable sources)'],
    start_date: '2013-06-01T10:15:17.000Z',
    location: 'Shaoguan City',
    duration: 6,
    area: '300',
    project_status: 0,
    monthly_update: false,
    end_date: '2020-05-31T10:15:39.000Z',
    name: 'test pd',
    email: 'test@pd.com',
    user_id: '63c8ee89afcd8a716cd45d6a',
    register: false,
    tx: [
      {
        tx_id:
          '0x5e6ded429fd1dbe0ad242fab33d57229ba2706dd8b215944a81c5b12a6caf80e',
        tx_data:
          '0x5e6ded429fd1dbe0ad242fab33d57229ba2706dd8b215944a81c5b12a6caf80e',
        type: 0,
        _id: '63f49a3f945552585d665a67',
      },
    ],
    createdAt: '2023-02-21T10:17:35.909Z',
    updatedAt: '2023-02-21T10:17:36.132Z',
    __v: 0,
    section_a: {
      step1: {
        name: 'Purpose and General description of project activity',
        completed: false,
      },
      step2: { name: 'Location', file_attach: [], completed: false },
      step3: {
        name: 'Parties & Project Participants',
        host_country_attestation_upload: [],
        completed: false,
        party_and_project_participants: [],
      },
      step4: {
        name: 'Reference & Applied Methodology',
        completed: false,
        methodologies: [],
      },
      step5: { name: 'Credit Period', completed: false },
      step6: { name: 'SafeGuard' },
      step7: { name: 'Additionality' },
      _id: '63f49a3f945552585d665a69',
      uuid: 'b102a9d2-f9f2-4bda-b84e-6fd6c6f7788e',
      project_id: '030a685c-a24c-4d62-9e02-d8799c2bbc8c',
      createdAt: '2023-02-21T10:17:35.953Z',
      updatedAt: '2023-02-21T10:17:35.953Z',
      __v: 0,
    },
    section_b: {
      step1: {
        name: 'Description of implementation registered project activity',
        data_tables_technical_description_attach: [],
        shut_down_details_attach: [],
        implementation_milestones_attach: [],
        project_timeline_attach: [],
        completed: false,
      },
      step2: { name: 'Post registration changes', completed: false },
      step3: {
        name: 'Additional information',
        ownership_file_attach: [],
        completed: false,
      },
      _id: '63f49a3f945552585d665a6b',
      uuid: 'd683986f-5b44-43a4-b600-e9ebdaf256cf',
      project_id: '030a685c-a24c-4d62-9e02-d8799c2bbc8c',
      createdAt: '2023-02-21T10:17:35.986Z',
      updatedAt: '2023-02-21T10:17:35.986Z',
      __v: 0,
    },
    section_c: {
      step1: {
        name: 'Description of Monitoring Activity',
        attach_org_structure_and_responsibilities_chart: [],
        project_proponents_upload: [],
        others_involved_upload: [],
        completed: false,
      },
      step2: {
        name: 'Quantification of GHG Emissions',
        baseline_emissions_upload: [],
        project_emissions_upload: [],
        leakage_upload: [],
        quantification_of_net_GHG_emission_upload: [],
        completed: false,
      },
      _id: '63f49a40945552585d665a6d',
      uuid: 'f3667586-f57e-4966-a46a-db5b887a0c36',
      project_id: '030a685c-a24c-4d62-9e02-d8799c2bbc8c',
      createdAt: '2023-02-21T10:17:36.023Z',
      updatedAt: '2023-02-21T10:17:36.023Z',
      __v: 0,
    },
    section_d: {
      step1: {
        name: 'Data and parameters fixed ex ante or at renewal of crediting period',
        attach_ex_ante_table: [],
        completed: false,
      },
      step2: {
        name: 'Data & parameters monitored',
        attach_ex_ante_table: [],
        completed: false,
      },
      step3: { name: 'Implementation of Sampling Plan', completed: false },
      _id: '63f49a40945552585d665a6f',
      uuid: 'b6b17aae-fa07-44ba-b4d9-2b983cd53414',
      project_id: '030a685c-a24c-4d62-9e02-d8799c2bbc8c',
      createdAt: '2023-02-21T10:17:36.057Z',
      updatedAt: '2023-02-21T10:17:36.057Z',
      __v: 0,
    },
    section_e: {
      step1: {
        name: 'Calculation of baseline emissions or net GHG removals',
        attach_relevant_docs: [],
        completed: false,
      },
      step2: {
        name: 'Calculation of project emissions or actual net GHG removals',
        attach_relevant_docs: [],
        completed: false,
      },
      step3: {
        name: 'Calculation of leakage',
        attach_relevant_docs: [],
        completed: false,
      },
      step4: {
        name: 'Calculation summary of emission reductions or net anthropogenic GHG removals',
        attach_relevant_docs: [],
        completed: false,
      },
      step5: {
        name: 'Comparison of actual emission reductions or net anthropogenic GHG removals',
        attach_relevant_docs: [],
        completed: false,
      },
      step6: {
        name: 'Remarks on difference from estimated value',
        attach_relevant_docs: [],
        completed: false,
      },
      step7: {
        name: 'Actual emission reductions or net anthropogenic GHG removals during 1st commitment period',
        attach_relevant_docs: [],
        completed: false,
      },
      step8: {
        name: 'Appendix',
        appendices_supporting_documents_upload: [],
        completed: false,
      },
      _id: '63f49a40945552585d665a71',
      uuid: '876eb90c-946b-4169-83a7-6ca68e553a18',
      project_id: '030a685c-a24c-4d62-9e02-d8799c2bbc8c',
      createdAt: '2023-02-21T10:17:36.092Z',
      updatedAt: '2023-02-21T10:17:36.092Z',
      __v: 0,
    },
  },
]

const ProjectListsWithFilter = () => {
  console.log('Reloadeed ProjectListsWithFilter **')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const location = useLocation()

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  const [selectedFilters, setSelectedFilters] = useState<any[]>([])
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
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.filtersApplied,
    shallowEqual
  )

  const redux_selectedFilters = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.selectedFilters,
    shallowEqual
  )
  const appliedFiltersCount = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.appliedFiltersCount,
    shallowEqual
  )
  const cachedMarketplaceProject = useAppSelector(
    ({ marketplaceCaching }) => marketplaceCaching.cachedMarketplaceProject,
    shallowEqual
  )

  useEffect(() => {
    getAllProjects()
  }, [])

  useEffect(() => {
    setSelectedFilters(redux_selectedFilters)
    dispatch(
      setAppliedFiltersCount(Object.values(redux_selectedFilters).flat().length)
    )
    dispatch(
      setFiltersApplied(Object.values(redux_selectedFilters).flat().length)
    )
  }, [redux_selectedFilters])

  useEffect(() => {
    if (!filtersApplied) {
      setProjects(marketPlaceProjects)
    } else {
      setProjects(filterApplicableProjects)
    }
  }, [filtersApplied, filterApplicableProjects])

  useEffect(() => {
    dispatch(setMarketPlaceProjects(cachedMarketplaceProject))
    dispatch(setFilterApplicableProjects(cachedMarketplaceProject))
  }, [cachedMarketplaceProject])

  
  const getAllProjects = async () => {
    try {
      if (cachedMarketplaceProject.length === 0) {
        setLoading(true)
      }
      const projectRes = await dataCollectionCalls.getVerifiedProjects()
      if (projectRes.success) {
        //setProjects(projectRes.data)
        //setFilteredProjects(projectRes.data)
        if (!lodash.isEqual(cachedMarketplaceProject, projectRes.data)) {
          dispatch(setCachedMarketplaceProject(projectRes.data))
        }
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getVerifiedProjects api ~ ', e)
    } finally {
      setLoading(false)
    }
  }

  // const filterProjects = () => {
  //   if (!selectedFilters.length) {
  //     setFilteredProjects(projects)
  //     return
  //   }
  //   if (projects && projects?.length) {
  //     const projectsMatchingFilter: any[] = []
  //     projects.forEach((project: any) => {
  //       const projectType = project?.type
  //       if (
  //         projectType.some((item: string) => selectedFilters.includes(item))
  //       ) {
  //         projectsMatchingFilter.push(project)
  //       }
  //     })
  //     setFilteredProjects(projectsMatchingFilter)
  //     setAction(FILTER_ACTION.RESET)
  //   }
  // }

  const viewRenderer = useCallback(() => {
    console.log('viewRenderer')
    return (
      <>
        <Stack
          flexDirection={'row'}
          alignItems="flex-end"
          justifyContent={'space-between'}
          sx={{ mb: filtersApplied ? 3 : 5, mt: 2 }}
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
              padding: '10px 24px',
              border: '1px solid #6E7976',
              borderRadius: '40px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
            onClick={() => setShowDrawer(true)}
          >
            Filter{' '}
            {appliedFiltersCount ? `(${appliedFiltersCount.toString()})` : null}
          </Typography>
        </Stack>
        {filtersApplied ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
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
              <Typography
                sx={{
                  color: '#006B5E',
                  fontSize: 14,
                  fontWeight: 500,
                  marginRight: 5,
                }}
              >
                Showing results for:{' '}
              </Typography>
              {filtersApplied && (
                <MarketPlaceFilterChip
                  selectedFilters={selectedFilters}
                  onDelete={(type: any, value: any) => {
                    //  dispatch(setRemoveFilters({ type: type, filterValue: value }))
                    const foundKey: any = Object.keys(selectedFilters).find(
                      (i) => i === type
                    )
                    const toApplyFilter = {
                      ...selectedFilters,
                      [foundKey]: selectedFilters[foundKey].filter(
                        (i: any) => i !== value
                      ),
                    }
                    dispatch(redux_setSelectedFilters(toApplyFilter))
                  }}
                />
              )}
            </Box>
            <CCButton
              sx={{
                textAlign: 'end',
                padding: '4px 24px',
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
                dispatch(resetFilter())
              }}
            >
              Clear All
            </CCButton>
          </Box>
        ) : null}
        <Grid
          container
          spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}
          rowSpacing={3}
          columns={{ sm: 10, md: 9, lg: 12, xl: 12 }}
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
          {loading && cachedMarketplaceProject?.length > 0 ? (
            <ProjectDetailsCardSkeleton />
          ) : projects?.length !== 0 ? (
            projects?.map((project: any, index: number) => (
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
                sx={{ width: '100%', height: '100%', mt: 0 }}
              />
            </Grid>
          )}
        </Grid>
      </>
    )
  }, [
    filterApplicableProjects,
    loading,
    selectedFilters,
    filtersApplied,
    appliedFiltersCount,
  ])

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
        {showDrawer && (
          <MarketPlaceFiltersDrawer
            onClose={() => setShowDrawer(false)}
            showDrawer={showDrawer}
          />
        )}
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
