import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { getLabourerById } from "../api/LabourerApi";
import Weekdays from "./Weekdays";
import { saveLabourer } from "../api/LabourerApi";
import { Card, CardBody, Button } from "reactstrap";

const RecruiterLabourerProfile = (props) => {
  const token = props.auth.JWToken;
  const id = props.labourerId;
  const [labourer, setLabourer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLabourer(props.labourerSelected);
    }
    getLabourerById({
      token,
      id,
    }).then((response) => {
      if (mounted) {
        setLabourer(response.data);
      }
    });
    setIsLoading(false);
    return () => (mounted = false);
  }, [token, id, props.labourerSelected]);

  const changeActiveStatus = (status) => {
    if (!isLoading) {
      setIsLoading(true);
      props.changeParentIsActiveStatusOfLabourer(labourer, status); // change button on parent page
      let labourerToSend = labourer;
      labourerToSend.isActive = status;
      saveLabourer({ token, labourer: labourerToSend }).then((response) => {
        if (response.status === 200) {
          setLabourer({ ...labourer, isActive: status });
          setIsLoading(false);
        } else {
          console.log("Error: Something went wrong");
        }
      });
    }
  };

  return (
    <Card className="card-user">
      <CardBody>
        <div className="author">
          <div style={{ opacity: labourer.isActive ? "1" : "0.4" }}>
            {labourer.isActive ? (
              <a href="/" onClick={(e) => e.preventDefault()}>
                <h5 className="title">
                  {labourer?.firstName || ""} {labourer?.lastName || ""}
                </h5>
              </a>
            ) : (
              <h5 className="title" style={{ margin: 0, color: "grey" }}>
                {labourer?.firstName || ""} {labourer?.lastName || ""}
              </h5>
            )}
            <p className="description">{labourer?.email || ""}</p>
            <p className="description">{labourer?.phone || ""}</p>
            <p className="description">
              Address:{" "}
              {labourer.address +
                ". " +
                labourer.city +
                ". " +
                labourer.province +
                ". " +
                labourer.country}
            </p>
            <div className="description">
              Safety Rating:{" "}
              {
                <StarRatings
                  rating={labourer.safetyRating || 0}
                  starRatedColor="#ffb236"
                  starDimension="25px"
                  starSpacing="1px"
                  numberOfStars={5}
                  name="rating"
                />
              }
            </div>
            <div className="description">
              QualityRating:{" "}
              {
                <StarRatings
                  rating={labourer.qualityRating || 0}
                  starRatedColor="#ffb236"
                  starDimension="25px"
                  starSpacing="1px"
                  numberOfStars={5}
                  name="rating"
                />
              }
            </div>
            <p className="description"></p>
            <p className="description">
              Skills:
              {labourer?.skills &&
                labourer.skills.map((skill, index) => (
                  <span
                    key={index}
                    color="info"
                    className="m-1 badge badge-info"
                  >
                    {skill.name}
                  </span>
                ))}
            </p>
            <div className="description">
              Availability:
              <br />
              <Weekdays
                days={{
                  mon: labourer.monday || false,
                  tue: labourer.tuesday || false,
                  wed: labourer.wednesday || false,
                  thu: labourer.thursday || false,
                  fri: labourer.friday || false,
                  sat: labourer.saturday || false,
                  sun: labourer.sunday || false,
                }}
              />
            </div>
          </div>
          {labourer.isActive ? (
            <Button
              className="btn btn-success"
              size="sm"
              width="10px"
              onClick={() => {
                changeActiveStatus(false);
              }}
            >
              Active
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                changeActiveStatus(true);
              }}
            >
              Inactive
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecruiterLabourerProfile;
