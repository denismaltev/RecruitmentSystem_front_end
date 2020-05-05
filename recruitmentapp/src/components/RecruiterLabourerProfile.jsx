import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { getLabourerById } from "../api/LabourerApi";
import Weekdays from "./Weekdays";
import { saveLabourer } from "../api/LabourerApi";
import { Card, CardBody, Button } from "reactstrap";

const RecruiterLabourerProfile = props => {
  const token = props.auth.JWToken;
  const id = props.labourerId;
  const [labourer, setLabourer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getLabourerById({
      token,
      id
    }).then(response => {
      setLabourer(response.data);
    });
    setIsLoading(false);
  }, [token, id]);

  const warningMessage = () => {
    setErrorMessage(
      "You can't deactivate the labourer who has at least 1 upcoming job."
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const changeActiveStatus = async status => {
    // if laboreur has at least 1 upcomming job
    if (props.numberOfUpcomingJobs > 0 && status === false) {
      warningMessage();
    } else {
      let labourerToSend = labourer;
      labourerToSend.isActive = status;
      await saveLabourer({ token, labourer: labourerToSend }).then(response => {
        if (response.status === 200) {
          setLabourer({ ...labourer, isActive: status });
        } else {
          alert("Error: Something went wrong");
        }
      });
    }
  };

  return (
    <Card className="card-user">
      <CardBody>
        {isLoading ? (
          <div>... Loading</div>
        ) : (
          <div className="author">
            {/* {labourer.isActive ? (
              <div >
                <div className="alert alert-success" role="alert">
                  Profile is Active
                </div>
                {errorMessage ? (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                ) : (
                  <></>
                )} */}
            {/* <div className="alert alert-danger" role="alert">
              Profile is not Active
            </div> */}

            {/* <br /> */}
            <div style={{ opacity: labourer.isActive ? "1" : "0.4" }}>
              <a href="#" onClick={e => e.preventDefault()}>
                <h5 className="title">
                  {labourer?.firstName || ""} {labourer?.lastName || ""}
                </h5>
              </a>
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
                    sun: labourer.sunday || false
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
        )}
      </CardBody>
    </Card>
  );
};

export default RecruiterLabourerProfile;
