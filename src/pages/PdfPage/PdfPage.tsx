import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setPageCount, setPdfData } from '../../redux/Slices/pdfSlice'
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
  id: string
}
const PdfPage: FC<PdfPageProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState({})
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const projectId: any = searchParams.get('id')
    getAllDetails(id || projectId)
  }, [searchParams])

  const getAllDetails = (id: string) => {
    // setLoading(true)
    dataCollectionCalls
      .getProjectById(id)
      // .getProjectById('b909b3f1-8e59-4e50-8cce-1b83ae2fbfe2')
      // .getProjectById('c89ceeb2-d8a7-4829-aed6-d36da7f494e8')
      .then((res) => {
        console.log('project', res?.data)
        dispatch(setPdfData(res?.data))
      })
      .catch((error) => {
        console.log('error', error)
        // setLoading(false)
      })
  }

  return (
    <>
      <FrontPage />
      <IndexPage />
      <ProjectIntro />
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
      <SectionE />
    </>
  )
}

export default PdfPage
