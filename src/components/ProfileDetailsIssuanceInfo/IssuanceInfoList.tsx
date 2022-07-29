// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, List, ListItem, Typography } from '@mui/material'

// Local Imports
import IssuanceInfoListItem from './IssuanceInfoListItem'

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
