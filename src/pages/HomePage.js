import React, { useEffect } from "react";
import { setCurrentLocation } from "../store/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";

import Loading from "../components/Loading/Loading";
import Rating from "../components/Rating";
import BusinessListing from "../components/BusinessListing";
import SearchOptions from "../components/SearchOptions";

function HomePage({ setCurrentLocation, currentLocation }) {
  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(latitude, longitude);
        },
        (failure) => {
          console.log(failure);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <Col span={24}>
      <Row>
        <SearchOptions />
      </Row>
      {currentLocation !== null ? <BusinessListing /> : <Loading />} <Rating />
    </Col>
  );
}

const mapStateToProps = (state) => {
  return { currentLocation: state.currentLocation };
};

export default connect(mapStateToProps, { setCurrentLocation })(HomePage);
