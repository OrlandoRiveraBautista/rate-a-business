import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Descriptions, Image, Typography } from "antd";
import { StarTwoTone } from "@ant-design/icons";

import Loading from "./Loading/Loading";
import RatingStars from "./Stars/RatingStars";

const imageStyle = {
  borderRadius: ".5em",
  maxHeight: "250px",
  maxWidth: "600px",
};

const businessInfo = {
  maxWidth: "600px",
  marginRight: "auto",
  marginLeft: "auto",
};

const { Text } = Typography;

function BusinessDetails({ business }) {
  const history = useHistory();
  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    if (!business) return console.log(business);
    // history.push("/");
    setBusinessData(business);
  }, [business]);

  const updateRatings = (newRatings) => {
    let total = 0;
    newRatings.forEach((results) => (total += results.rating));
    const averageRating = (total / newRatings.length).toFixed(1);
    setBusinessData({ ...businessData, ratings: newRatings, averageRating });
  };

  const renderBusinessDetails = () => {
    // process business image url
    const imgUrl =
      businessData.photos && businessData.photos.length
        ? businessData.photos[0].getUrl()
        : "";
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontWeight: "bold" }}>{businessData.name}</h1>

        {imgUrl ? (
          <Image
            alt={`${businessData.name} snapshot/`}
            src={imgUrl}
            style={imageStyle}
          />
        ) : (
          <Text
            type="danger"
            style={{
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            Image Not Provided
          </Text>
        )}
        <div style={businessInfo}>
          <Descriptions layout="vertical">
            <Descriptions.Item label="Address">
              {businessData.vicinity}
            </Descriptions.Item>
            <Descriptions.Item label="Operations">
              {" "}
              {businessData.opening_hours &&
              businessData.opening_hours.open_now ? (
                <Text type="success">Open</Text>
              ) : (
                <Text type="danger">Closed</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Business Rating">
              <StarTwoTone /> {businessData.rating}
            </Descriptions.Item>
            <Descriptions.Item label="Please Leave a Rating">
              {" "}
              {businessData ? (
                <RatingStars
                  business={businessData}
                  updateRatings={updateRatings}
                />
              ) : null}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  };

  return <div>{businessData ? renderBusinessDetails() : <Loading />}</div>;
}

const mapStateToProps = (state, ownProps) => {
  const { reference } = ownProps; // Accessing url params

  if (!state.businesses) return {};

  const businessIndex = state.businesses.findIndex(
    (business) => business.reference === reference
  );

  console.log(businessIndex);

  return {
    business: state.businesses[businessIndex],
  };
};

export default connect(mapStateToProps)(BusinessDetails);
