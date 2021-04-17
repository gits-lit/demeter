//import { useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

import './style.scss';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw',
  animationOptions: {
    essential: true
  },
  pitchWithRotate: false
});

const MapComponent = (props) => {
  console.log(props.sideBarPage);
  const height = (props.sideBarPage !== 'map') ? '70vh' : '95vh';
  const bottom = (props.sideBarPage !== 'map') ? '11vh' : '0vh';
  const bottomtwo = (props.sideBarPage !== 'map') ? '0vh' : '0vh';
  const radius = (props.sideBarPage !== 'map') ? '6px' : '0';
  const left = (props.sideBarPage !== 'map') ? '6vw' : '5vw';
  const width = (props.sideBarPage !== 'map') ? '45vw' : '100vw';

  const onMapLoad = (map) => {
    window.map = map;
  };

  const onMapClick = (map) => {
    window.map = map;
  }

  return (
    <div style={{
      position: 'absolute',
      left: left,
      height: height,
      transition: '1s',
      overflow: 'hidden',
      width: width,
      bottom: bottom,
      borderRadius: radius,
    }}>
    <Map
      antialias={false}
      containerStyle={{
        borderRadius: radius,
        bottom: bottomtwo,
        height: '92vh',
        right: '0',
        overflow: 'hidden',
        position: 'absolute',
        transition: '1s',
        width: '100vw',
      }}
      center={[-92.0717042, 42.0434796]}
      flyToOptions={{
        speed: 0
      }}
      onClick={onMapClick}
      onStyleLoad={onMapLoad}
      pitch = {[0]}
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/satellite-v9"
      zoom = {[13]}
    >
    </Map>
    </div>
  );
}

export default MapComponent;