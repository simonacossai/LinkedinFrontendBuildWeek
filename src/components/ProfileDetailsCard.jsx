import React, { Component } from 'react'
import cover from '../assets/cover.jpg';
import '../styles/ProfileDetailsCard.css';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import {BsBookmarkFill} from 'react-icons/bs';

export default class ProfileDetailsCard extends Component {
    
    state={
        user: [],
    }
    getuser = async () => {
        try {
            var id = localStorage.getItem("id");
            var token = localStorage.getItem("token");
            console.log(id, token);
            let response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/${id}`,
              {
                method: "GET",
                headers: new Headers({
                  authtoken: `${token}`,
                }),
              }
            );
            let user = await response.json();
            console.log(user);
            this.setState({ user });
            
        } catch (error) {
            console.log(error)
        }
       
      };

    componentDidMount(){
        this.getuser();
    }
    render() {
        return (   
                <Card className="profile-detail-card">
                <Card.Img variant="top" src={cover} className="profile-detail-image"/>
                <img src={this.state.user.image} className="profile-detail-profile-pic mx-auto d-flex" />
                <Card.Body className="pb-2">
                    <Card.Title>{this.state.user.username ?? "Username"}</Card.Title>
                    <Card.Subtitle className=" text-muted">{this.state.user.title ?? "Web Developer"}</Card.Subtitle>
                    <hr></hr>
                    <Card.Text className="d-flex justify-content-between small-text-profile-detail"><p>Who viewed your profile</p> <p className="little-blue-numbers-detail">151</p> </Card.Text>
                    <Card.Text className="d-flex justify-content-between small-text-profile-detail"><p>Views for the video </p> <p className="little-blue-numbers-detail">426</p></Card.Text>
                    <Card.Footer className="pt-2 p-0 text-left card-footer-text "><BsBookmarkFill className="mr-2"/>My items</Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}
