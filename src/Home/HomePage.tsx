import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StartHere from "../Start/StartHere";

function HomePage() {
    return (
        <div>
            <h1 className="display-1 text-center">Select one of the options bellow</h1>
            <Container>
                <Row className="justify-content-md-center my-top-margin">
                    <Col className='text-center'>
                    <Link className='display-3' to='admin'>
                        Admin Panel
                    </Link>
                    </Col>

                    <Col className="text-center">
                    <Link className='display-3' to='attendance'>
                        Attendance Form
                    </Link>
                </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;