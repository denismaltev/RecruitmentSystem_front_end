import React, { useState } from "react";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";
import Invoices from "../components/Invoices";
import InvoiceDetails from "../components/InvoiceDetails";

const RecruiterReportInvoices = (props) => {
  const [filter, setFilter] = useState({});

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12} md={6}>
            <Invoices
              {...props}
              auth={props.auth}
              onInvoiceSelect={(filter) => setFilter(filter)}
            />
          </Col>
          <Col xs={12} md={6}>
            <InvoiceDetails {...props} auth={props.auth} filter={filter} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RecruiterReportInvoices;
