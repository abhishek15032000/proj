import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { buyerCalls } from '../../api/buyerCalls.api'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'

const headings = [
  'Retirement ID',
  'Project Name',
  'Time',
  'Total Tokens',
  'Retired',
  'After Retirement',
  'Footprint Offset',
  'Beneficial owner',
  'Retirement Reason',
]

const RetirementCertificate = () => {
  const accountAddress = useAppSelector(
    ({ wallet }: { wallet: any }) => wallet?.accountAddress,
    shallowEqual
  )
  const [retireTokenList, setRetireTokenList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (accountAddress) getAllRetireTokens()
  }, [accountAddress])

  const getAllRetireTokens = () => {
    setLoading(true)
    const payload = {
      user: accountAddress,
    }
    buyerCalls
      .getAllRetireToken(payload)
      .then((res: any) => {
        if (res?.success && res?.data.length) {
          const modifiedRows = res?.data
          const rows =
            modifiedRows &&
            modifiedRows.map((i: any) => {
              return [
                moment(i?.createdAt).format(`DD/MM/YY`),
                moment(i?.createdAt).format(`HH:mm:SS`),
                i?.token_quantity,
                i?.token_quantity,
                '-',
                '-',
                '-',
                i?.beneficialOwner,
                i?.reason,
              ]
            })
          setRetireTokenList(rows)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Grid item xs={12} sx={{ mt: 4 }}>
      <Paper
        elevation={0}
        sx={{
          py: 2,
          px: 2,
          borderRadius: '8px',
          boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
          Token Retirement History
        </Typography>
        {loading ? (
          <CCTableSkeleton />
        ) : retireTokenList && retireTokenList.length ? (
          <CCTable
            headings={headings}
            rows={retireTokenList}
            maxWidth={'100%'}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              height: '200px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                mt: 2,
                bgcolor: Colors?.darkPrimary2,
                p: 1,
                borderRadius: 2,
                textAlign: 'center',
                width: '100%',
              }}
            >
              No Records to Show
            </Typography>
          </Box>
        )}
      </Paper>
    </Grid>
  )
}

export default RetirementCertificate
