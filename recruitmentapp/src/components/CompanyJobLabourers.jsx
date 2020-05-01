import React from "react";
import { Table } from "react-bootstrap";
import { Row, Col, Card, CardBody } from "reactstrap";
import { getLabourerJobs } from "../api/labourerJobApi";
import { config } from "../api/config.json";
import PanelHeader from "../components/PanelHeader";
import Pagination from "../components/Pagination";

var count = config.NUMBER_OF_ROWS_PER_PAGE;
export default class CompanyJobLabourers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourers: [],
      labourerFullName: "",
      labourerPhone: "",
      skillName: "",
      page: 1,
      isLoading: true,
      jobId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.getLabourersListFromAPI();
  }

  getLabourersListFromAPI = () => {
    const token = this.props.auth.JWToken;
    var count   = 10;
    var page    = this.state.page;
    var jobId   = this.state.jobId;

    getLabourerJobs({ token, count, page, jobId })
    .then((res) => {
      if (res.status === 200) {
        this.setState({
          labourers: res.data.result,
          isLoading: false,
        });
        this.paginate = this.paginate.bind(this);
      }
    });
  };

  paginate = (number) => {
    this.setState({ page: number }, () => {
      this.getLabourersListFromAPI();
    });
  };

  render() {
    // if (this.state.isLoading) return <div>Loading...</div>;
    // else {
      return (
        <>
        <PanelHeader size="sm" />
        <div className="page-content">
         <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                    <Table striped bordered hover>
                        <thead className="table-secondary">
                        <tr>
                            <th scope="col">Skill Name</th>
                            <th scope="col">Labourer Full Name</th>
                            <th scope="col">Labourer Phone Number</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.labourers.map((labourer, index) => (
                            <tr key={index}>
                            <td>{labourer.skillName}</td>
                            <td>{labourer.labourerFullName}</td>
                            <td>{labourer.labourerPhone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
              </Card>
            </Col>
        </Row>
      </div>
      </>
      );
    }
  }
//}