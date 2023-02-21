import { Chip, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import CCButton from '../../atoms/CCButton'
import { Colors } from '../../theme'
import CloseIcon from '@mui/icons-material/Close'
import CCAccordionCheckBox from '../../atoms/CCAccordionCheckBox/CCAccordionCheckBox'
import { availableFilters, filters } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAddFilters,
  setFilterApplicableProjects,
  setFiltersApplied,
  setRemoveFilters,
  setSelectedFilters,
} from '../../redux/Slices/marketPlaceFiltersDrawerSlice'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'

const MarketPlaceFiltersDrawer = () => {
  const dispatch = useAppDispatch()

  const marketPlaceProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.marketPlaceProjects
  )
  const filterApplicableProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.filterApplicableProjects
  )

  const selectedFilters = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.selectedFilters
  )

  const applyFilters = () => {
    const filteredProjects = marketPlaceProjects.filter((i:any) => {
      i.type.some((type:any) => {
        return type.includes(selectedFilters['Project Categories'])
      })
    })
    console.log('filteredProjects: ', filteredProjects)
    dispatch(setFilterApplicableProjects(filteredProjects))
    dispatch(setFiltersApplied(true))
  }
  console.log('filterApplicableProjects: ', filterApplicableProjects)

  return (
    <>
      <Box
        sx={{ width: 400, margin: '15px' }}
        role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: '24px' }}>Filters</Typography>
          <CloseIcon sx={{ fontSize: 30, color: '#616161' }} />
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              FILTER ACTIVE
            </Typography>
            <Stack
              flexDirection={'row'}
              justifyContent="center"
              alignItems="center"
              columnGap={2}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E', cursor:'pointer' }}
                onClick={() => {
                  dispatch(setFilterApplicableProjects(marketPlaceProjects))
                  //dispatch()
                }}
              >
                Clear
              </Typography>
              <CCButton
                sx={{
                  minWidth: 0,
                  padding: '7px 42px',
                  background: Colors.textColorLightGreen,
                  color: '#FFFFFF',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                }}
                onClick={applyFilters}
              >
                Apply
              </CCButton>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            rowGap: 1,
            columnGap: 1,
          }}
        >
          <MarketPlaceFilterChip />
        </Box>
        <Box sx={{ mt: 2 }}>
          {Object.keys(availableFilters).map((item: any, index: any) => (
            <Box key={index} sx={{ my: 2 }}>
              <CCAccordionCheckBox
                title={item}
                dropList={availableFilters[item]}
                addFilters={(type: string, value: string) =>
                  dispatch(
                    setAddFilters({
                      type: type,
                      filterValue: value,
                    })
                  )
                }
                removeFilters={(type: string, value: string) =>
                  dispatch(setRemoveFilters({ type: type, filterValue: value }))
                }
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default MarketPlaceFiltersDrawer

