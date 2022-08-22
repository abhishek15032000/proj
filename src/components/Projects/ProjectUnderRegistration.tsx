import { Box, Chip, Typography, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCTable from '../../atoms/CCTable'
import CircleIcon from '@mui/icons-material/Circle'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import DataTablesBriefCase from '../../assets/Images/Icons/DataTablesBriefCase.png'
import { limitTitle } from '../../utils/commonFunctions'

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
  const navigate = useNavigate()
  const uuid: string = getLocalItem('uuid')

  const [allProjects, setAllProjects] = useState<any>()

  useEffect(() => {
    getAllProjects()
  }, [])

  const handleProjectDetails = (selectedProjectDetails: any) => {
    navigate(pathNames.SELECT_VERIFIER, {
      state: { projectDetails: selectedProjectDetails },
    })
  }

  const getAllProjects = () => {
    dataCollectionCalls.getAllProjects(uuid).then((res: any) => {
      console.log(res)
      if (res?.data?.success) {
        const rows = res?.data?.data.map((i: any, index: number) => {
          return [
            <Typography
              key={index}
              textAlign="start"
              sx={{ fontSize: 15, fontWeight: 500 }}
            >
              {limitTitle(i?.uuid, 10)}
            </Typography>,
            <Typography
              key={index}
              textAlign="start"
              sx={{ fontSize: 15, fontWeight: 500 }}
            >
              {moment(i?.createdAt).format(`DD/MM/YY`)}
            </Typography>,
            <Typography
              key={index}
              textAlign="start"
              sx={{ fontSize: 15, fontWeight: 500 }}
            >
              {i?.company_name}
            </Typography>,
            <Typography
              key={index}
              textAlign="start"
              sx={{ fontSize: 15, fontWeight: 500 }}
            >
              {i?.location}
            </Typography>,
            <Chip
              sx={{ backgroundColor: '#75F8E4' }}
              key={index}
              icon={
                <CircleIcon
                  style={{ color: '#00A392', fontSize: 10, paddingLeft: 1 }}
                />
              }
              label={'Finalised'}
            />,
            <Stack
              key={index}
              direction={'row'}
              alignItems="center"
              justifyContent={'flex-end'}
            >
              <img src={DataTablesBriefCase} width="35px" height="35px" />
              <Typography sx={{ fontSize: 15, fontWeight: 500, pl: 1 }}>
                Climate Finance
              </Typography>
            </Stack>,
            <Box
              key={index}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleProjectDetails(i)}
            >
              <ArrowRightIcon />
            </Box>,
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
