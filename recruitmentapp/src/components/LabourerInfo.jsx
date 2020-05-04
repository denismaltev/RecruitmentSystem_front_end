import React from "react";
import { Card, CardBody } from "reactstrap";
import Weekdays from "../components/Weekdays";

const LabourerInfo = (props) => {
  return (
    <Card className="card-user">
      <CardBody>
        <div className="author">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <h5 className="title">
              {props.labourer?.firstName || ""} {props.labourer?.lastName || ""}
            </h5>
          </a>
          <p className="description">{props.labourer?.email || ""}</p>
          <p className="description">{props.labourer?.phone || ""}</p>
          <p className="description">
            Skills:
            {props.labourer?.skills &&
              props.labourer.skills.map((skill, index) => (
                <span key={index} color="info" className="m-1 badge badge-info">
                  {skill.name}
                </span>
              ))}
          </p>
          <p className="description">
            Availability:
            {props.labourer && (
              <Weekdays
                days={{
                  mon: props.labourer.monday || false,
                  tue: props.labourer.tuesday || false,
                  wed: props.labourer.wednesday || false,
                  thu: props.labourer.thursday || false,
                  fri: props.labourer.friday || false,
                  sat: props.labourer.saturday || false,
                  sun: props.labourer.sunday || false,
                }}
              />
            )}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default LabourerInfo;
