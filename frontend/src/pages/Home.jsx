/* eslint-disable */
import { useEffect, useState } from 'react';
import anime from 'animejs';

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

let seasonsAnimation, timelineAnimation, currentlySelectedAnimation, analysisAnimation, cardAnimation, cards2Animation;
const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');
  const [currentPlot, setCurrentPlot] = useState({});
  const [plots, setPlotOptions] = useState([]);
  const [visible, setModal] = useState(true);

  const newSetSideBarPage = (sideBarPageParam) => {
    console.log(sideBarPageParam);
    if (sideBarPageParam !== 'map') {
      if (seasonsAnimation) {
        seasonsAnimation.seek(0);
        seasonsAnimation.play();
        seasonsAnimation.finished.then(() => {
          seasonsAnimation.reverse();
        })
      }
      if(analysisAnimation) {
        analysisAnimation.seek(0);
        analysisAnimation.play();
        analysisAnimation.finished.then(() => {
          cardAnimation.play();
          cards2Animation.play();
          analysisAnimation.reverse();
        })
      }
      if (timelineAnimation) {
        timelineAnimation.seek(0);
        timelineAnimation.play();
        timelineAnimation.finished.then(() => {
          timelineAnimation.reverse();
        })
      }
      if (currentlySelectedAnimation) {
        currentlySelectedAnimation.seek(0);
        currentlySelectedAnimation.play();
        currentlySelectedAnimation.finished.then(() => {
          currentlySelectedAnimation.reverse();
        })
      }
    } else {
      if (seasonsAnimation) {
        cardAnimation.seek(0);
        cards2Animation.seek(0);
        seasonsAnimation.seek(1000);
        seasonsAnimation.play();
        seasonsAnimation.finished.then(() => {
          seasonsAnimation.reverse();
        })
      }
      if (timelineAnimation) {
        timelineAnimation.seek(1000);
        timelineAnimation.play();
        timelineAnimation.finished.then(() => {
          timelineAnimation.reverse();
        })
      }
      if (currentlySelectedAnimation) {
        currentlySelectedAnimation.seek(1000);
        currentlySelectedAnimation.play();
        currentlySelectedAnimation.finished.then(() => {
          currentlySelectedAnimation.reverse();
        })
      }
      if (analysisAnimation) {
        analysisAnimation.seek(1000);
        analysisAnimation.play();
        analysisAnimation.finished.then(() => {
          analysisAnimation.reverse();
        })
      }
    }
    setSideBarPage(side => sideBarPageParam);
  }

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

    analysisAnimation = anime({
      targets: '.right-into',
      translateX: -1200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    seasonsAnimation = anime({
      targets: '.seasons',
      translateY: 200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    cardAnimation = anime({
      targets: '.fade-up',
      translateY: -10,
      opacity: 100,
      duration: 1000,
      delay: function(el, i) { return i * 200; },
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
    });

    cards2Animation = anime({
      targets: '.plots .plot',
      translateY: -10,
      opacity: 100,
      duration: 1000,
      delay: function(el, i) { return i * 200; },
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timelineAnimation = anime({
      targets: '.timeline',
      translateY: -200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    currentlySelectedAnimation = anime({
      targets: '.currently-selected',
      translateY: -200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div>
      <StatsModal visible={visible} setModal={flipModal} />
      <NavBar />
      <SideBar setSideBarPage={newSetSideBarPage} setModal={flipModal} />
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
