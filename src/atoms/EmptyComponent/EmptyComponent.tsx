// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Local Imports
import NoProjectsListed from '../../assets/Images/illustrations/NoProjectsListed.png'
import { Colors } from '../../theme'
import NoSellOrders from '../../assets/Images/illustrations/NoSellOrder.png'
import Coins from '../../assets/Images/illustrations/Coins.png'
import CCButton from '../CCButton'

interface EmptyComponentProps {
  title?: any
  subtitle?: any
  photoType?: any
  sx?: any
  listNewProject?: any
  action?: any
  exploreMarketplace?: any
  elevation?: number
}

const EmptyComponent: FC<EmptyComponentProps> = ({
  elevation = 1,
  ...props
}: EmptyComponentProps) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        height: '540px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        borderRadius: '8px',
        ...props.sx,
      }}
    >
      
        <Box sx={{ height: '50%' }} component={'img'} src={props.photoType === 1 ?NoProjectsListed: props.photoType === 2 ?NoSellOrders :props.photoType === 3 ?Coins :NoProjectsListed} />
     

      
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 3,
        }}
      >
        {props.title}
      </Typography>

      {props.subtitle !== '' && props.subtitle !== undefined && (
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: Colors.textColorDarkGreen,
            mt: 1,
          }}
        >
          {props.subtitle}
        </Typography>
      )}

      {props.listNewProject && <ListNewProject action={props.action} />}
      {props.exploreMarketplace && <ExploreMarketplace action={props.action} />}
    </Paper>
  )
}

export default EmptyComponent

interface ListNewProjectProps {
  action?: any
}

const ListNewProject: FC<ListNewProjectProps> = (props) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 2,
        }}
      >
        List a new project to get started
      </Typography>

      <CCButton
        variant="contained"
        sx={{
          backgroundColor: '#F3BA4D',
          textTransform: 'none',
          width: '260px',
          borderRadius: '100px',
          marginBottom: 4,
          marginTop: 3,
          padding: '10px 24px 10px 16px',
        }}
        startIcon={<AddIcon style={{ color: '#005046' }} />}
        onClick={props.action}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}>
          List New Project
        </Typography>
      </CCButton>
    </>
  )
}

interface ExploreMarketplaceProps {
  action?: any
}

const ExploreMarketplace: FC<ExploreMarketplaceProps> = (props) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 2,
        }}
      >
        Buy or sell some tokens to view the transaction history here
      </Typography>

      {props.action && (
        <CCButton
          variant="contained"
          sx={{
            backgroundColor: '#005046',
            textTransform: 'none',
            width: '260px',
            borderRadius: '100px',
            marginBottom: 4,
            marginTop: 3,
            padding: '10px 24px 10px 16px',
          }}
          // startIcon={<AddIcon style={{ color: '#005046' }} />}
          onClick={props.action}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#FFF' }}>
            Explore Marketplace
          </Typography>
        </CCButton>
      )}
    </>
  )
}
