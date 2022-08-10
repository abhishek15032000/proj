// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Tab, Tabs } from '@mui/material'

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
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{ color: '#1D4B44' }}
      >
        {props.tabArray?.map((tab, index) => (
          <Tab
            sx={{ color: '#1D4B44' }}
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
