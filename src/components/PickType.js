import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentBusinessType } from "../store/action";
import { Form, Radio } from "antd";

import Loading from "./Loading/Loading";

function PickType({ setCurrentBusinessType, businessType }) {
  const [form] = Form.useForm();

  const processName = (businessType) => {
    const name = businessType
      .split("_")
      .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
      .join(" ");
    return name;
  };

  const options = [
    "restaurant",
    "gas_station",
    "cafe",
    "book_store",
    "mavie_theater",
    "primary_school",
    "shoe_store",
  ];

  const onRequestTypeChange = ({ requestType }) => {
    setCurrentBusinessType(requestType);
  };

  const onLoad = () => {
    // Making restaurant the default once it loads
    setCurrentBusinessType("restaurant");
  };

  const renderOptions = () => {
    // Mapped options for data
    return options.map((type) => {
      const name = processName(type);
      return (
        <Radio.Button value={type} key={name}>
          {name}
        </Radio.Button>
      );
    });
  };

  const renderTypePicker = () => {
    // UI render
    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={"restaurant"}
        onValuesChange={onRequestTypeChange}
        businesstype={businessType}
        onLoad={onLoad}
      >
        <Form.Item label="Choose Business Type" name="requestType">
          <Radio.Group defaultValue={businessType} buttonStyle="solid">
            {renderOptions()}
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  };

  return <div>{businessType ? renderTypePicker() : <Loading />} </div>;
}

const mapStateToProps = (state) => {
  return {
    businessType: state.currentBusinessType,
  };
};

export default connect(mapStateToProps, { setCurrentBusinessType })(PickType);
