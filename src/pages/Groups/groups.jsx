import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import GroupInfoTable from './groupsInfoTable';

function Groups({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Groups"} component={<GroupInfoTable/> } />
    </div>
  )
}

export default Groups