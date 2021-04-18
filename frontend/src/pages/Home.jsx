import { useEffect, useState } from 'react';

import Map from 'components/Map';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

import CurrentlySelected from 'components/CurrentlySelected';
import Seasons from 'components/Seasons';
import Timeline from 'components/Timeline';

import PlotType from 'components/PlotType';
import BigCurrentlySelected from 'components/BigCurrentlySelected';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');
  const [currentPlot, setCurrentPlot] = useState({});
  const [plots, setPlotOptions] = useState([]);

  useEffect(async () => {
    const response = await fetch('http://fb627db2a1e8.ngrok.io/data/earth', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    setPlotOptions([]);
  }, [])

  return (
    <div>
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage}/>
      <Map sideBarPage={sideBarPage}/>
      <Timeline />
      <CurrentlySelected currentPlot={currentPlot}/>
      <Seasons />
      <PlotType plots={plots} setCurrentPlot={setCurrentPlot}/>
      <BigCurrentlySelected currentPlot={currentPlot}/>
    </div>
  )
}

export default HomePage;