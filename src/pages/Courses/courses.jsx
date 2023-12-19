import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import CourseInfoTable from './courseInfoTable';

function Courses({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Courses"} component={<CourseInfoTable/> } />
    </div>
  )
}

export default Courses