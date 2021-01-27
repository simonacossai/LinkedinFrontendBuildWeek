import React, { Component } from 'react'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { AiFillQuestionCircle } from 'react-icons/ai';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';

import '../styles/Profile.css'

let logo =  './assets/logo.png';
export default class ModifyProfileCard extends Component {
    render() {
        return (
            <div>
              <Card style={{ width: '20rem', borderRadius:"12px"}} className="mb-3">
                  
                                <ListGroup variant="flush"  style={{borderRadius:"12px"}}>
                                    <ListGroup.Item style={{ border: "none", borderBottom: "1px solid rgba(0,0,0,0.3" }} className="d-flex justify-content-between">
                                        <p className="m-0 p-0">Edit public profile & URL</p>
                                        <AiFillQuestionCircle />
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{ border: "none" }} className="d-flex justify-content-between text-right">
                                        <p className="m-0 p-0">Add profile in another language</p>
                                        <AiFillQuestionCircle />
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>  
            </div>
        )
    }
}