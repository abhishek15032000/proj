import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Box, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registryCalls } from '../../api/registry.api'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import StatusChips from '../../atoms/StatusChips/StatusChips'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import { downloadFile } from '../../utils/commonFunctions'
import DownloadIcon from '@mui/icons-material/Download'
import TextButton from '../../atoms/TextButton/TextButton'
import ArticleIcon from '@mui/icons-material/Article'
import { getLocalItem } from '../../utils/Storage'
import { ROLES } from '../../config/constants.config'

interface reportsProps {
  projectDetails: any
}

const headings: any = [
  'Submitted On',
  'Next Submission Dt',
  'Report Name',
  'Report Version',
  'Status',
  'Verifier Report',
  'VCOTs Authorised',
  'Action',
]

const Reports = ({ projectDetails }: reportsProps) => {
  const navigate = useNavigate()
  const userType: any = getLocalItem('userDetails')?.type
  const [tableRows, setTableRows] = useState()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    //if (reportDetails) {
    if (Array.isArray(projectDetails)) {
      const arrReportDetials: any = projectDetails.map(
        (item: any, index: any) => {
          return [
            moment(item.report?.createdAt).format('DD/MM/YYYY'),
            moment(item.report?.next_date).format('DD/MM/YYYY'),
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  mr: 1,
                  textAlign: 'left',
                }}
              >
                Conclusive Report
              </Typography>
              <DownloadIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!item.file_attach?.length) return
                  item.report?.file_attach.forEach(
                    (file: any, index: number) => {
                      downloadFile(file)
                    }
                  )
                }}
                style={{ color: Colors.lightPrimary1 }}
              />
            </Box>,
            'V1.0',
            <ApprovalChip
              key={index}
              variant={item.status === 0 ? 'Pending' : 'Verified'}
            />,
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  mr: 1,
                  textAlign: 'left',
                }}
              >
                Report
              </Typography>
              <ArticleIcon
                //onClick={() => props.pdfCall(item)}
                style={{ color: Colors.lightPrimary1 }}
              />
            </Box>,
            item.quantity,
            item.status === 0 ? (
              <TextButton
                key={index}
                sx={{ width: '90px' }}
                title="Verify"
                onClick={() =>
                  navigate(pathNames.VERIFIER_VERIFY_REPORT, {
                    state: {
                      project: item?.project_id,
                      pdf: item?.project_id?.project_pdf,
                    },
                  })
                }
              />
            ) : (
              '-'
            ),
          ]
        }
      )
      setTableRows(arrReportDetials)

      console.log('reportDetails is an array: ', projectDetails)
    } else if (projectDetails && Object.keys(projectDetails).length > 0) {
      console.log('reportDetails from else: ', projectDetails)
      const objRow: any = [
        [
          moment(projectDetails?.report?.createdAt).format('DD/MM/YYYY'),
          moment(projectDetails?.report?.next_date).format('DD/MM/YYYY'),
          <Box key={1} sx={{ display: 'flex' }}>
            <img
              src={Images.FileIcon}
              width="20px"
              height={'20px'}
              style={{ cursor: 'pointer' }}
            />
            Monitoring Report
            <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} />
          </Box>,
          'v1',
          renderStatusChips(1),
          <Box key={1} sx={{ display: 'flex' }}>
            <img
              src={Images.FileIcon}
              width="20px"
              height={'20px'}
              style={{ cursor: 'pointer' }}
            />
            Project Issuance
            {/* <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} /> */}
          </Box>,
          //'--',
          projectDetails?.report?.quantity,
          (userType === ROLES.VERIFIER && projectDetails?.project_status > 5) ||
          (userType === ROLES.REGISTRY &&
            projectDetails?.project_status > 7) ? (
            '-'
          ) : (
            <CCButton
              key={1}
              sx={{
                background: '#006B5E',
                color: '#FFFFFF',
                borderRadius: '32px',
                fontSize: 14,
                px: 3,
                py: 1,
                // padding: '4px 8px',
                minWidth: '150px',
              }}
              onClick={() => {
                if (
                  userType === ROLES.VERIFIER &&
                  projectDetails?.project_status === 5
                ) {
                  navigate(pathNames.REVIEW_AND_COMMENT, {
                    state: {
                      project: currentProjectDetails,
                      pdf: currentProjectDetails?.project_pdf,
                      verifierName:
                        currentProjectDetails?.verifier_details_id
                          ?.verifier_name,
                    },
                  })
                }
                if (
                  (userType === ROLES.REGISTRY &&
                    projectDetails?.project_status === 6) ||
                  projectDetails?.project_status === 7
                ) {
                  console.log(
                    'seeting project detail in location state:',
                    projectDetails
                  )
                  navigate(pathNames.REGISTRY_REVIEW_REPORT, {
                    state: { projectReportDetails: projectDetails },
                  })
                }
              }}
            >
              {userType === ROLES.VERIFIER &&
              projectDetails?.project_status === 5
                ? 'Verify'
                : null}
              {userType === ROLES.REGISTRY &&
              (projectDetails?.project_status === 6 ||
                projectDetails?.project_status === 7)
                ? 'Start review'
                : null}
            </CCButton>
          ),
        ],
      ]
      setTableRows(objRow)
    }
    //}
  }, [projectDetails])

  const renderStatusChips = (status: number) => {
    // let bac
    switch (status) {
      case 1: {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor="#E1E3E1"
            cirlceColor="#A8ACAA"
          />
        )
      }
      case 3: {
        return (
          <StatusChips
            text="Completed"
            textColor=""
            backgroundColor="#75F8E4"
            cirlceColor="#00A392"
          />
        )
      }
    }
  }

  return (
    <>
      <Paper sx={{ borderRadius: '8px', padding: 2, mt: 4, mb: 1 }}>
        <Box sx={{ fontSize: 22, color: Colors.darkPrimary1 }}>
          Report received
        </Box>
        <CCTable headings={headings} rows={tableRows} />
      </Paper>
    </>
  )
}

export default Reports
//kept for reference if any bugs found
//const rows: any = [
//  [
//    moment().format('l'),
//    moment().format('l'),
//    <Box key={1} sx={{ display: 'flex' }}>
//      <img
//        src={Images.FileIcon}
//        width="20px"
//        height={'20px'}
//        style={{ cursor: 'pointer' }}
//      />
//      Monitoring Report
//      <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} />
//    </Box>,
//    'v1',
//    renderStatusChips(1),
//    <Box key={1} sx={{ display: 'flex' }}>
//      <img
//        src={Images.FileIcon}
//        width="20px"
//        height={'20px'}
//        style={{ cursor: 'pointer' }}
//      />
//      Project Issuance
//      {/* <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} /> */}
//    </Box>,
//    '--',
//    <CCButton
//      key={1}
//      sx={{
//        background: '#006B5E',
//        color: '#FFFFFF',
//        borderRadius: '32px',
//        fontSize: 14,
//        px: 3,
//        py: 1,
//        // padding: '4px 8px',
//        minWidth: '150px',
//      }}
//      onClick={() => navigate(pathNames.REGISTRY_REVIEW_REPORT)}
//    >
//      Start review
//    </CCButton>,
//  ],
//]
