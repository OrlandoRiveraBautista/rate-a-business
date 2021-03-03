import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateBusinesses } from "../store/action";
import { Button, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import Loading from "../components/Loading/Loading";
import BusinessDetails from "../components/BusinessDetails";

function BusinessPage({ businessReference }) {
  const [business, setBusiness] = useState(null);
  const history = useHistory();

  return (
    <div style={{ width: "100%" }}>
      <Link exact to="/">
        <Button type={"text"}>
          <LeftOutlined /> Back
        </Button>
      </Link>
      {businessReference ? (
        <BusinessDetails reference={businessReference} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let { reference } = ownProps.match.params;

  return {
    businessReference: reference,
  };
};

export default connect(mapStateToProps)(BusinessPage);
