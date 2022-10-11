// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Tabs, Tab } from '@mui/material'

// Local Imports
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import NoSellOrders from '../../assets/Images/illustrations/NoSellOrder.png'
import { Colors } from '../../theme'
import EmptySellOrders from './EmptySellOrders'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import BuyOrder from './BuyOrder'
import SellOder from './SellOrder'

interface SellOrdersProps {}

const SellOrders: FC<SellOrdersProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)
  return (
    <>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
          <Tabs
            value={tabIndex}
            indicatorColor="primary"
            aria-label="secondary tabs example"
            TabIndicatorProps={{ style: { background: Colors.darkGreen } }}
          >
            {['Buy Order', 'Sell Order']?.map((tab, index) => (
              <Tab
                data-testid="tab-selector-tab"
                sx={{ p: 0, mr: 2 }}
                key={index}
                value={index + 1}
                label={tab}
                onClick={() => setTabIndex(index + 1)}
              />
            ))}
          </Tabs>
        </Grid>
        {tabIndex === 1 && <BuyOrder />}
        {tabIndex === 2 && <SellOder />}
      </Paper>
    </>
  )
}

export default SellOrders
