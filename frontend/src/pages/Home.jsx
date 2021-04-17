import { useState } from 'react';

import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import Map from 'components/Map';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');

  return (
    <div>
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage}/>
      <Map sideBarPage={sideBarPage}/>
    </div>
  )
}

export default HomePage;