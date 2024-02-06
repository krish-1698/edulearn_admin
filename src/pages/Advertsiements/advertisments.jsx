import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import AdvetisementInfoTable from './AdvertisementInfoTable';

function Advertisements({userType}) {


  return (
    <div>
        <Sidebar userType={userType} title={"Advertisements"} component={<AdvetisementInfoTable/> } />
    </div>
  )
}

export default Advertisements