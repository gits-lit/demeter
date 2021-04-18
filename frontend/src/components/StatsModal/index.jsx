import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

import CropRotation from '../Statistics/CropRotation';
import EstimatedFinancials from '../Statistics/EstimatedFinancials';
import EnvironmentalStrain from '../Statistics/EnvironmentalStrain';
import FarmBreakdown from '../Statistics/FarmBreakdown';

import title from '../../assets/harveststats.svg';
import './style.scss';

const StatsModal = (props) => {
  const [bounds, setBounds] = useState({
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  });

  let draggleRef = React.createRef();

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  return (
    <div className="StatsModal">
      <Modal
        className="Modal"
        style={{ top: 30 }}
        visible={props.visible}
        onCancel={props.setModal}
        onOk={props.setModal}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={false}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <img className="title" src={title} alt="title" />
        <div className="tstats-container">
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>

          <FarmBreakdown />
        </div>
        <div className="bstats-container">
          <CropRotation />
          <EstimatedFinancials />
          <EnvironmentalStrain />
        </div>
      </Modal>
    </div>
  );
};

export default StatsModal;
