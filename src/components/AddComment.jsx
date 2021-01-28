import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

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
          "http://localhost:3001/comments/",
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
          <Row className="no-gutters justify-content-center align-items-center px-2" style={{width: "100%"}}>
            <Col xs={12}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Your comment"
                  value={this.state.addComment.text}
                  onChange={this.updateCommentField}
                  required
                  style={{width:"100%"}}
                  className="rounded-pill py-2"
                />
              </Form.Group>
            </Col>
            {this.state.addComment.text && (
              <Col xs={2}>
                <Button
                  variant="primary"
                  type="submit"
                  className="py-0 px-4 rounded-pill mt-0 mb-2"
                >
                  Post
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </>
    );
  }
}
export default AddComment;
