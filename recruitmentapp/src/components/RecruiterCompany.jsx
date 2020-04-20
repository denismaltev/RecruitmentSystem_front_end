import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCompany } from "../api/CompaniesApi";

export default class RecruiterCompany extends React.Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     isEditable: false,
                     companyName: "",
                     city: "",
                     province: "",
                     country: "",
                     address: "",
                     phone: "",
                     email: "",
                     isActive: false,
                   };
                 }

                 componentDidMount() {
                   this.setState({ companyName: this.props.company.name });
                   this.setState({ city: this.props.company.city });
                   this.setState({ province: this.props.company.province });
                   this.setState({ country: this.props.company.country });
                   this.setState({ address: this.props.company.address });
                   this.setState({ phone: this.props.company.phone });
                   this.setState({ email: this.props.company.email });
                   this.setState({ isActive: this.props.company.isActive });
                 }

                 onInputChange = (event) => {
                   this.setState({ [event.target.name]: event.target.value });
                 };

                 startEditing = () => {
                   this.setState({ isEditable: true });
                 };

                 updateCompanyToAPI = async (event) => {
                   const TOKEN = this.props.auth.JWToken;
                   const id = this.props.company.id;
                   const companyName = this.state.companyName;
                   const city = this.state.city;
                   const province = this.state.province;
                   const country = this.state.country;
                   const address = this.state.address;
                   const phone = this.state.phone;
                   const email = this.state.email;
                   const isActive = this.props.company.isActive;
                   await updateCompany({
                     TOKEN,
                     id,
                     companyName,
                     city,
                     province,
                     country,
                     address,
                     phone,
                     email,
                     isActive,
                   }).then((res) => {
                     if (res.status === 200) {
                       this.setState({ isEditable: false });
                     } else {
                       this.setState({ isEditable: false });
                       alert(
                         "Error: Something went wrong, please try again" +
                           res.statusText
                       );
                     }
                   });
                 };

                 render() {
                   if (this.state.isEditable) {
                     return (
                       <>
                         <td>
                           <input
                             id={this.props.company.id + "company-name"}
                             value={this.state.companyName}
                             name={"companyName"}
                             onChange={this.onInputChange}
                             placeholder={this.props.company.name}
                           ></input>
                         </td>
                         <td>
                           <input
                             id={this.props.company.id + "email"}
                             value={this.state.email}
                             name={"email"}
                             onChange={this.onInputChange}
                             placeholder={this.props.company.email}
                           ></input>
                         </td>
                         <td>
                           <input
                             id={this.props.company.id + "phone"}
                             value={this.state.phone}
                             name={"phone"}
                             onChange={this.onInputChange}
                             placeholder={this.props.company.phone}
                           ></input>
                         </td>
                         <td>
                           <input
                             id={this.props.company.id + "address"}
                             value={this.state.address}
                             name={"address"}
                             onChange={this.onInputChange}
                             placeholder={this.props.company.address}
                           ></input>
                         </td>
                         <td>
                           <input
                             id={this.props.company.id + "city"}
                             value={this.state.city}
                             name={"city"}
                             onChange={this.onInputChange}
                             placeholder={this.props.company.city}
                           ></input>
                         </td>
                         <td>
                           <input
                             id={this.props.company.id + "province"}
                             value={this.state.province}
                             name={"province"}
                             onChange={this.onInputChange}
                             placeholder={this.props.company.province}
                           ></input>
                         </td>
                         <td>
                           {this.props.company.isActive === true ? (
                             <FontAwesomeIcon
                               icon="check-circle"
                               color="blue"
                             />
                           ) : (
                             "X"
                           )}
                         </td>
                         <td>
                           <Button onClick={this.editcompany}>Update</Button>
                         </td>
                       </>
                     );
                   } else {
                     return (
                       <>
                         <td>{this.state.companyName}</td>
                         <td> {this.state.chargeAmount}</td>
                         <td> {this.state.payAmount}</td>
                         <td>
                           {this.props.company.isActive === true ? (
                             <FontAwesomeIcon
                               icon="check-circle"
                               color="blue"
                             />
                           ) : (
                             "X"
                           )}
                         </td>
                         <td>
                           <Button onClick={this.startEditing}>Edit</Button>
                         </td>
                       </>
                     );
                   }
                 }
               }
