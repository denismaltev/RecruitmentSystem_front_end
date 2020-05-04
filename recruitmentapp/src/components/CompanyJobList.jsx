import React from "react";
import { Table } from "react-bootstrap";
import { getCompanyInfo, getCompanyJobs } from "../api/CompaniesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, CardBody } from "reactstrap";
import StarRatings from "react-star-ratings";
import Pagination from "./Pagination";
import PanelHeader from "../components/PanelHeader";
import { config } from "../api/config.json";

export default class CompanyJobList extends React.Component {}
