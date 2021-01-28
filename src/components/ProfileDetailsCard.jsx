import React, { Component } from "react";

import "../styles/ProfileDetailsCard.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { BsBookmarkFill } from "react-icons/bs";

export default class ProfileDetailsCard extends Component {
  state = {
    user: [],
  };
  getUserProfile = async (id) => {
    let token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:4005/user/${id}`, {
      method: "GET",
      headers: new Headers({
        authtoken: `${token}`,
      }),
    });
    let user = await response.json();
    this.setState({ user });
  };

  componentDidMount() {
    this.getUserProfile();
  }
  render() {
    return (
      <Card className="profile-detail-card">
        <Card.Img
          variant="top"
          src="https://cuborosso.com/wp-content/uploads/2019/10/linkedin-background-image-elegant-awesome-linkedin-cover-ideas-pilation-of-linkedin-background-image.jpg"
          className="profile-detail-image"
        />
        <img
          src={this.state.user.image}
          className="profile-detail-profile-pic mx-auto d-flex"
        />
        <Card.Body className="pb-2">
          <Card.Title>{this.state.user.username ?? "Username"}</Card.Title>
          <Card.Subtitle className=" text-muted">
            {this.state.user.title ?? "Web Developer"}
          </Card.Subtitle>
          <hr></hr>
          <Card.Text className="d-flex justify-content-between small-text-profile-detail">
            <p>Who viewed your profile</p>{" "}
            <p className="little-blue-numbers-detail">151</p>{" "}
          </Card.Text>
          <Card.Text className="d-flex justify-content-between small-text-profile-detail">
            <p>Views for the video </p>{" "}
            <p className="little-blue-numbers-detail">426</p>
          </Card.Text>
          <Card.Footer className="pt-2 p-0 text-left card-footer-text ">
            <BsBookmarkFill className="mr-2" />
            My items
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}
