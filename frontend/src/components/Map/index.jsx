import { useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawRectangle, {
  DrawStyles
} from "mapbox-gl-draw-rectangle-restrict-area";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawControl from "react-mapbox-draw-rectangle";

import './style.scss';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw',
  animationOptions: {
    essential: true
  },
  pitchWithRotate: false
});

let ourDraw = null;
const MapComponent = (props) => {
  const height = (props.sideBarPage !== 'map') ? '70vh' : '95vh';
  const bottom = (props.sideBarPage !== 'map') ? '11vh' : '0vh';
  const bottomtwo = (props.sideBarPage !== 'map') ? '0vh' : '0vh';
  const radius = (props.sideBarPage !== 'map') ? '6px' : '0';
  const left = (props.sideBarPage !== 'map') ? '6vw' : '5vw';
  const width = (props.sideBarPage !== 'map') ? '45vw' : '100vw';
  const right = (props.sideBarPage !== 'map') ? '-25vw' : '0vw';

  const onMapLoad = (map) => {
    window.map = map;
  };

  const onMapClick = (map) => {
    window.map = map;
  }

  const onDrawCreate = ({ features }) => {
    console.log(features);
    if (features.length >= 1) {
      if (ourDraw) {
        const currentId = features[0].id;
        ourDraw.draw.delete(currentId);
      }
    }
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

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
        right: right,
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
      pitch = {[50]}
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/satellite-v9"
      zoom = {[13]}
    >
      <DrawControl
        userProperties={true}
        position={'top-right'}
        displayControlsDefault={false}
        modes={{
          draw_rectangle: DrawRectangle,
        }}
        modesConfig={{
          draw_rectangle: {
            areaLimit: 50 * 1_000_000, // 50+ km2, optional
            escapeKeyStopsDrawing: true, // default true
            allowCreateExceeded: false, // default false
            exceedCallsOnEachMove: false, // default false - calls exceedCallback on each mouse move
            title: "Rectangle tool (p)"
          }
        }}
        ref={(drawControl) => {
          props.setDraw(drawControl);
          ourDraw = drawControl;
         }}
        styles={DrawStyles}
        onDrawCreate={onDrawCreate}
      ></DrawControl>
    </Map>
    </div>
  );
}

export default MapComponent;