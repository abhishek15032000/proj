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
import BlockchainCalls from '../../blockchain/Blockchain'

const ProjectsStats = () => {
  const scrollRef = useHorizontalScroll()
  const location = useLocation()

  const { type: userType, email, user_id } = getLocalItem('userDetails')
  const [stats, setStats] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState<any>(null)
  const accountAddress = useAppSelector(({ wallet }) => wallet.accountAddress)
  const verifierStatsReload = useAppSelector(
    ({ verifier }) => verifier.verifierStatsReload
  )

  useEffect(() => {
    verifierStatsReload && getStats()
  }, [verifierStatsReload])

  const getStats = async () => {
    try {
      setLoading(true)
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(user_id)
      }
      //using this for token and contract stats
      else if (location.pathname === pathNames.TOKEN_CONTRACT) {
        res = await dataCollectionCalls.getStats()
      } else if (location.pathname === pathNames.TOKENS_RETIREMENT) {
        const tokenContractFunctions = await BlockchainCalls.token_caller()
        await tokenContractFunctions
          .balanceOf(accountAddress)
          .then(async (balance: any) => {
            const data = await buyerCalls.getStats({ address: user_id })

            res = {
              data: {
                Total_active_VCOs: Number(balance?._hex),
                Total_retired_VCOs: data?.data?.burn_token_count?.total,
                Total_VCOs_purchased_so_far: data?.data?.purchased_token_count,
                Total_footprint_offset: data?.data?.burn_token_count?.total,
              },
              success: true,
            }
          })
      } else {
        res = await dataCollectionCalls.getIssuerProjectDashboardStats(email)
      }
      if (res.success) {
        //Making dynamic stats objects from response
        const keys = Object.keys(res.data)
        const values = Object.values(res.data)
        const statsObj = keys.map((key, index) => {
          return {
            title: capitaliseFirstLetter(key.replaceAll('_', ' ')),
            value: values[index],
          }
        })
        setStats(statsObj)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
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
                    <Box className="stats-value">{stat?.value}</Box>
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
