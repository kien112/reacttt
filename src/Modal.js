import { Button, Modal } from 'antd';
import { useState } from 'react';
const Modals = (props) => {
  
  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        open={props.open}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
export default Modals;