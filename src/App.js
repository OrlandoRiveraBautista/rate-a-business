import "./App.less";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentLocation } from "./store/action";
import { Row } from "antd";

import Header from "./components/Header";
import Map from "./components/Map";
import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import Loading from "./components/Loading/Loading";
import MobileHomePage from "./pages/Mobile/MobileHomePage";

const containerStyle = {
  height: "calc(100vh - 100px)",
};

function App({ setCurrentLocation, currentLocation }) {
  const [isMobileDevice, setIsMobileDevice] = useState(null);

  // Checking for Mobile Device
  const getDevice = () => {
    if (window.innerWidth < 768) {
      setIsMobileDevice(true);
    } else {
      setIsMobileDevice(false);
    }
  };

  window.onresize = () => {
    getDevice();
  };

  window.onload = () => {
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

    getDevice();
  };

  return (
    <main>
      <Header />
      <div style={containerStyle}>
        <Row
          style={{
            height: "60%",
            padding: "6px 18px 6px 18px",
            overflow: "auto",
          }}
        >
          <Router>
            <Route
              exact
              path="/"
              component={isMobileDevice ? MobileHomePage : HomePage}
            />
            <Route exact path="/:reference" component={BusinessPage} />
          </Router>
        </Row>
        <Row style={{ height: "40%" }}>
          {currentLocation !== null ? <Map /> : <Loading />}{" "}
          {/* Loading Map on top level to prevent unnessary loading */}
        </Row>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return { currentLocation: state.currentLocation };
};

export default connect(mapStateToProps, { setCurrentLocation })(App);
