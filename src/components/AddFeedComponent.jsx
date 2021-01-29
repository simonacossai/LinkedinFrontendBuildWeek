import React, { Component } from 'react'
import {  Card, Button, Container, Row, Col } from 'react-bootstrap';
import {BsFillInfoCircleFill} from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';
import logo from '../assets/logo.png';
import '../styles/Profile.css'
import cover from '../assets/immobiliare.png';


export default class AnnounceCard extends Component {
    render() {
        return (
                <Card style={{ width: '20rem', borderRadius:"12px"}} className="pb-2 mb-3">
            <Card.Body>
              <Card.Subtitle className="d-flex justify-content-between"><p  className="text-muted text-left">Add to your feed</p><BsFillInfoCircleFill/></Card.Subtitle>
                <Row className="d-flex">
                    <Col className="d-flex align-items-center">
                    <img className="add-feed-icon mr-1" src={cover}/>
                    <p className="p-0 m-0">Immobiliare</p>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Button className="button-add-feed">+ Follow</Button>
                    </Col>
                </Row>
                <Row className="d-flex my-2">
                    <Col className="d-flex align-items-center">
                    <img className="add-feed-icon mr-1" src={cover}/>
                    <p className="p-0 m-0">Immobiliare</p>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Button className="button-add-feed">+ Follow</Button>
                    </Col>
                </Row>
                <Row className="d-flex">
                    <Col className="d-flex align-items-center">
                    <img className="add-feed-icon mr-1" src={cover}/>
                    <p className="p-0 m-0">Immobiliare</p>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Button className="button-add-feed">+ Follow</Button>
                    </Col>
                </Row>
            </Card.Body>
          </Card>
        )
    }
}
