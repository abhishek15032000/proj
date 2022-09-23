import { Box, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors, Images } from '../../theme'

export const sideMenuList = [
  {
    label: 'Select Date',
    value: 100,
  },
  {
    label: 'Section A',
    value: 10,
  },
  {
    label: 'Section B',
    value: 10,
  },
  {
    label: 'Section C',
    value: 10,
  },
  {
    label: 'Section D',
    value: 10,
  },
  {
    label: 'Section E',
    value: 10,
  },
]

const ProjectCompletionProgress = (props: { sectionIndex: number }) => {
  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )

  const [stepsCompletionData, setStepsCompletionData] = useState<any | null>(
    null
  )

  const [stepsCompletionPercent, setStepsCompletionPercent] = useState(0)

  useEffect(() => {
    const totalStepsCount = 6
    let completedStepsCount = 0
    if (stepsCompletionData && stepsCompletionData.length) {
      stepsCompletionData.forEach((step: any) => {
        if (step?.completionPercent === 100) {
          completedStepsCount += 1
        }
      })
    }
    const completionPercent = Math.floor(
      (completedStepsCount / totalStepsCount) * 100
    )
    setStepsCompletionPercent(completionPercent)
  }, [stepsCompletionData])

  useEffect(() => {
    let stepsCompletionPercent
    if (currentProjectDetails) {
      stepsCompletionPercent = [
        {
          title: 'Select Date',
          completionPercent: 100,
        },
        {
          title: 'Section A',
          completionPercent:
            currentProjectDetails?.section_a?.completionPercentage,
        },
        {
          title: 'Section B',
          completionPercent:
            currentProjectDetails?.section_b?.completionPercentage,
        },
        {
          title: 'Section C',
          completionPercent:
            currentProjectDetails?.section_c?.completionPercentage,
        },
        {
          title: 'Section D',
          completionPercent:
            currentProjectDetails?.section_d?.completionPercentage,
        },
        {
          title: 'Section E',
          completionPercent:
            currentProjectDetails?.section_e?.completionPercentage,
        },
      ]
      setStepsCompletionData(stepsCompletionPercent)
    } else {
      stepsCompletionPercent = [
        {
          title: 'Select Date',
          completionPercent: 0,
        },
        {
          title: 'Section A',
          completionPercent: 0,
        },
        {
          title: 'Section B',
          completionPercent: 0,
        },
        {
          title: 'Section C',
          completionPercent: 0,
        },
        {
          title: 'Section D',
          completionPercent: 0,
        },
        {
          title: 'Section E',
          completionPercent: 0,
        },
      ]
    }
    setStepsCompletionData(stepsCompletionPercent)
  }, [currentProjectDetails])

  return (
    <Box sx={{ py: 2, px: { md: 3, lg: 4 } }}>
      <Box sx={{ display: 'flex' }}>
        <img src={Images.ProjectCompletion} />
        <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
          Project Completion
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 12, color: '#F15D5F' }}>
          In Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={stepsCompletionPercent}
          sx={{
            borderRadius: 8,
            height: 8,
            backgroundColor: '#CCE8E1',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#388E81',
            },
          }}
        />
      </Box>
      <Typography sx={{ mt: 2 }}>
        Project application progress at a glance
      </Typography>
      {stepsCompletionData?.map((item: any, index: number) => (
        <div key={index} style={{ minHeight: 50 }}>
          <li
            key={index.toString()}
            className="list-group-item pt-0 position-relative"
            style={{
              background: 'transparent',
              border: 'none',
              paddingTop: 0,
              position: 'relative',
              listStyle: 'none',
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  p: 1,
                  ml: 3,
                  backgroundColor: '#DAF7F0',
                  borderRadius: '8px',
                }}
              >
                <Typography
                  sx={{ color: '#141D1B', fontSize: 16, fontWeight: 500 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color:
                      item?.completionPercent === 100 ? '#006B5E' : '#BA1B1B',
                    fontSize: 14,
                  }}
                >
                  {item.completionPercent}% Complete
                </Typography>
              </Box>
              {stepsCompletionData && index < stepsCompletionData?.length - 1 && (
                <Box
                  className="trace-line position-absolute"
                  sx={{
                    top: 0,
                    left: 4,
                    bottom: -17,
                    width: '1px',
                    background:
                      index < props?.sectionIndex + 1 ? '#000000' : '#DAE5E1',
                    position: 'absolute',
                  }}
                />
              )}
              <Box
                className="trace-circle position-absolute"
                sx={{
                  background:
                    index === props?.sectionIndex
                      ? '#F3BA4D'
                      : index < props?.sectionIndex + 1
                      ? '#006B5E'
                      : '#DAE5E1',
                  width: 10,
                  height: 20,
                  top: -48,
                  borderRadius: '5px',
                  position: 'relative',
                }}
              />
            </Box>
          </li>
        </div>
      ))}
    </Box>
  )
}

export default ProjectCompletionProgress
