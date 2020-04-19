import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const URL = "https://recruitmentsystemapi.azurewebsites.net/api/labourers";

export default class RecruiterLabourers extends React.Component {
            constructor(props) {
              super(props);
              this.state = {
                labourers: [],
              };
              this.getLabourersList = this.getLabourersList.bind(this);
            }

            componentDidMount() {
              this.getLabourersList();
            }

            getLabourersList = async () => {
              await fetch(URL, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.props.auth.JWToken}`,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  this.setState({ labourers: data });
                })
                .catch((error) => {
                  console.log(error);
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
                  </tr>
                );
              });
            }

            render() {
              return (
                <div className="admin-labourers">
                  <h1> Recruiter Labourers</h1>
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
                </div>
              );
            }
          }

