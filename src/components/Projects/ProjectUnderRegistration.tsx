import { Box, Chip, Grid, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCTable from '../../atoms/CCTable'
import CreateIcon from '@mui/icons-material/Create'
import { ForkLeft } from '@mui/icons-material'
import TextButton from '../../atoms/TextButton/TextButton'
import CircleIcon from '@mui/icons-material/Circle'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import moment from 'moment'

const rowItem = [
  '4337',
  'Vilcrum, Chile',
  <Box
    key="1"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <IconButton color="primary" aria-label="upload picture" component="label">
      <WorkOutlineIcon />
    </IconButton>
    Climate Finance
  </Box>,
  <Chip
    sx={{ backgroundColor: '#75F8E4' }}
    key="1"
    icon={<CircleIcon style={{ color: '#00A392' }} />}
    label="Verified"
  />,
  '12/05/21',
  <TextButton
    key="1"
    sx={{
      width: '180px',
      height: '40px',
      borderRadius: '100px',
      backgroundColor: '#006B5E',
    }}
    title="Add Monthly Data"
  />,
]

const rows = [rowItem, rowItem, rowItem, rowItem]
const headings = [
  'Reference ID',
  'Created Dt',
  'Project Name',
  'Location',
  'Verifier Status',
  'Verifier',
  'Action',
]

const ProjectsUnderRegistration = () => {
  const uuid: string = getLocalItem('uuid')

  const [allProjects, setAllProjects] = useState<any>()

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    const g = []
    dataCollectionCalls.getAllProjects(uuid).then((res: any) => {
      if (res?.data?.success) {
        const rows = res?.data?.data.map((i: any, index: number) => {
          return [
            i?.uuid,
            moment(i?.createdAt).format('DD/MM/YY'),
            i?.company_name,
            i?.location,
            <Chip
              sx={{ backgroundColor: '#75F8E4' }}
              key="1"
              icon={
                <CircleIcon fontSize="small" style={{ color: '#00A392' }} />
              }
              label={i?.verifierStatus}
            />,

            i?.verifier,
            <CreateOutlinedIcon key={index} />,
          ]
        })
        setAllProjects(rows)
      }
    })
  }
  return (
    <Box>
      {allProjects && (
        <CCTable headings={headings} rows={allProjects} pagination={true} />
      )}
    </Box>
  )
}

export default ProjectsUnderRegistration
