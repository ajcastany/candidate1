import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StartHere from "../Start/StartHere";

function HomePage() {
    return (
        <div>
            <h1 className="display-1 text-center">Staff Attendance App</h1>
            <div className="col-sm-5 mx-auto">
                <p className="text-center">Register daily staff attendance to your organization, book meeting rooms, issue numbered Tags, clock in-out your staff and remind them to return the tags, if any were issued to them </p>
            </div>
            <Container>
                <Row className="justify-content-md-center my-top-margin">
                    <Col className='text-center title-border'>
                        <Link className='display-4 title-link' to='admin'>
                            Admin Panel
                        </Link>
                        <p className="title-p mx-auto">For system administrators: Add or remove entires assign meetings rooms or edit any row.</p>

                    </Col>

                    <Col className="text-center title-border">
                        <Link className='display-4 title-link' to='attendance'>
                            Attendance Form
                        </Link>
                        <p className="title-p mx-auto">An app running on an tablet.  Allows staff to clock in or out and will remind them to return their tags if any was assigned to them.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
