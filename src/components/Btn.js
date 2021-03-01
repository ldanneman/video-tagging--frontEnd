//  btn component used for buttons
// API details can be found here https://ant.design/components/button/#API

import React from "react";

import { Button } from "antd";

const Btn = ({ text, danger, type, shape, onClick }) => {
  return (
    <Button type={type} danger={danger} shape={shape} onClick={onClick}>
      {text}
    </Button>
  );
};

export default Btn;
