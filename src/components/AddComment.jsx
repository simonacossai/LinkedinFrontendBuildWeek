import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import {MdSend} from 'react-icons/md';

class AddComment extends React.Component {
  state = {
    addComment: {
      text: null,
      PostId: this.props.id,
    },
    errMessage: "",
  };

  updateCommentField = (e) => {
    let addComment = { ...this.state.addComment };
    let currentId = e.currentTarget.id;
    addComment[currentId] = e.currentTarget.value;
    this.setState({ addComment });
  };

  submitComment = async (e) => {
    e.preventDefault();
    console.log(this.state.addComment)
    let token = localStorage.getItem("token");
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/comments/`,
          {
            method: "POST",
            body: JSON.stringify(this.state.addComment),
            headers: new Headers({
              'Content-Type': 'application/json',
              authtoken:`${token}`,
            }),
          }
        );
      if (response.ok) {
        this.setState({
          addComment: {
            text: "",
          },
        });
        this.props.fetch()
      } else {
        console.log("an error occurred");
        let error = await response.json();
        this.setState({
          errMessage: error.message,
        });
      }
    } catch (e) {
      console.log(e); // Error
      this.setState({
        errMessage: e.message,
      });
    }
  };

  render() {
    return (
      <>
        <Form
          className="mt-4 d-flex "
          onSubmit={this.submitComment}
          style={{
            width: "100%",
            height: "50%",
          }}
        >
          <Row className="no-gutters justify-content-center align-items-center px-3" style={{width: "100%"}}>
            <Col xs={10}>
              <Form.Group className="mr-2">
                <Form.Control
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Your comment"
                  value={this.state.addComment.text}
                  onChange={this.updateCommentField}
                  required
                  style={{width:"100%"}}
                  className="rounded-pill py-2 mr-5"
                />
              </Form.Group>
            </Col>
            
              <Col xs={1}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{borderRadius: "50%", backgroundColor: "#225982", borderColor: "#225982"}}
                  className="py-2 rounded-pill mt-0 mb-3 ml-1"
                >
                  <MdSend style={{fontSize:"16px"}}/>
                </Button>
              </Col>  
          </Row>
        </Form>
      </>
    );
  }
}
export default AddComment;
