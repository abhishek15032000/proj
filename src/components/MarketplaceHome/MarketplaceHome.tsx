// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import BuySellComponent from './BuySellComponent'

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

        {tabIndex === 1 && <BuySellComponent />}
      </Grid>
    </Box>
  )
}

export default MarketplaceHome
