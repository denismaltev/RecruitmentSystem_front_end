import React from "react";
import { Card, CardBody } from "reactstrap";
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
    } / ${date.getDate()} / ${date.getFullYear()}`;
  }
  return (
    <Card>
      <CardBody>
        <Table>
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
              {props.selectedJob.sunday && <button>Sun</button>}
              {props.selectedJob.monday && <button>Mon</button>}
              {props.selectedJob.tuesday && <button>Tue</button>}
              {props.selectedJob.wednesday && <button>Wed</button>}
              {props.selectedJob.thursday && <button>Thu</button>}
              {props.selectedJob.friday && <button>Fri</button>}
              {props.selectedJob.saturday && <button>Sat</button>}
            </td>
          </tr>
        </Table>
      </CardBody>
    </Card>
  );
}
