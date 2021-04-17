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
  const height = props.create ? '30vh' : '95vh';
  const bottom = props.create ? '51.5vh' : '0vh';
  const bottomtwo = props.create ? '-39.5vh' : '0vh';
  const radius = props.create ? '5px' : '0';
  const right = props.create ? '2vw' : '0';
  const width = props.create ? '63vw' : '100vw';

  const onMapLoad = (map) => {
    window.map = map;
  };

  const onMapClick = (map) => {
    window.map = map;
  }

  return (
    <div style={{
      position: 'absolute',
      right: right,
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