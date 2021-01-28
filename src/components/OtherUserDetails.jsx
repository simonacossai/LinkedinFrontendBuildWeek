import React, { Component } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import OtherUserProfileContainer from "./OtherUserProfileContainer";
import "../styles/Profile.css";
import ModifyProfileCard from "./ModifyProfileCard";
import Dashboard from "./Dashboard";
import Category from "./Category";
import Interests from "./Interests";
import Footer from './Footer';
import CurrentUserExperience from "./CurrentUserExperience";
import Loader from "./Loader";

export default class ProfileComponent extends Component {
  state = {
    userProfile: {},
    allUsersProfile: [],
  };

  getUserProfile = async () => {
    let token = localStorage.getItem("token");
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/`+
        this.props.match.params.userId,
      {
        method: "GET",
        headers: new Headers({
            authtoken: `${token}`,
        }),
      }
    );
    let userProfile = await response.json();
    this.setState({ userProfile });
  };

  getUsersProfile = async () => {
    let token = localStorage.getItem("token");
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/`,
      {
        method: "GET",
        headers: new Headers({
          authtoken: `${token}`,
        }),
      }
    );
    if (response.ok) {
      let allUsersProfile = await response.json();
      this.setState({ allUsersProfile });
    } else {
      <Alert>Opps, an error occured: </Alert>;
    }
  };

  componentDidMount() {
    this.getUserProfile();
    this.getUsersProfile();

  }

 /* componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.getUserProfile();
    }

    if (this.state.showMore) {
      this.showUsers();
      this.setState({ showMore: false });
    }
  }
*/
  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col md={8} style={{}}>
              {this.state.userProfile.length !== 0 ? (
                <OtherUserProfileContainer
                  userProfile={this.state.userProfile}
                />
              ) : (
                <Loader />
              )}
              <Dashboard />
              <CurrentUserExperience />
              <Interests />
            </Col>
            <Col
              md={4}
              style={{
                flexDirection: "column",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <ModifyProfileCard />
              {this.state.allUsersProfile.length !== 0 ? (
                <>
                  {" "}
                  <Category
                    title="People also viewed"
                    usersProfile={this.state.allUsersProfile}
                  />
                  <Category
                    title="People you may know"
                    usersProfile={this.state.allUsersProfile}
                  />
                </>
              ) : (
                <Loader />
              )}
            </Col>
          </Row>
          <Footer />
        </Container>
      </>
    );
  }
}
