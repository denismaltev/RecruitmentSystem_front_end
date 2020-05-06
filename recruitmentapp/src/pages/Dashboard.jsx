import React, { useState, useEffect } from "react";
import PanelHeader from "../components/PanelHeader";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
} from "reactstrap";
import { getCompaniesList } from "../api/CompaniesApi";
import StarRatings from "react-star-ratings";
import { getAllLabourers } from "../api/LabourerApi";
import IncidentReportsChart from "../components/IncidentReportsChart";
import ExpensesChart from "../components/ExpensesChart";
import IncomeChart from "../components/IncomeChart";

const Dashboard = (props) => {
  const [companies, setCompanies] = useState([]);
  const [labourers, setLabourers] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCompaniesList({
      token: props.auth.JWToken,
      count: 10,
      page: 1,
      orderByTopRated: true,
    })
      .then((response) => {
        if (mounted) {
          if (
            response.status === 200 &&
            response.data &&
            response.data.result
          ) {
            setCompanies(response.data.result);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    getAllLabourers({
      token: props.auth.JWToken,
      count: 10,
      page: 1,
      orderByTopRated: true,
    })
      .then((response) => {
        if (mounted) {
          if (
            response.status === 200 &&
            response.data &&
            response.data.result
          ) {
            setLabourers(response.data.result);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, [props.auth.JWToken]);

  return (
    <>
      <PanelHeader size="lg" auth={props.auth} />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <ExpensesChart auth={props.auth} />
          </Col>
          <Col xs={12} md={4}>
            <IncomeChart auth={props.auth} />
          </Col>
          <Col xs={12} md={4}>
            <IncidentReportsChart auth={props.auth} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Top-Rated Companies</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <StarRatings
                            disabled
                            rating={item.rating || 0}
                            starRatedColor="#2CA8FF"
                            numberOfStars={5}
                            name="rating"
                            starDimension="25px"
                            starSpacing="1px"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Top-Rated Labourers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labourers.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <StarRatings
                            disabled
                            rating={item.qualityRating || 0}
                            starRatedColor="#2CA8FF"
                            numberOfStars={5}
                            name="rating"
                            starDimension="25px"
                            starSpacing="1px"
                          />
                        </td>
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
};

export default Dashboard;
