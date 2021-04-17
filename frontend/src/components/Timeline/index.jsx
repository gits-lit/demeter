import { Slider } from 'antd';

import './style.scss';
import timer from 'assets/timer.svg';

const marks = {
  0: {
    label: <p className="label">Spring</p>,
  },
  33: {
    label: <p className="label">Summer</p>,
  },
  66: {
    label: <p className="label">Fall</p>,
  },
  100: {
    label: <p className="label">Winter</p>,
  },
};


const Timeline = () => {
  return (
    <div className="timeline">
      <div className="info">
        <img src={timer} alt="timer icon"/>
        <div className="text">
          <h1>Timeline</h1>
          <h2>Over Seasons</h2>
        </div>
      </div>
      <div className="slider">
       <Slider defaultValue={0} marks={marks} tooltipVisible={false} />
      </div>
    </div>
  )
}

export default Timeline;