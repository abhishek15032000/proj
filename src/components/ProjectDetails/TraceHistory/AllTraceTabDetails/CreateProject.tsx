import React, { FC } from 'react'
import { PROJECT_STATUS } from '../../../../config/constants.config'
import TitleValue from './TitleValue'

interface CreateProjectProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const CreateProject: FC<CreateProjectProps> = (props) => {
  const { traceOption, theme, projectDetails } = props
  console.log(projectDetails)

  return (
    <>
      <TitleValue
        title="Project reference ID"
        value={projectDetails?.uuid}
        theme={theme}
      />
      <TitleValue
        title="Project Name"
        value={projectDetails?.company_name}
        theme={theme}
      />
      <TitleValue
        title="Project location"
        value={projectDetails?.location}
        theme={theme}
      />
      <TitleValue
        title="Status"
        value={PROJECT_STATUS[traceOption]?.value}
        theme={theme}
      />
    </>
  )
}
export default CreateProject
