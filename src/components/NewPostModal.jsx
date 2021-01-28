import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "../styles/CreatePostComponent.css";
import { BiWorld } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";

export default class NewPostModal extends Component {
  state = {
    wholePost: {
      text: "",
    },
    showpost: false,
    errMessage: "",
    post: null,
    user: [],
  };

  getUserProfile = async (id) => {
    let token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:4005/user${id}`, {
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
  updatePostField = (e) => {
    this.setState({ wholePost: { text: e.target.value } });
  };

  // POST NEW FEEd
  postNewFeed = async () => {
    let token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", this.state.post);
    formData.append("text", this.state.wholePost.text);
    try {
      let response = await fetch("http://localhost:4005/posts", {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          authtoken: `${token}`,
        },
      });
      const dataJson = await response.json();
      console.log(dataJson);
      if (response.ok) {
        this.setState({
          wholePost: {
            text: "",
          },
        });
        this.props.fetch();
        this.props.onHide();
      } else {
        let error = await response.json();
        console.log(error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  HandleFile = (e) => {
    this.setState({ post: e.target.files[0] });
  };

  submitPost = async (e) => {
    e.preventDefault();
    this.postNewFeed();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Create a post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} className="d-flex">
                <img
                  className="profile-picture-modal"
                  src={this.state.user.image && this.state.user.image}
                />
                <div className="d-block">
                  <p className="ml-3 text-black m-0 p-0">
                    {this.state.user.name && this.state.user.name}{" "}
                    {this.state.user.surname && this.state.user.surname}
                  </p>
                  <Form.Control
                    as="select"
                    custom
                    className="postSelect ml-2 py-0"
                  >
                    <option>🌏Everyone</option>
                    <option>Your network</option>
                    <option>only me</option>
                  </Form.Control>
                </div>
              </Col>
            </Row>
            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="what do you want to talk about?"
                  style={{ border: "none", boxShadow: "none" }}
                  value={this.state.wholePost.text}
                  id="text"
                  onChange={(e) => this.updatePostField(e)}
                />
              </Form.Group>
            </Form>
            <label for="file" id="file-label">
              <input
                type="file"
                id="file"
                onChange={this.HandleFile}
                accept="image/*"
              />
              <FcAddImage className="upload" />
            </label>
            <Button
              type="submit"
              id="post"
              onClick={this.submitPost}
              className="post-modal-button justify-content-right d-flex ml-auto "
            >
              Post
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
