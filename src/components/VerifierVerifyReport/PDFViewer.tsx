// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'

// Functional Imports
import { Worker, Viewer } from '@react-pdf-viewer/core'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'

// Local Imports

interface PDFViewerProps {
  pdfUrl: any
}

const PDFViewer: FC<PDFViewerProps> = (props) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
      <Viewer fileUrl={props?.pdfUrl} />
    </Worker>
  )
}

export default PDFViewer
