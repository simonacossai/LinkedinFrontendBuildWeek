import React, { Component } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap';
import ProfileContainer from './ProfileContainer';
import '../styles/Profile.css'
import ModifyProfileCard from './ModifyProfileCard';
import AnnounceCard from './AnnounceCard';
import Dashboard from './Dashboard';
import Category from './Category';
import Interests from './Interests';
import Experience from './Experience';
import Loader from './Loader';
import Footer from './Footer';
import ProfileStrength from './ProfileStrength';

export default class ProfileComponent extends Component {
  state = {
    userProfile: {},
    allUsersProfile: [],
    experience:[]
  };

  getUserProfile = async () => {
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
        let userProfile = await response.json();
        this.setState({ userProfile });
        
    } catch (error) {
        console.log(error)
    }
   
  };

  getUsersProfile = async () => {
    let token = localStorage.getItem("token");
    try{
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user`,
      {
        method: "GET",
        headers: new Headers({
          authtoken: `${token}`,
        }),
      });
      if (response.ok) {
        let allUsersProfile = await response.json();
        console.log(allUsersProfile);
        this.setState({ allUsersProfile });
      } else {
        <Alert>Opps, an error occured: </Alert>;
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getUserProfile();
    this.getUsersProfile();
    //this.getExperience();
  }

  /*getExperience = async () => {
    try{
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/experiences/profile/userName/experiences`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          }),
        }
      );
      if(response.ok){
        let responseExperience = await response.json();
        this.setState({experience: responseExperience})
  
      }
      
    }catch(e){
        console.log(e)
    }
  };
*/
    render() {
     
        return (
            <>
                <Container>
                    <Row className="mt-5">
                        <Col md={8}>
                            {this.state.userProfile.length !== 0 ? <ProfileContainer userProfile={this.state.userProfile} fetchUser={this.getUserProfile}/> :  <Loader />}
                            <Dashboard />
                            <Experience experience_id = {this.props.match.params.id}/>
                            <Interests/>
                        </Col>
                        <Col md={4} style={{flexDirection:"column", display:"flex", justifyContent:"start", alignItems:"center", textAlign:"center"}}>
                           <ModifyProfileCard/>
                           <AnnounceCard/>
                           {this.state.allUsersProfile.length !== 0 ?<> <Category title="People also viewed" usersProfile ={this.state.allUsersProfile} />
                           <Category title="People you may know" usersProfile ={this.state.allUsersProfile} /> 
                            </>:  <Loader />}                      
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </>
        )
    }
  }