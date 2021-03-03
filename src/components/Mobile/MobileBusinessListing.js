import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  Space,
  Descriptions,
  Tag,
  Typography,
} from "antd";
import { StarTwoTone } from "@ant-design/icons";

import Loading from "../Loading/Loading";

const rowStyle = {
  marginBottom: "12px",
};

const imageStyle = {
  borderRadius: ".5em",
  maxHeight: "200px",
};

const { Text } = Typography;

function MobileBusinessListing({ businesses }) {
  const renderBusinessListing = () => {
    if (businesses) {
      // Maping them individually
      return businesses.map((business) => {
        // process business type property: ex: gas_station => Gas Station
        const type = business.types.length
          ? business.types[0]
              .split("_")
              .map((word) => word[0].toUpperCase() + word.substring(1))
              .join(" ")
          : "";
        // process business image url
        const imgUrl =
          business.photos && business.photos.length
            ? business.photos[0].getUrl()
            : "";

        // building look
        return (
          <Row style={rowStyle} key={`${business.reference}`}>
            <Link to={`/${business.reference}`} style={{ width: "100%" }}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  imgUrl ? (
                    <Image
                      alt={`${business.name} snapshot/`}
                      width={"100%"}
                      src={imgUrl}
                      style={imageStyle}
                    />
                  ) : (
                    <Text
                      type="danger"
                      style={{ textAlign: "center", marginTop: "24px" }}
                    >
                      Image Not Provided
                    </Text>
                  )
                }
              >
                <Col>
                  <Descriptions title={business.name}>
                    <Descriptions.Item>{business.vicinity}</Descriptions.Item>
                    <Descriptions.Item>
                      {business.opening_hours &&
                      business.opening_hours.open_now ? (
                        <Text type="success">Open</Text>
                      ) : (
                        <Text type="danger">Closed</Text>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Rating">
                      <StarTwoTone /> {business.rating}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Tag style={{ float: "right" }} color="blue">
                  {type}
                </Tag>
              </Card>
            </Link>
          </Row>
        );
      });
    }
  };

  return <div>{businesses ? renderBusinessListing() : <Loading />}</div>;
}

const mapStateToProps = (state) => {
  return { businesses: state.businesses };
};

export default connect(mapStateToProps, {})(MobileBusinessListing);
