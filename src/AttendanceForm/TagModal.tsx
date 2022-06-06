import React from "react";
import { useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";

function TagModal(id:number) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const addTag = (tag:string) => {
        console.log("Tag: " + tag + " ID: " + id);
        return tag;
    }
    
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Issue Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Issued tag number:
            </Modal.Body>
            <ModalFooter>
                <Button variant='primary' onClick={() => addTag("s")}>
                    Issue
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </ModalFooter>

        </Modal>
    );
}