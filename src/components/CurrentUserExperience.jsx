import React, { Component } from "react";
import "../styles/Experience.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { FaPlus, FaPen, FaAngleDown } from "react-icons/fa";
import ExperienceModal from "./ExperienceModal";
import SingleExperience from "./SingleExperience";
import { withRouter } from "react-router-dom";
class Experience extends Component {
  state = {
    show: false,
    experience: [],
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  getExperience = async () => {
    let token = localStorage.getItem("token");
    try {
      let response = await fetch(
        `REACT_APP_BASE_URL/experiences/profile/userName/experiences/${this.props.match.params.userId}`,
        {
          method: "GET",
          headers: new Headers({
            authtoken: `${token}`,
          }),
        }
      );
      if (response.ok) {
        let responseExperience = await response.json();
        this.setState({ experience: responseExperience });
      }
    } catch (e) {}
  };

  componentDidMount() {
    this.getExperience();
  }

  render() {
    return (
      <div>
        <Card className="experience-container my-2">
          <Card.Body>
            <Row className="justify-content-between">
              <Col className="d-flex justify-content-start">
                <Card.Title classname="card-title-expereince d-flex justify-content-start">
                  Experience
                </Card.Title>
              </Col>
              <Col className="d-flex justify-content-end">
                <FaPlus onClick={this.handleShow} style={{ color: "black" }} />
              </Col>
            </Row>

            {this.state.experience &&
              this.state.experience.map((element) => (
                <SingleExperience experience={element} />
              ))}
          </Card.Body>
          <ListGroup.Item action className="text-center ">
            Show more
            <FaAngleDown />
          </ListGroup.Item>
        </Card>
        <ExperienceModal show={this.state.show} onHide={this.handleClose} />
      </div>
    );
  }
}

export default withRouter(Experience);
