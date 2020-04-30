import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllLabourers } from "../api/LabourerApi";
import Pagination from "../components/Pagination";

var count = 5;
export default class RecruiterLabourers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourers: [],
      totalLabourer: 0,
      page: 1,
    };
    this.getLabourersList = this.getLabourersList.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.getLabourersList();
  }

  getLabourersList = async () => {
    const token = this.props.auth.JWToken;
    const page = this.state.page;
    await getAllLabourers({ token, count, page }).then((res) => {
      if (res.status === 200) {
        this.setState({
          labourers: res.data,
          totalLabourer: res.data.totalRows,
        });
      } else {
        console.log("no response");
      }
    });
  };

  renderTableData() {
    return this.state.labourers.map((labourer) => {
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
        </tr>
      );
    });
  }

  paginate = (number) => {
    this.setState(
      {
        page: number,
      },
      () => {
        this.getLabourersList();
      }
    );
  };

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
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
        <Pagination
          itemsPerPage={count}
          totalItem={this.state.totalLabourer}
          paginate={this.paginate}
        />
      </div>
    );
  }
}
