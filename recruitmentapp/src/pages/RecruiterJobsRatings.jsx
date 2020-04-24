import React from "react";
import { Table } from "react-bootstrap";
import StarRatings from "react-star-ratings";
//import { getJobRating } from "../api/JobRatingApi";
import { getAllCompanyJobs } from "../api/JobsApi";

export default class RecruiterJobsRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
    };
    //this.showCompanyList = this.showCompanyList.bind(this);
  }
  componentDidMount() {
    //this.showCompanyList();
    this.getRecruiterJobsFromAPI();
  }

  getRecruiterJobsFromAPI = async () => {
    const TOKEN = this.props.auth.JWToken;
    await getAllCompanyJobs({ TOKEN })
    .then((res) => {
      if(res.status === 200){
        this.setState({ jobList: res.data });
      } else {
        console.log("no response")
      }
    });
  }

  // async showCompanyList() {
  //   //hard coded response
  //   var hardcodeddata = [
  //     {
  //       Id: 1,
  //       JobTitle: "Electrician",
  //       CompanyName: "GHI",
  //       Rating: 3,
  //     },
  //     {
  //       Id: 2,
  //       JobTitle: "Electrician",
  //       CompanyName: "JKL",
  //       Rating: 4,
  //     },
  //     {
  //       Id: 3,
  //       JobTitle: "Painting",
  //       CompanyName: "ABC",
  //       Rating: 2.5,
  //     },
  //   ];
  //   const TOKEN = this.props.auth.JWToken;
    //this.setState({ jobList: hardcodeddata });
    // await getJobRating({ TOKEN })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({ jobList: data });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  //}

  displayTableData() {
    return this.state.jobList.map((item) => {
      return (
        <tr key={item.id}>
          <td> {item.CompanyName} </td>
          <td> {item.JobTitle} </td>

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
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{this.displayTableData()}</tbody>
        </Table>
      </div>
    );
  }
}
