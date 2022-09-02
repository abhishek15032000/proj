import React, { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setSectionIndex } from '../../redux/Slices/issuanceDataCollection'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

interface IssuanceInfoListItemProps {
  data: any
  index: number
}

const IssuanceInfoListItem: FC<IssuanceInfoListItemProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const moveToSection = (index: number) => {
    if (props?.data?.project_status > 0) return

    dispatch(setSectionIndex(index))
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
  }

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#E8F3EF',
        mt: 1,
        p: 2,
      }}
    >
      <Grid item xs={6} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />
          {props?.data?.title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          sx={{
            fontSize: 14,
            color:
              props?.data?.completionPercent === 100 ? '#006B5E' : '#BA1B1B',
          }}
        >
          {props?.data?.completionPercent} % Complete
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          {props?.data?.status ? (
            <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
          ) : (
            <CircleIcon sx={{ color: '#F7CA56', mr: 1 }} />
          )}
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {props?.data?.status ? 'Complete' : 'In Progress'}
          </Typography>
        </Box>
      </Grid>
      <Grid item container xs={2} justifyContent="center">
        <Box sx={{ marginRight: 5, display: 'flex', alignItems: 'end' }}>
          <ChevronRightIcon
            sx={{ fontSize: 28, color: '#7ACB9F', cursor: 'pointer' }}
            onClick={() => moveToSection(props?.index)}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default IssuanceInfoListItem
