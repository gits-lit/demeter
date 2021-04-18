import { useState } from 'react';

import Map from 'components/Map';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

import CurrentlySelected from 'components/CurrentlySelected';
import Seasons from 'components/Seasons';
import Timeline from 'components/Timeline';
import PlotType from 'components/PlotType';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');

  // State in case we store these to backend later.
  const [plots, setPlotOptions] = useState([
    {
      type: 'crop',
      name: 'Strawberry',
      earthScore: '86',
      state: 'Summer',
      image: 'https://i.imgur.com/u0rOCBQ.png'
    },
    {
      type: 'crop',
      name: 'Corn',
      earthScore: '72',
      state: 'Fall',
      image: 'https://i.imgur.com/Fm1Svvq.png'
    },
    {
      type: 'irrigation',
      name: 'Drip',
      earthScore: '51',
      state: 'Medium',
      image: 'https://i.imgur.com/tdBE8nd.png'
    },
    {
      type: 'irrigation',
      name: 'Drip',
      earthScore: '51',
      state: 'Medium',
      image: 'https://i.imgur.com/tdBE8nd.png'
    },
  ])

  return (
    <div>
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage}/>
      <Map sideBarPage={sideBarPage}/>
      <Timeline />
      <CurrentlySelected />
      <Seasons />
      <PlotType plots={plots}/>
    </div>
  )
}

export default HomePage;