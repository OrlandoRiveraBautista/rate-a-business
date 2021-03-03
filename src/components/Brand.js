import React from "react";
import { Divider, Button } from "antd";
import Auth from "./Auth";

const brandStyles = {
  marginTop: 0,
};

export default function Brand() {
  return (
    <Divider orientation="left" style={brandStyles}>
      <h1>Rate - A - Business</h1>
      <Auth />
    </Divider>
  );
}
