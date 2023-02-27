import React, { FC } from 'react'
import moment from 'moment'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import TitleValue from './TitleValue'
import { convertToInternationalCurrencySystem } from '../../../../utils/commonFunctions'

interface RegsitryVerificationReportProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const RegsitryVerificationReport: FC<RegsitryVerificationReportProps> = (
  props
) => {
  const { traceOption, theme, projectDetails } = props

  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project verification report received"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Date of Project verification started"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Date of Project verification End"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />
      <TitleValue
        title="Project reference ID"
        value={projectDetails?.uuid}
        theme={theme}
      />
      <TitleValue title="Verifier" value={verifier || '-'} theme={theme} />
      <TitleValue
        title="Status"
        value={PROJECT_STATUS[traceOption]?.value}
        theme={theme}
      />
      <TitleValue
        bolder
        title="Number of VCOT authorised"
        value={
          convertToInternationalCurrencySystem(
            projectDetails?.report?.updated_quantity
          ) || '-'
        }
        theme={theme}
      />
    </>
  )
}
export default RegsitryVerificationReport
