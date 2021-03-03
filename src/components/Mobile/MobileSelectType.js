import React from "react";
import { setCurrentBusinessType } from "../../store/action";
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

function MobileSelectType({ setCurrentBusinessType, businessType }) {
  const { Option } = Select;

  const options = [
    "restaurant",
    "gas_station",
    "cafe",
    "book_store",
    "mavie_theater",
    "primary_school",
    "shoe_store",
  ];

  const processName = (businessType) => {
    const name = businessType
      .split("_")
      .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
      .join(" ");
    return name;
  };

  const renderMobileOptions = () => {
    return options.map((type) => {
      const name = processName(type);
      return (
        <Option value={type} key={name}>
          {name}
        </Option>
      );
    });
  };

  const onRequestTypeChange = (requestType) => {
    setCurrentBusinessType(requestType);
  };

  const onLoad = () => {
    setCurrentBusinessType("restaurant");
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <div className="" style={labelStyle}>
        <label htmlFor="distanceOptions" title="Choose Business Type">
          Choose Business Type
        </label>
      </div>
      <div>
        <Select
          defaultValue={"Restaurant"}
          style={{ width: 120 }}
          onChange={onRequestTypeChange}
          businesstype={businessType}
          onLoad={onLoad}
          value={businessType}
        >
          {renderMobileOptions()}
        </Select>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    businessType: state.currentBusinessType,
  };
};

export default connect(mapStateToProps, { setCurrentBusinessType })(
  MobileSelectType
);
