import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { updateBusinesses } from "../store/action";
import { connect } from "react-redux";

import Loading from "./Loading/Loading";
import Markers from "./Markers";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 29.749907,
  lng: -95.358421,
};

const libraries = ["places"];

function Map({
  updateBusinesses,
  currentLocation,
  currentDistance,
  businessType,
}) {
  // Use this to zoom in the map closer to the business that the user chooses
  const [zoom, setZoom] = useState(null);

  //   if (isBusinessSelected) {
  //     googleMapsZoom = 13;
  //   }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey,
    libraries,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setZoom(12);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!currentLocation || !currentDistance || !map) return;
    const callback = (results, status) => {
      if (status === "OK" && updateBusinesses) return updateBusinesses(results);
    };
    // Initiate Google Maps service
    const service = new window.google.maps.places.PlacesService(map);
    // Config to get businesses nearby
    const request = {
      location: new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      ),
      radius: `${currentDistance}`,
      type: [businessType],
    };
    service.nearbySearch(request, callback);
  }, [map, currentLocation, currentDistance, businessType]);

  return isLoaded || zoom ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      onLoad={onLoad}
      onUnmount={onUnmount}
      zoom={zoom}
    >
      <Markers />
    </GoogleMap>
  ) : (
    <Loading />
  );
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation,
    currentDistance: state.currentDistance,
    businessType: state.currentBusinessType,
  };
};

export default connect(mapStateToProps, { updateBusinesses })(Map);
