import React, { useState } from "react";
import { Modal, Button } from "antd";

export default ({ state, setState }) => {
  return (
    <>
      <Modal
        title="Respondents"
        centered
        visible={state}
        onOk={() => setState(false)}
        onCancel={() => setState(false)}
      >
      </Modal>
    </>
  );
};
