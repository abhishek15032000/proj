import { Paper } from '@mui/material'
import React, { useState } from 'react'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import ProjectsUnderRegistration from './ProjectUnderRegistration'
import RegisteredProjects from './RegisteredProjects'

const SeeAllProjects = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <>
      <Paper elevation={2} sx={{ pt: 1, px: 2 }}>
        <TabSelector
          tabArray={['New', 'Registered']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          sx={{ marginBottom: 2 }}
        />
        {tabIndex === 1 ? (
          <ProjectsUnderRegistration />
        ) : (
          tabIndex === 2 && <RegisteredProjects />
        )}
      </Paper>
    </>
  )
}

export default SeeAllProjects
