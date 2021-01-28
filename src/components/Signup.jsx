import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Label,
  Button,
} from "react-bootstrap";
import { GiPadlockOpen } from "react-icons/gi";
import { FaUserAlt, FaGraduationCap } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import "../styles/Signup.css";
import { Link, withRouter } from "react-router-dom";

class Signup extends Component {
  viewpassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  state = {
    user: {
      name: "",
      surname: "",
      email: "",
      password: "",
      area: "",
      bio: "",
      title: "",
      username: "",
    },
  };
  updateUser = (e) => {
    let user = { ...this.state.user };
    let currentId = e.currentTarget.id;
    user[currentId] = e.currentTarget.value;
    this.setState({ user });
  };
  Signup = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("REACT_APP_BASE_URL/api/user/register", {
        method: "POST",
        body: JSON.stringify(this.state.user),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        alert("Comment added!");
        let data = await response.json();
        console.log(data);
        this.setState({
          user: {
            name: "",
            surname: "",
            email: "",
            password: "",
            area: "",
            bio: "",
            title: "",
            username: "",
          },
        });
        this.props.history.push("/");
      } else {
        console.log("please check again");
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center mb-4 mt-5"
        style={{ flexDirection: "column" }}
      >
        <Container>
          <Row className="text-center loginRow mt-2">
            <Col md={9} className="signupContainer text-left px-4 py-3 mt-0">
              <Row>
                <Col md={6}>
                  <label htmlFor="name" className="text-left">
                    Your name
                  </label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="name">
                        <FaUserAlt />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="name"
                      aria-label="name"
                      id="name"
                      aria-describedby="basic-addon1"
                      value={this.state.user.name}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <label htmlFor="surname" className="text-left">
                    Your surname
                  </label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="surname">
                        <FaUserAlt />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="surname"
                      aria-label="surname"
                      id="surname"
                      aria-describedby="basic-addon1"
                      value={this.state.user.surname}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <label htmlFor="email" className="text-left">
                    Your email
                  </label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="email">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="email"
                      aria-label="email"
                      id="email"
                      aria-describedby="basic-addon1"
                      value={this.state.user.email}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <label htmlFor="password" className="text-left">
                    Your password
                  </label>
                  <InputGroup className="mb-1">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <GiPadlockOpen />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="password"
                      id="password"
                      placeholder="password"
                      value={this.state.user.password}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <div className="d-flex mb-3 mt-1">
                    <input
                      type="checkbox"
                      onClick={(e) => this.viewpassword()}
                      className="mr-2 mt-1 py-0"
                    />
                    <span className="login-p text-muted">Show Password</span>
                  </div>
                </Col>
                <Col md={6}>
                  <label htmlFor="title" className="text-left">
                    Your title
                  </label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="title">
                        <FaGraduationCap />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="title"
                      aria-label="title"
                      id="title"
                      aria-describedby="basic-addon1"
                      value={this.state.user.title}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <label htmlFor="username" className="text-left">
                    Your username
                  </label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="username">
                        <FaUserAlt />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="username"
                      aria-label="username"
                      id="username"
                      aria-describedby="basic-addon1"
                      value={this.state.user.username}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <label htmlFor="area" className="text-left">
                    Your area
                  </label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="area">
                        <MdPlace />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="area"
                      aria-label="area"
                      id="area"
                      aria-describedby="basic-addon1"
                      value={this.state.user.area}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                  <label htmlFor="bio" className="text-left">
                    Your bio
                  </label>
                  <InputGroup className="mb-1">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="bio">
                        <BsFillChatSquareDotsFill />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="text"
                      id="bio"
                      placeholder="bio"
                      value={this.state.user.bio}
                      onChange={this.updateUser}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Container>
                <Row className="text-center loginRow mt-2">
                  <Col md={8}>
                    <p className="text-muted text-left login-p">
                      By clicking join now you agree to the Linkedin User
                      agreement, Privacy Policy, and Cookie Policy
                    </p>
                    <Button
                      size="md"
                      className="loginButton"
                      style={{ width: "100%" }}
                      active
                      onClick={(e) => this.Signup(e)}
                    >
                      Sign up
                    </Button>{" "}
                    <div className="d-flex mt-2">
                      <hr></hr>
                      <span>OR</span>
                      <hr></hr>
                    </div>
                    <Link to="/">
                      <Button
                        size="md"
                        className="loginButton mt-2"
                        active
                        style={{ width: "100%" }}
                      >
                        Log in
                      </Button>{" "}
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withRouter(Signup);
