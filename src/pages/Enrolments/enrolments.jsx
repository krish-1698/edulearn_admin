import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import EnrolmentInfoTable from './enrolmentInfoTable';

function Enrolments({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Enrolments"} component={<EnrolmentInfoTable/> } />
    </div>
  )
}

export default Enrolments