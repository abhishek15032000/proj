import React, { FC } from 'react'
import moment from 'moment'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import TitleValue from './TitleValue'

interface SubmitVerificationProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const SubmitVerification: FC<SubmitVerificationProps> = (props) => {
  const { traceOption, theme, projectDetails } = props

  const choosenVerifiers = useAppSelector(
    ({ traceability }) => traceability?.choosenVerifiers,
    shallowEqual
  )

  return (
    <>
      <TitleValue
        title="Date of Project creation :"
        value={moment(projectDetails?.createdAt).format(`DD/MM/YY`)}
        theme={theme}
      />

      <TitleValue
        title="Project Reference ID :"
        value={projectDetails?.uuid}
        theme={theme}
      />
      <TitleValue
        title="Choosen verifiers :"
        value={
          choosenVerifiers && choosenVerifiers.length
            ? choosenVerifiers.toString()
            : '-'
        }
        theme={theme}
      />
      <TitleValue
        title="Status :"
        value={PROJECT_STATUS[traceOption]?.value}
        theme={theme}
      />
    </>
  )
}
export default SubmitVerification
