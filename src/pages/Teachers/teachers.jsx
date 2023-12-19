import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import TeacherInfoTable from './teacherInfoTable';

function Teacher({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Teachers"} component={<TeacherInfoTable/> } />
    </div>
  )
}

export default Teacher