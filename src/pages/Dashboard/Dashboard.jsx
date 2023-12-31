import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardData from '../../components/DashboardCountCard/DashboardData';

function Dashboard({userType}) {
  return (
    <div>
        <Sidebar userType={userType} title={"Dashboard"} component={<DashboardData/>} />
    </div>
  )
}

export default Dashboard