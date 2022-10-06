import React from 'react'
import { ProjectsPageProps } from './ProjectsPage.interface'
import ProjectsComp from '../../../components/Projects'
import LoadWallet from '../../../components/LoadWallet'
import VerifierProjects from '../../../components/VerifierProjects'
import { getLocalItem } from '../../../utils/Storage'
import BuyerOnboarding from '../../../components/BuyerOnboarding'
import { ROLES } from '../../../config/constants.config'

const ProjectsPage = (props: ProjectsPageProps) => {
  const userDetails = getLocalItem('userDetails')

  return (
    <>
      <LoadWallet />
      {userDetails?.type === ROLES.ISSUER && <ProjectsComp />}
      {userDetails?.type === ROLES.VERIFIER && <VerifierProjects />}
      {userDetails?.type === ROLES.BUYER && <BuyerOnboarding />}
    </>
  )
}

export default ProjectsPage
