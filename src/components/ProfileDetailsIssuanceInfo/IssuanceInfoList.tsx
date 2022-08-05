// React Imports
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import React, { FC } from 'react'

// MUI Imports

import IssuanceInfoListItem from './IssuanceInfoListItem'

// Local Imports

interface IssuanceInfoListProps {
  data?: Array<any>
}

const IssuanceInfoList: FC<IssuanceInfoListProps> = (props) => {
  return (
    <Grid container>
      {props.data?.map((item, index) => (
        <IssuanceInfoListItem
          title={item.title}
          status={item.status}
          key={index}
        />
      ))}
    </Grid>
  )
}

export default IssuanceInfoList
