import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ReportInfo from './reportInfo';

function Report({userType}) {
  return (
    <div>
        <Sidebar userType={userType} title={"Reports"} component={<ReportInfo/>} />
    </div>
  )
}

export default Report