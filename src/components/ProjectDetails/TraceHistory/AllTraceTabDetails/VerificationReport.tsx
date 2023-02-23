import React, { FC } from 'react'

import moment from 'moment'
import { shallowEqual } from 'react-redux'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import TitleValue from './TitleValue'

interface VerificationReportProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const VerificationReport: FC<VerificationReportProps> = (props) => {
  const { traceOption, theme, projectDetails } = props

  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project verification start :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Date of Project verification End :"
        value={moment(projectDetails?.end_date).format(`DD/MM/YY`)}
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
      <TitleValue
        title=" Next date of monthly report submission :"
        value={
          projectDetails?.report?.quantity
            ? moment(projectDetails?.report?.next_date).format(`DD/MM/YY`)
            : '-'
        }
        theme={theme}
      />
    </>
  )
}
export default VerificationReport
