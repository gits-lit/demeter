import { useEffect, useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawRectangle, {
  DrawStyles
} from "mapbox-gl-draw-rectangle-restrict-area";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawControl from "react-mapbox-draw-rectangle";

import { loadLocation } from './utils.js';
import './style.scss';


let color = 'rgba(64, 145, 220, 1)';
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

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

  useEffect(() => {
    if (props.currentPlot && props.currentPlot.type === 'crop') { 
      if (props.currentPlot.state === 'Spring' || props.currentPlot.state === 'Summer') {
        color = 'rgba(39, 174, 96, 1)';
      } else {
        color = 'rgba(237, 193, 81, 1)';
      }
    } else {
      color = 'rgba(64, 145, 220, 1)';
    }
  }, [props.currentPlot])

  const onDrawCreate = ({ features }) => {
    console.log(features);
    if (features.length >= 1) {
      let maxLat = -1;
      let maxLng = -1;
      let minLat = 1000;
      let minLng = 1000;
      for (let i = 0; i < features[0].geometry.coordinates[0].length; i++) {
        maxLat = Math.max(Math.abs(features[0].geometry.coordinates[0][i][0]), maxLat);
        maxLng = Math.max(Math.abs(features[0].geometry.coordinates[0][i][1]), maxLng);
        minLat = Math.min(Math.abs(features[0].geometry.coordinates[0][i][0]), minLat);
        minLng = Math.min(Math.abs(features[0].geometry.coordinates[0][i][1]), minLng);
      }
      const width = measure(0, maxLat, 0, minLat);
      const length = measure(maxLng, 0, minLng, 0);

      let centerLat = (maxLat + minLat) / 2;
      let centerLng = (maxLng + minLng) / 2;
      if (features[0].geometry.coordinates[0][0][0] < 0) {
        centerLat = -centerLat;
      }
      if (features[0].geometry.coordinates[0][0][1] < 0) {
        centerLng = -centerLng;
      }
      
      if (window.map) {
        console.log(features[0].id)
        loadLocation(window.map, centerLat, centerLng, features[0].id, width, length, color)
      }

      if (ourDraw && features[0].id) {
        const currentId = features[0].id;
        setTimeout(() => {
          ourDraw.draw.delete(currentId)
        }, 3000);
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