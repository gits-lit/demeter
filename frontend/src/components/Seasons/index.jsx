import { useState } from 'react';

import './style.scss';

import cloudy from 'assets/cloudy.svg';
import raining from 'assets/raining.svg';
import sunny from 'assets/sunny.svg';

const Seasons = () => {
  const [allWeather, setWeather] = useState([
    {
      avgTemp: '90',
      date: 'April 18',
      weather: 'cloudy'
    },
    {
      avgTemp: '90',
      date: 'April 19',
      weather: 'rainy'
    },
    {
      avgTemp: '90',
      date: 'April 20',
      weather: 'cloudy'
    },
    {
      avgTemp: '90',
      date: 'April 21',
      weather: 'sunny'
    },
    {
      avgTemp: '90',
      date: 'April 22',
      weather: 'cloudy'
    }
  ])

  return (
    <div
      className="seasons"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(39, 174, 96, 1) 60%, rgba(178, 178, 178, 0)), url('seasons.png')`
      }}
    >
      <div className="season">
        <h2>Season</h2>
        <h1>Spring 2021</h1>
      </div>
      <div className="temperature">
        <h2>Temp</h2>
        <h1>92°/63°</h1>
      </div>
      <div className="weather">
        {
          allWeather.map((entry) => {
            let currWeather = sunny;
            if (entry.weather === 'cloudy') {
              currWeather = cloudy;
            } else if (entry.weather === 'raining') {
              currWeather = raining;
            }
            return (
              <div className="weather-entry">
                <img src={currWeather} alt="current weather"/>
                <div className="text">
                  <h1>{entry.avgTemp}</h1>
                  <h2>{entry.date}</h2>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Seasons