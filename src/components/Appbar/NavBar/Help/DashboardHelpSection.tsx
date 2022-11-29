import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import { IssuanceHelpContentData } from './SectionA/helpContentData'
import { Colors, Images } from '../../../../theme'
interface DashboardHelpSectionProps {
  modal?: any

  data?: any
}
const DashboardHelpSection: FC<DashboardHelpSectionProps> = (props) => {
  const { data } = props

  console.log('data<<<', data)
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {data && (
        <Box>
          <Typography
            sx={{
              mt: 2,
              fontSize: 20,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              pb: 3,
            }}
          >
            {data?.title}
          </Typography>

          {data.questions &&
            data.questions.length > 0 &&
            data.questions.map((step: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  py: 2,
                  cursor: 'pointer',
                }}
                onClick={() => null}
              >
                <PanoramaFishEyeIcon
                  style={{
                    height: 18,
                    color: Colors.darkGreen,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    ml: 2,
                  }}
                >
                  {step?.title}
                </Typography>
              </Box>
            ))}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              py: 2,
              cursor: 'pointer',
            }}
            onClick={() => null}
          >
            <img
              src={Images.OpenExternallyIcon}
              width="20px"
              height={'20px'}
              style={{ cursor: 'pointer' }}
            />
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: Colors.darkGreen,
                ml: 2,
              }}
            >
              {'View in our Help Center'}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DashboardHelpSection
