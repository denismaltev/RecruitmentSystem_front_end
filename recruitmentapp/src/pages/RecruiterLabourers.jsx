import React from "react";
const URL = "https://recruitmentsystemapi.azurewebsites.net/api/companies";

export default class RecruiterLabourers extends React.Component {
  constructor(props) {
    super(props);
    //const TOKEN = this.props.auth.JWToken;
    this.state = {
      loggedIn: true,
      labourers: [
        {
          id: "1",
          name: "Person 1",
          email: "email@email.com",
          phone: "777-888-9999",
          isActive: "yes",
        },
        {
          id: "2",
          name: "Person 2",
          email: "email@email.com",
          phone: "777-888-9999",
          isActive: "yes",
        },
        {
          id: "3",
          name: "Person 3",
          email: "email@email.com",
          phone: "777-888-9999",
          isActive: "yes",
        },
        {
          id: "4",
          name: "Person 4",
          email: "email@email.com",
          phone: "777-888-9999",
          isActive: "yes",
        },
      ],
      item: {},
      token: "can't find",
    };
    this.getAll = this.getAll.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    //this.getAll();
    this.getToken();
    //console.log(TOKEN)
  }

  getToken() {
    this.setState({ token: this.props.token });
    console.log(this.state.token);
  }

  getAll() {
    this.setState({
      token: this.props.JWToken,
    });
    console.log(this.state.token);

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        this.setState({ labourers: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderTableData() {
    return this.state.labourers.map((labourer, index) => {
      const { id, name, email, phone, isActive } = labourer;
      return (
        <tr key={id}>
          <th scope="row">{name}</th>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{isActive}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="admin-labourers">
        <h1> Recruiter Labourers</h1>
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

