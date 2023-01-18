import React, { FC } from 'react'
import moment from 'moment'
import { shallowEqual } from 'react-redux'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import TitleValue from './TitleValue'

interface GetVerificationReportProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const GetVerificationReport: FC<GetVerificationReportProps> = (props) => {
  const { theme, projectDetails, traceOption } = props

  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project Created :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Project reference ID :"
        value={projectDetails?.uuid}
        theme={theme}
      />
      <TitleValue
        title="Date of Project submitted for verification :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Date of Project received for verification :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />

      <TitleValue
        title="Date of Project verification report started :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />

      <TitleValue
        title="Date of Project verification report submit :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />

      <TitleValue
        title="Date of Project approves by registry :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />

      <TitleValue title="Verifier :" value={verifier || '-'} theme={theme} />
      <TitleValue
        title="Status :"
        value={PROJECT_STATUS[traceOption]?.value}
        theme={theme}
      />
      <TitleValue
        title="Number of VCOT authorised :"
        value={projectDetails?.report?.updated_quantity || '-'}
        theme={theme}
      />
    </>
  )
}
export default GetVerificationReport
