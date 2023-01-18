import React, { FC } from 'react'

import { Colors, Images } from '../../../../theme'
import TitleValue from '../../../Profile/TitleValue'

import moment from 'moment'
import { shallowEqual } from 'react-redux'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'

interface VerificationReportProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const VerificationReport: FC<VerificationReportProps> = (props) => {
  const {
    traceOption,

    theme,

    projectDetails,
  } = props

  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project verification start :"
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
        title="Date of Project verification End :"
        value={moment(projectDetails?.end_date).format(`DD/MM/YY`)}
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
        value={verifier || '-'}
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
        value={projectDetails?.report?.quantity || '-'}
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
        title=" Next date of monthly report submission :"
        value={
          projectDetails?.report?.quantity
            ? moment(projectDetails?.report?.next_date).format(`DD/MM/YY`)
            : '-'
        }
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
export default VerificationReport
