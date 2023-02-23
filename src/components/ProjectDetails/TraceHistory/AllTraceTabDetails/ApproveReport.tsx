import React, { FC } from 'react'
import moment from 'moment'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import TitleValue from './TitleValue'

interface ApproveReportProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const ApproveReport: FC<ApproveReportProps> = (props) => {
  const { traceOption, theme, projectDetails } = props

  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project verification report submit :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Project reference ID :"
        value={projectDetails?.uuid}
        theme={theme}
      />
      <TitleValue title="Verifier :" value={verifier || '-'} theme={theme} />
      <TitleValue
        title="Status :"
        value={PROJECT_STATUS[traceOption]?.value}
        theme={theme}
      />
      <TitleValue
        bolder
        title="Number of VCOT authorised :"
        value={projectDetails?.report?.quantity || '-'}
        theme={theme}
      />
    </>
  )
}
export default ApproveReport
