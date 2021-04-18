import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

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

      </Modal>
    </div>
  );
};

export default StatsModal;
