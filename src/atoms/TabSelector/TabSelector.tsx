// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Tab, Tabs } from '@mui/material'
import { Colors } from '../../theme'

// Local Imports

interface TabSelectorProps {
  tabArray?: Array<any>
  tabIndex?: number
  setTabIndex?: any
  sx?: any
}

const TabSelector: FC<TabSelectorProps> = (props) => {
  return (
    <Box sx={{ width: '100%', marginTop: 3, ...props.sx }}>
      <Tabs
        value={props.tabIndex}
        indicatorColor="primary"
        aria-label="secondary tabs example"
        TabIndicatorProps={{style: {background: Colors.darkGreen }}}
      >
        {props.tabArray?.map((tab, index) => (
          <Tab
            sx={{ textTransform: 'unset', height: '50px', width: '80px' }}
            key={index}
            value={index + 1}
            label={tab}
            onClick={() => props.setTabIndex(index + 1)}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default TabSelector
