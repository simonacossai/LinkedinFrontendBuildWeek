import React, { Component } from "react";
import "../styles/Experience.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { FaPlus, FaAngleDown } from "react-icons/fa";
import ExperienceModal from "./ExperienceModal";
import SingleExperience from "./SingleExperience";
import { Link } from "react-router-dom";

class Experience extends Component {
  state = {
    add: false,
    edit: false,
    experience: [],
    id: null,
  };

  handleAddClose = () => this.setState({ add: false });
  handleAddOpen = () => this.setState({ add: true });
  handleEditClose = () => this.setState({ edit: false });
  handleEditOpen = (id) => {
    this.setState({ edit: true });
    this.setState({id})
  }

  url = `${process.env.REACT_APP_BASE_URL}/experiences/profile/userName/experiences`;
  getExperience = async () => {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");

    try {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/experiences/profile/userName/experiences/${id}`, {
        method: "GET",
        headers: new Headers({
          authtoken: `${token}`,
        }),
      });
      if (response.ok) {
        let responseExperience = await response.json();
        this.setState({ experience: responseExperience });
      }
    }catch(e){
        console.log(e)
    }
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
              <Link to="/profile/edit/position/new">
                <Col className="d-flex justify-content-end">
                  {<FaPlus onClick={this.handleAddOpen} />}
                </Col>
              </Link>
            </Row>

            {this.state.experience &&
              this.state.experience.map((element) => (
                <SingleExperience
                  key={element.id}
                  experience={element}
                  onClick={this.handleEditOpen}
                />
              ))}
          </Card.Body>
          <ListGroup.Item action className="text-center ">
            Show more
            <FaAngleDown />
          </ListGroup.Item>
        </Card>
        {this.state.add && (
          <ExperienceModal
            show={this.state.add}
            add={this.state.add}
            onHide={this.handleAddClose}
            user={this.props.userr}
          />
        )}
        {this.state.edit && (
          <ExperienceModal
            show={this.state.edit}
            edit={this.state.edit}
            onHide={this.handleEditClose}
            fetch={this.getExperience}
            id={this.state.id}
          />
        )}
      </div>
    );
  }
}

export default Experience;
