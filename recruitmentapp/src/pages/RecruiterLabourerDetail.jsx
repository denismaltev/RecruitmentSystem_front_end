import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getLabourerById } from "../api/LabourerApi";

const RecruiterLabourerDetail = props => {
  const [labourer, setLabourer] = useState({});

  useEffect(() => {
    getLabourerById({
      token: props.auth.JWToken,
      id: props.match.params.id
    }).then(response => {
      setLabourer(response.data);
    });
  }, []);
  return (
    <div className="page-content">
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
        <li className="list-group-item">Personal Id: {labourer.personalId}</li>
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
      </ul>
    </div>
  );
};

export default RecruiterLabourerDetail;
