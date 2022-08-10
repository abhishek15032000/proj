import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import { Colors, Images } from '../../theme'

export const sideMenuList = [
  {
    label: 'Project Introduction',
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

const frameworkStep = 1
const ProjectCompletionProgress = (props: { sectionIndex: number }) => {
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
          value={10}
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
      {sideMenuList?.map((item, index) => (
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
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    color: item?.value === 100 ? '#006B5E' : '#BA1B1B',
                    fontSize: 14,
                  }}
                >
                  {item.value}% Complete
                </Typography>
              </Box>
              {(index !== sideMenuList?.length - 1 || index !== 0) && (
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
                    index < props?.sectionIndex + 1 ? '#F3BA4D' : '#DAE5E1',
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
