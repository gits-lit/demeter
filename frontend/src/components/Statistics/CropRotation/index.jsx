import { Button } from 'antd';
import Plot from '../../Plot';

import redo from '../../../assets/redo.svg';
import './style.scss';

const CropRotation = (props) => {
  return (
    <div className="CropRotation">
      <h3 className="stat-title">Crop Rotations</h3>
      <p className="sub-title">Recommendation based off nutrient levels</p>
      <strong>
        <p>Recommended Rotations</p>
      </strong>
      <div className="resize">
        <Plot type={'crop'} state={'Meow'} />
      </div>
      <h3 style={{ textAlign: 'center' }}>
        <span style={{ marginRight: '8px' }}>
          <img src={redo} alt="redo" />
        </span>
        Rotates To
      </h3>
      <div className="resize">
        <Plot type={'crop'} state={'Meow'} />
      </div>
      <p>
        This rotation can help save 20 metric tonnes of C02 and increase profits
        by 200%.
      </p>
      <div className="buttons">
        <Button className="backward">Back</Button>

        <Button className="forward">Next</Button>
      </div>
    </div>
  );
};

export default CropRotation;
