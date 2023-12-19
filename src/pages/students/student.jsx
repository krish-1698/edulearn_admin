import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import StudentInfoTable from './studentInfoTable';

function Student({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Students"} component={<StudentInfoTable/> } />
    </div>
  )
}

export default Student