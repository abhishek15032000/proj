import { Box } from '@mui/system'
import React, { FC } from 'react'
import CCButton from '../../../atoms/CCButton'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import { Images } from '../../../theme'

interface ProjectDetailsCardProps {
  project: any
}
const ProjectDetailsCard: FC<ProjectDetailsCardProps> = ({ project }) => {
  return (
    <Box
      sx={{
        width: '280px',
        mb: 2,
        borderRadius: '8px',
        mr: 4,
        height: '100%',
      }}
    >
      <Box>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box>
            <img src={Images.Project} alt="" width="100%" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              background: '#1C3531',
              color: '#BFC9C6',
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
          color: '#E1E3E1',
          borderBottom: '1px solid #899390',
          background: '#191C1B',
        }}
      >
        <Box sx={{ fontSize: 16, fontWeight: 500, wordBreak: 'break-word' }}>
          {project?.company_name || 'King County Urban Forest Council'}
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
          <Box sx={{ fontSize: 10, fontWeight: 500 }}>
            {`Project Location ${
              project?.location || 'Lexington, Ohio, United States'
            } | Project Area ${project?.area || '53.4'} Sq.Km`}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ px: 2, pb: 2, pt: 1, color: '#E1E3E1', background: '#191C1B' }}
      >
        <Box sx={{ fontSize: 12, fontWeight: 500 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '50%' }}>PRICE PER OFFSET:</Box>
            <Box sx={{ width: '50%' }}>$-$$</Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '50%' }}>AVAILABLE:</Box>
            <Box sx={{ width: '50%' }}>XX.XXX</Box>
          </Box>
        </Box>
        <Box>
          <CCButton
            sx={{
              mt: 3,
              background: '#55DBC8',
              width: '100%',
              height: '30px',
              borderRadius: '16px',
              color: '#003730',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Buy Credits
          </CCButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectDetailsCard
