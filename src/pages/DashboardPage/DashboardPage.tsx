import React from 'react'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { DashboardPageProps } from './DashboardPage.interface'

const DashboardPage = (props: DashboardPageProps) => {
    return (
        <div>
            <Welcome />
        </div>
    )
}

export default DashboardPage
