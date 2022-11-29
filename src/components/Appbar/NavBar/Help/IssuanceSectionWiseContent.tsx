import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { Colors, Images } from '../../../../theme'

import { IssuanceHelpContentData } from './SectionA/helpContentData'
interface HelpPopUpIssuanceSectionProps {
  modal?: any

  data?: any
}
const IssuanceSectionWiseContent: FC<HelpPopUpIssuanceSectionProps> = (
  props
) => {
  const { data } = props

  console.log('data<<<', data)
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {data && (
        <Box>
          <Typography
            sx={{
              mt: 2,
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              pb: 3,
            }}
          >
            {data?.title}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 14, color: '#141D1B' }}>
            {data?.description}
          </Typography>
          {data?.imgSrcEmptyFields && (
            <Box
              sx={{
                mt: 1,
                // height: '220px',
                p: 1,
                bgcolor: Colors.lightPrimary2,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={data?.imgSrcEmptyFields}
                // height="200px"
                // width="100%"
                height="auto"
                width="100%"
                style={{ borderRadius: '4px' }}
              />
            </Box>
          )}
          <Typography sx={{ mt: 1, fontSize: 11, color: '#667080' }}>
            {data?.footerText}
          </Typography>
          {data?.imgSrcFields && (
            <Box
              sx={{
                mt: 1,
                // height: '220px',
                p: 1,
                bgcolor: Colors.lightPrimary2,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={data?.imgSrcEmptyFields}
                // height="200px"
                // width="100%"
                height="auto"
                width="100%"
                style={{ borderRadius: '4px' }}
              />
            </Box>
          )}
          <Typography sx={{ mt: 1, fontSize: 11, color: '#667080' }}>
            {data?.footerTextWith}
          </Typography>
          {data.steps &&
            data.steps.length > 0 &&
            data.steps.map((step: any, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.lightPrimary1,
                  }}
                >
                  {step?.title}
                </Typography>
                <Typography sx={{ mt: 1, fontSize: 14, color: '#141D1B' }}>
                  {step?.description}
                </Typography>

                <Typography sx={{ mt: 1, fontSize: 11, color: '#667080' }}>
                  {step?.footerText}
                </Typography>
              </Box>
            ))}

          {data.subFields &&
            data.subFields.length > 0 &&
            data.subFields.map((subFields: any, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.lightPrimary1,
                  }}
                >
                  {subFields?.title}
                </Typography>
                <Typography sx={{ mt: 1, fontSize: 14, color: '#141D1B' }}>
                  {subFields?.description}
                </Typography>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}

export default IssuanceSectionWiseContent
