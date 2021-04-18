
import './style.scss';

import analysis from 'assets/analysis.svg';
import Card from './Card';

const Analysis = (props) => {
  return (
    <div className="analysis">
      <div className="heading">
        <img src={analysis} alt="sprout icon"/>
        <div className="text">
          <h1>Location Analysis</h1>
          <h2>Realtime data based off current location</h2>
        </div>
      </div>
      <div className="cards">
        <Card title="Soil Temp">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #90F361, #36DDBF)'
            }}
          >{props.analysis.soilTemp ? props.analysis.soilTemp + '°' : 'N/A'}</h1>
          <p>Fahrenheit</p>
        </Card>
        <Card title="Soil Moisture">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #4091DC, #064987)'
            }}
          >{props.analysis.soilMoisture ? props.analysis.soilMoisture + '%': 'N/A'}</h1>
          <p>Volumetric Pressure</p>
        </Card>
        <Card title="Water Vapor">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #7DBDF9, #4091DC)'
            }}>{props.analysis.waterVapor || 'N/A'}</h1>
          <p>Relative Humidity</p>
        </Card>
        <Card title="Fire Risk">
          <h1>🔥</h1>
          <h2 style={{
            backgroundImage: 'linear-gradient(to bottom, #DC4040, #E3B744)'
          }}>{props.analysis.fire || 'N/A'}</h2>
        </Card>
        <Card title="Pollen">
          <h1>🌿</h1>
          <h2 style={{
            backgroundImage: 'linear-gradient(to bottom, #6FE09F, #27AE60)'
          }}>{props.analysis.pollen || 'N/A'}</h2>
        </Card>
      </div>
    </div>
  )
}

export default Analysis;