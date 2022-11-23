import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'
import { ROLES } from '../../config/constants.config'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { Colors } from '../../theme'
import { capitaliseFirstLetter } from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import './Projects.css'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { buyerCalls } from '../../api/buyerCalls.api'
import { getTokensBalance } from '../../utils/tokenRetire.utils'

const ProjectsStats = () => {
  const scrollRef = useHorizontalScroll()
  const location = useLocation()

  const accountAddress = useAppSelector(({ wallet }) => wallet.accountAddress)
  const verifierStatsReload = useAppSelector(
    ({ verifier }) => verifier.verifierStatsReload
  )

  const { type: userType, email, user_id } = getLocalItem('userDetails')
  const [stats, setStats] = useState<any[] | null>(null)
  //Raw data from api
  const [rawStatsData, setRawStatsData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    verifierStatsReload && getStats()
  }, [verifierStatsReload, accountAddress])

  useEffect(() => {
    if (rawStatsData && Object.keys(rawStatsData).length) {
      structureDataForStats()
    }
  }, [rawStatsData])

  const getStats = async () => {
    try {
      setLoading(true)
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(user_id)
        if (res?.success) {
          setRawStatsData(res)
          setLoading(false)
        }
      }
      //using this for token and contract stats
      else if (location.pathname === pathNames.TOKEN_CONTRACT) {
        res = await dataCollectionCalls.getStats()
        if (res?.success) {
          const obj = {
            data: {
              report_count: res?.data.report_count,
              total_VCOT_Quantity: res?.data?.total_Quantity,
              total_VCOT_Quantity_For_Sale: res?.data.total_Quantity_For_Sale,
              total_VCOT_Quantity_On_Sale: res?.data.total_Quantity_On_Sale,
              total_VCOT_Quantity_Sold: res?.data.total_Quantity_Sold,
            },
          }
          setRawStatsData(obj)
          setLoading(false)
        }
      } else if (location.pathname === pathNames.TOKENS_RETIREMENT) {
        if (!accountAddress) {
          return
        }
        getStatsForTokenRetirement()
      } else {
        res = await dataCollectionCalls.getIssuerProjectDashboardStats(email)
        if (res?.success) {
          setRawStatsData(res)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const structureDataForStats = () => {
    //Making dynamic stats objects from rawStatsDataponse
    const keys = Object.keys(rawStatsData.data)
    const values = Object.values(rawStatsData.data)
    const statsObj = keys.map((key, index) => {
      return {
        title: capitaliseFirstLetter(key.replaceAll('_', ' ')),
        value: values[index],
      }
    })
    setStats(statsObj)
  }

  const getStatsForTokenRetirement = async () => {
    // let bal
    // let data
    let apiData
    const bal = await getTokensBalance()
    try {
      const res = await buyerCalls.getStats({
        address: accountAddress,
      })
      if (res?.success) {
        apiData = res?.data
      }
    } catch (err) {
      console.log('Error in buyerCalls.getStats api : ', err)
    } finally {
      setLoading(false)
    }
    let burnTokenCount
    if (apiData?.burn_token_count && apiData?.burn_token_count.length) {
      burnTokenCount = apiData?.burn_token_count?.reduce(
        (prev: any, curr: any) => {
          return (prev += curr?.total)
        },
        0
      )
    }
    const data = {
      data: {
        Total_active_VCOT: bal,
        Total_retired_VCOT: burnTokenCount,
        Total_VCOT_purchased_so_far: apiData?.purchased_token_count,
        Total_footprint_offset: burnTokenCount,
      },
      success: true,
    }

    setRawStatsData(data)
  }

  const getColoredDivColor = (index: number) => {
    // For dynamic color for colored div in stats
    const num = index % 4
    switch (num) {
      case 0:
        return Colors.lightPinkBackground
      case 1:
        return Colors.lightPrimary2
      case 2:
        return Colors.lightGreenBackground4
      case 3:
        return Colors.lightOrangeBackground
    }
  }
  const renderSkeleton = () => {
    const temp = new Array(5).fill(1)
    return (
      <Box
        ref={scrollRef}
        sx={{
          mt: 3,
          paddingBottom: 2,
        }}
        style={{
          marginLeft: -10,
          //  marginRight: -10
        }}
        className="stats-row"
        id="stats-row"
      >
        {temp.map((i, index) => (
          <Box key={index} className="stats-container">
            <Box className="content-container">
              <Box className="stats-title">
                <Skeleton
                  sx={{ fontSize: '1rem', bgcolor: '#CCE8E1' }}
                  variant="text"
                />
              </Box>
              <Box className="stats-value">
                <Skeleton
                  sx={{ bgcolor: '#CCE8E1' }}
                  variant="rectangular"
                  height={50}
                />
              </Box>
            </Box>
            <Box>
              <Skeleton
                sx={{ bgcolor: '#CCE8E1' }}
                variant="rectangular"
                height={70}
                width={70}
              />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Grid>
      {loading === true ? (
        renderSkeleton()
      ) : (
        <>
          <Box
            ref={scrollRef}
            sx={{
              mt: 3,
              paddingBottom: 2,
            }}
            style={{ marginLeft: -10 }}
            className="stats-row"
            id="stats-row"
          >
            {stats &&
              stats.length &&
              stats?.map((stat, index) => (
                <Box key={index} className="stats-container">
                  <Box className="content-container">
                    <Box className="stats-title">{stat?.title}</Box>
                    <Box className="stats-value">
                      {stat?.value ? stat?.value : stat?.value === 0 ? 0 : '-'}
                    </Box>
                  </Box>
                  <Box
                    className="colored-div"
                    sx={{ bgcolor: getColoredDivColor(index) }}
                  ></Box>
                </Box>
              ))}
          </Box>
        </>
      )}
    </Grid>
  )
}

export default ProjectsStats
