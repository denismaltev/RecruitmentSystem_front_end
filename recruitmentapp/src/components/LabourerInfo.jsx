import React from "react";
import { Card, CardBody } from "reactstrap";
import StarRatings from "react-star-ratings";
import Weekdays from "./Weekdays";

const LabourerInfo = props => {
  return (
    <Card className="card-user">
      <CardBody>
        <div className="author">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <h5 className="title">
              {props.labourer?.firstName || ""} {props.labourer?.lastName || ""}
            </h5>
          </a>
          <p className="description">{props.labourer?.email || ""}</p>
          <p className="description">{props.labourer?.phone || ""}</p>
          <div className="description">
            Safety rating:
            <StarRatings
              rating={props.labourer?.safetyRating || 0}
              starRatedColor="#ffb236"
              starDimension="25px"
              starSpacing="1px"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div className="description">
            Quality rating:
            <StarRatings
              rating={props.labourer?.qualityRating || 0}
              starRatedColor="#ffb236"
              starDimension="25px"
              starSpacing="1px"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <p className="description"></p>
          <p className="description">
            Skills:
            {props.labourer?.skills &&
              props.labourer.skills.map((skill, index) => (
                <span key={index} color="info" className="m-1 badge badge-info">
                  {skill.name}
                </span>
              ))}
          </p>
          <p className="description">
            Availability:
            <Weekdays
              days={{
                mon: props.labourer.monday,
                tue: props.labourer.tuesday,
                wed: props.labourer.wednesday,
                thu: props.labourer.thursday,
                fri: props.labourer.friday,
                sat: props.labourer.saturday,
                sun: props.labourer.sunday,
              }} 
            />
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default LabourerInfo;
