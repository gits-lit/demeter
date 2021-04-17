import { useState } from 'react';

import Map from 'components/Map';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

import CurrentlySelected from 'components/CurrentlySelected';
import Timeline from 'components/Timeline';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');

  return (
    <div>
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage}/>
      <Map sideBarPage={sideBarPage}/>
      <Timeline />
      <CurrentlySelected />
    </div>
  )
}

export default HomePage;