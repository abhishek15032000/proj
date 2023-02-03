import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import { Images } from '../../../theme'
import { pathNames } from '../../../routes/pathNames'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Grid, Tooltip } from '@mui/material'
import { limitTitle } from '../../../utils/commonFunctions'
import { FileDownloadSharp } from '@mui/icons-material'

interface ProjectDetailsCardProps {
  project: any
  navigationAction: any
  justifyContent?: string
  [x:string]: any;
}
const ProjectDetailsCard: FC<ProjectDetailsCardProps> = (props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    project,
    navigationAction,
    justifyContent="center"
  } = props

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const [fields, setFields] = useState<any>([])

  useEffect(()=>{
    const {tokens, totalToken} = props.project
    const fieldList = [
      {
        label: 'Total Tokens :',
        value:totalToken
      },
      {
        label: 'Tokens Name :',
        value: tokens?.token_name
      },
      {
        label: 'Token Type :',
        value:tokens?.token_type
      },
      {
        label: 'Unit Price :',
        value:tokens?.unit_rate
      },
      
    ]
    setFields(fieldList)
  },[props.project])
  return (
    <Grid item sm={12}  md={6} lg={4} xl={3} display="flex" justifyContent={justifyContent} alignItems="flex-start" {...props}>
    <Box
      sx={{
        width: '264px',
        // mb: 2,
        borderRadius: '8px',
        // mr: 4,
        height: '100%',
        boxShadow: onWebApp ? '0px 5px 25px rgba(0, 0, 0, 0.12)' : '',
      }}
    >
      <Box sx={{ borderRadius: '8px 8px 0 0' }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <Box sx={{ borderRadius: '8px 8px 0 0' }}>
            <img
              src={onWebApp ? Images.ProjectLight : Images.Project}
              alt=""
              width="100%"
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              background: onWebApp ? '#CCE8E1' : '#1C3531',
              color: onWebApp ? '#006B5E' : '#BFC9C6',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: 500,
              top: '5px',
              left: '8px',
            }}
          >
            {project?.register ? 'Registered Project' : 'Provisional Project'}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1,
          color: onWebApp ? '#00201B' : '#E1E3E1',
          background: onWebApp ? '#fff' : '#191C1B',
          borderBottom: '1px solid #899390',
        }}
      >
        <Box sx={{ fontSize: 16, fontWeight: 500, wordBreak: 'break-word', minHeight:'48px'}}>
          {limitTitle(project?.company_name, 45) || '--'}
        </Box>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FmdGoodOutlinedIcon sx={{ color: '#667080', ml: '-3px' }} />
          <Box sx={{ fontSize: 10, fontWeight: 500 , minHeight:'30px'}}>
            {`Project Location ${
              project?.location || 'Lexington, Ohio, United States'
            } | Project Area ${project?.area || '53.4'} Sq.Km`}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          px: 2,
          pb: 2,
          pt: 1,
          color: onWebApp ? '#00201B' : '#E1E3E1',
          background: onWebApp ? '#fff' : '#191C1B',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <Box sx={{ fontSize: 12, fontWeight: 500 }}>
          {fields.map((field:any, index:number) =>{
            return <Box key={index.toString()} sx={{ display: 'flex', justifyContent:'space-between' }}>
            <Box sx={{ width: '50%' }}>{field?.label}</Box>
            <Tooltip title={field?.value} >
              <Box sx={{ width: '50%' }}>{limitTitle(field.value, 10 )|| '--'}</Box>
            </Tooltip>
          </Box>
          })}
          
        </Box>
        <Box>
          <CCButton
            sx={{
              mt: 3,
              background: onWebApp ? '' : '#55DBC8',
              width: '100%',
              height: '30px',
              borderRadius: '16px',
              color: '#003730',
              fontSize: 14,
              fontWeight: 500,
            }}
            onClick={() =>
              navigate(
                {
                  pathname: pathNames.PROJECT_DETAILS,
                  search: `?${createSearchParams({ projectId: project.uuid })}`,
                },
                { state: project }
              )
            }
          >
            Buy Credits
          </CCButton>
        </Box>
      </Box>
    </Box>
    </Grid>
  )
}

export default ProjectDetailsCard
