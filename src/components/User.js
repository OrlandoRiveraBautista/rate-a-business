import React from "react";
import { Avatar } from "antd";

export default function User({ user }) {
  return (
    <div style={{ display: "inline", marginRight: "8px" }}>
      {user ? <Avatar src={user.photoURL} /> : ""}
    </div>
  );
}
