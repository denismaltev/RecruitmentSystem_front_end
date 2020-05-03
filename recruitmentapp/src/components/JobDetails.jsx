import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import StarRatings from "react-star-ratings";
import { Table } from "react-bootstrap";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function JobDetail(props) {
  function formatDate(theDate) {
    var date = new Date(theDate);

    return `${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
  return (
    <Card>
      <CardBody>
        <CardHeader className="card-category job-details-card">
          <h5 style={{ margin: 0 }}>{props.selectedJob.title} Details</h5>
          <button className="btn btn-primary btn-sm">Edit</button>
        </CardHeader>
        <Table responsive>
          <tbody>
            <tr>
              <th>Average Rating</th>
              <td>
                <StarRatings
                  id="rating"
                  rating={props.selectedJob.rating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="30px"
                  name="rating"
                  starSpacing="4px"
                />
              </td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{props.selectedJob.address}</td>
            </tr>
            <tr>
              <th>Dates</th>
              <td>
                {formatDate(props.selectedJob.startDate)} -{" "}
                {formatDate(props.selectedJob.endDate)}
              </td>
            </tr>
            <tr>
              <th>Weekdays</th>
              <td>
                {props.selectedJob.sunday && (
                  <button disabled className="weekday-tags">
                    Sun
                  </button>
                )}
                {props.selectedJob.monday && (
                  <button disabled className="weekday-tags">
                    Mon
                  </button>
                )}
                {props.selectedJob.tuesday && (
                  <button disabled className="weekday-tags">
                    Tue
                  </button>
                )}
                {props.selectedJob.wednesday && (
                  <button disabled className="weekday-tags">
                    Wed
                  </button>
                )}
                {props.selectedJob.thursday && (
                  <button disabled className="weekday-tags">
                    Thu
                  </button>
                )}
                {props.selectedJob.friday && (
                  <button disabled className="weekday-tags">
                    Fri
                  </button>
                )}
                {props.selectedJob.saturday && (
                  <button disabled className="weekday-tags">
                    Sat
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th>Skills Required</th>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
