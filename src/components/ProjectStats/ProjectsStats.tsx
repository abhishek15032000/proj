import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'
import { ROLES } from '../../config/roles.config'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { capitaliseFirstLetter } from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import './Projects.css'

const ProjectsStats = () => {
  const scrollRef = useHorizontalScroll()

  const { type: userType, email, _id: userID } = getLocalItem('userDetails')

  const [stats, setStats] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getStats()
  }, [])

  const getStats = async () => {
    try {
      setLoading(true)
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(userID)
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
    // const num = index % 4
    const num = index % 3
    switch (num) {
      case 0:
        return '#FFDDD5'
      case 1:
        return '#BCE2D2'
      case 2:
        return '#B9E7E0'
      // case 3:
      //   return "BCE2D2"
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
