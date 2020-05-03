import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { getLabourerById } from "../api/LabourerApi";
import Weekdays from "./Weekdays";
import { saveLabourer } from "../api/LabourerApi";
import { Card, CardBody } from "reactstrap";

const RecruiterLabourerProfile = props => {
  const token = props.auth.JWToken;
  const id = props.labourerId;
  const [labourer, setLabourer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLabourerById({
      token,
      id
    }).then(response => {
      setLabourer(response.data);
    });
    setIsLoading(false);
  }, [token, id]);

  const changeActiveStatus = async status => {
    let labourerToSend = labourer;
    labourerToSend.isActive = status;
    await saveLabourer({ token, labourer: labourerToSend }).then(response => {
      if (response.status === 200) {
        setLabourer({ ...labourer, isActive: status });
      } else {
        alert("Error: Something went wrong");
      }
    });
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          {isLoading ? (
            <div>... Loading</div>
          ) : (
            <>
              {labourer.isActive ? (
                <div>
                  <div className="alert alert-success" role="alert">
                    Profile is Active
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      changeActiveStatus(false);
                    }}
                  >
                    Dectivate
                  </button>
                </div>
              ) : (
                <div>
                  <div className="alert alert-danger" role="alert">
                    Profile is not Active
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      changeActiveStatus(true);
                    }}
                  >
                    Activate
                  </button>
                </div>
              )}
              <br />
              <h2>{labourer.firstName + " " + labourer.lastName}</h2>
              <div>
                Skills:
                {labourer.skills ? (
                  labourer.skills.map(s => (
                    <div key={s.id} className="badge badge-info">
                      {s.name}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div style={{ opacity: labourer.isActive ? "1" : "0.4" }}>
                <br />
                <div>
                  Safety Rating:{" "}
                  {
                    <StarRatings
                      rating={labourer.safetyRating}
                      starRatedColor="blue"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  }
                </div>
                <div>
                  QualityRating:{" "}
                  {
                    <StarRatings
                      rating={labourer.qualityRating}
                      starRatedColor="blue"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  }
                </div>
                <br />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Personal Id: {labourer.personalId}
                  </li>
                  <li className="list-group-item">Email: {labourer.email}</li>
                  <li className="list-group-item">
                    Address:{" "}
                    {labourer.address +
                      ". " +
                      labourer.city +
                      ". " +
                      labourer.province +
                      ". " +
                      labourer.country}
                  </li>
                  <li className="list-group-item">Phone: {labourer.phone}</li>
                  <li className="list-group-item">
                    Labourer availability:
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
                  </li>
                </ul>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default RecruiterLabourerProfile;
