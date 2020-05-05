import React, { useState } from "react";
import LabourerAttendance from "../components/LabourerAttendance";
import LabourerAttendanceDetail from "../components/LabourerAttendanceDetail";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";

const RecruiterReportAttendance = (props) => {
  const [detailPageId, setDetailPageId] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12} md={6}>
            <LabourerAttendance
              {...props}
              auth={props.auth}
              onSelectLabourer={(id, from, to) => {
                setDetailPageId(id);
                setFromDate(from);
                setToDate(to);
              }}
            />
          </Col>
          <Col xs={12} md={6}>
            <LabourerAttendanceDetail
              {...props}
              auth={props.auth}
              detailPageId={detailPageId}
              toDate={toDate}
              fromDate={fromDate}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RecruiterReportAttendance;

// export default class RecruiterReportAttendance extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       detailPageId: 0,
//       fromDate: "",
//       toDate: "",
//     };
//   }
//   render() {
//     return (
//       <>
//         <PanelHeader size="sm" />
//         <div className="content">
//           <Row>
//             <Col>
//               <LabourerAttendance
//                 {...this.props}
//                 auth={this.props.auth}
//                 onSelectLabourer={(id, from, to) => {
//                   this.setState({
//                     detailPageId: id,
//                     fromDate: from,
//                     toDate: to,
//                   });
//                 }}
//               />
//             </Col>
//             <Col>
//               {/* {this.state.detailPageId > 0 && ( */}
//               <LabourerAttendanceDetail
//                 {...this.props}
//                 auth={this.props.auth}
//                 detailPageId={this.state.detailPageId}
//                 fromDate={this.state.fromDate}
//                 toDate={this.state.toDate}
//               />
//               {/* )} */}
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
