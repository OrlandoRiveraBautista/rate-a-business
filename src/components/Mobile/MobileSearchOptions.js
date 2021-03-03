import React from "react";
import Distance from "../Distance";
import MobileSelectType from "./MobileSelectType";
import { Space } from "antd";

export default function SearchOptions() {
  return (
    <Space size={24}>
      <MobileSelectType />
      <Distance />
    </Space>
  );
}
