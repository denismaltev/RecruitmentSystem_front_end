import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllLabourers } from "../api/LabourerApi";
import StarRatings from "react-star-ratings";

export default class RecruiterLabourers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourers: []
    };
    this.getLabourersList = this.getLabourersList.bind(this);
  }

  componentDidMount() {
    this.getLabourersList();
  }

  getLabourersList = async () => {
    const token = this.props.auth.JWToken;
    await getAllLabourers({ token }).then(res => {
      if (res.status === 200) {
        this.setState({ labourers: res.data });
      } else {
        console.log("no response");
      }
    });
  };

  renderTableData() {
    return this.state.labourers.map(labourer => {
      return (
        <tr key={labourer.id}>
          <th scope="row">
            {labourer.firstName} {labourer.lastName}
          </th>
          <td>{labourer.phone}</td>
          <td>{labourer.email}</td>
          <td>{labourer.address}</td>
          <td>
            {labourer.isActive === true ? (
              <FontAwesomeIcon icon="check-circle" color="blue" />
            ) : (
              ""
            )}
          </td>
          <td>
            {" "}
            <StarRatings
              rating={labourer.safetyRating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />{" "}
          </td>
          <td>
            {" "}
            <StarRatings
              rating={labourer.qualityRating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
            />{" "}
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="page-content">
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Active</th>
              <th scope="col">Safety Rating</th>
              <th scope="col">Quality Rating</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
