// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid } from '@mui/material'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import BackHeader from '../../atoms/BackHeader/BackHeader'

interface MarketplaceHomeProps {}

const MarketplaceHome: FC<MarketplaceHomeProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <BackHeader title="Marketplace" iconDisable />

        <TabSelector
          tabArray={['Buy/Sell', 'Projects']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />

        <Box
          sx={{
            height: '300px',
            width: '900px',
            borderRadius: '6px',
            border: '2px solid',
            marginTop: 2,
          }}
        >
          <Box
            sx={{ borderRight: '2px solid', height: '100%', width: '50%' }}
          ></Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default MarketplaceHome
