import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentLocation } from "../../store/action";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";

import MobileSearchOptions from "../../components/Mobile/MobileSearchOptions";
import Loading from "../../components/Loading/Loading";
import MobileBusinessListing from "../../components/Mobile/MobileBusinessListing";

function MobileHomePage({ setCurrentLocation, currentLocation }) {
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
        <MobileSearchOptions />
      </Row>
      {currentLocation !== null ? <MobileBusinessListing /> : <Loading />}{" "}
      <Link exact to="/something">
        <Button type={"primary"}>Send me to BusinessPage</Button>
      </Link>
    </Col>
  );
}

const mapStateToProps = (state) => {
  return { currentLocation: state.currentLocation };
};

export default connect(mapStateToProps, { setCurrentLocation })(MobileHomePage);
