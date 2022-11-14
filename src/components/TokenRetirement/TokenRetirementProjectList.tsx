import { Grid } from '@mui/material'
import React from 'react'
import ApproveTokenCard from './ApproveTokenCard'
import RetirementCertificate from './RetirementCertificate'

const TokenRetirementProjectList = () => {
  return (
    <>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <ApproveTokenCard />
        <RetirementCertificate />
      </Grid>
    </>
  )
}

export default TokenRetirementProjectList
