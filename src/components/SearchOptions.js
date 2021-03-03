import React from "react";
import Distance from "./Distance";
import PickType from "./PickType";
import { Row, Space } from "antd";

export default function SearchOptions() {
  return (
    <Space>
      <PickType />
      <Distance />
    </Space>
  );
}
