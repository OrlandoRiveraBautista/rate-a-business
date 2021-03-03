import React from "react";
import { setCurrentDistance } from "../store/action";
import { connect } from "react-redux";
import { Select } from "antd";

const labelStyle = {
  paddingBottom: "8px",
  lineHeight: "1.5715",
  whiteSpace: "initial",
  textAlign: "left",
  height: "30px",
  fontSize: "14px",
};

function Distance({ setCurrentDistance, distance }) {
  const { Option } = Select;

  const options = [5, 10, 15, 20];
  const renderOptions = () => {
    return options.map((dis) => {
      return (
        <Option value={dis} key={dis}>
          {dis} miles
        </Option>
      );
    });
  };

  const handleDistanceSelect = (distance) => {
    setCurrentDistance(distance);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <div className="" style={labelStyle}>
        <label htmlFor="distanceOptions" title="Choose Distance">
          Choose Distance
        </label>
      </div>
      <div>
        <Select
          defaultValue={5}
          style={{ width: 120 }}
          onChange={handleDistanceSelect}
          value={Math.floor(distance / 1609)}
        >
          {renderOptions()}
        </Select>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { distance: state.currentDistance };
};

export default connect(mapStateToProps, { setCurrentDistance })(Distance);
