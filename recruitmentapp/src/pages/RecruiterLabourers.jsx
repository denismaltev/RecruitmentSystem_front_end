import React from "react";
import { Table } from "react-bootstrap";
import { getAllLabourers } from "../api/LabourerApi";
import Pagination from "../components/Pagination";
import { config } from "../api/config.json";
import UpcomingJobs from "../components/UpcomingJobs";
import RecruiterLabourerProfile from "../components/RecruiterLabourerProfile";
import PanelHeader from "../components/PanelHeader";
import { Row, Col, Card, CardBody } from "reactstrap";

export default class RecruiterLabourers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourers: [],
      page: 1,
      labourerIdToShowDetails: 0,
      isLoading: true,
      numberOfUpcomingJobs: 1
    };
    this.getLabourersList = this.getLabourersList.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.getLabourersList();
  }

  getNumberOfUpcomingJobs = data => {
    this.setState({ numberOfUpcomingJobs: data });
    //console.log("Upcoming JOBS: " + this.state.numberOfUpcomingJobs);
  };

  getLabourersList = async () => {
    const token = this.props.auth.JWToken;
    var page = this.state.page;
    const count = config.NUMBER_OF_ROWS_PER_PAGE;
    await getAllLabourers({ token, page, count }).then(res => {
      if (res.status === 200) {
        this.setState({
          labourers: res.data.result,
          totalLabourer: res.data.totalRows,
          labourerIdToShowDetails: res.data.result[0].id,
          isLoading: false
        });
      } else {
        console.log("no response");
      }
    });
  };

  goToDetails = id => {
    this.setState({ labourerIdToShowDetails: id });
    //console.log(id);
  };

  renderTableData() {
    return this.state.labourers.map(labourer => {
      return (
        <tr
          key={labourer.id}
          onClick={() => {
            this.goToDetails(labourer.id);
          }}
        >
          <th scope="row">
            {labourer.firstName} {labourer.lastName}
          </th>
          <td>{labourer.phone}</td>
          <td>{labourer.email}</td>
        </tr>
      );
    });
  }

  paginate = number => {
    this.setState(
      {
        page: number
      },
      () => {
        this.getLabourersList();
      }
    );
  };

  render() {
    return this.state.isLoading ? (
      <div>...Loading</div>
    ) : (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>
                  </Table>
                  <Pagination
                    itemsPerPage={config.NUMBER_OF_ROWS_PER_PAGE}
                    totalItem={this.state.totalLabourer}
                    paginate={this.paginate}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col>
              <RecruiterLabourerProfile
                {...this.props}
                labourerId={this.state.labourerIdToShowDetails}
                numberOfUpcomingJobs={this.state.numberOfUpcomingJobs}
              />
            </Col>
          </Row>
          <Row>
            <UpcomingJobs
              {...this.props}
              labourerId={this.state.labourerIdToShowDetails}
              numberOfUpcomingJobs={this.getNumberOfUpcomingJobs}
            />
          </Row>
        </div>
      </>
    );
  }
}
