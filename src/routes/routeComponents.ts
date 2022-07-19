import { ROLES } from '../config/roles.config'
import DashboardPage from '../pages/DashboardPage/DashboardPage'

import { linkLabels, pathNames } from './pathNames'

export const privateRouteComponents = [
    {
        path: pathNames.DASHBOARD,
        component: DashboardPage,

        sidebarName: linkLabels.Projects,
        roles: [ROLES.ISSUER],
    },
]
