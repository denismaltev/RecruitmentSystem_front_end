import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getLabourerById } from "../api/LabourerApi";
import Weekdays from "../components/Weekdays";
import { saveLabourer } from "../api/LabourerApi";

const RecruiterLabourerDetail = props => {
  const token = props.auth.JWToken;
  const id = props.match.params.id;
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

  const changeActiveStatus = status => {
    let labourerToSend = labourer;
    labourerToSend.isActive = status;
    saveLabourer({ token, labourer: labourerToSend }).then(response => {
      if (response.status === 200) {
        setLabourer({ isActive: status });
      } else {
        alert("Error: Something went wrong");
      }
    });
  };

  return (
    <div className="page-content">
      {isLoading ? (
        <div>... Loading</div>
      ) : (
        <>
          {labourer.isActive ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                changeActiveStatus(false);
              }}
            >
              Dectivate
            </button>
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
                  starDimension="30px"
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
                  starDimension="30px"
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
                Labourer schedule:
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
    </div>
  );
};

export default RecruiterLabourerDetail;
