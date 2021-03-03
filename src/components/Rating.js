import React from "react";
import User from "./User";

import { StarOutlined } from "@ant-design/icons";

const renderStars = (ratingValue) => {
  const stars = [1, 2, 3, 4, 5].map((rating) => {
    return (
      <div>
        <StarOutlined
          color={`${rating <= ratingValue ? "secondary" : "action"}`}
        />
      </div>
    );
  });
  return stars;
};

export default function Rating({ ratings }) {
  return (
    <div>
      {ratings && ratings.length > 0 ? (
        ratings.map((value) => {
          renderStars(value.rating);
        })
      ) : (
        <h1>something here</h1>
      )}
    </div>
  );
}
