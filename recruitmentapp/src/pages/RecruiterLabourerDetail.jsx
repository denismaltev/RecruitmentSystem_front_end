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
      {labourer.firstName}
      <div class="card">
        <div class="card-header">
          Name: {labourer.firstName + " " + labourer.lastName}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Personal Id: {labourer.personalId}</li>
          <li class="list-group-item">Email: {labourer.email}</li>
          <li class="list-group-item">
            Address:{" "}
            {labourer.address +
              " " +
              labourer.city +
              " " +
              labourer.province +
              " " +
              labourer.country}
          </li>
          <li class="list-group-item">Phone: {labourer.phone}</li>
          {/* <li class="list-group-item">
            Skills:{" "}
            {labourer.skills.map(s => (
              <div>{s.name}</div>
            ))}
          </li> */}
          <li class="list-group-item">
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
          </li>
          <li class="list-group-item">
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecruiterLabourerDetail;
