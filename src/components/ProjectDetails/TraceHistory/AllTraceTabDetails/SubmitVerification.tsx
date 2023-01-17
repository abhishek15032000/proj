import React, { FC } from 'react'

import { Colors, Images } from '../../../../theme'
import TitleValue from '../../../Profile/TitleValue'

import moment from 'moment'
import { PROJECT_STATUS } from '../../../../config/constants.config'

interface SubmitVerificationProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const SubmitVerification: FC<SubmitVerificationProps> = (props) => {
  const {
    traceOption,

    theme,

    projectDetails,
  } = props

  return (
    <>
      <TitleValue
        title="Date of Project creation :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        valueStyle={{
          fontWeight: 400,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
          textAlign: 'right',
        }}
        titleStyle={{
          fontWeight: 500,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
        }}
      />

      <TitleValue
        title="Project Reference ID :"
        value={projectDetails?.uuid}
        valueStyle={{
          fontWeight: 400,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
          textAlign: 'right',
        }}
        titleStyle={{
          fontWeight: 500,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
        }}
      />
      <TitleValue
        title="Choosen verifiers :"
        value={'-'}
        valueStyle={{
          fontWeight: 400,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
          textAlign: 'right',
        }}
        titleStyle={{
          fontWeight: 500,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
        }}
      />
      <TitleValue
        title="Status :"
        value={PROJECT_STATUS[traceOption]?.value}
        valueStyle={{
          fontWeight: 400,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
          textAlign: 'right',
        }}
        titleStyle={{
          fontWeight: 500,
          color: theme === 'dark' ? Colors.white : '#2B2B2B',
        }}
      />
    </>
  )
}
export default SubmitVerification
