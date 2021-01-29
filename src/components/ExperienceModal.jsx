import { ImageAspectRatio } from "@material-ui/icons";
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  Col,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { FcAddImage } from "react-icons/fc";

require("dotenv").config();

export default class Experience_Modal extends Component {
  state = {
    experience: {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    },
    image: "",
    _id: "",
    delete: false,
    update: false,
    add: false,
    working: false,
    uploading: false,
    images: [],
    token: "",
  };

  HandleFile = (e) => {
    const formData = new FormData();
    formData.append("experienceImage", e.target.files[0]);
    this.setState({ image: formData });
  };

  url = `${process.env.REACT_APP_BASE_URL}/experiences/profile/userName/experiences`;

  updateField = (e) => {
    let experience = { ...this.state.experience };
    let currentId = e.currentTarget.id;
    experience[currentId] = e.currentTarget.value;
    this.setState({ experience });
  };

  PostImage = async (id) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/experiences/${id}/upload`,
        {
          method: "PUT",
          body: this.state.image,
          headers: new Headers({
            authtoken: `${this.state.token}`,
          }),
        }
      );
      if (response.ok) {
        this.props.fetch();
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3001/experiences/profile/userName/experiences", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          authtoken: `${this.state.token}`,
        }),
        body: JSON.stringify(this.state.experience)
      });
      if (response.ok) {
        let data = await response.json();
        this.PostImage(data.id);
        this.props.fetch();
        this.props.onHide();
        alert("Experience Added");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert(`Something went wrong! ${error}`);
    }
  };

  handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3001/experiences/profile/userName/experiences/${this.props.id}`, {
        method: "PUT",
        body: JSON.stringify(this.state.experience),
        headers: new Headers({
          "Content-Type": "application/json",
          authtoken: `${this.state.token}`,
        }),
      });
      if (response.ok) {
        let data = await response.json();
        this.PostImage(data.id);
        this.props.fetch();
        this.props.onHide();
        alert("Experience Updated");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert(`Something went wrong! ${error}`);
    }
  };

  handleDelete = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3001/experiences/profile/userName/experiences/${this.props.id}`, {
        method: "DELETE",
        headers: new Headers({
          authtoken: `${this.state.token}`,
        }),
      });
      if (response.ok) {
        alert("Experience Deleted");
        this.props.onHide();
        this.props.fetch();

      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert(`Something went wrong! ${error}`);
    }
  };


  removeImage = (id) => {
    this.setState({
      images: this.state.images.filter((image) => image.publiic_id !== id),
    });
  };
  componentDidMount(previousProps) {
    if (this.props._id !== "") {
      this.setState({
        _id: this.props._id,
        token: localStorage.getItem("token"),
      });
    }

      this.props.fetch();

  }

  render() {
    return (
      <div>
        <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            {this.props.add && <Modal.Title>Add experience</Modal.Title>}
            {this.props.edit && <Modal.Title>Edit experience</Modal.Title>}
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body style={{ overflowY: "scroll", maxHeight: "60vh" }}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="role">Title *</Form.Label>
                  <Form.Control
                    type="text"
                    id="role"
                    placeholder="Ex: Retails Sales Manager"
                    value={this.state.experience.role}
                    onChange={this.updateField}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="company">Company *</Form.Label>
                  <Form.Control
                    id="company"
                    type="text"
                    placeholder="e.g Strive School"
                    value={this.state.experience.company}
                    onChange={this.updateField}
                  />
                  <span></span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md={6}>
                  <Form.Label>Start Date *</Form.Label>

                  <Form.Control
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="Start Date"
                    value={this.state.experience.startDate}
                    onChange={this.updateField}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>End Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="End Date"
                    value={this.state.experience.endDate}
                    onChange={this.updateField}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    id="description"
                    as="textarea"
                    rows={3}
                    value={this.state.experience.description}
                    onChange={this.updateField}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="area">Location</Form.Label>
                  <Form.Control
                    id="area"
                    type="text"
                    placeholder="Ex: London, United Kingdom"
                    value={this.state.experience.area}
                    onChange={this.updateField}
                  />
                  <span></span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>
                    <span>Media</span>
                    <br />
                    Add or link to external documents, photos, sites, videos,
                    and presentations.
                  </Form.Label>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <label for="file" id="file-label">
                        <input
                          type="file"
                          id="file"
                          onChange={this.HandleFile}
                          accept="image/*"
                        />
                        <FcAddImage className="upload" />
                      </label>{" "}
                    </Form.Group>
                  </Form.Row>
                </Form.Group>
              </Form.Row>
            </Modal.Body>
            <Modal.Footer>
              <Form.Row className="justify-content-bewteen">
                {this.props.edit && (
                  <>
                    <Form.Group as={Col} md={6}>
                      <Button
                        variant="outline-secondary"
                        className="rounded-pill"
                        onClick={this.handleDelete}
                      >
                        Delete
                      </Button>
                    </Form.Group>{" "}
                    <Form.Group as={Col} md={6}>
                      <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={this.handleUpdate}
                      >
                        Save
                      </Button>
                    </Form.Group>{" "}
                  </>
                )}
                {this.props.add && (
                  <>
                    {" "}
                    <Form.Group as={Col} md={6}>
                      <Button
                        variant="primary"
                        type="submit"
                        className="rounded-pill"
                      >
                        Save
                      </Button>
                    </Form.Group>{" "}
                  </>
                )}
              </Form.Row>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
