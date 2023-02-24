import React, { FC } from 'react'
import moment from 'moment'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import TitleValue from './TitleValue'

interface VerificationProcessProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const VerificationProcess: FC<VerificationProcessProps> = (props) => {
  const { traceOption, theme, projectDetails } = props

  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project received"
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
    </>
  )
}
export default VerificationProcess
