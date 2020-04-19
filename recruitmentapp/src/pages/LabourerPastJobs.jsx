import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";

export default class LabourerPastJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
    };
    this.showJobList = this.showJobList.bind(this);
  }
  componentDidMount() {
    this.showJobList();
  }

  async showJobList() {
    //hard coded response example
    var data = [
      {
        Id: 1,
        Title: "Electrician",
        CompnayName: "GHI",
        Address: "Toronto",
        StartDate: 2019 - 12 - 12,
        Wage: 17,
        Rating: 3,
      },
      {
        Id: 2,
        Title: "Electrician",
        CompnayName: "JKL",
        Address: "Montreal",
        StartDate: 2020 - 2 - 16,
        Wage: 14,
        Rating: 4,
      },
    ];
    const TOKEN = this.props.auth.JWToken;
    this.setState({ jobList: data });
    // const url = `${BASE_URL}${id}`;
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${TOKEN}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({ jobList: data });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  }

  displayTableData() {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id}>
          <td> {item.CompnayName} </td>
          <td> {item.Title} </td>
          <td> {item.Address} </td>
          <td> {item.StartDate} </td>
          <td> {item.Wage} </td>
          <td>
            {" "}
            <StarRatings
              rating={item.Rating}
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
      <div>
        <h1> Past Jobs</h1>
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company</th>
              <th>Job</th>
              <th>Address</th>
              <th>Date</th>
              <th>Wage</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
