import React from 'react'
import { ProjectsPageProps } from './ProjectsPage.interface'
import ProjectsComp from '../../../components/Projects'
import LoadWallet from '../../../components/LoadWallet'
import VerifierProjects from '../../../components/VerifierProjects'
import { getLocalItem } from '../../../utils/Storage'
const ProjectsPage = (props: ProjectsPageProps) => {
  const userDetails = getLocalItem('userDetails')

  if (userDetails?.type === 'ISSUER') {
    return (
      <>
        <LoadWallet /> <ProjectsComp />
      </>
    )
  } else if (userDetails?.type === 'VERIFIER') {
    return (
      <>
        <LoadWallet /> <VerifierProjects />
      </>
    )
  }
}

export default ProjectsPage
