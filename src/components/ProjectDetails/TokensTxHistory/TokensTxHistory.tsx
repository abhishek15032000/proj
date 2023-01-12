import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { projectDetailsCalls } from '../../../api/projectDetailsCalls.api'
import { USER } from '../../../api/user.api'
import CWTable from '../../../atoms/CWTable/CWTable'
import BlockchainCalls from '../../../blockchain/Blockchain'
import {
  limitTitle,
  limitTitleFromMiddle,
} from '../../../utils/commonFunctions'
import { getLocalItem } from '../../../utils/Storage'
import LoderOverlay from '../../LoderOverlay'

const headings = [
  'TX HASH',
  'ORDER ID',
  'PROJECT',
  'DATE',
  'TIME',
  'QUANTITY AVAILABLE',
  'QUANTITY RETIRED',
  'QUANTITY CANCELLED',
  'UNIT PRICE',
  'TOTAL AMOUNT',
  'QUANTITY LEFT',
]

const TokensTxHistory = () => {
  const [loading, setLoading] = useState(false)
  const [transactionHistoryData, setTransactionHistoryData] = useState<any>([])

  useEffect(() => {
    getAllTransactionHistory()
  }, [])

  const getAllTransactionHistory = async () => {
    setLoading(true)
    const userAddress =
      await BlockchainCalls.getConnectionStatusAndAddress().then((response) => {
        projectDetailsCalls
          .getAllTransactionHistory(response?.address)
          .then((res: any) => {
            if (res?.data?.success) {
              const rows =
                res?.data?.data &&
                res?.data?.data.map((i: any, index: number) => {
                  return [
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                        width: '50px',
                      }}
                    >
                      {limitTitle(i?.transaction_data?.transactionHash, 7)}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {limitTitle(i?.transaction_id, 7)}
                    </Typography>,

                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {moment(i?.createdAt).format(`DD/MM/YY`)}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {moment(i?.next_date).format(`HH:MM:SS`)}
                    </Typography>,

                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                    <Typography
                      key={index}
                      textAlign="start"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {'-'}
                    </Typography>,
                  ]
                })

              setTransactionHistoryData(rows)
              // if (res?.data?.main_project) {
              //   setMonthlyReportsList(rows)
              // }
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false)
          })
      })
  }

  if (loading) {
    return <LoderOverlay />
  } else {
    return (
      <Box sx={{ background: '#111E17', padding: '56px 6vw', color: '#fff' }}>
        <Typography sx={{ fontSize: '32px', color: '#55DBC8' }}>
          Tokens Transaction History
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CWTable
            headings={headings}
            rows={transactionHistoryData}
            pagination={true}
          />
        </Box>
      </Box>
    )
  }
}

export default TokensTxHistory