import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import CCTable from '../../atoms/CCTable'
import { setReportDetails } from '../../redux/Slices/reportsViewCommentsSlice'
import { useDispatch } from 'react-redux'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'

const TokenAndContractReportTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<any>()

  const headings = [
    'Date of Report Submission',
    'No of VCOs Authorised',
    'Date of Verification',
    'Comments',
  ]

  useEffect(() => {
    getProjectByReportId()
  }, [])

  const handleComments = (i: any) => {
    dispatch(setReportDetails(i))
    console.log('i:', i)
    navigate(pathNames.REPORT_VIEW_COMMENTS)
  }

  const getProjectByReportId = () => {
    dataCollectionCalls
      .getAllMonthlyData('a10e77d3-459b-4a9a-97a5-d5d1d135633c')

      .then((res) => {
        if (res?.success) {
          if (res?.data?.main_project?.report) {
            const tempData = [res?.data?.main_project]

            const rowData = tempData.map((i: any, index: number) => {
              return [
                <Typography key={index}>
                  {' '}
                  {`${moment(i?.report?.createdAt).format('DD/MM/YYYY')} -
								${moment(i?.report?.next_date).format('DD/MM/YYYY')}`}
                </Typography>,
                <Typography textAlign={'center'} key={index}>
                  {i?.report?.quantity}
                </Typography>,
                <Typography key={index}>
                  {moment(i?.report?.createdAt).format('DD/MM/YYYY')}
                </Typography>,
                <Typography
                  key={index}
                  onClick={() => handleComments(i)}
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textDecorationColor: '#006B5E',
                    color: '#006B5E',
                    cursor: 'pointer',
                  }}
                >
                  View
                </Typography>,
              ]
            })
            setRows(rowData)
          }
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box sx={{ pt: 1 }}>
      <Typography sx={{ pl: 2, fontWeight: 500, fontSize: 14 }}>
        Reports
      </Typography>
      {loading && <CCTableSkeleton items={1} sx={{ mt: 2 }} />}
      {!loading && (
        <TableContainer sx={{ pl: 2, pb: 2, pt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#CCE8E1' }}>
                {headings &&
                  headings.length &&
                  headings.map((tdCell: any, index: number) => (
                    <TableCell
                      key={index}
                      sx={{ fontSize: 14, fontWeight: 500 }}
                    >
                      {tdCell}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                rows &&
                rows.length &&
                rows.map((row: any, index: number) => (
                  <TableRow key={index} sx={{ background: '#FAFDFA' }}>
                    {row.map((tdValue: any, index: number) => (
                      <TableCell
                        key={index}
                        sx={{ border: 'none', fontSize: 14, fontWeight: 400 }}
                      >
                        {tdValue}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/*{rows && rows.length > 0 && <CCTable headings={headings} rows={rows} />}*/}
    </Box>
  )
}
export default TokenAndContractReportTable
