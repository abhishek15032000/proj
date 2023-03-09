import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setPdfData } from '../../redux/Slices/pdfSlice'
import FrontPage from './FrontPage'
import IndexPage from './IndexPage'
import ProjectIntro from './ProjectIntro'
import SectionA from './SectionA'
import SectionB from './SectionB'
import SectionC from './SectionC'
import SectionD from './SectionD'
import SectionE from './SectionE'
import './style.css'

interface PdfPageProps {
  id?: string
  data?: any
}
const PdfPage: FC<PdfPageProps> = ({ id, data }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const projectId: any = searchParams.get('id')
    getAllDetails(id || projectId)
  }, [searchParams])

  const getAllDetails = (id: string) => {
    if (!data) {
      dataCollectionCalls
        .getProjectById(id)
        .then((res) => {
          console.log('project', res?.data)
          dispatch(setPdfData(res?.data))
        })
        .catch((error) => {
          console.log('error', error)
        })
    } else dispatch(setPdfData(data))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      id="pdfwrapper"
    >
      <Box>
        <FrontPage />
        <IndexPage />
        <ProjectIntro />
        <SectionA />
        <SectionB />
        <SectionC />
        <SectionD />
        <SectionE />
      </Box>
    </div>
  )
}

export default PdfPage
