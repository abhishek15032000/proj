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
  if (props.variant === 'Rejected') {
    return (
      <ApprovalChipTemplate
        title={'Rejected'}
        backgroundColor={Colors.darkRedBackground}
        tintColor={'#FFF'}
        textColor={'#FFF'}
      />
    )
  } else if (props.variant === 'Approved') {
    return (
      <ApprovalChipTemplate
        title={'Approved'}
        backgroundColor={Colors.lightCyanBackground}
        tintColor={Colors.lightBlueBackground2}
        textColor={'#000'}
      />
    )
  } else if (props.variant === 'Verified') {
    return (
      <ApprovalChipTemplate
        title={'Verified'}
        backgroundColor={Colors.lightCyanBackground}
        tintColor={Colors.lightBlueBackground2}
        textColor={'#000'}
      />
    )
  } else if (props.variant === 'In progress') {
    return (
      <ApprovalChipTemplate
        title={'In progress'}
        backgroundColor={Colors.lightOrangeBackground}
        tintColor={Colors.darkOrangeBackground}
        textColor={'#000'}
      />
    )
  } else if (props.variant === 'Pending') {
    return (
      <ApprovalChipTemplate
        title={'Pending'}
        backgroundColor={Colors.mediumGreyBackground}
        tintColor={Colors.lightGreyBackground}
        textColor={'#000'}
      />
    )
  } else {
    return null
  }
}

export default ApprovalChip

interface ApprovalChipTemplateProps {
  title?: any
  backgroundColor?: any
  tintColor?: any
  textColor?: any
}

const ApprovalChipTemplate: FC<ApprovalChipTemplateProps> = (props) => {
  return (
    <Chip
      sx={{
        backgroundColor: props.backgroundColor,
        m: 1,
        color: props.textColor,
        fontWeight: 400,
        fontSize: 14
      }}
      icon={<CircleIcon style={{ color: props.tintColor }} />}
      label={props.title}
    />
  )
}
