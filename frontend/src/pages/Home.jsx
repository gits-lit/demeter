/* eslint-disable */
import { useEffect, useState } from 'react';

import Map from 'components/Map';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import StatsModal from 'components/StatsModal';

import CurrentlySelected from 'components/CurrentlySelected';
import Seasons from 'components/Seasons';
import Timeline from 'components/Timeline';

import Analysis from 'components/Analysis';
import PlotType from 'components/PlotType';
import BigCurrentlySelected from 'components/BigCurrentlySelected';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');
  const [currentPlot, setCurrentPlot] = useState({});
  const [plots, setPlotOptions] = useState([]);
  const [visible, setModal] = useState(true);

  const flipModal = () => {
    setModal(!visible);
  };

  const [draw, setDraw] = useState(null);
  const [analysis, setAnalysis] = useState({});

  useEffect(async () => {
    const response = await fetch(
      'https://demeter-api-iowa.herokuapp.com/data/earth',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log(data);
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    setPlotOptions(data);
  }, []);

  return (
    <div>
      <StatsModal visible={visible} setModal={flipModal} />
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage} setModal={flipModal} />
      <Map
        setCurrentPlot={setCurrentPlot}
        currentPlot={currentPlot}
        draw={draw}
        sideBarPage={sideBarPage}
        setDraw={setDraw}
        setAnalysis={setAnalysis}
      />
      <Timeline />
      <CurrentlySelected currentPlot={currentPlot} />
      <Seasons />
      <PlotType draw={draw} plots={plots} setCurrentPlot={setCurrentPlot}/>
      <BigCurrentlySelected currentPlot={currentPlot}/>
      <Analysis analysis={analysis}/>
    </div>
  );
};

export default HomePage;
