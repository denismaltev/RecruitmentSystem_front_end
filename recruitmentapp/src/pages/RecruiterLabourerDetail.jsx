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
      <Table striped bordered hover>
        <thead className="table-secondary">
          <tr>
            <th scope="col">Full Name:</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody></tbody>
        {/* <td>
            <StarRatings
              rating={labourer.safetyRating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="1px"
            />
          </td>
          <td>
            <StarRatings
              rating={labourer.qualityRating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="1px"
            />
          </td> */}
      </Table>
    </div>
  );
};

export default RecruiterLabourerDetail;
