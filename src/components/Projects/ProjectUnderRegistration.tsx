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
              label={'Finalised'}
              //label={i?.verifierStatus}
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
