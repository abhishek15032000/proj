import React from 'react'
import { ProjectsPageProps } from './ProjectsPage.interface'
import ProjectsComp from '../../../components/Projects'
import LoadWallet from '../../../components/LoadWallet'
const ProjectsPage = (props: ProjectsPageProps) => {
  return (
    <>
      <LoadWallet /> <ProjectsComp />
    </>
  )
}

export default ProjectsPage
