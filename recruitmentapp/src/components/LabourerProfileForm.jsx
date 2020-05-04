import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  CardHeader,
  Col,
  CardBody,
  Form,
  CardTitle,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import { getLabourerById, saveLabourer } from "../api/LabourerApi";
import ValidationLabourer from "../components/ValidationLabourer";
import SkillsSelector from "../components/SkillsSelector";
import Weekdays from "../components/Weekdays";
import FormErrors from "../components/FormError";

const LabourerProfileForm = props => {
  const [labourer, setLabourer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({
    blankfield: false
  });

  useEffect(() => {
    if (props.onChangeLabourer) {
      props.onChangeLabourer(labourer);
    }
  }, [labourer]);

  useEffect(() => {
    if (props.labourerId > 0) {
      getLabourerById({ token: props.auth.JWToken, id: props.labourerId })
        .then(response => {
          if (response.status === 200) {
            setLabourer(response.data);
            setIsLoading(false);
          }
        })
        .catch(function(error) {
          alert("Something went wrong! " + error.response.data.message);
        });
    } else {
      setIsLoading(false);
    }
  }, [props.auth.JWToken, props.labourerId]);

  const onInputChange = event => {
    setLabourer({
      ...labourer,
      [event.target.id]: event.target.value
    });
  };

  const onDayCheck = day => {
    const newAvailability = !labourer[day];
    setLabourer({ ...labourer, [day]: newAvailability });
  };

  const updateSkills = selected => {
    setLabourer({
      ...labourer,
      skills: selected
    });
  };

  const clearErrors = () => {
    setErrors({
      blankfield: false,
      matchedpassword: false
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    clearErrors();
    const error = ValidationLabourer(event, labourer);
    if (error) {
      setErrors({ ...errors, ...error });
    } else {
      saveLabourer({
        token: props.auth.JWToken,
        labourer: labourer
      })
        .then(response => {
          if (response.status === 200) {
            alert("Profile successfully saved");
            if (response.data.id) {
              props.auth.setProfileId(response.data.id);
            }
          } else {
            alert("ERROR: Something went wrong! " + response.statusText);
          }
        })
        .catch(error => {
          alert("Something went wrong! " + error.response.data.message);
        });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card>
        <CardHeader>
          <h5 className="crad-category">
            <FormErrors formerrors={errors} />
          </h5>
          <CardTitle tag="h4">
            {labourer?.id > 0 ? "Edit Profile" : "Create Profile"}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit} method="post">
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>First Name</label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    name="FirstName"
                    value={labourer.firstName || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-1" md="6">
                <FormGroup>
                  <label>Last Name</label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    name="LastName"
                    value={labourer.lastName || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="5">
                <FormGroup>
                  <label>Email address</label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={labourer.email || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Phone number</label>
                  <Input
                    type="text"
                    id="phone"
                    placeholder="Phone number"
                    name="Phone"
                    pattern="[0-9]*"
                    value={labourer.phone || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-1" md="4">
                <FormGroup>
                  <label>SIN / Passport</label>
                  <Input
                    type="text"
                    id="personalId"
                    placeholder="SIN / Passport"
                    name="PersonalId"
                    value={labourer.personalId || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Address</label>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Home Address"
                    name="Address"
                    value={labourer.address || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="4">
                <FormGroup>
                  <label>City</label>
                  <Input
                    type="text"
                    id="city"
                    placeholder="City"
                    name="City"
                    value={labourer.city || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col className="px-1" md="4">
                <FormGroup>
                  <label>Province</label>
                  <Input
                    type="text"
                    id="province"
                    placeholder="Country"
                    name="Province"
                    value={labourer.province || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col className="pl-1" md="4">
                <FormGroup>
                  <label>Country</label>
                  <Input
                    type="text"
                    id="country"
                    placeholder="Country"
                    name="Country"
                    value={labourer.country || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6">
                <label>Skills</label>
                <SkillsSelector
                  auth={props.auth}
                  selected={labourer.skills || []}
                  onChange={updateSkills}
                  placeholder="Choose your skills"
                />
              </Col>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Availability</label>
                  <div>
                    <Weekdays
                      days={{
                        mon: labourer.monday || false,
                        tue: labourer.tuesday || false,
                        wed: labourer.wednesday || false,
                        thu: labourer.thursday || false,
                        fri: labourer.friday || false,
                        sat: labourer.saturday || false,
                        sun: labourer.sunday || false
                      }}
                      onDayCheck={day => onDayCheck(day)}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Button type="submit" className="btn btn-primary">
                  {labourer.id ? "Update" : " Save"}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
};

export default LabourerProfileForm;
