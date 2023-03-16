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
import { downloadFile, downloadPdfFile } from '../../../utils/commonFunctions'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import LimitedText from '../../../atoms/LimitedText/LimitedText'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'

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
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PersonOutlineOutlinedIcon sx={{ color: 'iconColor.main' }} />
      {name}
    </Box>
  )
}
interface DownloadReportTdProps {
  pdf: string
}
const DownloadReportTd: React.FC<DownloadReportTdProps> = ({ pdf }) => {
  return (
    <Box
      key={1}
      sx={{
        background: 'bgColor.secondary',
        py: 1,
        color: 'iconColor.main',
        borderRadius: '32px',
        cursor: 'pointer',
      }}
      onClick={() => downloadPdfFile(pdf)}
    >
      Download Report
    </Box>
  )
}

const Reports = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [allReport, setAllReport] = useState<any>([])

  useEffect(() => {
    getProjectById()
  }, [])

  const getProjectById = async () => {
    try {
      setLoading(true)
      const res = await dataCollectionCalls.getProjectById(props?.uuid)
      const projectData = res?.data
      const rows = [
        [
          moment(projectData?.createdAt).format(`DD/MM/YY`),
          '2023_PDD_ICR',
          <ReportIssuerTd
            key="issuer_name"
            name={projectData?.organizationName}
          />,
          <DownloadReportTd
            key="issuer_pdf"
            pdf={'pdfs/' + projectData?.project_pdf}
          />,
        ],
        [
          moment(projectData?.createdAt).format(`DD/MM/YY`),
          '2023_Verification_ICR',
          <ReportIssuerTd
            key="verifier_name"
            name={
              projectData?.report?.verifier_details?.organizationName || '-'
            }
          />,
          <DownloadReportTd
            key="verification_pdf"
            pdf={projectData?.report?.file_attach[0]}
          />,
        ],
        [
          moment(projectData?.createdAt).format(`DD/MM/YY`),
          '2023_Validation_ICR',
          <ReportIssuerTd
            key="registry_name"
            name={
              projectData?.report?.registry_details?.organizationName || '-'
            }
          />,
          <DownloadReportTd
            key="validation_pdf"
            pdf={projectData?.report?.validation_report[0]}
          />,
        ],
      ]
      setAllReport(rows)
    } catch (e) {
      console.log('Error in dataCollectionCalls.getProjectById api ~ ', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        // background: '#111E17',
        // padding: '2vw 6vw',
        // color: '#fff',
        width: '100%',
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
