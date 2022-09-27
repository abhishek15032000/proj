import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'
import { ROLES } from '../../config/roles.config'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { Colors } from '../../theme'
import { capitaliseFirstLetter } from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import './Projects.css'
import { useAppSelector } from '../../hooks/reduxHooks'
import { setProfileStatsReload } from '../../redux/Slices/verifierSlice'
import { useDispatch } from 'react-redux'

const ProjectsStats = () => {
  const scrollRef = useHorizontalScroll()
  const dispatch = useDispatch()
  const { type: userType, email, user_id } = getLocalItem('userDetails')

  const [stats, setStats] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)

  const projectStatsReload = useAppSelector(
    ({ verifier }) => verifier.projectStatsReload
  )

  useEffect(() => {
    projectStatsReload && getStats()
  }, [projectStatsReload])

  const getStats = async () => {
    try {
      setLoading(true)
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(user_id)
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
      dispatch(setProfileStatsReload(false))
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
