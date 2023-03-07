import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import CWTable from '../../../atoms/CWTable/CWTable'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import BlockchainCalls from '../../../blockchain/Blockchain'
import { verifierCalls } from '../../../api/verifierCalls.api'
import moment from 'moment'
import LoderOverlay from '../../LoderOverlay'
import { getLocalItem } from '../../../utils/Storage'
import CCTable from '../../../atoms/CCTable'
import { downloadFile } from '../../../utils/commonFunctions'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import LimitedText from '../../../atoms/LimitedText/LimitedText'

let headerIndex = 0

const headings = [
  <LimitedText key={headerIndex++} text="DATE" />,
  <LimitedText key={headerIndex++} text="REPORT NAME" />,
  <LimitedText key={headerIndex++} text="REPORT ISSUER" />,
  '',
]

interface ReportTdProps {
  name: string
}
const ReportTd: React.FC<ReportTdProps> = ({ name }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <DescriptionOutlinedIcon sx={{ color: 'iconColor.main' }} />
      {name}
    </Box>
  )
}

interface ReportIssuerTdProps {
  name: string
}
const ReportIssuerTd: React.FC<ReportIssuerTdProps> = ({ name }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <PersonOutlineOutlinedIcon sx={{ color: 'iconColor.main' }} />
      {name}
    </Box>
  )
}

const Reports = (props: any) => {
  console.log('props', props)
  const [loading, setLoading] = useState(false)
  const [allReport, setAllReport] = useState<any>([])

  useEffect(() => {
    getAllReport()
  }, [])

  // const getAllReport = async () => {
  //   setLoading(true)

  //   const userAddress =
  //     await BlockchainCalls.getConnectionStatusAndAddress().then((response) => {

  //       verifierCalls
  //         .getAllReportVerifiers(response && response.address)
  //         .then((res: any) => {

  //           if (res?.data?.success) {
  //             const rows =
  //               res?.data?.data &&
  //               res?.data?.data.map((i: any, index: number) => {
  //                 return [
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {moment(i?.createdAt).format(`DD/MM/YY`)}
  //                   </Typography>,
  //                   <ReportTd
  //                     key="Verification Report 1"
  //                     name={i?.file_attach[0]?.replace('.png', '')}
  //                   />,
  //                   <ReportIssuerTd
  //                     key="Issuer Name 1"
  //                     name={i?.issuer_details?.name}
  //                   />,
  //                   <Box
  //                     key={1}
  //                     sx={{
  //                       background: 'bgColor.secondary',
  //                       py: 1,
  //                       color: 'iconColor.main',
  //                       borderRadius: '32px',
  //                       cursor: 'pointer',
  //                     }}
  //                   >
  //                     View Report
  //                   </Box>,
  //                 ]
  //               })

  //             setAllReport(rows)
  //             setLoading(false)
  //             // if (res?.data?.main_project) {
  //             //   setMonthlyReportsList(rows)
  //             // }
  //           }
  //         })
  //         .catch((err) => console.log(err))
  //         .finally(() => {
  //           setLoading(false)
  //         })
  //     })
  // }

  const getAllReport = async () => {
    setLoading(true)

    verifierCalls
      .getAllReportVerifiers(props?.uuid)
      .then((res: any) => {
        if (res?.data?.success) {
          const reports = res?.data?.data
          const rows =
            reports &&
            reports.map((i: any, index: number) => {
              return [
                <LimitedText
                  key={index}
                  customStyle={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                  text={moment(i?.createdAt).format(`DD/MM/YY`)}
                />,
                <Typography
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  <ReportTd
                    key="Verification Report 1"
                    name={i?.file_attach[0]?.replace('.png', '')}
                  />
                </Typography>,
                <Typography
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  <ReportIssuerTd
                    key="Issuer Name 1"
                    name={i?.issuer_details?.name}
                  />
                </Typography>,
                <Box
                  key={1}
                  sx={{
                    background: 'bgColor.secondary',
                    py: 1,
                    color: 'iconColor.main',
                    borderRadius: '32px',
                    cursor: 'pointer',
                  }}
                  onClick={() => downloadFile(i?.file_attach[0])}
                >
                  Download Report
                </Box>,
              ]
            })

          const regsitrationReportRow = [
            [
              <LimitedText
                key={1}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
                text={moment(reports[0]?.createdAt).format(`DD/MM/YY`)}
              />,
              <Typography
                key="Verification Report 1"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <ReportTd
                  key="Verification Report 1"
                  name={'Registration Report'}
                />
              </Typography>,
              <Typography
                key="Issuer Name 1"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <ReportIssuerTd
                  key="Issuer Name 1"
                  name={reports[0].issuer_details?.name}
                />
              </Typography>,
              <Box
                key={1}
                sx={{
                  background: 'bgColor.secondary',
                  py: 1,
                  color: 'iconColor.main',
                  borderRadius: '32px',
                  cursor: 'pointer',
                }}
                onClick={() => downloadFile(props?.project_pdf)}
              >
                Download Report
              </Box>,
            ],
          ]

          const newRows = [...regsitrationReportRow, ...rows]

          setAllReport(newRows)
          setLoading(false)
          // if (res?.data?.main_project) {
          //   setMonthlyReportsList(rows)
          // }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box
      sx={{
        // background: '#111E17',
        // padding: '2vw 6vw',
        // color: '#fff',
        width: '100%',
        pt: 5,
      }}
    >
      {/* <Typography sx={{ fontSize: '32px', color: 'headingColor.main' }}>
          Reports
        </Typography> */}
      <Box sx={{}}>
        {/* <CWTable */}
        {loading ? (
          <CCTableSkeleton items={3} />
        ) : (
          <CCTable
            headings={headings}
            rows={allReport}
            pagination={allReport.length > 3}
            loading={loading}
            rowsPerPageProp={3}
          />
        )}
      </Box>
    </Box>
  )
}

export default Reports
