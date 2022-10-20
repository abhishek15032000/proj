import { Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTable from '../../atoms/CCTable'
import CCButton from '../../atoms/CCButton'
import { buyerCalls } from '../../api/buyerCalls.api'
import EmptyRetireTokens from './EmptyRetireTokens'
import EmptyProjectsList from './EmptyProjectsList'
import moment from 'moment'
import { getLocalItem } from '../../utils/Storage'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { USER } from '../../api/user.api'

interface TokenRetirementProjectListProps {}

const TokenRetirementProjectList = (props: TokenRetirementProjectListProps) => {
  const navigate = useNavigate()
  const accountAddress = useAppSelector(
    ({ wallet }: { wallet: any }) => wallet?.accountAddress,
    shallowEqual
  )
  const [showDetails, setShowDetails] = useState(true)
  const [showTable, setShowTable] = useState<boolean>(true)
  const [retireTokenList, setRetireTokenList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getAllRetireTokens()
  }, [])

  const getAllRetireTokens = () => {
    setLoading(true)
    const payload = {
      user: '0xbde38db937bb7a0ae5b4c82831cfb768c7f9acd7',
    }
    buyerCalls
      .getAllRetireToken(payload)
      .then((res: any) => {
        if (res?.success) {
          if (res?.data.length > 0) {
            setShowTable(true)
          }
          const modifiedRows = res?.data

          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {moment(i?.createdAt).format(`DD/MM/YY`)}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {moment(i?.createdAt).format(`HH:MM:SS`)}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.token_quantity}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {'-'}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {'-'}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {'-'}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.beneficialOwner}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.reason}
                </Typography>,
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
    <>
      <Grid item xs={12} sx={{ mt: 4 }}>
        {showDetails ? (
          <Paper elevation={2} sx={{ py: 2, px: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
                Retire Tokens
              </Typography>
              <CCButton
                rounded
                onClick={() => navigate(pathNames.RETIRE_TOKENS)}
                sx={{
                  minWidth: 0,
                  backgroundColor: '#F3BA4D',
                  color: '#005046',
                  padding: '8px 18px',
                  borderRadius: 10,
                  fontSize: 14,
                }}
              >
                Proceed
              </CCButton>
            </Stack>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Go carbon neutral by retiring carbon tokens and claiming the
              underlying environmental benefit of the carbon offset.
            </Typography>
          </Paper>
        ) : (
          <EmptyRetireTokens />
        )}
      </Grid>
      <Grid item xs={12} sx={{ mt: 4 }}>
        {showTable ? (
          <Paper elevation={2} sx={{ py: 2, px: 2 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
              Retirement Certificate
            </Typography>

            <CCTable
              headings={headings}
              rows={retireTokenList}
              maxWidth={'100%'}
            />
          </Paper>
        ) : (
          <EmptyProjectsList />
        )}
      </Grid>
    </>
  )
}

export default TokenRetirementProjectList
const rowItem = [
  '30/08/2022',
  '  14:44:20',
  '7',
  '7',
  'India',
  'Bdce',
  'asdasddfas',
  'asdfalskhdflashldhjnasdsa',
]

const headings = [
  '  Date of retirement',
  '  Time',
  'Quantity',
  ' Footprint offset',
  'Country',
  '     Account holder',
  '   Beneficial owner',
  '  Retirement reason',
]
