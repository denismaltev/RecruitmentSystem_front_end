import React from "react";
const URL = "https://recruitmentsystemapi.azurewebsites.net/api/companies";

export default class RecruiterCompanies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      companies: []
    };
    this.getCompaniesList = this.getCompaniesList.bind(this);
  }

  componentDidMount(){
    this.getCompaniesList();
  }

  getToken(){
    this.setState({token: this.props.token});
    console.log(this.state.token)
  }

  getCompaniesList = async () => {
    await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.JWToken}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ companies: data });
    })
    .catch(error => {
      console.log(error);
    });
  };

  renderTableData(){
    return this.state.companies.map((company, index) => {
      const {id, name, email, phone, isActive} = company
      return (
        <tr key={id}>
          <th scope="row">{name}</th>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{isActive}</td>
        </tr>
      );
    })
  }
  
  render() {
    return (
      <div className="admin-companies">
        <h1> Recruiter Companies</h1>
        <table className="table table-striped">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
