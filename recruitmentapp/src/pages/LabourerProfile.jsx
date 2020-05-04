import React from "react";
import PanelHeader from "../components/PanelHeader";
import { Row, Col } from "reactstrap";
import LabourerProfileForm from "../components/LabourerProfileForm";
import LabourerInfo from "../components/LabourerInfo";

export default class LabourerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labourer: {},
    };
  }
  onChangeLabourer = (labourer) => {
    this.setState({
      ...this.state,
      labourer: labourer,
    });
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8}>
              <LabourerProfileForm
                {...this.props}
                auth={this.props.auth}
                labourerId={this.props.auth.profileId}
                onChangeLabourer={this.onChangeLabourer}
              />
            </Col>
            <Col md="4">
              <LabourerInfo labourer={this.state.labourer} />
            </Col>
          </Row>

          {/* <div className="lab-profile-col">
            <div className="lab-profile-item">
              <h4>Safety Rating</h4>
              <StarRatings
                rating={this.state.labourer.safetyRating || 0}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Quality Rating</h4>
              <StarRatings
                rating={this.state.labourer.qualityRating || 0}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>
          <div className="lab-profile-col"></div> */}
        </div>
      </>
    );
    // }
  }
}
