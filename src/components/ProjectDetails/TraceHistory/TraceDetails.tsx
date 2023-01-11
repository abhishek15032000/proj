import { Grid, Typography, Box, Radio, Paper } from '@mui/material'
import { borderColor } from '@mui/system'

import React, { FC } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors, Images } from '../../../theme'
import TitleValue from '../../Profile/TitleValue'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

interface TraceDetailsProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
}

const TraceDetails: FC<TraceDetailsProps> = (props) => {
  const data = [
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectInfoList: [
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
      ],

      relevantDocs: [{}],
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectInfoList: [
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
      ],

      relevantDocs: [{}],
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',

      projectInfoList: [
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
      ],

      relevantDocs: [{}],
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectInfoList: [
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
      ],

      relevantDocs: [{}],
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectInfoList: [
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
      ],

      relevantDocs: [{}, {}],
    },
    {
      dateTime: 'DD MM YYYY | Timestamp',
      TransactionId: 'Tx5r3465xujtfd6utr7i263te7ygwdu7t871t3ed378o90gf',
      projectInfoList: [
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
        {
          title: 'Project reference ID :',
          value: '4334',
        },
        {
          title: 'Project Name :',
          value:
            '33.66 MW poultry litter based power generation project by Raus Power in India',
        },
        {
          title: 'Project location :',
          value: 'Andhra pradesh',
        },
        {
          title: 'Status :',
          value: 'yet to be submit',
        },
      ],

      relevantDocs: [{}, {}, {}],
    },
  ]

  const { traceOption, setTraceOption, theme } = props
  return (
    <Paper
      sx={{
        background: theme === 'dark' ? 'rgba(0, 107, 94, 0.08)' : '#FAFDFA',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        p: 4,

        width: '70%',
        mt: '20px',
        height: '520px',
        py: 5,
        overflowX: 'hidden',
      }}
      // className="scroll-container"
    >
      <Typography
        sx={{
          color: theme === 'dark' ? '#75F8E4' : '#006B5E',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {data[traceOption]?.dateTime}
      </Typography>
      <Typography
        sx={{
          color: '#1A8EF5',
          fontSize: 12,
          fontWeight: 400,
          mt: 1,
        }}
      >
        {data[traceOption]?.TransactionId}
      </Typography>
      {data[traceOption]?.projectInfoList &&
        data[traceOption]?.projectInfoList.length > 0 &&
        data[traceOption]?.projectInfoList.map((item: any, index: number) => (
          <TitleValue
            key={index}
            title={item.title}
            value={item.value}
            valueStyle={{
              fontWeight: 400,
              color: theme === 'dark' ? Colors.white : '#2B2B2B',
              textAlign: 'right',
            }}
            titleStyle={{
              fontWeight: 500,
              color: theme === 'dark' ? Colors.white : '#2B2B2B',
            }}
          />
        ))}

      <Typography
        sx={{
          color: theme === 'dark' ? '#75F8E4' : '#006B5E',
          fontSize: 16,
          fontWeight: 500,
          mt: '20px',
        }}
      >
        {'Relevant docs'}
      </Typography>
      {data[traceOption]?.relevantDocs &&
        data[traceOption]?.relevantDocs.length > 0 &&
        data[traceOption]?.relevantDocs.map((item: any, index: number) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              height: '40px',
              backgroundColor:
                theme === 'dark' ? 'rgba(25, 28, 27, 0.12)' : '#DAF7F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '8px',
              pr: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pl: 1,
              }}
            >
              <InsertDriveFileIcon
                style={{
                  color: '#388E81',
                  // border:
                  //   theme === 'dark'
                  //     ? '2px solid #388E81'
                  //     : '2px solid #388E81',
                }}
              />

              <Box
                sx={{
                  ml: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: theme === 'dark' ? '#CCE8E1' : '#191C1B',
                  }}
                >
                  {/* {props.title} */}
                  {'Project introduction file.'}
                </Typography>
                {/* {props.fileSize > 0 && ( */}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: theme === 'dark' ? '#CCE8E1' : '#191C1B',
                  }}
                >
                  {/* {props.fileSize} MB */}
                  {'0.5 MB'}
                </Typography>
                {/* )} */}
              </Box>
            </Box>
          </Box>
        ))}
    </Paper>
  )
}
export default TraceDetails
