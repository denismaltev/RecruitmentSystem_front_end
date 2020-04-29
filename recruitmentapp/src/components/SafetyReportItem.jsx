import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { updateLabourerJobRating } from "../api/labourerJobApi";

const SafetyReportItem = (props) => {
  const [item, setItem] = useState(props.item);
  const [safetyRating, setSafetyRating] = useState(props.item.safetyRating);
  const changeRating = (item, newRating) => {
    setSafetyRating(newRating);
    item.safetyRating = newRating;
    setItem(item);
    updateLabourerJobRating({
      token: props.auth.JWToken,
      labourerJobId: item.id,
      safetyRating: newRating,
    })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <tr>
      <td>{item.labourerFullName}</td>
      <td>{item.labourerPhone}</td>
      <td>{item.jobTitle}</td>
      <td>{item.skillName}</td>
      <td>{new Date(item.date).toLocaleDateString()}</td>
      <td>
        <StarRatings
          rating={safetyRating || 0}
          starRatedColor="blue"
          numberOfStars={5}
          name="safetyRating"
          changeRating={(newRating) => changeRating(item, newRating)}
        />
      </td>
    </tr>
  );
};

export default SafetyReportItem;
