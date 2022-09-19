import React from 'react'
import { ProjectsPageProps } from './ProjectsPage.interface'
import ProjectsComp from '../../../components/Projects'
import LoadWallet from '../../../components/LoadWallet'
import VerifierProjects from '../../../components/VerifierProjects'
import { getLocalItem } from '../../../utils/Storage'
import { ROLES } from '../../../config/roles.config'
const ProjectsPage = (props: ProjectsPageProps) => {
  const userDetails = getLocalItem('userDetails')

  // console.log('jwtToken')
  // console.log(JSON.stringify(getLocalItem('userDetails')?.jwtToken, null, 4))

  return (
    <>
      <LoadWallet />
      {userDetails?.type === ROLES.ISSUER && <ProjectsComp />}

      {userDetails?.type === ROLES.VERIFIER && <VerifierProjects />}
    </>
  )
}

export default ProjectsPage
