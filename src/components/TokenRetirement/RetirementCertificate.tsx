import { Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { buyerCalls } from '../../api/buyerCalls.api'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'

const headings = [
  'Date of retirement',
  'Time',
  'Quantity',
  'Footprint offset',
  'Country',
  'Account holder',
  'Beneficial owner',
  'Retirement reason',
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
      <Paper elevation={2} sx={{ py: 2, px: 2 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
          Retirement Certificate
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
          <Typography
            sx={{
              mt: 2,
              bgcolor: Colors?.darkPrimary2,
              p: 1,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            No Records to Show
          </Typography>
        )}
      </Paper>
    </Grid>
  )
}

export default RetirementCertificate
