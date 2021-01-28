import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import CreatePostComponent from "./CreatePostComponent";
import SinglePost from "./SinglePost";
import AnnounceCard from "./AnnounceCard";
import ProfileDetailsCard from "./ProfileDetailsCard";
import ModifyProfileCard from "./ModifyProfileCard";
import MostUsedHashtag from "./MostUsedHashtag";
import AddFeedComponent from "./AddFeedComponent";

export default class Home extends Component {
  state = {
    posts: [],
  };
  getPost = async () => {
    let token = localStorage.getItem("token");
    let response = await fetch(process.env.REACT_APP_URL + "/posts", {
      method: "GET",
      headers: new Headers({
        authtoken: `${token}`,
      }),
    });
    let posts = await response.json();
    let postsArray = posts.reverse();
    this.setState({ posts: postsArray });
  };

  componentDidMount() {
    this.getPost();
  }

  render() {
    return (
      <>
        <Container className="mx-auto justify-content-center text-center d-block mb-5">
          <Row className="mx-auto mt-5 justify-content-center text-center ">
            <Col md={3}>
              <ProfileDetailsCard />
              <MostUsedHashtag />
            </Col>
            <Col md={6}>
              <CreatePostComponent fetch={this.getPost} />
              {this.state.posts ? (
                this.state.posts.map((element) => (
                  <SinglePost post={element} fetch={this.getPost} />
                ))
              ) : (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Col>
            <Col md={3}>
              <ModifyProfileCard />
              <AddFeedComponent />
              <AnnounceCard />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
