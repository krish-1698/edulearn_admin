import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import DoubtsInfoTable from './DoubtsInfoTable';

function Doubts({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Doubts"} component={<DoubtsInfoTable/> } />
    </div>
  )
}

export default Doubts