import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { updateLabourerJobRating } from "../api/labourerJobApi";
import ReactTooltip from "react-tooltip";

const SafetyReportItem = (props) => {
  const [item, setItem] = useState(props.item);
  const [safetyRating, setSafetyRating] = useState(props.item.safetyRating);

  useEffect(() => {
    setItem(props.item);
    setSafetyRating(props.item.safetyRating);
  }, [props.item]);

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
  var today = new Date();
  var fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  return (
    <tr>
      <td>{item.labourerFullName}</td>
      <td>{item.labourerPhone}</td>
      <td>{item.jobTitle}</td>
      <td>{item.skillName}</td>
      <td>{new Date(item.date).toLocaleDateString()}</td>
      {new Date(item.date.toString()) < fourteenDaysAgo ||
      new Date(item.date.toString()) > today ? (
        <td>
          <span data-tip="You are not allowed to rate the job after 2 weeks or before it is done">
            <StarRatings
              rating={safetyRating || 0}
              starRatedColor="#2CA8FF"
              numberOfStars={5}
              name="safetyRating"
              starDimension="25px"
              starSpacing="1px"
            />
          </span>
          <ReactTooltip />
        </td>
      ) : (
        <td>
          <StarRatings
            rating={safetyRating || 0}
            starRatedColor="#2CA8FF"
            numberOfStars={5}
            name="safetyRating"
            starDimension="25px"
            starSpacing="1px"
            changeRating={(newRating) => changeRating(item, newRating)}
          />
        </td>
      )}
    </tr>
  );
};

export default SafetyReportItem;
