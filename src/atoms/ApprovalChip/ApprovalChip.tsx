// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Chip } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { Colors } from '../../theme'

interface ApprovalChipProps {
  variant?: any
}

const ApprovalChip: FC<ApprovalChipProps> = (props) => {
  if (props.variant === 1) {
    return (
      <Chip
        sx={{ backgroundColor: Colors.lightGreyBackground, m: 1 }}
        icon={<CircleIcon style={{ color: Colors.mediumGreyBackground }} />}
        label={'Pending'}
      />
    )
  } else if (props.variant === 2) {
    return (
      <Chip
        sx={{ backgroundColor: Colors.lightOrangeBackground, m: 1 }}
        icon={<CircleIcon style={{ color: Colors.darkOrangeBackground }} />}
        label={'In progress'}
      />
    )
  } else if (props.variant === 3) {
    return (
      <Chip
        sx={{ backgroundColor: Colors.lightCyanBackground, m: 1 }}
        icon={<CircleIcon style={{ color: Colors.lightBlueBackground2 }} />}
        label={'Approved'}
      />
    )
  } else if (props.variant === 4) {
    return (
      <Chip
        sx={{ backgroundColor: Colors.lightCyanBackground, m: 1 }}
        icon={<CircleIcon style={{ color: Colors.lightBlueBackground2 }} />}
        label={'Verified'}
      />
    )
  } else if (props.variant === 5) {
    return (
      <Chip
        sx={{ backgroundColor: Colors.darkRedBackground, m: 1, color: '#FFF' }}
        icon={<CircleIcon style={{ color: '#FFF' }} />}
        label={'Rejected'}
      />
    )
  } else if (props.variant === 6) {
    return (
      <Chip
        sx={{ backgroundColor: Colors.darkRedBackground, m: 1, color: '#FFF' }}
        icon={<CircleIcon style={{ color: '#FFF' }} />}
        label={'Rejected' + props.variant}
      />
    )
  } else {
    return null
  }
}

export default ApprovalChip
