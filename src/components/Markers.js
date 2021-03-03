import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { connect } from "react-redux";
import { Avatar, Typography } from "antd";

function Markers({ businesses }) {
  const [selected, setSelected] = useState(null);

  const renderMarkers = () => {
    if (!businesses) return;

    return businesses.map((business) => {
      const { lat, lng } = business.geometry.location;
      const { place_id } = business;

      return (
        <Marker
          key={place_id}
          onClick={() => setSelected(business)}
          position={{ lat: lat(), lng: lng() }}
        />
      );
    });
  };

  const renderInfoWindow = () => {
    return (
      <InfoWindow
        position={{
          lat: selected.geometry.location.lat(),
          lng: selected.geometry.location.lng(),
        }}
        onCloseClick={() => setSelected(null)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            size="large"
            src={
              selected.photos && selected.photos.length > 0
                ? selected.photos[0].getUrl()
                : ""
            }
          ></Avatar>
          <Typography
            variant="body2"
            style={{ margin: "15px 0", fontWeight: "bold" }}
          >
            {selected.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {selected.vicinity}
          </Typography>{" "}
        </div>
      </InfoWindow>
    );
  };
  return (
    <React.Fragment>
      {businesses ? renderMarkers() : null}
      {selected ? renderInfoWindow() : null}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    businesses: state.businesses,
  };
};

export default connect(mapStateToProps, {})(Markers);
