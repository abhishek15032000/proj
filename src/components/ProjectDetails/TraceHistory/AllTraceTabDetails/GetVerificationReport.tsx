import React, { FC } from 'react'

import { Colors, Images } from '../../../../theme'
import TitleValue from '../../../Profile/TitleValue'

import moment from 'moment'
import { PROJECT_STATUS } from '../../../../config/constants.config'

interface GetVerificationReportProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const GetVerificationReport: FC<GetVerificationReportProps> = (props) => {
  const {
    traceOption,

    theme,

    projectDetails,
  } = props

  return (
    <>
      <TitleValue
        title="Date of Project Created :"
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
        title="Project reference ID :"
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
        title="Date of Project submitted for verification :"
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
        title="Date of Project received for verification :"
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
        title="Date of Project verification report started :"
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
        title="Date of Project verification report submit :"
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
        title="Date of Project approves by registry :"
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
        title="Verifier :"
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
      <TitleValue
        title="Number of VCOT authorised :"
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
    </>
  )
}
export default GetVerificationReport
