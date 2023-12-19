import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import UserInfoTable from './userInfoTable';

function Users({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Users"} component={<UserInfoTable/> } />
    </div>
  )
}

export default Users