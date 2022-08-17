// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Local Imports

interface IssuanceInfoListItemProps {
  title?: string
  status?: boolean
}

const IssuanceInfoListItem: FC<IssuanceInfoListItemProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 3,
        borderBottom: '1px solid',
        minHeight: '90px',
      }}
    >
      <List sx={{ listStyleType: 'disc' }}>
        <ListItem sx={{ display: 'list-item', paddingLeft: 0 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
            {props.title}
          </Typography>
        </ListItem>
      </List>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <Box
            sx={{
              height: '20px',
              width: '20px',
              backgroundColor: '#7ACB9F',
              borderRadius: '10px',
              marginRight: 1,
            }}
          />
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
            {props.status ? 'Complete' : 'Incomplete'}
          </Typography>
        </Box>
        <Box sx={{ marginRight: 5 }}>
          <ChevronRightIcon />
        </Box>
      </Box>
    </Box>
  )
}

export default IssuanceInfoListItem
