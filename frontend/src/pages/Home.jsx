import { useState } from 'react';

import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import Map from 'components/Map';

import Timeline from 'components/Timeline';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');

  return (
    <div>
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage}/>
      <Map sideBarPage={sideBarPage}/>
      <Timeline />
    </div>
  )
}

export default HomePage;